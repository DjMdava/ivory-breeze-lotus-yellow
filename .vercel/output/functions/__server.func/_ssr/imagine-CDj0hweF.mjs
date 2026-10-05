import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/imagine-CDj0hweF.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var IMAGE_MODEL = "grok-imagine-image-2.0";
var VIDEO_MODEL = "grok-imagine-video-1.5";
var MAX_IMAGE_BYTES = 8388608;
function apiKey() {
	return process.env.XAI_API_KEY;
}
async function readError(res) {
	try {
		const body = await res.json();
		if (typeof body.error === "string" && body.error) return body.error;
		if (body.error && typeof body.error === "object" && body.error.message) return body.error.message;
		if (body.message) return body.message;
	} catch {}
	return `xAI API error ${res.status}`;
}
async function urlToDataUrl(url) {
	try {
		const res = await fetch(url);
		if (!res.ok) return void 0;
		const buf = Buffer.from(await res.arrayBuffer());
		if (buf.byteLength > MAX_IMAGE_BYTES) return void 0;
		return `data:${res.headers.get("content-type")?.split(";")[0] || "image/png"};base64,${buf.toString("base64")}`;
	} catch {
		return;
	}
}
function parseImagePayload(body) {
	const root = body;
	const first = root.data?.[0];
	const b64 = first?.b64_json ?? first?.b64Json ?? root.b64_json;
	const remoteUrl = first?.url ?? root.url;
	if (typeof b64 === "string" && b64.length > 0) return {
		dataUrl: b64.startsWith("data:") ? b64 : `data:image/png;base64,${b64}`,
		remoteUrl
	};
	if (typeof remoteUrl === "string") return { remoteUrl };
	return {};
}
var getAiStatus_createServerFn_handler = createServerRpc({
	id: "0fefe5d5c0084aff685167bd79604f6dcf2d75254342dc3c913eb5ee2b356550",
	name: "getAiStatus",
	filename: "src/lib/imagine.ts"
}, (opts) => getAiStatus.__executeServer(opts));
var getAiStatus = createServerFn({ method: "POST" }).handler(getAiStatus_createServerFn_handler, async () => {
	return { available: Boolean(apiKey()) };
});
var generateStill_createServerFn_handler = createServerRpc({
	id: "3a00b557dfac0906af832ed7ce231828b3301689387b2da5ffd0571410ee3358",
	name: "generateStill",
	filename: "src/lib/imagine.ts"
}, (opts) => generateStill.__executeServer(opts));
var generateStill = createServerFn({ method: "POST" }).validator((input) => {
	const prompt = input.prompt?.trim() ?? "";
	if (!prompt) throw new Error("Write a prompt first");
	if (prompt.length > 1500) throw new Error("Keep the prompt under 1,500 characters");
	return {
		prompt,
		aspectRatio: input.aspectRatio
	};
}).handler(generateStill_createServerFn_handler, async ({ data }) => {
	const key = apiKey();
	if (!key) return {
		ok: false,
		error: "AI is not available in this environment"
	};
	const res = await fetch("https://api.x.ai/v1/images/generations", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${key}`
		},
		body: JSON.stringify({
			model: IMAGE_MODEL,
			prompt: data.prompt,
			n: 1,
			aspect_ratio: data.aspectRatio,
			resolution: "1K"
		})
	});
	if (!res.ok) return {
		ok: false,
		error: await readError(res)
	};
	const parsed = parseImagePayload(await res.json());
	if (!parsed.dataUrl && parsed.remoteUrl) parsed.dataUrl = await urlToDataUrl(parsed.remoteUrl);
	if (!parsed.dataUrl && !parsed.remoteUrl) return {
		ok: false,
		error: "The generator returned an empty still"
	};
	return {
		ok: true,
		data: parsed
	};
});
var startClip_createServerFn_handler = createServerRpc({
	id: "5617ce867ad5f8e910a3637debc05f206119c946dcfa4dd845bc23537ebf3458",
	name: "startClip",
	filename: "src/lib/imagine.ts"
}, (opts) => startClip.__executeServer(opts));
var startClip = createServerFn({ method: "POST" }).validator((input) => {
	const prompt = input.prompt?.trim() ?? "";
	if (!prompt) throw new Error("Write a motion prompt first");
	if (prompt.length > 1500) throw new Error("Keep the prompt under 1,500 characters");
	if (!input.imageDataUrl && !input.imageUrl) throw new Error("A still is required to make a clip");
	if (input.imageDataUrl && input.imageDataUrl.length > 6e6) throw new Error("That still is too large to send");
	return {
		prompt,
		duration: input.duration,
		aspectRatio: input.aspectRatio,
		imageDataUrl: input.imageDataUrl,
		imageUrl: input.imageUrl
	};
}).handler(startClip_createServerFn_handler, async ({ data }) => {
	const key = apiKey();
	if (!key) return {
		ok: false,
		error: "AI is not available in this environment"
	};
	const imageUrl = data.imageDataUrl || data.imageUrl;
	const res = await fetch("https://api.x.ai/v1/videos/generations", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${key}`
		},
		body: JSON.stringify({
			model: VIDEO_MODEL,
			prompt: data.prompt,
			duration: data.duration,
			aspect_ratio: data.aspectRatio,
			resolution: "720p",
			image: imageUrl ? { url: imageUrl } : void 0
		})
	});
	if (!res.ok) return {
		ok: false,
		error: await readError(res)
	};
	const body = await res.json();
	const requestId = body.request_id ?? body.requestId;
	if (!requestId) return {
		ok: false,
		error: "The generator did not start the clip"
	};
	return {
		ok: true,
		data: { requestId }
	};
});
var pollClip_createServerFn_handler = createServerRpc({
	id: "b61c0f0ba381decb3a5b16e67d40e8dc567c4b1ab77a8c1e4eb869705ba7cf9c",
	name: "pollClip",
	filename: "src/lib/imagine.ts"
}, (opts) => pollClip.__executeServer(opts));
var pollClip = createServerFn({ method: "POST" }).validator((input) => {
	if (!input.requestId) throw new Error("Missing request");
	return { requestId: input.requestId };
}).handler(pollClip_createServerFn_handler, async ({ data }) => {
	const key = apiKey();
	if (!key) return {
		ok: false,
		error: "AI is not available in this environment"
	};
	const res = await fetch(`https://api.x.ai/v1/videos/${encodeURIComponent(data.requestId)}`, { headers: { Authorization: `Bearer ${key}` } });
	if (!res.ok) return {
		ok: false,
		error: await readError(res)
	};
	const body = await res.json();
	const raw = (body.status ?? "pending").toLowerCase();
	const status = raw === "done" || raw === "failed" || raw === "expired" ? raw : "pending";
	return {
		ok: true,
		data: {
			status,
			progress: typeof body.progress === "number" ? Math.max(0, Math.min(100, body.progress)) : status === "done" ? 100 : 15,
			videoUrl: body.video?.url,
			duration: body.video?.duration
		}
	};
});
//#endregion
export { generateStill_createServerFn_handler, getAiStatus_createServerFn_handler, pollClip_createServerFn_handler, startClip_createServerFn_handler };
