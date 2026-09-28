import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  Camera,
  Check,
  ChefHat,
  ChevronRight,
  CircleHelp,
  Clock3,
  Home as HomeIcon,
  Leaf,
  MoreHorizontal,
  PackageCheck,
  Pencil,
  Plus,
  ReceiptText,
  ScanLine,
  Trash2,
  UserRound,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

type Screen = "home" | "scan" | "result" | "kitchen" | "receipt" | "profile";
type ScanMode = "single" | "receipt";

type Ingredient = {
  id: string;
  name: string;
  detail: string;
  expiry: string;
  date: string;
  tone: "coral" | "sage" | "yellow" | "lavender";
  icon: "sausages" | "egg" | "greens" | "yogurt";
};

const initialIngredients: Ingredient[] = [
  { id: "sosis", name: "Sosis Sapi", detail: "Ready-to-Eat · 250 g", expiry: "Expired in 3 days!", date: "2026-09-18", tone: "coral", icon: "sausages" },
  { id: "greens", name: "Sayur Mix", detail: "1 pack · 180 g", expiry: "Expired in 5 days", date: "2026-09-20", tone: "sage", icon: "greens" },
  { id: "yogurt", name: "Yogurt", detail: "Plain · 120 g", expiry: "Expired in 6 days", date: "2026-09-21", tone: "lavender", icon: "yogurt" },
];

const ingredientImages: Partial<Record<Ingredient["icon"], string>> = {
  sausages: "/__mockup/images/sosis.png",
  greens: "/__mockup/images/sayur-mix.png",
  yogurt: "/__mockup/images/yogurt.png",
};

const navItems: { id: Exclude<Screen, "scan" | "result">; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "kitchen", label: "My Kitchen", icon: ChefHat },
  { id: "receipt", label: "Receipt", icon: ReceiptText },
  { id: "profile", label: "Profile", icon: UserRound },
];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`));

function ProductIllustration({ compact = false, mode = "single" }: { compact?: boolean; mode?: ScanMode }) {
  const imageSrc = mode === "receipt"
    ? "/__mockup/images/scan-product-receipt.webp"
    : "/__mockup/images/scan-product-sosis-package.png";
  const imageAlt = mode === "receipt" ? "Foto struk belanja" : "Foto kemasan sosis sapi";
  return (
    <div className={`relative overflow-hidden ${compact ? "h-full w-full" : "h-[188px] w-full"}`} style={{ background: "linear-gradient(150deg,#8a8f85 0%,#555d57 48%,#2b3935 100%)" }}>
      <div className="absolute inset-0 opacity-70" style={{ background: "repeating-linear-gradient(12deg, transparent 0 32px, rgba(170,65,61,.72) 33px 60px, rgba(226,119,96,.55) 61px 76px, transparent 77px 98px)" }} />
      <img src={imageSrc} alt={imageAlt} className={`absolute inset-0 h-full w-full object-contain ${mode === "receipt" ? "p-2" : "p-4"} drop-shadow-[0_10px_12px_rgba(26,32,28,.42)]`} />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute bottom-3 left-4 flex gap-1">
        {[0, 1, 2].map((dot) => <span key={dot} className="h-1.5 w-1.5 rounded-full bg-white/60" />)}
      </div>
    </div>
  );
}

function IngredientIllustration({ icon, tone, transparent = false }: { icon: Ingredient["icon"]; tone: Ingredient["tone"]; transparent?: boolean }) {
  const palette = {
    coral: ["#f4d0c7", "#cf5d54"],
    sage: ["#dcebd5", "#62a56e"],
    yellow: ["#f9e9b9", "#d5a23e"],
    lavender: ["#e8def0", "#9270b6"],
  }[tone];
  const image = ingredientImages[icon];
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden" style={{ backgroundColor: transparent ? "transparent" : palette[0] }}>
      {image && <img src={image} alt="" className="h-full w-full object-contain p-1.5 drop-shadow-[0_3px_3px_rgba(0,0,0,.12)]" />}
      {icon === "egg" && <span className="h-11 w-9 rounded-[55%_45%_50%_50%] border-2 border-white/80" style={{ backgroundColor: palette[1] }} />}
      {icon === "greens" && <Leaf className="absolute bottom-1 right-1 h-4 w-4 opacity-40" style={{ color: palette[1] }} strokeWidth={1.7} />}
    </div>
  );
}

function RecipeIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-[#b94b29] ${compact ? "h-[48px] w-[58px] shrink-0 rounded-[5px]" : "h-[190px]"}`}>
      <img src="/__mockup/images/tumis-sosis-asam-manis.png" alt="Tumis sosis asam manis" className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute inset-0 bg-gradient-to-t from-[#5f291f]/45 via-transparent to-white/10" />
    </div>
  );
}

function BottomNav({ active, onChange }: { active: Exclude<Screen, "scan" | "result">; onChange: (screen: Exclude<Screen, "scan" | "result">) => void }) {
  return (
    <nav className="border-t border-[#e8e8e8] bg-white px-6 pb-3 pt-2">
      <div className="grid grid-cols-4 gap-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" onClick={() => onChange(id)} aria-label={`Buka ${label}`} className={`flex flex-col items-center gap-1 py-1 text-[9px] font-bold ${active === id ? "text-[#258f57]" : "text-[#b8b8b8]"}`}>
            <Icon className="h-[19px] w-[19px]" strokeWidth={active === id ? 2.4 : 1.7} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export function ScanProductPrototype() {
  const [screen, setScreen] = useState<Screen>("home");
  const [scanMode, setScanMode] = useState<ScanMode>("single");
  const [isScanning, setIsScanning] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
  const [expiryDate, setExpiryDate] = useState("2026-09-18");
  const [toast, setToast] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(false);
  const [capturedMode, setCapturedMode] = useState<ScanMode>("single");

  const urgentCount = useMemo(() => ingredients.length, [ingredients]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const beginScan = () => {
    setScreen("scan");
    setIsScanning(false);
  };

  const captureFood = () => {
    setCapturedMode(scanMode);
    setIsScanning(true);
    window.setTimeout(() => {
      setIsScanning(false);
      setScreen("result");
    }, 1100);
  };

  const saveSosis = () => {
    if (!ingredients.some((item) => item.id === "sosis")) {
      setIngredients((current) => [{ id: "sosis", name: "Sosis Sapi", detail: "Ready-to-Eat · 250 g", expiry: "Expired in 3 days!", date: expiryDate, tone: "coral", icon: "sausages" }, ...current]);
    } else {
      setIngredients((current) => current.map((item) => item.id === "sosis" ? { ...item, date: expiryDate } : item));
    }
    notify("Sosis sapi tersimpan di My Kitchen");
    window.setTimeout(() => setScreen("kitchen"), 450);
  };

  const activeNav: Exclude<Screen, "scan" | "result"> = screen === "scan" || screen === "result" ? "home" : screen;

  return (
    <div className="min-h-[100dvh] bg-[#1f1f1f] p-0 text-[#333] sm:flex sm:items-center sm:justify-center sm:p-6">
      <style>{`
        @keyframes prototypeFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scanLine { 0% { transform: translateY(-130px); opacity: 0; } 15%, 85% { opacity: 1; } 100% { transform: translateY(220px); opacity: 0; } }
        .prototype-screen { animation: prototypeFade 340ms ease-out both; }
        .prototype-scan-line { animation: scanLine 1.7s ease-in-out infinite; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
      <main className="relative flex min-h-[100dvh] w-full max-w-[390px] flex-col overflow-hidden bg-white shadow-[0_20px_80px_rgba(0,0,0,.4)] sm:min-h-[844px] sm:rounded-[26px]">
        {screen === "home" && (
          <div key="home" className="prototype-screen flex min-h-0 flex-1 flex-col">
            <div className="relative h-[350px] shrink-0 rounded-b-[25px] bg-[#2fca59] px-4 pt-7">
              <div className="flex items-center justify-between text-white">
                <h1 className="text-[15px] font-bold">Halo, User!</h1>
                <button type="button" onClick={() => notify("Tidak ada notifikasi baru")} aria-label="Notifikasi" className="rounded-full p-1">
                  <Bell className="h-4 w-4" strokeWidth={1.8} />
                </button>
              </div>
              <div className="mt-4 flex gap-3 overflow-hidden">
                <div className="min-w-[356px] rounded-[14px] bg-white px-6 py-5 shadow-[0_6px_12px_rgba(41,121,65,.18)]">
                  <p className="text-[18px] font-black text-[#454545]">Summary</p>
                  <p className="mt-2 text-[12px] font-medium text-[#555]">3 Bahan perlu segera diolah!</p>
                </div>
                <div className="min-w-[356px] rounded-[14px] bg-white/90 px-6 py-5 shadow-[0_6px_12px_rgba(41,121,65,.12)]">
                  <p className="text-[18px] font-black text-[#454545]">Simpan bahan</p>
                  <p className="mt-2 text-[12px] font-medium text-[#555]">Semua tercatat rapi.</p>
                </div>
              </div>
              <button type="button" onClick={beginScan} aria-label="Scan food ingredients" className="absolute bottom-[-94px] left-1/2 flex h-[188px] w-[188px] -translate-x-1/2 flex-col items-center justify-center rounded-full border-[6px] border-white bg-[#159b54] text-white shadow-[0_6px_14px_rgba(29,104,62,.25)]">
                <Camera className="h-[52px] w-[52px]" strokeWidth={2.3} />
                <span className="mt-2 text-[12px] font-black leading-[1.15]">SCAN FOOD<br />INGREDIENTS</span>
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto bg-white px-5 pb-4 pt-[145px]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[14px] font-black text-[#484848]">Urgent to Cook</h2>
                <button type="button" onClick={() => setScreen("kitchen")} className="text-[10px] font-bold text-[#5a9d73]">View All</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {ingredients.slice(0, 3).map((ingredient) => (
                  <button key={ingredient.id} type="button" onClick={() => setScreen("kitchen")} className="rounded-[8px] border border-[#f0eee8] bg-white px-2 pb-2 pt-2 shadow-[0_3px_10px_rgba(0,0,0,.08)]">
                    <div className="mx-auto h-[55px] w-full overflow-hidden rounded-[5px]"><IngredientIllustration icon={ingredient.icon} tone={ingredient.tone} transparent /></div>
                    <p className="mt-2 truncate text-center text-[9px] font-bold text-[#575757]">{ingredient.name}</p>
                    <p className="text-center text-[8px] leading-tight text-[#777]">Expired :<br />{formatDate(ingredient.date)}</p>
                  </button>
                ))}
              </div>
              <div className="mt-8 rounded-[11px] bg-[#f6f6f4] p-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-[.12em] text-[#8b8b8b]">Kitchen summary</p>
                  <span className="text-[11px] font-black text-[#2f9a5b]">{urgentCount} items</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-[#777]">Keep your ingredients visible, fresh, and ready to cook.</p>
              </div>
            </div>
            <BottomNav active={activeNav} onChange={setScreen} />
          </div>
        )}

        {screen === "scan" && (
          <div key="scan" className="prototype-screen flex min-h-0 flex-1 flex-col bg-[#555955] text-white">
            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="absolute inset-0 opacity-80" style={{ background: "repeating-linear-gradient(12deg, transparent 0 40px, #9a4f48 41px 74px, #d17a64 75px 94px, transparent 95px 125px),linear-gradient(145deg,#7a817a,#394541)" }} />
              <div className="relative z-10 flex items-center gap-2 px-5 pb-4 pt-8">
                <button type="button" onClick={() => setScreen("home")} aria-label="Kembali" className="rounded-full p-1"><ArrowLeft className="h-5 w-5" /></button>
                <h1 className="text-[15px] font-black">Scan Food Ingredients</h1>
              </div>
              <div className="relative z-10 flex flex-1 flex-col items-center px-7 pt-8">
                <p className="max-w-[210px] text-center text-[14px] font-black leading-tight">Put the food inside<br />the box</p>
                <div className="relative mt-5 h-[190px] w-[190px] overflow-hidden rounded-[12px] border-[5px] border-white bg-black/20 shadow-[0_6px_20px_rgba(0,0,0,.24)]">
                  <ProductIllustration compact mode={scanMode} />
                  <div className="absolute left-2.5 right-2.5 top-2.5 h-6 rounded-tl-[9px] border-l-2 border-t-2 border-white" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 h-6 rounded-br-[9px] border-b-2 border-r-2 border-white" />
                  {isScanning && <div className="prototype-scan-line absolute left-3 right-3 top-0 h-0.5 bg-[#dff8ca] shadow-[0_0_12px_4px_rgba(216,246,184,.75)]" />}
                  {isScanning && <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-[11px] font-black">Scanning...</div>}
                </div>
              </div>
              <div className="relative z-10 px-5 pb-6">
                <div className="mx-auto mb-5 flex w-fit rounded-full bg-black/25 p-1">
                  <button type="button" onClick={() => setScanMode("single")} className={`rounded-full px-5 py-2 text-[10px] font-black ${scanMode === "single" ? "bg-[#bfbfbf] text-white" : "text-white/75"}`}>Single Item</button>
                  <button type="button" onClick={() => setScanMode("receipt")} className={`rounded-full px-5 py-2 text-[10px] font-black ${scanMode === "receipt" ? "bg-[#bfbfbf] text-white" : "text-white/75"}`}>Struk</button>
                </div>
                <button type="button" onClick={captureFood} disabled={isScanning} aria-label="Ambil foto" className="mx-auto flex h-[54px] w-[54px] items-center justify-center rounded-full border-[3px] border-white bg-white text-[#555] shadow-[0_0_0_5px_rgba(255,255,255,.25)] disabled:opacity-70">
                  {isScanning ? <ScanLine className="h-5 w-5" /> : <Camera className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {screen === "result" && (
          <div key="result" className="prototype-screen flex min-h-0 flex-1 flex-col bg-[#f5f5f5]">
            <div className="relative h-[164px] shrink-0 overflow-hidden"><ProductIllustration mode={capturedMode} /><div className="absolute inset-0 bg-black/15" /></div>
            <div className="relative -mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-[24px] bg-white">
              <div className="flex items-center justify-between px-5 pb-3 pt-5">
                <button type="button" onClick={() => setScreen("scan")} aria-label="Kembali ke scan" className="text-[#555]"><ArrowLeft className="h-4 w-4" /></button>
                <h1 className="text-[13px] font-black text-[#444]">Ingredients</h1>
                <button type="button" onClick={() => notify("Tips penyimpanan dibuka")} aria-label="Bantuan" className="text-[#999]"><CircleHelp className="h-4 w-4" /></button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-[60px] w-[76px] overflow-hidden rounded-[7px]"><ProductIllustration compact mode={capturedMode} /></div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[12px] font-black text-[#444]">Sosis Sapi<br />Ready-to-Eat (250g)</h2>
                    <p className="text-[9px] text-[#666]">Input: 15 Sep 2026</p>
                    <p className="text-[9px] text-[#666]">Exp: {formatDate(expiryDate)}</p>
                    <span className="mt-1 inline-flex rounded-[3px] bg-[#f15b55] px-2 py-1 text-[8px] font-black text-white">Expired in 3 days!</span>
                  </div>
                </div>
                <h3 className="mt-4 text-[15px] font-black text-[#414141]">Smart Storage Guide</h3>
                <div className="mt-2 rounded-[8px] bg-[#b6e8c5] p-3">
                  <p className="text-[10px] font-black text-[#2f5c42]">Fridge - Middle Shelf (Front)</p>
                  <p className="mt-1 text-[9px] leading-tight text-[#3f6550]">Store in a sealed container or airtight packaging to keep them fresh and maintain their quality.</p>
                  <label className="mt-2 flex items-center gap-1 text-[8px] text-[#3f6550]"><input type="checkbox" className="h-3 w-3 accent-[#26945d]" /> Already put it on</label>
                </div>
                <h3 className="mt-4 text-[15px] font-black text-[#414141]">Menu Recommendation</h3>
                <button type="button" onClick={() => setScreen("receipt")} className="mt-2 flex w-full items-center gap-2 rounded-[8px] border border-[#ededed] p-2 text-left shadow-[0_2px_6px_rgba(0,0,0,.05)]">
                  <RecipeIllustration compact /><span className="flex-1"><b className="block text-[10px]">Tumis Sosis Asam Manis</b><span className="mt-1 block text-[8px] text-[#777]"><Clock3 className="mr-1 inline h-3 w-3" />10m</span></span><ChevronRight className="h-3 w-3 text-[#84bd9a]" />
                </button>
                <button type="button" onClick={() => setScreen("receipt")} className="mt-2 flex w-full items-center gap-2 rounded-[8px] border border-[#ededed] p-2 text-left shadow-[0_2px_6px_rgba(0,0,0,.05)]">
                  <RecipeIllustration compact /><span className="flex-1"><b className="block text-[10px]">Nasi Goreng Sosis</b><span className="mt-1 block text-[8px] text-[#777]"><Clock3 className="mr-1 inline h-3 w-3" />15m</span></span><ChevronRight className="h-3 w-3 text-[#84bd9a]" />
                </button>
                <label className="mt-4 flex items-center justify-between rounded-[9px] border border-[#c3e1c9] bg-[#f6fff7] px-3 py-2">
                  <span className="text-[9px] font-black text-[#3b754e]">Edit expiry date</span>
                  <span className="flex items-center gap-1 text-[9px] font-black text-[#4a9a68]"><Pencil className="h-3 w-3" /><input type="date" value={expiryDate} onChange={(event) => setExpiryDate(event.target.value)} className="w-[18px] opacity-0" aria-label="Ubah tanggal expired" /></span>
                </label>
              </div>
              <div className="flex gap-2 border-t border-[#eeeeee] px-5 py-3">
                <button type="button" onClick={beginScan} className="flex-1 rounded-full border border-[#70bd8a] py-2 text-[9px] font-black text-[#4a9764]">Scan Other Ingredients</button>
                <button type="button" onClick={saveSosis} className="flex-1 rounded-full bg-[#239456] py-2 text-[9px] font-black text-white">Save to My Kitchen</button>
              </div>
            </div>
          </div>
        )}

        {screen === "kitchen" && (
          <div key="kitchen" className="prototype-screen flex min-h-0 flex-1 flex-col bg-white">
            <div className="bg-[#2fca59] px-5 pb-6 pt-8 text-white">
              <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold opacity-80">YOUR INGREDIENTS</p><h1 className="mt-1 text-[25px] font-black">My Kitchen</h1></div><button type="button" onClick={beginScan} aria-label="Tambah bahan" className="rounded-full bg-white/90 p-2 text-[#249352]"><Plus className="h-5 w-5" /></button></div>
              <p className="mt-4 text-[11px] font-semibold opacity-90">{ingredients.length} ingredients saved · {urgentCount} need attention</p>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              <div className="mb-4 flex items-center justify-between"><h2 className="text-[14px] font-black">All ingredients</h2><button type="button" onClick={() => notify("Daftar diurutkan dari yang paling dekat")} className="text-[9px] font-black text-[#259156]">Sort by expiry</button></div>
              <div className="space-y-3">{ingredients.map((ingredient) => <div key={ingredient.id} className="flex items-center gap-3 rounded-[10px] border border-[#ececec] p-2 shadow-[0_2px_8px_rgba(0,0,0,.05)]"><div className="h-[58px] w-[58px] overflow-hidden rounded-[7px]"><IngredientIllustration icon={ingredient.icon} tone={ingredient.tone} /></div><div className="min-w-0 flex-1"><p className="truncate text-[12px] font-black">{ingredient.name}</p><p className="mt-1 text-[9px] text-[#777]">{ingredient.detail}</p><p className="mt-1 text-[9px] font-bold text-[#e35f51]">{ingredient.expiry} · {formatDate(ingredient.date)}</p></div><button type="button" onClick={() => { setIngredients((current) => current.filter((item) => item.id !== ingredient.id)); notify("Bahan dihapus"); }} aria-label={`Hapus ${ingredient.name}`} className="text-[#bbb]"><Trash2 className="h-4 w-4" /></button></div>)}</div>
              <button type="button" onClick={beginScan} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-[#9cd1ab] py-3 text-[10px] font-black text-[#29945b]"><Plus className="h-4 w-4" /> Add ingredient</button>
            </div>
            <BottomNav active={activeNav} onChange={setScreen} />
          </div>
        )}

        {screen === "receipt" && (
          <div key="receipt" className="prototype-screen flex min-h-0 flex-1 flex-col bg-white">
            <div className="relative shrink-0"><RecipeIllustration /><div className="absolute left-5 top-6 text-white"><p className="text-[10px] font-bold opacity-90">15m</p><h1 className="mt-5 text-[19px] font-black">Tumis Sosis Asam Manis</h1></div><button type="button" onClick={() => setScreen("home")} aria-label="Kembali" className="absolute left-4 top-4 rounded-full bg-black/15 p-1 text-white"><ArrowLeft className="h-4 w-4" /></button></div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-5">
              <div className="flex items-center justify-between"><h2 className="text-[16px] font-black">Ingredients Checklist</h2><button type="button" onClick={() => notify("Resep disimpan")} aria-label="Simpan resep" className="text-[#e66b56]">{selectedRecipe ? <Check className="h-5 w-5" /> : <UtensilsCrossed className="h-5 w-5" />}</button></div>
              <p className="mt-2 text-[10px] leading-relaxed text-[#555]">(250g) Sosis Sapi<br />3sdm jagung manis pipil rebus<br />1/2 buah bawang bombay, iris memanjang</p>
              <h2 className="mt-4 text-[16px] font-black">Step-by-step Guide</h2>
              <ol className="mt-2 space-y-2 text-[10px] leading-tight text-[#555]">
                {["Tumis bawang merah bawang putih hingga harum.", "Tambahkan bawang bombay dan paprika. Tumis hingga layu.", "Masukkan sosis sapi. Masak hingga sosis matang.", "Tambahkan suwiran daging sapi rebus dan jagung manis. Tumis sebentar.", "Tambahkan air, garam, gula, kaldu sapi, lada bubuk. Lalu aduk merata. Cicipi rasa.", "Tunggu hingga mendidih dan air menyusut sedikit. Angkat dan sajikan."].map((step, index) => <li key={step} className="flex gap-2"><span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#111] text-[8px] font-black text-white">{index + 1}</span><span>{step}</span></li>)}
              </ol>
              <button type="button" onClick={() => { setSelectedRecipe(true); notify("Resep ditandai untuk dimasak"); }} className="mt-5 w-full rounded-full bg-[#239456] py-3 text-[10px] font-black text-white">{selectedRecipe ? "Saved to cooking list" : "Save recipe"}</button>
            </div>
            <BottomNav active={activeNav} onChange={setScreen} />
          </div>
        )}

        {screen === "profile" && (
          <div key="profile" className="prototype-screen flex min-h-0 flex-1 flex-col bg-white">
            <div className="bg-[#2fca59] px-5 pb-7 pt-8 text-white"><p className="text-[10px] font-bold opacity-80">YOUR ACCOUNT</p><h1 className="mt-1 text-[26px] font-black">Profile</h1><div className="mt-5 flex items-center gap-3 rounded-[10px] bg-white p-3 text-[#444]"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4c58d] font-black">N</div><div><p className="text-[13px] font-black">Nadia Prameswari</p><p className="text-[9px] text-[#777]">nadia@email.com</p></div></div></div>
            <div className="flex-1 px-5 py-6"><p className="mb-3 text-[11px] font-black uppercase tracking-[.12em] text-[#999]">Preferences</p><button type="button" onClick={() => notify("Reminder updated")} className="flex w-full items-center justify-between border-b border-[#eee] py-4 text-left"><span><span className="block text-[12px] font-black">Expiry reminders</span><span className="mt-1 block text-[10px] text-[#888]">Get notified before ingredients expire</span></span><span className="h-5 w-9 rounded-full bg-[#2fca59] p-1"><span className="block h-3 w-3 translate-x-4 rounded-full bg-white" /></span></button><button type="button" onClick={() => notify("Help center opened")} className="flex w-full items-center justify-between py-4 text-left"><span><span className="block text-[12px] font-black">Help center</span><span className="mt-1 block text-[10px] text-[#888]">Tips for storing food safely</span></span><ChevronRight className="h-4 w-4 text-[#aaa]" /></button></div>
            <BottomNav active={activeNav} onChange={setScreen} />
          </div>
        )}

        {toast && <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#263d35] px-4 py-3 text-[10px] font-black text-white shadow-xl"><Check className="h-4 w-4 text-[#bce6a6]" />{toast}</div>}
      </main>
    </div>
  );
}