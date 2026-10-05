import { useStudioStore } from "@/lib/studio-store";
import { useAssetImage } from "@/lib/use-asset-image";

function CropMarks() {
  return (
    <div className="pointer-events-none absolute inset-4 text-muted-foreground/40" aria-hidden>
      <span className="absolute top-0 left-0 size-4 border-t border-l" />
      <span className="absolute top-0 right-0 size-4 border-t border-r" />
      <span className="absolute bottom-0 left-0 size-4 border-b border-l" />
      <span className="absolute right-0 bottom-0 size-4 border-r border-b" />
    </div>
  );
}

export function StageMonitor() {
  const assets = useStudioStore((s) => s.assets);
  const workingStillId = useStudioStore((s) => s.workingStillId);
  const selectedId = useStudioStore((s) => s.selectedId);
  const jobCount = useStudioStore((s) =>
    s.assets.reduce(
      (n, asset) => n + (asset.status === "generating" || asset.status === "queued" ? 1 : 0),
      0,
    ),
  );

  const asset =
    assets.find((item) => item.id === selectedId) ??
    assets.find((item) => item.id === workingStillId) ??
    assets.find((item) => item.kind === "still" && item.status === "ready");

  const image = useAssetImage(
    asset?.kind === "still" ? asset.id : asset?.sourceStillId ?? asset?.id,
  );
  const busy = asset?.status === "generating" || asset?.status === "queued";
  const clipReady = Boolean(asset?.kind === "clip" && asset.status === "ready" && asset.videoUrl);

  return (
    <div className="overflow-hidden rounded-xl bg-card p-2 shadow-[var(--shadow-border)]">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-background">
        {clipReady && asset?.videoUrl ? (
          <video
            key={asset.videoUrl}
            src={asset.videoUrl}
            poster={image}
            controls
            playsInline
            className="h-full w-full object-contain"
          />
        ) : image ? (
          <img src={image} alt="" className="h-full w-full object-contain" />
        ) : (
          <>
            <CropMarks />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
              <p className="font-serif text-2xl tracking-tight">No frame on program</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Render a still from the desk, or drop a file in. It will land here.
              </p>
            </div>
          </>
        )}
        {busy ? (
          <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-muted">
            <div
              className="h-full bg-primary transition-transform duration-500 ease-[var(--ease-smooth-out)]"
              style={{ transform: `translateX(-${100 - (asset?.progress ?? 8)}%)` }}
            />
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-between gap-3 px-3 py-2.5">
        <div className="min-w-0">
          <p className="kicker">Program</p>
          <p className="mt-0.5 truncate text-sm text-foreground">
            {asset
              ? asset.kind === "clip"
                ? asset.motionPrompt
                : asset.prompt
              : "Awaiting a still"}
          </p>
        </div>
        <div className="shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">
          <p>{asset?.aspectRatio ?? "16:9"}</p>
          <p>{jobCount > 0 ? `RENDER ${jobCount}` : "IDLE"}</p>
        </div>
      </div>
    </div>
  );
}
