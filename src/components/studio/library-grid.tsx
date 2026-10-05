import { Clapperboard, Image as ImageIcon, Loader2, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useStudioStore } from "@/lib/studio-store";
import type { StudioAsset } from "@/lib/types";
import { useAssetImage } from "@/lib/use-asset-image";
import { cn } from "@/lib/utils";

function statusLabel(asset: StudioAsset) {
  if (asset.status === "generating" || asset.status === "queued") return "Rendering";
  if (asset.status === "failed") return "Failed";
  return asset.kind === "clip" ? "Clip" : "Still";
}

function AssetCard({
  asset,
  active,
  onSelect,
}: {
  asset: StudioAsset;
  active: boolean;
  onSelect: () => void;
}) {
  const image = useAssetImage(asset.kind === "still" ? asset.id : asset.sourceStillId);
  const busy = asset.status === "generating" || asset.status === "queued";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl bg-card p-1.5 text-left shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 ease-[var(--ease-smooth-out)] hover:shadow-[var(--shadow-border-hover)]",
        active && "ring-1 ring-primary",
      )}
    >
      <div
        className="relative overflow-hidden rounded-md bg-muted"
        style={{ aspectRatio: asset.aspectRatio.replace(":", " / ") }}
      >
        {asset.kind === "clip" && asset.status === "ready" && asset.videoUrl ? (
          <video
            src={asset.videoUrl}
            poster={image}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : image ? (
          <img src={image} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            {busy ? <Loader2 className="size-5 animate-spin" /> : <ImageIcon className="size-5" />}
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge variant={asset.status === "failed" ? "warn" : busy ? "live" : "default"}>
            {statusLabel(asset)}
          </Badge>
        </div>
        {asset.kind === "clip" && asset.status === "ready" ? (
          <span className="absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 font-mono text-xs tabular-nums text-foreground">
            <Play className="size-2.5 fill-current" />
            {asset.duration ?? 6}s
          </span>
        ) : null}
        {busy ? (
          <div className="absolute inset-x-0 bottom-0 p-2">
            <Progress value={asset.progress} />
          </div>
        ) : null}
      </div>
      <div className="flex items-start gap-2 px-2 pt-2.5 pb-1.5">
        {asset.kind === "clip" ? (
          <Clapperboard className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
        ) : (
          <ImageIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
        )}
        <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
          {asset.kind === "clip" ? asset.motionPrompt : asset.prompt}
        </p>
      </div>
    </button>
  );
}

export function LibraryGrid({
  filter,
}: {
  filter: "all" | "still" | "clip";
}) {
  const assets = useStudioStore((s) => s.assets);
  const selectedId = useStudioStore((s) => s.selectedId);
  const select = useStudioStore((s) => s.select);
  const visible = assets.filter((asset) => (filter === "all" ? true : asset.kind === filter));

  if (visible.length === 0) {
    return (
      <p className="py-10 text-sm text-muted-foreground">
        Nothing in this bin yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {visible.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
          active={asset.id === selectedId}
          onSelect={() => select(asset.id)}
        />
      ))}
    </div>
  );
}
