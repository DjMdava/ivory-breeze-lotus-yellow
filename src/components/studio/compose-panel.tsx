import { useMemo, useState } from "react";
import { ImagePlus, Loader2, Clapperboard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { compressImageFile, readImageAspect } from "@/lib/compress-image";
import { generateStill, startClip } from "@/lib/imagine";
import { saveMedia } from "@/lib/media-db";
import {
  canStartClip,
  makeClipAsset,
  makeStillAsset,
  useStudioStore,
} from "@/lib/studio-store";
import {
  MOTION_STARTERS,
  PROMPT_MAX,
  STILL_STARTERS,
  type AspectRatio,
  type DurationSec,
} from "@/lib/types";
import { rememberImage, useAssetImage } from "@/lib/use-asset-image";
import { cn } from "@/lib/utils";
import { Dropzone } from "./dropzone";
import { DurationPicker } from "./duration-picker";
import { RatioPicker } from "./ratio-picker";

function PromptChips({
  items,
  disabled,
  onPick,
}: {
  items: readonly { label: string; prompt: string }[];
  disabled?: boolean;
  onPick: (prompt: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          disabled={disabled}
          data-starter={item.label}
          onClick={() => onPick(item.prompt)}
          className={cn(
            "h-9 rounded-full border border-border px-3 text-xs font-medium text-muted-foreground transition-[color,border-color,background-color] duration-150",
            "hover:border-primary/30 hover:text-foreground",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function ComposePanel({ onBusy }: { onBusy?: () => void }) {
  const aiAvailable = useStudioStore((s) => s.aiAvailable);
  const workingStillId = useStudioStore((s) => s.workingStillId);
  const assets = useStudioStore((s) => s.assets);
  const addAsset = useStudioStore((s) => s.addAsset);
  const patchAsset = useStudioStore((s) => s.patchAsset);
  const setWorkingStill = useStudioStore((s) => s.setWorkingStill);
  const workingStill = assets.find((a) => a.id === workingStillId && a.kind === "still");
  const workingImage = useAssetImage(workingStill?.id);

  const [mode, setMode] = useState<"prompt" | "upload">("prompt");
  const [prompt, setPrompt] = useState("");
  const [motion, setMotion] = useState("");
  const [ratio, setRatio] = useState<AspectRatio>("16:9");
  const [duration, setDuration] = useState<DurationSec>(6);
  const [stillBusy, setStillBusy] = useState(false);
  const [clipBusy, setClipBusy] = useState(false);

  const stillBusyFromStore = assets.some((a) => a.kind === "still" && a.status === "generating");
  const generatingStill = stillBusy || stillBusyFromStore;
  const blocked = aiAvailable === false;
  const sourceReady = Boolean(workingStill && workingStill.status === "ready");
  const stillHint = useMemo(() => `${prompt.length} / ${PROMPT_MAX}`, [prompt.length]);

  async function onGenerateStill() {
    if (generatingStill) return;
    const text = prompt.trim();
    if (!text) {
      toast.error("Write a prompt for the still");
      return;
    }
    onBusy?.();
    const asset = makeStillAsset({ prompt: text, aspectRatio: ratio });
    const added = addAsset(asset);
    if (!added.ok) {
      toast.error(added.error);
      return;
    }
    setStillBusy(true);
    try {
      const result = await generateStill({ data: { prompt: text, aspectRatio: ratio } });
      if (!result.ok) {
        patchAsset(asset.id, { status: "failed", error: result.error, progress: 0 });
        toast.error(result.error);
        return;
      }
      if (result.data.dataUrl) {
        rememberImage(asset.id, result.data.dataUrl);
        await saveMedia(asset.id, result.data.dataUrl);
      }
      patchAsset(asset.id, {
        status: "ready",
        progress: 100,
        remoteImageUrl: result.data.remoteUrl,
        error: undefined,
      });
      setWorkingStill(asset.id);
      toast.success("Still is on program.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not generate that still";
      patchAsset(asset.id, { status: "failed", error: message, progress: 0 });
      toast.error(message);
    } finally {
      setStillBusy(false);
    }
  }

  async function onUpload(file: File) {
    onBusy?.();
    try {
      const dataUrl = await compressImageFile(file);
      const meta = await readImageAspect(dataUrl);
      const asset = makeStillAsset({
        prompt: file.name.replace(/\.[^.]+$/, "") || "Uploaded still",
        aspectRatio: meta.aspect,
        status: "ready",
      });
      const added = addAsset(asset);
      if (!added.ok) {
        toast.error(added.error);
        return;
      }
      rememberImage(asset.id, dataUrl);
      await saveMedia(asset.id, dataUrl);
      patchAsset(asset.id, { progress: 100 });
      setWorkingStill(asset.id);
      setRatio(meta.aspect);
      toast.success("Still is on program.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not read that file");
    }
  }

  async function onMakeClip() {
    if (!workingStill || !sourceReady) {
      toast.error("Render or upload a still first");
      return;
    }
    const text = motion.trim();
    if (!text) {
      toast.error("Describe how the still should move");
      return;
    }
    const gate = canStartClip();
    if (!gate.ok) {
      toast.error(gate.error);
      return;
    }
    onBusy?.();
    const clip = makeClipAsset({
      prompt: workingStill.prompt,
      motionPrompt: text,
      aspectRatio: workingStill.aspectRatio,
      duration,
      sourceStillId: workingStill.id,
    });
    const added = addAsset(clip);
    if (!added.ok) {
      toast.error(added.error);
      return;
    }
    setClipBusy(true);
    try {
      const imageDataUrl = workingImage?.startsWith("data:") ? workingImage : undefined;
      const imageUrl = imageDataUrl ? undefined : workingStill.remoteImageUrl || workingImage;
      const result = await startClip({
        data: {
          prompt: text,
          duration,
          aspectRatio: workingStill.aspectRatio,
          imageDataUrl,
          imageUrl,
        },
      });
      if (!result.ok) {
        patchAsset(clip.id, { status: "failed", error: result.error, progress: 0 });
        toast.error(result.error);
        return;
      }
      patchAsset(clip.id, { requestId: result.data.requestId, status: "generating", progress: 8 });
      toast.success("Clip is rendering in the background.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not start that clip";
      patchAsset(clip.id, { status: "failed", error: message, progress: 0 });
      toast.error(message);
    } finally {
      setClipBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-7">
      {blocked ? (
        <div className="rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
          Image and video generation is unavailable in this environment.
        </div>
      ) : null}

      <section className="space-y-4">
        <header>
          <p className="kicker">Frame</p>
          <h2 className="mt-1 font-serif text-2xl tracking-tight">Still</h2>
        </header>

        <Tabs value={mode} onValueChange={(v) => setMode(v as "prompt" | "upload")}>
          <TabsList>
            <TabsTrigger value="prompt">Prompt</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="prompt" className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="still-prompt">Prompt</Label>
                <span className="font-mono text-xs tabular-nums text-muted-foreground">{stillHint}</span>
              </div>
              <Textarea
                id="still-prompt"
                value={prompt}
                maxLength={PROMPT_MAX}
                disabled={generatingStill || blocked}
                placeholder="A quiet coastal road at golden hour, long lens, dust in warm air…"
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                    e.preventDefault();
                    void onGenerateStill();
                  }
                }}
              />
            </div>
            <PromptChips
              items={STILL_STARTERS}
              disabled={generatingStill || blocked}
              onPick={setPrompt}
            />
            <div className="space-y-2">
              <Label>Aspect</Label>
              <RatioPicker value={ratio} onChange={setRatio} disabled={generatingStill} />
            </div>
            <Button
              className="w-full"
              disabled={generatingStill || blocked || !prompt.trim()}
              onClick={() => void onGenerateStill()}
            >
              {generatingStill ? (
                <>
                  <Loader2 className="animate-spin" />
                  Rendering frame
                </>
              ) : (
                <>
                  <ImagePlus />
                  Render frame
                  <kbd className="ml-auto hidden sm:inline">⌘↵</kbd>
                </>
              )}
            </Button>
          </TabsContent>
          <TabsContent value="upload">
            <Dropzone disabled={blocked} onFile={(file) => void onUpload(file)} />
          </TabsContent>
        </Tabs>
      </section>

      <Separator />

      <section className="space-y-4">
        <header>
          <p className="kicker">Motion</p>
          <h2 className="mt-1 font-serif text-2xl tracking-tight">Clip</h2>
        </header>

        <p className="text-sm text-muted-foreground">
          {sourceReady
            ? "The still on program becomes the first frame."
            : "Render or upload a still, then describe the movement."}
        </p>

        <div className="space-y-2">
          <Label htmlFor="motion-prompt">Motion</Label>
          <Textarea
            id="motion-prompt"
            value={motion}
            maxLength={PROMPT_MAX}
            disabled={!sourceReady || clipBusy || blocked}
            placeholder="Slow push in, locked subject, shallow depth of field…"
            onChange={(e) => setMotion(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                void onMakeClip();
              }
            }}
          />
        </div>
        <PromptChips
          items={MOTION_STARTERS}
          disabled={!sourceReady || clipBusy || blocked}
          onPick={setMotion}
        />
        <div className="space-y-2">
          <Label>Length</Label>
          <DurationPicker value={duration} onChange={setDuration} disabled={clipBusy} />
        </div>
        <Button
          className="w-full"
          disabled={!sourceReady || clipBusy || blocked || !motion.trim()}
          onClick={() => void onMakeClip()}
        >
          {clipBusy ? (
            <>
              <Loader2 className="animate-spin" />
              Queuing clip
            </>
          ) : (
            <>
              <Clapperboard />
              Render clip
              <kbd className="ml-auto hidden sm:inline">⌘↵</kbd>
            </>
          )}
        </Button>
      </section>
    </div>
  );
}
