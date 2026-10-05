import { useMemo, useState } from "react";
import { Aperture, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useStudioStore } from "@/lib/studio-store";
import { cn } from "@/lib/utils";
import { ComposePanel } from "./compose-panel";
import { InspectorSheet } from "./inspector-sheet";
import { JobRunner } from "./job-runner";
import { JobTicker } from "./job-ticker";
import { LibraryGrid } from "./library-grid";
import { StageMonitor } from "./stage-monitor";

type Filter = "all" | "still" | "clip";

function HeaderStatus() {
  const jobCount = useStudioStore((s) =>
    s.assets.reduce(
      (n, asset) => n + (asset.status === "generating" || asset.status === "queued" ? 1 : 0),
      0,
    ),
  );
  return (
    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
      <span
        className={cn(
          "size-1.5 rounded-full",
          jobCount > 0 ? "animate-pulse bg-primary" : "bg-success",
        )}
      />
      <span className="font-mono tabular-nums">{jobCount > 0 ? `Render ${jobCount}` : "Idle"}</span>
    </div>
  );
}

export function StudioApp() {
  const assets = useStudioStore((s) => s.assets);
  const [filter, setFilter] = useState<Filter>("all");
  const [composeOpen, setComposeOpen] = useState(false);

  const counts = useMemo(
    () => ({
      all: assets.length,
      still: assets.filter((a) => a.kind === "still").length,
      clip: assets.filter((a) => a.kind === "clip").length,
    }),
    [assets],
  );

  const empty = assets.length === 0;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <JobRunner />
      <a
        href="#library"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to library
      </a>

      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-md bg-secondary text-foreground">
              <Aperture className="size-4" />
            </span>
            <div className="flex items-baseline gap-3">
              <p className="font-serif text-xl tracking-tight">Lumina</p>
              <p className="hidden text-xs tracking-widest text-muted-foreground uppercase sm:block">
                Studio
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <HeaderStatus />
            {!empty ? (
              <Button className="lg:hidden" size="sm" onClick={() => setComposeOpen(true)}>
                <Plus />
                New
              </Button>
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1600px] lg:grid-cols-[minmax(300px,380px)_1fr]">
        <aside
          className={cn(
            "border-b border-border lg:border-r lg:border-b-0",
            empty ? "block" : "hidden lg:block",
          )}
        >
          <div
            id="studio-desk"
            className="overflow-y-auto px-4 py-5 sm:px-6 lg:sticky lg:top-14 lg:max-h-[calc(100dvh-3.5rem)] lg:px-5 lg:py-6"
          >
            {!composeOpen ? <ComposePanel /> : null}
          </div>
        </aside>

        <section id="library" className="min-w-0 px-4 py-5 sm:px-6 lg:py-6">
          <div className={empty ? "hidden lg:block" : undefined}>
            <StageMonitor />
          </div>

          {empty ? null : (
            <div className="mt-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="kicker">Library</p>
                  <h1 className="font-serif text-2xl tracking-tight">Selects</h1>
                </div>
                <div className="flex h-11 items-center rounded-lg bg-muted p-1">
                  {(
                    [
                      ["all", "All"],
                      ["still", "Stills"],
                      ["clip", "Clips"],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFilter(key)}
                      className={cn(
                        "h-9 min-w-11 rounded-md px-3 text-sm font-medium transition-colors",
                        filter === key
                          ? "bg-card text-foreground shadow-[var(--shadow-border)]"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {label}
                      <span className="ml-1.5 font-mono text-xs tabular-nums text-muted-foreground">
                        {counts[key]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <LibraryGrid filter={filter} />
            </div>
          )}
        </section>
      </main>

      {!empty ? (
        <Sheet open={composeOpen} onOpenChange={setComposeOpen}>
          <SheetContent side="bottom" className="lg:hidden">
            <SheetHeader>
              <SheetTitle>New piece</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto px-6 pb-8">
              {composeOpen ? <ComposePanel onBusy={() => setComposeOpen(false)} /> : null}
            </div>
          </SheetContent>
        </Sheet>
      ) : null}

      <InspectorSheet />
      <JobTicker />
    </div>
  );
}
