import { DURATIONS, type DurationSec } from "@/lib/types";
import { cn } from "@/lib/utils";

export function DurationPicker({
  value,
  onChange,
  disabled,
}: {
  value: DurationSec;
  onChange: (value: DurationSec) => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-muted p-1" role="radiogroup" aria-label="Clip length">
      {DURATIONS.map((duration) => {
        const active = duration === value;
        return (
          <button
            key={duration}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange(duration)}
            className={cn(
              "h-10 rounded-md text-sm font-medium tabular-nums transition-[background-color,color] duration-150",
              active
                ? "bg-card text-foreground shadow-[var(--shadow-border)]"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {duration}s
          </button>
        );
      })}
    </div>
  );
}
