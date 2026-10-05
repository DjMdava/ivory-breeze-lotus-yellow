const MAX_EDGE = 1280;
const JPEG_QUALITY = 0.86;
const MAX_OUTPUT_CHARS = 5_500_000;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read that image"));
    img.src = src;
  });
}

export async function compressImageFile(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose a PNG, JPEG, or WebP image");
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("Keep uploads under 12 MB");
  }

  const original = await readFileAsDataUrl(file);
  const img = await loadImage(original);
  const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process that image");
  ctx.drawImage(img, 0, 0, width, height);

  let quality = JPEG_QUALITY;
  let dataUrl = canvas.toDataURL("image/jpeg", quality);
  while (dataUrl.length > MAX_OUTPUT_CHARS && quality > 0.5) {
    quality -= 0.08;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }
  if (dataUrl.length > MAX_OUTPUT_CHARS) {
    throw new Error("That image is still too large after compression");
  }
  return dataUrl;
}

export function aspectFromSize(width: number, height: number): "16:9" | "9:16" | "1:1" | "4:3" | "3:4" {
  const r = width / height;
  const candidates: Array<{ key: "16:9" | "9:16" | "1:1" | "4:3" | "3:4"; value: number }> = [
    { key: "16:9", value: 16 / 9 },
    { key: "9:16", value: 9 / 16 },
    { key: "1:1", value: 1 },
    { key: "4:3", value: 4 / 3 },
    { key: "3:4", value: 3 / 4 },
  ];
  return candidates.reduce((best, item) =>
    Math.abs(item.value - r) < Math.abs(best.value - r) ? item : best,
  ).key;
}

export async function readImageAspect(dataUrl: string) {
  const img = await loadImage(dataUrl);
  return { width: img.width, height: img.height, aspect: aspectFromSize(img.width, img.height) };
}
