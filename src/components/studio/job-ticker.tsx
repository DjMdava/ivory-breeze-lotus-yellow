import { Loader2 } from "lucide-react";
import { useStudioStore } from "@/lib/studio-store";

export function JobTicker() {
  const assets = useStudioStore((s) => s.assets);
  const jobs = assets.filter((a) => a.status === "generating" || a.status === "queued");
  if (jobs.length === 0) return null;

  const stills = jobs.filter((j) => j.kind === "still").length;
  const clips = jobs.filter((j) => j.kind === "clip").length;
  const parts: string[] = [];
  if (stills) parts.push(`${stills} still${stills === 1 ? "" : "s"}`);
  if (clips) parts.push(`${clips} clip${clips === 1 ? "" : "s"}`);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
      <div className="pointer-events-auto flex items-center gap-3 rounded-lg border border-border bg-card/95 px-4 py-2.5 text-sm shadow-[var(--shadow-border)]">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
        <p className="text-foreground">
          Rendering {parts.join(" and ")}
          <span className="text-muted-foreground"> · in the background</span>
        </p>
      </div>
    </div>
  );
}
