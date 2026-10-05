export const ASPECT_RATIOS = ["16:9", "9:16", "1:1", "4:3", "3:4"] as const;
export type AspectRatio = (typeof ASPECT_RATIOS)[number];

export const DURATIONS = [6, 10, 15] as const;
export type DurationSec = (typeof DURATIONS)[number];

export type AssetKind = "still" | "clip";
export type AssetStatus = "queued" | "generating" | "ready" | "failed";

export type StudioAsset = {
  id: string;
  kind: AssetKind;
  prompt: string;
  motionPrompt?: string;
  aspectRatio: AspectRatio;
  duration?: DurationSec;
  status: AssetStatus;
  progress: number;
  error?: string;
  requestId?: string;
  videoUrl?: string;
  remoteImageUrl?: string;
  sourceStillId?: string;
  createdAt: number;
  updatedAt: number;
  pollFailures?: number;
};

export const PROMPT_MAX = 1500;
export const LIBRARY_MAX = 40;
export const MAX_CONCURRENT_CLIPS = 2;

export const STILL_STARTERS = [
  {
    label: "Coastal road",
    prompt: "Golden hour on an empty coastal road, long lens haze, dust hanging in warm air",
  },
  {
    label: "Night alley",
    prompt: "A rain-soaked alley at night, anamorphic bokeh, a single neon sign reflected in puddles",
  },
  {
    label: "Water drop",
    prompt: "Macro of a water drop hitting a still pool, studio lighting, black background",
  },
  {
    label: "Train platform",
    prompt: "A quiet train platform at dawn, steam, cool tungsten practicals, 35mm film grain",
  },
] as const;

export const MOTION_STARTERS = [
  {
    label: "Push in",
    prompt: "Slow push in, locked subject, shallow depth of field",
  },
  {
    label: "Handheld",
    prompt: "Gentle handheld drift, natural parallax on the background",
  },
  {
    label: "Time-lapse",
    prompt: "Time-lapse clouds, locked camera, light shifting across the frame",
  },
  {
    label: "Dolly",
    prompt: "Subtle dolly left, cinematic, keep the subject sharp",
  },
] as const;
