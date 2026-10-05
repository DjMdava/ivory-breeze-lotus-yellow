import { create } from "zustand";
import { persist } from "zustand/middleware";
import { deleteMedia } from "./media-db";
import {
  LIBRARY_MAX,
  MAX_CONCURRENT_CLIPS,
  type AspectRatio,
  type AssetStatus,
  type DurationSec,
  type StudioAsset,
} from "./types";

type StudioState = {
  assets: StudioAsset[];
  selectedId: string | null;
  workingStillId: string | null;
  aiAvailable: boolean | null;
  setAiAvailable: (value: boolean) => void;
  select: (id: string | null) => void;
  setWorkingStill: (id: string | null) => void;
  addAsset: (asset: StudioAsset) => { ok: true } | { ok: false; error: string };
  patchAsset: (id: string, patch: Partial<StudioAsset>) => void;
  removeAsset: (id: string) => void;
  concurrentClips: () => number;
};

function now() {
  return Date.now();
}

export const useStudioStore = create<StudioState>()(
  persist(
    (set, get) => ({
      assets: [],
      selectedId: null,
      workingStillId: null,
      aiAvailable: null,
      setAiAvailable: (value) => set({ aiAvailable: value }),
      select: (id) => set({ selectedId: id }),
      setWorkingStill: (id) => set({ workingStillId: id }),
      addAsset: (asset) => {
        const assets = get().assets;
        if (assets.length >= LIBRARY_MAX) {
          return { ok: false as const, error: `The studio holds ${LIBRARY_MAX} pieces. Remove one first.` };
        }
        set({
          assets: [asset, ...assets],
          selectedId: asset.id,
          workingStillId: asset.kind === "still" ? asset.id : get().workingStillId,
        });
        return { ok: true as const };
      },
      patchAsset: (id, patch) => {
        set({
          assets: get().assets.map((asset) =>
            asset.id === id ? { ...asset, ...patch, updatedAt: now() } : asset,
          ),
        });
      },
      removeAsset: (id) => {
        const assets = get().assets.filter((asset) => asset.id !== id);
        const nextWorking = get().workingStillId === id ? null : get().workingStillId;
        const nextSelected = get().selectedId === id ? null : get().selectedId;
        set({ assets, workingStillId: nextWorking, selectedId: nextSelected });
        void deleteMedia(id);
      },
      concurrentClips: () =>
        get().assets.filter(
          (asset) =>
            asset.kind === "clip" &&
            (asset.status === "generating" || asset.status === "queued"),
        ).length,
    }),
    {
      name: "lumina-studio",
      partialize: (state) => ({
        assets: state.assets,
        workingStillId: state.workingStillId,
      }),
      skipHydration: true,
    },
  ),
);

export function canStartClip(): { ok: true } | { ok: false; error: string } {
  if (useStudioStore.getState().concurrentClips() >= MAX_CONCURRENT_CLIPS) {
    return {
      ok: false,
      error: `Two clips can render at once. Wait for one to finish.`,
    };
  }
  return { ok: true };
}

export function makeStillAsset(input: {
  prompt: string;
  aspectRatio: AspectRatio;
  status?: AssetStatus;
}): StudioAsset {
  const createdAt = now();
  return {
    id: crypto.randomUUID(),
    kind: "still",
    prompt: input.prompt,
    aspectRatio: input.aspectRatio,
    status: input.status ?? "generating",
    progress: input.status === "ready" ? 100 : 8,
    createdAt,
    updatedAt: createdAt,
  };
}

export function makeClipAsset(input: {
  prompt: string;
  motionPrompt: string;
  aspectRatio: AspectRatio;
  duration: DurationSec;
  sourceStillId: string;
}): StudioAsset {
  const createdAt = now();
  return {
    id: crypto.randomUUID(),
    kind: "clip",
    prompt: input.prompt,
    motionPrompt: input.motionPrompt,
    aspectRatio: input.aspectRatio,
    duration: input.duration,
    sourceStillId: input.sourceStillId,
    status: "generating",
    progress: 5,
    createdAt,
    updatedAt: createdAt,
  };
}
