import { useState } from "react";
import { X, ChevronRight, ChevronLeft, MoreHorizontal, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const GOAL_TYPES = ["Emergency Fund", "Vacation", "Investment", "Education", "Home Purchase", "Other"];

const MEMBER_RANGES = ["2–5 members", "6–10 members", "11–20 members", "21–50 members"];

const THEME_COLORS = [
  { name: "Chain Violet",  gradient: "from-violet-600 to-purple-600",  swatch: "#7c3aed" },
  { name: "Chain Blue",    gradient: "from-blue-600 to-cyan-600",       swatch: "#2563eb" },
  { name: "Chain Green",   gradient: "from-green-600 to-emerald-600",   swatch: "#16a34a" },
  { name: "Chain Orange",  gradient: "from-orange-500 to-pink-600",     swatch: "#f97316" },
  { name: "Chain Yellow",  gradient: "from-yellow-400 to-orange-400",   swatch: "#facc15" },
  { name: "Chain Magenta", gradient: "from-fuchsia-600 to-pink-600",    swatch: "#c026d3" },
];

const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"];

const CIRCLE_ICONS = ["💰", "⚡", "🏠", "🔗", "🎯", "🚀", "💎", "🌟"];

const STEPS = ["Basic Info", "Settings", "Review & Create"];

// ── Reusable field wrapper ──────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-white/70 text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-fuchsia-400 text-xs">{error}</p>}
    </div>
  );
}

// ── Input styles ────────────────────────────────────────────────────────────
const inputCls = (err) =>
  `w-full bg-white/5 border ${err ? "border-fuchsia-500/60" : "border-white/10"} rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-fuchsia-500/50 placeholder:text-white/25 transition-colors`;

const selectCls = (err) =>
  `w-full bg-[#1a1a2e] border ${err ? "border-fuchsia-500/60" : "border-white/10"} rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-fuchsia-500/50 transition-colors appearance-none cursor-pointer`;

// ── Step 1 ──────────────────────────────────────────────────────────────────
function Step1({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <Field label="Circle Name" error={errors.name}>
        <input
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Enter Circle Name"
          className={inputCls(errors.name)}
        />
      </Field>

      <Field label="Goal Type" error={errors.goalType}>
        <select
          value={data.goalType}
          onChange={(e) => onChange("goalType", e.target.value)}
          className={selectCls(errors.goalType)}
        >
          <option value="" disabled>Select an option</option>
          {GOAL_TYPES.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </Field>

      <Field label="Goal Description" error={errors.description}>
        <textarea
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Type a description"
          rows={3}
          className={`${inputCls(errors.description)} resize-none`}
        />
      </Field>
    </div>
  );
}

// ── Step 2 ──────────────────────────────────────────────────────────────────
function Step2({ data, onChange, errors }) {
  return (
    <div className="space-y-5">
      <Field label="Contribution Amount" error={errors.amount}>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            value={data.amount}
            onChange={(e) => onChange("amount", e.target.value)}
            placeholder="0.00"
            className={`${inputCls(errors.amount)} flex-1`}
          />
          <select
            value={data.currency}
            onChange={(e) => onChange("currency", e.target.value)}
            className="bg-[#1a1a2e] border border-white/10 rounded-xl px-3 py-3 text-white text-sm outline-none focus:border-fuchsia-500/50 transition-colors appearance-none cursor-pointer"
          >
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </Field>

      <Field label={`Duration: ${data.duration} month${data.duration !== 1 ? "s" : ""}`} error={errors.duration}>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="24"
            value={data.duration}
            onChange={(e) => onChange("duration", Number(e.target.value))}
            className="flex-1 accent-fuchsia-500 cursor-pointer"
          />
          <div className="w-12 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            {data.duration}
          </div>
        </div>
      </Field>

      <Field label="Frequency" error={errors.frequency}>
        <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 w-fit gap-1">
          {["Weekly", "Monthly"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => onChange("frequency", f)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                data.frequency === f
                  ? "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Maximum Members" error={errors.maxMembers}>
        <select
          value={data.maxMembers}
          onChange={(e) => onChange("maxMembers", e.target.value)}
          className={selectCls(errors.maxMembers)}
        >
          <option value="" disabled>Choose an amount range</option>
          {MEMBER_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </Field>
    </div>
  );
}

// ── Circle Preview Card ─────────────────────────────────────────────────────
function CirclePreviewCard({ name, color, maxMembers }) {
  const theme = THEME_COLORS.find((t) => t.name === color) || THEME_COLORS[0];
  const memberCount = maxMembers ? maxMembers.split("–")[1]?.replace(/\D/g, "") || "?" : "?";

  return (
    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
      <div className={`w-11 h-11 bg-gradient-to-br ${theme.gradient} rounded-full flex items-center justify-center text-lg flex-shrink-0`}>
        💰
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm mb-2">{name || "Circle Name"}</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500" />
          </div>
          <span className="text-white/50 text-xs flex-shrink-0">0%</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-white/40 text-xs flex-shrink-0">
        <Users size={12} />
        <span>{memberCount}</span>
      </div>
      <button className="p-1.5 text-white/30 rounded-lg flex-shrink-0" disabled>
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
}

// ── Step 3 ──────────────────────────────────────────────────────────────────
function Step3({ step1, step2, data, onChange, errors, userInitials }) {
  const fee = step2.amount ? (parseFloat(step2.amount) * 0.01).toFixed(2) : "0.00";

  return (
    <div className="space-y-5">
      {/* Preview card */}
      <div className="space-y-1.5">
        <label className="text-white/70 text-sm font-medium">Circle Preview</label>
        <CirclePreviewCard name={step1.name} color={data.themeColor} maxMembers={step2.maxMembers} />
      </div>

      {/* Theme color */}
      <Field label="Select theme color" error={errors.themeColor}>
        <select
          value={data.themeColor}
          onChange={(e) => onChange("themeColor", e.target.value)}
          className={selectCls(errors.themeColor)}
        >
          {THEME_COLORS.map((t) => (
            <option key={t.name} value={t.name}>{t.name}</option>
          ))}
        </select>
        {/* Swatch preview */}
        <div className="flex items-center gap-2 mt-2">
          <div
            className="w-5 h-5 rounded-md border border-white/20 flex-shrink-0"
            style={{ backgroundColor: THEME_COLORS.find((t) => t.name === data.themeColor)?.swatch }}
          />
          <span className="text-white/40 text-xs">{data.themeColor}</span>
        </div>
      </Field>

      {/* Estimated fees */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
        <span className="text-white/60 text-sm">Estimated fees (1%)</span>
        <span className="text-white font-semibold text-sm">${fee}</span>
      </div>

      {/* Who pays first */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
        <span className="text-white/60 text-sm">Who pays first</span>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-fuchsia-600 to-violet-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {userInitials}
          </div>
          <span className="text-xs bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 px-2 py-0.5 rounded-full">You</span>
        </div>
      </div>

      {/* Terms */}
      <div className="space-y-1.5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.terms}
            onChange={(e) => onChange("terms", e.target.checked)}
            className="mt-0.5 accent-fuchsia-500 w-4 h-4 flex-shrink-0 cursor-pointer"
          />
          <span className="text-white/60 text-sm">
            I accept Chaincircle's{" "}
            <a href="#" className="text-fuchsia-400 underline underline-offset-2 hover:text-fuchsia-300">
              Terms and Conditions
            </a>
          </span>
        </label>
        {errors.terms && <p className="text-fuchsia-400 text-xs">{errors.terms}</p>}
      </div>
    </div>
  );
}

// ── Step progress indicator ─────────────────────────────────────────────────
function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-6">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center">
            {/* connector before */}
            {i > 0 && (
              <div className={`h-0.5 w-10 sm:w-16 transition-colors ${done ? "bg-fuchsia-500" : "bg-white/10"}`} />
            )}
            <div className="flex flex-col items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                active ? "border-fuchsia-500 bg-fuchsia-500 text-white" :
                done   ? "border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-400" :
                         "border-white/20 bg-white/5 text-white/30"
              }`}>
                {i + 1}
              </div>
              <span className={`text-xs whitespace-nowrap transition-colors ${
                active ? "text-fuchsia-400 font-medium" :
                done   ? "text-fuchsia-400/60" :
                         "text-white/25"
              }`}>
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Validate helpers ────────────────────────────────────────────────────────
function validateStep1(d) {
  const e = {};
  if (!d.name.trim() || d.name.trim().length < 3) e.name = "Name must be at least 3 characters.";
  if (!d.goalType) e.goalType = "Please select a goal type.";
  if (!d.description.trim() || d.description.trim().length < 10) e.description = "Description must be at least 10 characters.";
  return e;
}

function validateStep2(d) {
  const e = {};
  if (!d.amount || parseFloat(d.amount) <= 0) e.amount = "Enter a positive contribution amount.";
  if (!d.frequency) e.frequency = "Select a frequency.";
  if (!d.maxMembers) e.maxMembers = "Select a member range.";
  return e;
}

function validateStep3(d) {
  const e = {};
  if (!d.terms) e.terms = "You must accept the Terms and Conditions.";
  return e;
}

// ── Main modal ──────────────────────────────────────────────────────────────
export default function CreateCircleModal({ onClose, onCreated }) {
  const { user } = useAuth();
  const userInitials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});

  const [step1, setStep1] = useState({ name: "", goalType: "", description: "" });
  const [step2, setStep2] = useState({ amount: "", currency: "USD", duration: 6, frequency: "Monthly", maxMembers: "" });
  const [step3, setStep3] = useState({ themeColor: THEME_COLORS[0].name, terms: false });

  const updateStep1 = (k, v) => { setStep1((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: undefined })); };
  const updateStep2 = (k, v) => { setStep2((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: undefined })); };
  const updateStep3 = (k, v) => { setStep3((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: undefined })); };

  const next = () => {
    let errs = {};
    if (step === 0) errs = validateStep1(step1);
    if (step === 1) errs = validateStep2(step2);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep((s) => s + 1);
  };

  const back = () => { setErrors({}); setStep((s) => s - 1); };

  const submit = () => {
    const errs = validateStep3(step3);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const theme = THEME_COLORS.find((t) => t.name === step3.themeColor) || THEME_COLORS[0];
    const icon = CIRCLE_ICONS[Math.floor(Math.random() * CIRCLE_ICONS.length)];

    onCreated({
      id: Date.now(),
      name: step1.name,
      icon,
      color: theme.gradient,
      progress: 0,
      status: "On track",
      pinned: false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2 flex-shrink-0">
          <h3 className="text-white font-bold text-lg">Create Circle</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Step indicator */}
        <div className="px-6 pt-4 flex-shrink-0">
          <StepIndicator current={step} />
        </div>

        {/* Form body */}
        <div className="px-6 pb-2 overflow-y-auto flex-1">
          {step === 0 && <Step1 data={step1} onChange={updateStep1} errors={errors} />}
          {step === 1 && <Step2 data={step2} onChange={updateStep2} errors={errors} />}
          {step === 2 && <Step3 step1={step1} step2={step2} data={step3} onChange={updateStep3} errors={errors} userInitials={userInitials} />}
        </div>

        {/* Footer buttons */}
        <div className="px-6 py-5 flex gap-3 flex-shrink-0 border-t border-white/5">
          {step === 0 ? (
            <button
              type="button"
              onClick={() => { setStep1({ name: "", goalType: "", description: "" }); setErrors({}); }}
              className="flex-1 px-4 py-3 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm font-medium transition-all"
            >
              Clear all Fields
            </button>
          ) : (
            <button
              type="button"
              onClick={back}
              className="flex-1 px-4 py-3 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-sm font-medium transition-all flex items-center justify-center gap-1"
            >
              <ChevronLeft size={15} /> Back
            </button>
          )}

          {step < 2 ? (
            <button
              type="button"
              onClick={next}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white text-sm font-semibold transition-all flex items-center justify-center gap-1 shadow-lg shadow-fuchsia-500/20"
            >
              Next <ChevronRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white text-sm font-semibold transition-all flex items-center justify-center gap-1 shadow-lg shadow-fuchsia-500/20"
            >
              Create Circle <ChevronRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
