import { useEffect } from "react";
import { getAiStatus, pollClip } from "@/lib/imagine";
import { useStudioStore } from "@/lib/studio-store";

const POLL_MS = 4000;

export function JobRunner() {
  useEffect(() => {
    void useStudioStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    let cancelled = false;
    void getAiStatus().then((status) => {
      if (!cancelled) useStudioStore.getState().setAiAvailable(status.available);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let inFlight = false;
    let timer: number | undefined;

    async function tick() {
      if (inFlight) return;
      const { assets, patchAsset } = useStudioStore.getState();
      const pending = assets.filter(
        (asset) =>
          asset.kind === "clip" &&
          (asset.status === "generating" || asset.status === "queued") &&
          asset.requestId,
      );
      if (pending.length === 0) return;
      inFlight = true;
      try {
        for (const asset of pending) {
          if (!asset.requestId) continue;
          const result = await pollClip({ data: { requestId: asset.requestId } });
          if (!result.ok) {
            const failures = (asset.pollFailures ?? 0) + 1;
            if (failures >= 4) {
              patchAsset(asset.id, {
                status: "failed",
                error: result.error,
                pollFailures: failures,
              });
            } else {
              patchAsset(asset.id, { pollFailures: failures });
            }
            continue;
          }
          if (result.data.status === "done" && result.data.videoUrl) {
            patchAsset(asset.id, {
              status: "ready",
              progress: 100,
              videoUrl: result.data.videoUrl,
              pollFailures: 0,
              error: undefined,
            });
          } else if (result.data.status === "failed" || result.data.status === "expired") {
            patchAsset(asset.id, {
              status: "failed",
              error:
                result.data.status === "expired"
                  ? "This clip expired. Generate it again."
                  : "The generator could not finish this clip.",
            });
          } else {
            patchAsset(asset.id, {
              status: "generating",
              progress: Math.max(asset.progress, result.data.progress || 12),
              pollFailures: 0,
            });
          }
        }
      } finally {
        inFlight = false;
      }
    }

    timer = window.setInterval(() => {
      void tick();
    }, POLL_MS);
    void tick();
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, []);

  return null;
}
