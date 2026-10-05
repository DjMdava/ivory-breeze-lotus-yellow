import { useState } from "react";
import { Clapperboard, Download, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { startClip } from "@/lib/imagine";
import {
  canStartClip,
  makeClipAsset,
  useStudioStore,
} from "@/lib/studio-store";
import { MOTION_STARTERS, PROMPT_MAX, type DurationSec } from "@/lib/types";
import { useAssetImage } from "@/lib/use-asset-image";
import { DurationPicker } from "./duration-picker";

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

export function InspectorSheet() {
  const selectedId = useStudioStore((s) => s.selectedId);
  const assets = useStudioStore((s) => s.assets);
  const select = useStudioStore((s) => s.select);
  const addAsset = useStudioStore((s) => s.addAsset);
  const patchAsset = useStudioStore((s) => s.patchAsset);
  const removeAsset = useStudioStore((s) => s.removeAsset);
  const setWorkingStill = useStudioStore((s) => s.setWorkingStill);
  const aiAvailable = useStudioStore((s) => s.aiAvailable);

  const asset = assets.find((item) => item.id === selectedId);
  const sourceImage = useAssetImage(
    asset?.kind === "still" ? asset.id : asset?.sourceStillId,
  );
  const [motion, setMotion] = useState("");
  const [duration, setDuration] = useState<DurationSec>(6);
  const [busy, setBusy] = useState(false);

  const open = Boolean(asset);

  async function onMakeClip() {
    if (!asset || asset.kind !== "still" || asset.status !== "ready") return;
    const text = motion.trim();
    if (!text) {
      toast.error("Describe how this still should move");
      return;
    }
    const gate = canStartClip();
    if (!gate.ok) {
      toast.error(gate.error);
      return;
    }
    const clip = makeClipAsset({
      prompt: asset.prompt,
      motionPrompt: text,
      aspectRatio: asset.aspectRatio,
      duration,
      sourceStillId: asset.id,
    });
    const added = addAsset(clip);
    if (!added.ok) {
      toast.error(added.error);
      return;
    }
    setBusy(true);
    try {
      const imageDataUrl = sourceImage?.startsWith("data:") ? sourceImage : undefined;
      const result = await startClip({
        data: {
          prompt: text,
          duration,
          aspectRatio: asset.aspectRatio,
          imageDataUrl,
          imageUrl: imageDataUrl ? undefined : asset.remoteImageUrl || sourceImage,
        },
      });
      if (!result.ok) {
        patchAsset(clip.id, { status: "failed", error: result.error, progress: 0 });
        toast.error(result.error);
        return;
      }
      patchAsset(clip.id, { requestId: result.data.requestId, status: "generating", progress: 8 });
      toast.success("Clip is rendering in the background.");
      select(clip.id);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not start that clip";
      patchAsset(clip.id, { status: "failed", error: message, progress: 0 });
      toast.error(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={(next) => !next && select(null)}>
      <SheetContent side="right" className="overflow-y-auto">
        {asset ? (
          <>
            <SheetHeader>
              <p className="kicker">{asset.kind === "clip" ? "Clip" : "Still"}</p>
              <SheetTitle className="mt-1">Viewer</SheetTitle>
              <SheetDescription>
                {asset.kind === "clip"
                  ? "Watch the render, or start another from the same still."
                  : "Inspect the frame, then send it to motion."}
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-1 flex-col gap-6 px-6 pb-8">
              <div className="overflow-hidden rounded-xl bg-muted p-1.5">
                <div
                  className="overflow-hidden rounded-md bg-background"
                  style={{ aspectRatio: asset.aspectRatio.replace(":", " / ") }}
                >
                  {asset.kind === "clip" && asset.status === "ready" && asset.videoUrl ? (
                    <video
                      src={asset.videoUrl}
                      poster={sourceImage}
                      controls
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : sourceImage ? (
                    <img src={sourceImage} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full min-h-40 items-center justify-center text-sm text-muted-foreground">
                      {asset.status === "generating" ? "Rendering…" : "No preview"}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 font-mono text-xs tabular-nums text-muted-foreground">
                <span>{asset.aspectRatio}</span>
                {asset.kind === "clip" ? <span>{asset.duration ?? 6}s</span> : null}
                <span>{asset.status}</span>
              </div>

              {(asset.status === "generating" || asset.status === "queued") && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Rendering in the background</span>
                    <span className="font-mono tabular-nums">{Math.round(asset.progress)}%</span>
                  </div>
                  <Progress value={asset.progress} />
                </div>
              )}

              {asset.status === "failed" && asset.error ? (
                <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {asset.error}
                </p>
              ) : null}

              <div className="space-y-1">
                <p className="kicker">{asset.kind === "clip" ? "Motion" : "Prompt"}</p>
                <p className="text-sm leading-relaxed">
                  {asset.kind === "clip" ? asset.motionPrompt : asset.prompt}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {asset.kind === "still" && sourceImage ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      downloadDataUrl(sourceImage, `lumina-still-${asset.id.slice(0, 8)}.jpg`)
                    }
                  >
                    <Download />
                    Save still
                  </Button>
                ) : null}
                {asset.kind === "clip" && asset.videoUrl ? (
                  <Button variant="secondary" size="sm" asChild>
                    <a href={asset.videoUrl} target="_blank" rel="noreferrer">
                      <Download />
                      Open clip
                    </a>
                  </Button>
                ) : null}
                {asset.kind === "still" ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setWorkingStill(asset.id);
                      select(null);
                      toast.success("Loaded onto program");
                    }}
                  >
                    Put on program
                  </Button>
                ) : null}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    removeAsset(asset.id);
                    toast("Removed from the studio");
                  }}
                >
                  <Trash2 />
                  Remove
                </Button>
              </div>

              {asset.kind === "still" && asset.status === "ready" ? (
                <div className="space-y-4 border-t border-border pt-5">
                  <div>
                    <p className="kicker">Render clip</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      This still becomes the first frame. Rendering continues if you close this
                      panel.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inspector-motion">Motion</Label>
                    <Textarea
                      id="inspector-motion"
                      value={motion}
                      maxLength={PROMPT_MAX}
                      disabled={busy || aiAvailable === false}
                      placeholder="Slow push in, locked subject…"
                      onChange={(e) => setMotion(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {MOTION_STARTERS.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setMotion(item.prompt)}
                        className="h-8 rounded-full border border-border px-3 text-xs font-medium text-muted-foreground hover:text-foreground"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <DurationPicker value={duration} onChange={setDuration} disabled={busy} />
                  <Button
                    className="w-full"
                    disabled={busy || aiAvailable === false || !motion.trim()}
                    onClick={() => void onMakeClip()}
                  >
                    {busy ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Queuing
                      </>
                    ) : (
                      <>
                        <Clapperboard />
                        Render clip
                      </>
                    )}
                  </Button>
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
