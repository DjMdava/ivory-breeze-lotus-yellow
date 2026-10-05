import { createServerFn } from "@tanstack/react-start";
import type { AspectRatio, DurationSec } from "./types";

const IMAGE_MODEL = "grok-imagine-image-2.0";
const VIDEO_MODEL = "grok-imagine-video-1.5";
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

type ImagineResult<T> = { ok: true; data: T } | { ok: false; error: string };

function apiKey(): string | undefined {
  return process.env.XAI_API_KEY;
}

async function readError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as {
      error?: { message?: string } | string;
      message?: string;
    };
    if (typeof body.error === "string" && body.error) return body.error;
    if (body.error && typeof body.error === "object" && body.error.message) {
      return body.error.message;
    }
    if (body.message) return body.message;
  } catch {
    /* ignore */
  }
  return `xAI API error ${res.status}`;
}

async function urlToDataUrl(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url);
    if (!res.ok) return undefined;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength > MAX_IMAGE_BYTES) return undefined;
    const mime = res.headers.get("content-type")?.split(";")[0] || "image/png";
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return undefined;
  }
}

function parseImagePayload(body: unknown): { dataUrl?: string; remoteUrl?: string } {
  const root = body as {
    data?: Array<{ url?: string; b64_json?: string; b64Json?: string }>;
    url?: string;
    b64_json?: string;
  };
  const first = root.data?.[0];
  const b64 = first?.b64_json ?? first?.b64Json ?? root.b64_json;
  const remoteUrl = first?.url ?? root.url;
  if (typeof b64 === "string" && b64.length > 0) {
    const payload = b64.startsWith("data:") ? b64 : `data:image/png;base64,${b64}`;
    return { dataUrl: payload, remoteUrl };
  }
  if (typeof remoteUrl === "string") return { remoteUrl };
  return {};
}

export const getAiStatus = createServerFn({ method: "POST" }).handler(
  async (): Promise<{ available: boolean }> => {
    return { available: Boolean(apiKey()) };
  },
);

export const generateStill = createServerFn({ method: "POST" })
  .validator((input: { prompt: string; aspectRatio: AspectRatio }) => {
    const prompt = input.prompt?.trim() ?? "";
    if (!prompt) throw new Error("Write a prompt first");
    if (prompt.length > 1500) throw new Error("Keep the prompt under 1,500 characters");
    return { prompt, aspectRatio: input.aspectRatio };
  })
  .handler(
    async ({ data }): Promise<ImagineResult<{ dataUrl?: string; remoteUrl?: string }>> => {
      const key = apiKey();
      if (!key) return { ok: false, error: "AI is not available in this environment" };

      const res = await fetch("https://api.x.ai/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: IMAGE_MODEL,
          prompt: data.prompt,
          n: 1,
          aspect_ratio: data.aspectRatio,
          resolution: "1K",
        }),
      });

      if (!res.ok) return { ok: false, error: await readError(res) };

      const body: unknown = await res.json();
      const parsed = parseImagePayload(body);
      if (!parsed.dataUrl && parsed.remoteUrl) {
        parsed.dataUrl = await urlToDataUrl(parsed.remoteUrl);
      }
      if (!parsed.dataUrl && !parsed.remoteUrl) {
        return { ok: false, error: "The generator returned an empty still" };
      }
      return { ok: true, data: parsed };
    },
  );

export const startClip = createServerFn({ method: "POST" })
  .validator(
    (input: {
      prompt: string;
      duration: DurationSec;
      aspectRatio: AspectRatio;
      imageDataUrl?: string;
      imageUrl?: string;
    }) => {
      const prompt = input.prompt?.trim() ?? "";
      if (!prompt) throw new Error("Write a motion prompt first");
      if (prompt.length > 1500) throw new Error("Keep the prompt under 1,500 characters");
      if (!input.imageDataUrl && !input.imageUrl) {
        throw new Error("A still is required to make a clip");
      }
      if (input.imageDataUrl && input.imageDataUrl.length > 6_000_000) {
        throw new Error("That still is too large to send");
      }
      return {
        prompt,
        duration: input.duration,
        aspectRatio: input.aspectRatio,
        imageDataUrl: input.imageDataUrl,
        imageUrl: input.imageUrl,
      };
    },
  )
  .handler(async ({ data }): Promise<ImagineResult<{ requestId: string }>> => {
    const key = apiKey();
    if (!key) return { ok: false, error: "AI is not available in this environment" };

    const imageUrl = data.imageDataUrl || data.imageUrl;
    const res = await fetch("https://api.x.ai/v1/videos/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: VIDEO_MODEL,
        prompt: data.prompt,
        duration: data.duration,
        aspect_ratio: data.aspectRatio,
        resolution: "720p",
        image: imageUrl ? { url: imageUrl } : undefined,
      }),
    });

    if (!res.ok) return { ok: false, error: await readError(res) };

    const body = (await res.json()) as { request_id?: string; requestId?: string };
    const requestId = body.request_id ?? body.requestId;
    if (!requestId) return { ok: false, error: "The generator did not start the clip" };
    return { ok: true, data: { requestId } };
  });

export const pollClip = createServerFn({ method: "POST" })
  .validator((input: { requestId: string }) => {
    if (!input.requestId) throw new Error("Missing request");
    return { requestId: input.requestId };
  })
  .handler(
    async ({
      data,
    }): Promise<
      ImagineResult<{
        status: "pending" | "done" | "failed" | "expired";
        progress: number;
        videoUrl?: string;
        duration?: number;
      }>
    > => {
      const key = apiKey();
      if (!key) return { ok: false, error: "AI is not available in this environment" };

      const res = await fetch(`https://api.x.ai/v1/videos/${encodeURIComponent(data.requestId)}`, {
        headers: { Authorization: `Bearer ${key}` },
      });

      if (!res.ok) return { ok: false, error: await readError(res) };

      const body = (await res.json()) as {
        status?: string;
        progress?: number;
        video?: { url?: string; duration?: number };
      };
      const raw = (body.status ?? "pending").toLowerCase();
      const status =
        raw === "done" || raw === "failed" || raw === "expired" ? raw : "pending";
      const progress =
        typeof body.progress === "number"
          ? Math.max(0, Math.min(100, body.progress))
          : status === "done"
            ? 100
            : 15;

      return {
        ok: true,
        data: {
          status,
          progress,
          videoUrl: body.video?.url,
          duration: body.video?.duration,
        },
      };
    },
  );
