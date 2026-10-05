import { useEffect, useState } from "react";
import { loadMedia } from "./media-db";
import { useStudioStore } from "./studio-store";

const cache = new Map<string, string>();

export function rememberImage(id: string, dataUrl: string) {
  cache.set(id, dataUrl);
}

export function useAssetImage(id: string | undefined): string | undefined {
  const remote = useStudioStore((s) =>
    id ? s.assets.find((a) => a.id === id)?.remoteImageUrl : undefined,
  );
  const sourceStillId = useStudioStore((s) =>
    id ? s.assets.find((a) => a.id === id)?.sourceStillId : undefined,
  );
  const [dataUrl, setDataUrl] = useState<string | undefined>(() =>
    id ? cache.get(id) : undefined,
  );

  useEffect(() => {
    if (!id) {
      setDataUrl(undefined);
      return;
    }
    if (cache.has(id)) {
      setDataUrl(cache.get(id));
      return;
    }
    let cancelled = false;
    void loadMedia(id).then((value) => {
      if (cancelled || !value) return;
      cache.set(id, value);
      setDataUrl(value);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (dataUrl) return dataUrl;
  if (id && sourceStillId && cache.has(sourceStillId)) return cache.get(sourceStillId);
  return remote;
}
