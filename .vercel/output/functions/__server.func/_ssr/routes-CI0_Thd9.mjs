import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as Plus, c as Image$1, d as Clapperboard, f as Aperture, i as Trash2, l as ImagePlus, n as Upload, o as Play, s as LoaderCircle, t as X, u as Download } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { t as Root$1 } from "../_libs/radix-ui__react-separator.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { n as Root$2, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CI0_Thd9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[var(--shadow-border)]",
			ghost: "text-foreground hover:bg-muted",
			outline: "border border-border bg-transparent text-foreground hover:bg-muted",
			destructive: "bg-destructive text-primary-foreground hover:bg-destructive/90"
		},
		size: {
			default: "h-11 rounded-md px-4",
			sm: "h-9 rounded-sm px-3 text-xs",
			lg: "h-12 rounded-md px-5",
			icon: "size-11 rounded-md",
			"icon-sm": "size-9 rounded-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Sheet(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, { ...props });
}
function SheetPortal(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal, { ...props });
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		className: cn("fixed inset-0 z-50 bg-background/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex flex-col bg-card text-card-foreground shadow-[var(--shadow-border)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out", side === "right" && "inset-y-0 right-0 h-full w-full max-w-md border-l border-border data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", side === "bottom" && "inset-x-0 bottom-0 max-h-[88vh] rounded-t-xl border-t border-border data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 p-6 pr-14", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-serif text-2xl tracking-tight text-foreground", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
var DB_NAME = "lumina-media";
var STORE = "blobs";
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, 1);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function saveMedia(id, dataUrl) {
	if (typeof indexedDB === "undefined") return;
	const db = await openDb();
	await new Promise((resolve, reject) => {
		const tx = db.transaction(STORE, "readwrite");
		tx.objectStore(STORE).put(dataUrl, id);
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
	db.close();
}
async function loadMedia(id) {
	if (typeof indexedDB === "undefined") return void 0;
	const db = await openDb();
	const value = await new Promise((resolve, reject) => {
		const req = db.transaction(STORE, "readonly").objectStore(STORE).get(id);
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
	db.close();
	return value;
}
async function deleteMedia(id) {
	if (typeof indexedDB === "undefined") return;
	const db = await openDb();
	await new Promise((resolve, reject) => {
		const tx = db.transaction(STORE, "readwrite");
		tx.objectStore(STORE).delete(id);
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
	db.close();
}
var ASPECT_RATIOS = [
	"16:9",
	"9:16",
	"1:1",
	"4:3",
	"3:4"
];
var DURATIONS = [
	6,
	10,
	15
];
var PROMPT_MAX = 1500;
var STILL_STARTERS = [
	{
		label: "Coastal road",
		prompt: "Golden hour on an empty coastal road, long lens haze, dust hanging in warm air"
	},
	{
		label: "Night alley",
		prompt: "A rain-soaked alley at night, anamorphic bokeh, a single neon sign reflected in puddles"
	},
	{
		label: "Water drop",
		prompt: "Macro of a water drop hitting a still pool, studio lighting, black background"
	},
	{
		label: "Train platform",
		prompt: "A quiet train platform at dawn, steam, cool tungsten practicals, 35mm film grain"
	}
];
var MOTION_STARTERS = [
	{
		label: "Push in",
		prompt: "Slow push in, locked subject, shallow depth of field"
	},
	{
		label: "Handheld",
		prompt: "Gentle handheld drift, natural parallax on the background"
	},
	{
		label: "Time-lapse",
		prompt: "Time-lapse clouds, locked camera, light shifting across the frame"
	},
	{
		label: "Dolly",
		prompt: "Subtle dolly left, cinematic, keep the subject sharp"
	}
];
function now() {
	return Date.now();
}
var useStudioStore = create()(persist((set, get) => ({
	assets: [],
	selectedId: null,
	workingStillId: null,
	aiAvailable: null,
	setAiAvailable: (value) => set({ aiAvailable: value }),
	select: (id) => set({ selectedId: id }),
	setWorkingStill: (id) => set({ workingStillId: id }),
	addAsset: (asset) => {
		const assets = get().assets;
		if (assets.length >= 40) return {
			ok: false,
			error: `The studio holds 40 pieces. Remove one first.`
		};
		set({
			assets: [asset, ...assets],
			selectedId: asset.id,
			workingStillId: asset.kind === "still" ? asset.id : get().workingStillId
		});
		return { ok: true };
	},
	patchAsset: (id, patch) => {
		set({ assets: get().assets.map((asset) => asset.id === id ? {
			...asset,
			...patch,
			updatedAt: now()
		} : asset) });
	},
	removeAsset: (id) => {
		set({
			assets: get().assets.filter((asset) => asset.id !== id),
			workingStillId: get().workingStillId === id ? null : get().workingStillId,
			selectedId: get().selectedId === id ? null : get().selectedId
		});
		deleteMedia(id);
	},
	concurrentClips: () => get().assets.filter((asset) => asset.kind === "clip" && (asset.status === "generating" || asset.status === "queued")).length
}), {
	name: "lumina-studio",
	partialize: (state) => ({
		assets: state.assets,
		workingStillId: state.workingStillId
	}),
	skipHydration: true
}));
function canStartClip() {
	if (useStudioStore.getState().concurrentClips() >= 2) return {
		ok: false,
		error: `Two clips can render at once. Wait for one to finish.`
	};
	return { ok: true };
}
function makeStillAsset(input) {
	const createdAt = now();
	return {
		id: crypto.randomUUID(),
		kind: "still",
		prompt: input.prompt,
		aspectRatio: input.aspectRatio,
		status: input.status ?? "generating",
		progress: input.status === "ready" ? 100 : 8,
		createdAt,
		updatedAt: createdAt
	};
}
function makeClipAsset(input) {
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
		updatedAt: createdAt
	};
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-xs font-medium tracking-wide text-muted-foreground", className),
		...props
	});
}
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
		decorative,
		orientation,
		className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
		...props
	});
}
function Tabs({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		className: cn("flex flex-col gap-4", className),
		...props
	});
}
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-11 w-full items-center rounded-lg bg-muted p-1", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex h-9 flex-1 items-center justify-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-[color,background-color] duration-150 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:opacity-40", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("outline-none", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-md border border-input bg-muted/40 px-3 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground transition-[box-shadow,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-40", className),
		...props
	});
}
var MAX_EDGE = 1280;
var JPEG_QUALITY = .86;
var MAX_OUTPUT_CHARS = 55e5;
function readFileAsDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});
}
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error("Could not read that image"));
		img.src = src;
	});
}
async function compressImageFile(file) {
	if (!file.type.startsWith("image/")) throw new Error("Please choose a PNG, JPEG, or WebP image");
	if (file.size > 12582912) throw new Error("Keep uploads under 12 MB");
	const img = await loadImage(await readFileAsDataUrl(file));
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
	while (dataUrl.length > MAX_OUTPUT_CHARS && quality > .5) {
		quality -= .08;
		dataUrl = canvas.toDataURL("image/jpeg", quality);
	}
	if (dataUrl.length > MAX_OUTPUT_CHARS) throw new Error("That image is still too large after compression");
	return dataUrl;
}
function aspectFromSize(width, height) {
	const r = width / height;
	return [
		{
			key: "16:9",
			value: 16 / 9
		},
		{
			key: "9:16",
			value: 9 / 16
		},
		{
			key: "1:1",
			value: 1
		},
		{
			key: "4:3",
			value: 4 / 3
		},
		{
			key: "3:4",
			value: 3 / 4
		}
	].reduce((best, item) => Math.abs(item.value - r) < Math.abs(best.value - r) ? item : best).key;
}
async function readImageAspect(dataUrl) {
	const img = await loadImage(dataUrl);
	return {
		width: img.width,
		height: img.height,
		aspect: aspectFromSize(img.width, img.height)
	};
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getAiStatus = createServerFn({ method: "POST" }).handler(createSsrRpc("0fefe5d5c0084aff685167bd79604f6dcf2d75254342dc3c913eb5ee2b356550"));
var generateStill = createServerFn({ method: "POST" }).validator((input) => {
	const prompt = input.prompt?.trim() ?? "";
	if (!prompt) throw new Error("Write a prompt first");
	if (prompt.length > 1500) throw new Error("Keep the prompt under 1,500 characters");
	return {
		prompt,
		aspectRatio: input.aspectRatio
	};
}).handler(createSsrRpc("3a00b557dfac0906af832ed7ce231828b3301689387b2da5ffd0571410ee3358"));
var startClip = createServerFn({ method: "POST" }).validator((input) => {
	const prompt = input.prompt?.trim() ?? "";
	if (!prompt) throw new Error("Write a motion prompt first");
	if (prompt.length > 1500) throw new Error("Keep the prompt under 1,500 characters");
	if (!input.imageDataUrl && !input.imageUrl) throw new Error("A still is required to make a clip");
	if (input.imageDataUrl && input.imageDataUrl.length > 6e6) throw new Error("That still is too large to send");
	return {
		prompt,
		duration: input.duration,
		aspectRatio: input.aspectRatio,
		imageDataUrl: input.imageDataUrl,
		imageUrl: input.imageUrl
	};
}).handler(createSsrRpc("5617ce867ad5f8e910a3637debc05f206119c946dcfa4dd845bc23537ebf3458"));
var pollClip = createServerFn({ method: "POST" }).validator((input) => {
	if (!input.requestId) throw new Error("Missing request");
	return { requestId: input.requestId };
}).handler(createSsrRpc("b61c0f0ba381decb3a5b16e67d40e8dc567c4b1ab77a8c1e4eb869705ba7cf9c"));
var cache = /* @__PURE__ */ new Map();
function rememberImage(id, dataUrl) {
	cache.set(id, dataUrl);
}
function useAssetImage(id) {
	const remote = useStudioStore((s) => id ? s.assets.find((a) => a.id === id)?.remoteImageUrl : void 0);
	const sourceStillId = useStudioStore((s) => id ? s.assets.find((a) => a.id === id)?.sourceStillId : void 0);
	const [dataUrl, setDataUrl] = (0, import_react.useState)(() => id ? cache.get(id) : void 0);
	(0, import_react.useEffect)(() => {
		if (!id) {
			setDataUrl(void 0);
			return;
		}
		if (cache.has(id)) {
			setDataUrl(cache.get(id));
			return;
		}
		let cancelled = false;
		loadMedia(id).then((value) => {
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
function Dropzone({ disabled, onFile }) {
	const inputRef = (0, import_react.useRef)(null);
	const [over, setOver] = (0, import_react.useState)(false);
	function take(files) {
		const file = files?.[0];
		if (file) onFile(file);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled,
		onClick: () => inputRef.current?.click(),
		onDragOver: (e) => {
			e.preventDefault();
			setOver(true);
		},
		onDragLeave: () => setOver(false),
		onDrop: (e) => {
			e.preventDefault();
			setOver(false);
			take(e.dataTransfer.files);
		},
		className: cn("flex min-h-36 w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-8 text-center transition-[background-color,border-color] duration-150", over ? "border-primary/60 bg-muted" : "border-border bg-muted/30 hover:bg-muted/60"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-11 items-center justify-center rounded-md bg-secondary text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm font-medium text-foreground",
					children: "Drop a still, or browse"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs text-muted-foreground",
					children: "JPEG, PNG, or WebP · under 12 MB"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: "image/jpeg,image/png,image/webp,image/gif",
				className: "sr-only",
				onChange: (e) => {
					take(e.target.files);
					e.target.value = "";
				}
			})
		]
	});
}
function DurationPicker({ value, onChange, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-1.5 rounded-lg bg-muted p-1",
		role: "radiogroup",
		"aria-label": "Clip length",
		children: DURATIONS.map((duration) => {
			const active = duration === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "radio",
				"aria-checked": active,
				disabled,
				onClick: () => onChange(duration),
				className: cn("h-10 rounded-md text-sm font-medium tabular-nums transition-[background-color,color] duration-150", active ? "bg-card text-foreground shadow-[var(--shadow-border)]" : "text-muted-foreground hover:text-foreground"),
				children: [duration, "s"]
			}, duration);
		})
	});
}
var FRAME = {
	"16:9": "w-8 h-4",
	"9:16": "w-3.5 h-6",
	"1:1": "w-4 h-4",
	"4:3": "w-6 h-4",
	"3:4": "w-4 h-6"
};
function RatioPicker({ value, onChange, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-5 gap-1.5",
		role: "radiogroup",
		"aria-label": "Aspect ratio",
		children: ASPECT_RATIOS.map((ratio) => {
			const active = ratio === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "radio",
				"aria-checked": active,
				disabled,
				onClick: () => onChange(ratio),
				className: cn("flex h-14 flex-col items-center justify-center gap-1.5 rounded-md border transition-[background-color,border-color,color] duration-150", active ? "border-primary/50 bg-secondary text-foreground" : "border-border bg-transparent text-muted-foreground hover:bg-muted"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("rounded-xs border", FRAME[ratio], active ? "border-primary bg-primary/20" : "border-muted-foreground/50") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs tracking-wide",
					children: ratio
				})]
			}, ratio);
		})
	});
}
function PromptChips({ items, disabled, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled,
			"data-starter": item.label,
			onClick: () => onPick(item.prompt),
			className: cn("h-9 rounded-full border border-border px-3 text-xs font-medium text-muted-foreground transition-[color,border-color,background-color] duration-150", "hover:border-primary/30 hover:text-foreground"),
			children: item.label
		}, item.label))
	});
}
function ComposePanel({ onBusy }) {
	const aiAvailable = useStudioStore((s) => s.aiAvailable);
	const workingStillId = useStudioStore((s) => s.workingStillId);
	const assets = useStudioStore((s) => s.assets);
	const addAsset = useStudioStore((s) => s.addAsset);
	const patchAsset = useStudioStore((s) => s.patchAsset);
	const setWorkingStill = useStudioStore((s) => s.setWorkingStill);
	const workingStill = assets.find((a) => a.id === workingStillId && a.kind === "still");
	const workingImage = useAssetImage(workingStill?.id);
	const [mode, setMode] = (0, import_react.useState)("prompt");
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [motion, setMotion] = (0, import_react.useState)("");
	const [ratio, setRatio] = (0, import_react.useState)("16:9");
	const [duration, setDuration] = (0, import_react.useState)(6);
	const [stillBusy, setStillBusy] = (0, import_react.useState)(false);
	const [clipBusy, setClipBusy] = (0, import_react.useState)(false);
	const stillBusyFromStore = assets.some((a) => a.kind === "still" && a.status === "generating");
	const generatingStill = stillBusy || stillBusyFromStore;
	const blocked = aiAvailable === false;
	const sourceReady = Boolean(workingStill && workingStill.status === "ready");
	const stillHint = (0, import_react.useMemo)(() => `${prompt.length} / ${PROMPT_MAX}`, [prompt.length]);
	async function onGenerateStill() {
		if (generatingStill) return;
		const text = prompt.trim();
		if (!text) {
			toast.error("Write a prompt for the still");
			return;
		}
		onBusy?.();
		const asset = makeStillAsset({
			prompt: text,
			aspectRatio: ratio
		});
		const added = addAsset(asset);
		if (!added.ok) {
			toast.error(added.error);
			return;
		}
		setStillBusy(true);
		try {
			const result = await generateStill({ data: {
				prompt: text,
				aspectRatio: ratio
			} });
			if (!result.ok) {
				patchAsset(asset.id, {
					status: "failed",
					error: result.error,
					progress: 0
				});
				toast.error(result.error);
				return;
			}
			if (result.data.dataUrl) {
				rememberImage(asset.id, result.data.dataUrl);
				await saveMedia(asset.id, result.data.dataUrl);
			}
			patchAsset(asset.id, {
				status: "ready",
				progress: 100,
				remoteImageUrl: result.data.remoteUrl,
				error: void 0
			});
			setWorkingStill(asset.id);
			toast.success("Still is on program.");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not generate that still";
			patchAsset(asset.id, {
				status: "failed",
				error: message,
				progress: 0
			});
			toast.error(message);
		} finally {
			setStillBusy(false);
		}
	}
	async function onUpload(file) {
		onBusy?.();
		try {
			const dataUrl = await compressImageFile(file);
			const meta = await readImageAspect(dataUrl);
			const asset = makeStillAsset({
				prompt: file.name.replace(/\.[^.]+$/, "") || "Uploaded still",
				aspectRatio: meta.aspect,
				status: "ready"
			});
			const added = addAsset(asset);
			if (!added.ok) {
				toast.error(added.error);
				return;
			}
			rememberImage(asset.id, dataUrl);
			await saveMedia(asset.id, dataUrl);
			patchAsset(asset.id, { progress: 100 });
			setWorkingStill(asset.id);
			setRatio(meta.aspect);
			toast.success("Still is on program.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not read that file");
		}
	}
	async function onMakeClip() {
		if (!workingStill || !sourceReady) {
			toast.error("Render or upload a still first");
			return;
		}
		const text = motion.trim();
		if (!text) {
			toast.error("Describe how the still should move");
			return;
		}
		const gate = canStartClip();
		if (!gate.ok) {
			toast.error(gate.error);
			return;
		}
		onBusy?.();
		const clip = makeClipAsset({
			prompt: workingStill.prompt,
			motionPrompt: text,
			aspectRatio: workingStill.aspectRatio,
			duration,
			sourceStillId: workingStill.id
		});
		const added = addAsset(clip);
		if (!added.ok) {
			toast.error(added.error);
			return;
		}
		setClipBusy(true);
		try {
			const imageDataUrl = workingImage?.startsWith("data:") ? workingImage : void 0;
			const imageUrl = imageDataUrl ? void 0 : workingStill.remoteImageUrl || workingImage;
			const result = await startClip({ data: {
				prompt: text,
				duration,
				aspectRatio: workingStill.aspectRatio,
				imageDataUrl,
				imageUrl
			} });
			if (!result.ok) {
				patchAsset(clip.id, {
					status: "failed",
					error: result.error,
					progress: 0
				});
				toast.error(result.error);
				return;
			}
			patchAsset(clip.id, {
				requestId: result.data.requestId,
				status: "generating",
				progress: 8
			});
			toast.success("Clip is rendering in the background.");
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not start that clip";
			patchAsset(clip.id, {
				status: "failed",
				error: message,
				progress: 0
			});
			toast.error(message);
		} finally {
			setClipBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-7",
		children: [
			blocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground",
				children: "Image and video generation is unavailable in this environment."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Frame"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-serif text-2xl tracking-tight",
					children: "Still"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					value: mode,
					onValueChange: (v) => setMode(v),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "prompt",
							children: "Prompt"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "upload",
							children: "Upload"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "prompt",
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "still-prompt",
											children: "Prompt"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs tabular-nums text-muted-foreground",
											children: stillHint
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "still-prompt",
										value: prompt,
										maxLength: PROMPT_MAX,
										disabled: generatingStill || blocked,
										placeholder: "A quiet coastal road at golden hour, long lens, dust in warm air…",
										onChange: (e) => setPrompt(e.target.value),
										onKeyDown: (e) => {
											if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
												e.preventDefault();
												onGenerateStill();
											}
										}
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptChips, {
									items: STILL_STARTERS,
									disabled: generatingStill || blocked,
									onPick: setPrompt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Aspect" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatioPicker, {
										value: ratio,
										onChange: setRatio,
										disabled: generatingStill
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "w-full",
									disabled: generatingStill || blocked || !prompt.trim(),
									onClick: () => void onGenerateStill(),
									children: generatingStill ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), "Rendering frame"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, {}),
										"Render frame",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
											className: "ml-auto hidden sm:inline",
											children: "⌘↵"
										})
									] })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "upload",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropzone, {
								disabled: blocked,
								onFile: (file) => void onUpload(file)
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "Motion"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-serif text-2xl tracking-tight",
						children: "Clip"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: sourceReady ? "The still on program becomes the first frame." : "Render or upload a still, then describe the movement."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "motion-prompt",
							children: "Motion"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "motion-prompt",
							value: motion,
							maxLength: PROMPT_MAX,
							disabled: !sourceReady || clipBusy || blocked,
							placeholder: "Slow push in, locked subject, shallow depth of field…",
							onChange: (e) => setMotion(e.target.value),
							onKeyDown: (e) => {
								if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
									e.preventDefault();
									onMakeClip();
								}
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptChips, {
						items: MOTION_STARTERS,
						disabled: !sourceReady || clipBusy || blocked,
						onPick: setMotion
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Length" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DurationPicker, {
							value: duration,
							onChange: setDuration,
							disabled: clipBusy
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						disabled: !sourceReady || clipBusy || blocked || !motion.trim(),
						onClick: () => void onMakeClip(),
						children: clipBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), "Queuing clip"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, {}),
							"Render clip",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "ml-auto hidden sm:inline",
								children: "⌘↵"
							})
						] })
					})
				]
			})
		]
	});
}
function Progress({ className, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$2, {
		className: cn("relative h-1 w-full overflow-hidden rounded-full bg-muted", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			className: "h-full w-full bg-primary transition-transform duration-500 ease-[var(--ease-smooth-out)]",
			style: { transform: `translateX(-${100 - (value ?? 0)}%)` }
		})
	});
}
function downloadDataUrl(dataUrl, filename) {
	const a = document.createElement("a");
	a.href = dataUrl;
	a.download = filename;
	a.click();
}
function InspectorSheet() {
	const selectedId = useStudioStore((s) => s.selectedId);
	const assets = useStudioStore((s) => s.assets);
	const select = useStudioStore((s) => s.select);
	const addAsset = useStudioStore((s) => s.addAsset);
	const patchAsset = useStudioStore((s) => s.patchAsset);
	const removeAsset = useStudioStore((s) => s.removeAsset);
	const setWorkingStill = useStudioStore((s) => s.setWorkingStill);
	const aiAvailable = useStudioStore((s) => s.aiAvailable);
	const asset = assets.find((item) => item.id === selectedId);
	const sourceImage = useAssetImage(asset?.kind === "still" ? asset.id : asset?.sourceStillId);
	const [motion, setMotion] = (0, import_react.useState)("");
	const [duration, setDuration] = (0, import_react.useState)(6);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const open = Boolean(asset);
	async function onMakeClip() {
		if (!asset || asset.kind !== "still" || asset.status !== "ready") return;
		const text = motion.trim();
		if (!text) {
			toast.error("Describe how this still should move");
			return;
		}
		const gate = canStartClip();
		if (!gate.ok) {
			toast.error(gate.error);
			return;
		}
		const clip = makeClipAsset({
			prompt: asset.prompt,
			motionPrompt: text,
			aspectRatio: asset.aspectRatio,
			duration,
			sourceStillId: asset.id
		});
		const added = addAsset(clip);
		if (!added.ok) {
			toast.error(added.error);
			return;
		}
		setBusy(true);
		try {
			const imageDataUrl = sourceImage?.startsWith("data:") ? sourceImage : void 0;
			const result = await startClip({ data: {
				prompt: text,
				duration,
				aspectRatio: asset.aspectRatio,
				imageDataUrl,
				imageUrl: imageDataUrl ? void 0 : asset.remoteImageUrl || sourceImage
			} });
			if (!result.ok) {
				patchAsset(clip.id, {
					status: "failed",
					error: result.error,
					progress: 0
				});
				toast.error(result.error);
				return;
			}
			patchAsset(clip.id, {
				requestId: result.data.requestId,
				status: "generating",
				progress: 8
			});
			toast.success("Clip is rendering in the background.");
			select(clip.id);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Could not start that clip";
			patchAsset(clip.id, {
				status: "failed",
				error: message,
				progress: 0
			});
			toast.error(message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: (next) => !next && select(null),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			side: "right",
			className: "overflow-y-auto",
			children: asset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: asset.kind === "clip" ? "Clip" : "Still"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
					className: "mt-1",
					children: "Viewer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: asset.kind === "clip" ? "Watch the render, or start another from the same still." : "Inspect the frame, then send it to motion." })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col gap-6 px-6 pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-xl bg-muted p-1.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-md bg-background",
							style: { aspectRatio: asset.aspectRatio.replace(":", " / ") },
							children: asset.kind === "clip" && asset.status === "ready" && asset.videoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								src: asset.videoUrl,
								poster: sourceImage,
								controls: true,
								playsInline: true,
								className: "h-full w-full object-cover"
							}) : sourceImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: sourceImage,
								alt: "",
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full min-h-40 items-center justify-center text-sm text-muted-foreground",
								children: asset.status === "generating" ? "Rendering…" : "No preview"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 font-mono text-xs tabular-nums text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: asset.aspectRatio }),
							asset.kind === "clip" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [asset.duration ?? 6, "s"] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: asset.status })
						]
					}),
					(asset.status === "generating" || asset.status === "queued") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rendering in the background" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono tabular-nums",
								children: [Math.round(asset.progress), "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: asset.progress })]
					}),
					asset.status === "failed" && asset.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive",
						children: asset.error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: asset.kind === "clip" ? "Motion" : "Prompt"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed",
							children: asset.kind === "clip" ? asset.motionPrompt : asset.prompt
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							asset.kind === "still" && sourceImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								size: "sm",
								onClick: () => downloadDataUrl(sourceImage, `lumina-still-${asset.id.slice(0, 8)}.jpg`),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Save still"]
							}) : null,
							asset.kind === "clip" && asset.videoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: asset.videoUrl,
									target: "_blank",
									rel: "noreferrer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Open clip"]
								})
							}) : null,
							asset.kind === "still" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "sm",
								onClick: () => {
									setWorkingStill(asset.id);
									select(null);
									toast.success("Loaded onto program");
								},
								children: "Put on program"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									removeAsset(asset.id);
									toast("Removed from the studio");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), "Remove"]
							})
						]
					}),
					asset.kind === "still" && asset.status === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 border-t border-border pt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "kicker",
								children: "Render clip"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "This still becomes the first frame. Rendering continues if you close this panel."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "inspector-motion",
									children: "Motion"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "inspector-motion",
									value: motion,
									maxLength: PROMPT_MAX,
									disabled: busy || aiAvailable === false,
									placeholder: "Slow push in, locked subject…",
									onChange: (e) => setMotion(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: MOTION_STARTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setMotion(item.prompt),
									className: "h-8 rounded-full border border-border px-3 text-xs font-medium text-muted-foreground hover:text-foreground",
									children: item.label
								}, item.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DurationPicker, {
								value: duration,
								onChange: setDuration,
								disabled: busy
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								disabled: busy || aiAvailable === false || !motion.trim(),
								onClick: () => void onMakeClip(),
								children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), "Queuing"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, {}), "Render clip"] })
							})
						]
					}) : null
				]
			})] }) : null
		})
	});
}
var POLL_MS = 4e3;
function JobRunner() {
	(0, import_react.useEffect)(() => {
		useStudioStore.persist.rehydrate();
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getAiStatus().then((status) => {
			if (!cancelled) useStudioStore.getState().setAiAvailable(status.available);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		let inFlight = false;
		let timer;
		async function tick() {
			if (inFlight) return;
			const { assets, patchAsset } = useStudioStore.getState();
			const pending = assets.filter((asset) => asset.kind === "clip" && (asset.status === "generating" || asset.status === "queued") && asset.requestId);
			if (pending.length === 0) return;
			inFlight = true;
			try {
				for (const asset of pending) {
					if (!asset.requestId) continue;
					const result = await pollClip({ data: { requestId: asset.requestId } });
					if (!result.ok) {
						const failures = (asset.pollFailures ?? 0) + 1;
						if (failures >= 4) patchAsset(asset.id, {
							status: "failed",
							error: result.error,
							pollFailures: failures
						});
						else patchAsset(asset.id, { pollFailures: failures });
						continue;
					}
					if (result.data.status === "done" && result.data.videoUrl) patchAsset(asset.id, {
						status: "ready",
						progress: 100,
						videoUrl: result.data.videoUrl,
						pollFailures: 0,
						error: void 0
					});
					else if (result.data.status === "failed" || result.data.status === "expired") patchAsset(asset.id, {
						status: "failed",
						error: result.data.status === "expired" ? "This clip expired. Generate it again." : "The generator could not finish this clip."
					});
					else patchAsset(asset.id, {
						status: "generating",
						progress: Math.max(asset.progress, result.data.progress || 12),
						pollFailures: 0
					});
				}
			} finally {
				inFlight = false;
			}
		}
		timer = window.setInterval(() => {
			tick();
		}, POLL_MS);
		tick();
		return () => {
			if (timer) window.clearInterval(timer);
		};
	}, []);
	return null;
}
function JobTicker() {
	const jobs = useStudioStore((s) => s.assets).filter((a) => a.status === "generating" || a.status === "queued");
	if (jobs.length === 0) return null;
	const stills = jobs.filter((j) => j.kind === "still").length;
	const clips = jobs.filter((j) => j.kind === "clip").length;
	const parts = [];
	if (stills) parts.push(`${stills} still${stills === 1 ? "" : "s"}`);
	if (clips) parts.push(`${clips} clip${clips === 1 ? "" : "s"}`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto flex items-center gap-3 rounded-lg border border-border bg-card/95 px-4 py-2.5 text-sm shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-foreground",
				children: [
					"Rendering ",
					parts.join(" and "),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: " · in the background"
					})
				]
			})]
		})
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-secondary text-secondary-foreground",
		outline: "border border-border text-muted-foreground",
		live: "bg-primary/12 text-primary",
		warn: "bg-destructive/15 text-destructive"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function statusLabel(asset) {
	if (asset.status === "generating" || asset.status === "queued") return "Rendering";
	if (asset.status === "failed") return "Failed";
	return asset.kind === "clip" ? "Clip" : "Still";
}
function AssetCard({ asset, active, onSelect }) {
	const image = useAssetImage(asset.kind === "still" ? asset.id : asset.sourceStillId);
	const busy = asset.status === "generating" || asset.status === "queued";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onSelect,
		className: cn("group flex flex-col overflow-hidden rounded-xl bg-card p-1.5 text-left shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 ease-[var(--ease-smooth-out)] hover:shadow-[var(--shadow-border-hover)]", active && "ring-1 ring-primary"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-md bg-muted",
			style: { aspectRatio: asset.aspectRatio.replace(":", " / ") },
			children: [
				asset.kind === "clip" && asset.status === "ready" && asset.videoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: asset.videoUrl,
					poster: image,
					muted: true,
					playsInline: true,
					preload: "metadata",
					className: "h-full w-full object-cover"
				}) : image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: image,
					alt: "",
					className: "h-full w-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center text-muted-foreground",
					children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-2 left-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: asset.status === "failed" ? "warn" : busy ? "live" : "default",
						children: statusLabel(asset)
					})
				}),
				asset.kind === "clip" && asset.status === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 font-mono text-xs tabular-nums text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-2.5 fill-current" }),
						asset.duration ?? 6,
						"s"
					]
				}) : null,
				busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 bottom-0 p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: asset.progress })
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2 px-2 pt-2.5 pb-1.5",
			children: [asset.kind === "clip" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, { className: "mt-0.5 size-3.5 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, { className: "mt-0.5 size-3.5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "line-clamp-2 text-xs leading-5 text-muted-foreground",
				children: asset.kind === "clip" ? asset.motionPrompt : asset.prompt
			})]
		})]
	});
}
function LibraryGrid({ filter }) {
	const assets = useStudioStore((s) => s.assets);
	const selectedId = useStudioStore((s) => s.selectedId);
	const select = useStudioStore((s) => s.select);
	const visible = assets.filter((asset) => filter === "all" ? true : asset.kind === filter);
	if (visible.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-10 text-sm text-muted-foreground",
		children: "Nothing in this bin yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3",
		children: visible.map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetCard, {
			asset,
			active: asset.id === selectedId,
			onSelect: () => select(asset.id)
		}, asset.id))
	});
}
function CropMarks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-4 text-muted-foreground/40",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-0 left-0 size-4 border-t border-l" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-0 right-0 size-4 border-t border-r" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 left-0 size-4 border-b border-l" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-0 bottom-0 size-4 border-r border-b" })
		]
	});
}
function StageMonitor() {
	const assets = useStudioStore((s) => s.assets);
	const workingStillId = useStudioStore((s) => s.workingStillId);
	const selectedId = useStudioStore((s) => s.selectedId);
	const jobCount = useStudioStore((s) => s.assets.reduce((n, asset) => n + (asset.status === "generating" || asset.status === "queued" ? 1 : 0), 0));
	const asset = assets.find((item) => item.id === selectedId) ?? assets.find((item) => item.id === workingStillId) ?? assets.find((item) => item.kind === "still" && item.status === "ready");
	const image = useAssetImage(asset?.kind === "still" ? asset.id : asset?.sourceStillId ?? asset?.id);
	const busy = asset?.status === "generating" || asset?.status === "queued";
	const clipReady = Boolean(asset?.kind === "clip" && asset.status === "ready" && asset.videoUrl);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-xl bg-card p-2 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-video overflow-hidden rounded-lg bg-background",
			children: [clipReady && asset?.videoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: asset.videoUrl,
				poster: image,
				controls: true,
				playsInline: true,
				className: "h-full w-full object-contain"
			}, asset.videoUrl) : image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt: "",
				className: "h-full w-full object-contain"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CropMarks, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-2xl tracking-tight",
					children: "No frame on program"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-sm text-muted-foreground",
					children: "Render a still from the desk, or drop a file in. It will land here."
				})]
			})] }), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-primary transition-transform duration-500 ease-[var(--ease-smooth-out)]",
					style: { transform: `translateX(-${100 - (asset?.progress ?? 8)}%)` }
				})
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3 px-3 py-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Program"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 truncate text-sm text-foreground",
					children: asset ? asset.kind === "clip" ? asset.motionPrompt : asset.prompt : "Awaiting a still"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: asset?.aspectRatio ?? "16:9" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: jobCount > 0 ? `RENDER ${jobCount}` : "IDLE" })]
			})]
		})]
	});
}
function HeaderStatus() {
	const jobCount = useStudioStore((s) => s.assets.reduce((n, asset) => n + (asset.status === "generating" || asset.status === "queued" ? 1 : 0), 0));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 text-xs font-medium text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", jobCount > 0 ? "animate-pulse bg-primary" : "bg-success") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono tabular-nums",
			children: jobCount > 0 ? `Render ${jobCount}` : "Idle"
		})]
	});
}
function StudioApp() {
	const assets = useStudioStore((s) => s.assets);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [composeOpen, setComposeOpen] = (0, import_react.useState)(false);
	const counts = (0, import_react.useMemo)(() => ({
		all: assets.length,
		still: assets.filter((a) => a.kind === "still").length,
		clip: assets.filter((a) => a.kind === "clip").length
	}), [assets]);
	const empty = assets.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobRunner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#library",
				className: "sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground",
				children: "Skip to library"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-8 items-center justify-center rounded-md bg-secondary text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aperture, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-xl tracking-tight",
								children: "Lumina"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hidden text-xs tracking-widest text-muted-foreground uppercase sm:block",
								children: "Studio"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderStatus, {}), !empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "lg:hidden",
							size: "sm",
							onClick: () => setComposeOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "New"]
						}) : null]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid max-w-[1600px] lg:grid-cols-[minmax(300px,380px)_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: cn("border-b border-border lg:border-r lg:border-b-0", empty ? "block" : "hidden lg:block"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "studio-desk",
						className: "overflow-y-auto px-4 py-5 sm:px-6 lg:sticky lg:top-14 lg:max-h-[calc(100dvh-3.5rem)] lg:px-5 lg:py-6",
						children: !composeOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComposePanel, {}) : null
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "library",
					className: "min-w-0 px-4 py-5 sm:px-6 lg:py-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: empty ? "hidden lg:block" : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageMonitor, {})
					}), empty ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "kicker",
								children: "Library"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-serif text-2xl tracking-tight",
								children: "Selects"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-11 items-center rounded-lg bg-muted p-1",
								children: [
									["all", "All"],
									["still", "Stills"],
									["clip", "Clips"]
								].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setFilter(key),
									className: cn("h-9 min-w-11 rounded-md px-3 text-sm font-medium transition-colors", filter === key ? "bg-card text-foreground shadow-[var(--shadow-border)]" : "text-muted-foreground hover:text-foreground"),
									children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1.5 font-mono text-xs tabular-nums text-muted-foreground",
										children: counts[key]
									})]
								}, key))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibraryGrid, { filter })]
					})]
				})]
			}),
			!empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: composeOpen,
				onOpenChange: setComposeOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "bottom",
					className: "lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "New piece" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-y-auto px-6 pb-8",
						children: composeOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComposePanel, { onBusy: () => setComposeOpen(false) }) : null
					})]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectorSheet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobTicker, {})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioApp, {});
}
//#endregion
export { Home as component };
