import { ASPECT_RATIOS, type AspectRatio } from "@/lib/types";
import { cn } from "@/lib/utils";

const FRAME: Record<AspectRatio, string> = {
  "16:9": "w-8 h-4",
  "9:16": "w-3.5 h-6",
  "1:1": "w-4 h-4",
  "4:3": "w-6 h-4",
  "3:4": "w-4 h-6",
};

export function RatioPicker({
  value,
  onChange,
  disabled,
}: {
  value: AspectRatio;
  onChange: (value: AspectRatio) => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid grid-cols-5 gap-1.5" role="radiogroup" aria-label="Aspect ratio">
      {ASPECT_RATIOS.map((ratio) => {
        const active = ratio === value;
        return (
          <button
            key={ratio}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(ratio)}
            className={cn(
              "flex h-14 flex-col items-center justify-center gap-1.5 rounded-md border transition-[background-color,border-color,color] duration-150",
              active
                ? "border-primary/50 bg-secondary text-foreground"
                : "border-border bg-transparent text-muted-foreground hover:bg-muted",
            )}
          >
            <span
              className={cn(
                "rounded-xs border",
                FRAME[ratio],
                active ? "border-primary bg-primary/20" : "border-muted-foreground/50",
              )}
            />
            <span className="font-mono text-xs tracking-wide">{ratio}</span>
          </button>
        );
      })}
    </div>
  );
}
