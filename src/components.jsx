import { useState, useEffect, useRef } from "react";
import {
  BarChart3, Mail, Lock, Eye, EyeOff, ArrowRight, TrendingUp, Users, Target,
  DollarSign, Plus, Search, X, Edit2, Trash2, Phone, MessageCircle, Globe,
  Building2, Calendar, Send, Check, ChevronDown, Sparkles, Copy, FileText,
  Activity, Star, Repeat, Upload, Download, AlertCircle, CheckCircle,
  Percent, UserPlus, LogOut, RefreshCw, Zap, Link2, Clock, Tag
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// ─── Constants ───────────────────────────────────────────────────────────────
const STAGES = ["Lead", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];
const SC = { Lead: "#6366f1", Qualified: "#8b5cf6", Proposal: "#06b6d4", Negotiation: "#f59e0b", "Closed Won": "#10b981", "Closed Lost": "#ef4444" };
const BM = {
  Active: "bg-emerald-100 text-emerald-700", active: "bg-emerald-100 text-emerald-700",
  Lead: "bg-blue-100 text-blue-700", lead: "bg-blue-100 text-blue-700",
  Inactive: "bg-gray-100 text-gray-500", inactive: "bg-gray-100 text-gray-500",
  paid: "bg-emerald-100 text-emerald-700", Paid: "bg-emerald-100 text-emerald-700",
  sent: "bg-blue-100 text-blue-700", Sent: "bg-blue-100 text-blue-700",
  overdue: "bg-red-100 text-red-600", Overdue: "bg-red-100 text-red-600",
  draft: "bg-gray-100 text-gray-500", Draft: "bg-gray-100 text-gray-500",
  Accepted: "bg-emerald-100 text-emerald-700", accepted: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-600", rejected: "bg-red-100 text-red-600",
  Qualified: "bg-violet-100 text-violet-700",
  Proposal: "bg-cyan-100 text-cyan-700",
  Negotiation: "bg-amber-100 text-amber-700",
  "Closed Won": "bg-emerald-100 text-emerald-700",
  "Closed Lost": "bg-red-100 text-red-600",
  Call: "bg-blue-100 text-blue-700", Meeting: "bg-purple-100 text-purple-700",
  Email: "bg-indigo-100 text-indigo-700", Note: "bg-gray-100 text-gray-600",
  High: "bg-red-100 text-red-600", Medium: "bg-amber-100 text-amber-700", Low: "bg-gray-100 text-gray-500",
  admin: "bg-indigo-100 text-indigo-700", sales: "bg-gray-100 text-gray-600",
  scheduled: "bg-purple-100 text-purple-700", completed: "bg-emerald-100 text-emerald-700",
  open: "bg-blue-100 text-blue-700",
};

const fmt = n => `£${(n || 0).toLocaleString("en-GB")}`;
const today = () => new Date().toISOString().split("T")[0];
const outlookLink = e => `https://outlook.office.com/mail/deeplink/compose?to=${e}`;
const teamsLink = e => `https://teams.microsoft.com/l/chat/0/0?users=${e}`;
const waLink = p => `https://wa.me/${(p || "").replace(/\D/g, "")}`;

// ─── Shared Components ───────────────────────────────────────────────────────
export function Badge({ label }) {
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${BM[label] || "bg-gray-100 text-gray-500"}`}>{label}</span>;
}

export function Av({ name, sm }) {
  const initials = (name || "?").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const cols = ["bg-indigo-500", "bg-violet-500", "bg-cyan-500", "bg-emerald-500", "bg-amber-500", "bg-pink-500"];
  const c = cols[(name || "?").charCodeAt(0) % cols.length];
  return <div className={`${sm ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm"} ${c} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>{initials}</div>;
}

export function Modal({ title, onClose, children, wide }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${wide ? "max-w-2xl" : "max-w-md"} max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
        </div>
        <div className="p-5 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

export function Inp({ label, textarea, ...p }) {
  return (
    <div>
      {label && <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>}
      {textarea
        ? <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white resize-none" rows={3} {...p} />
        : <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white" {...p} />}
    </div>
  );
}

export function Sel({ label, opts, ...p }) {
  return (
    <div>
      {label && <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>}
      <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white" {...p}>
        {opts.map(o => <option key={o.v || o} value={o.v || o}>{o.l || o}</option>)}
      </select>
    </div>
  );
}

export function Btn({ children, variant = "primary", sm, ...p }) {
  const s = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "border border-gray-200 text-gray-600 hover:bg-gray-50",
    outline: "border border-gray-200 text-gray-600 hover:bg-gray-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    red: "bg-red-50 text-red-600 hover:bg-red-100",
    green: "bg-emerald-600 text-white hover:bg-emerald-700",
  };
  return <button className={`flex items-center justify-center gap-1.5 ${sm ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"} rounded-lg font-medium transition-all disabled:opacity-40 ${s[variant]}`} {...p}>{children}</button>;
}

export function EmptyState({ icon: Icon, message }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && <Icon size={32} className="text-gray-200 mb-3" />}
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}

function CommButtons({ email, phone, sm }) {
  return (
    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
      {email && <a href={outlookLink(email)} target="_blank" rel="noreferrer" title="Outlook" className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"><Mail size={sm ? 11 : 13} /></a>}
      {email && <a href={teamsLink(email)} target="_blank" rel="noreferrer" title="Teams" className="p-1.5 rounded-lg bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"><MessageCircle size={sm ? 11 : 13} /></a>}
      {phone && <a href={waLink(phone)} target="_blank" rel="noreferrer" title="WhatsApp" className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"><Phone size={sm ? 11 : 13} /></a>}
    </div>
  );
}

// ─── LoginPage ────────────────────────────────────────────────────────────────
export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !pw) { setErr("Please enter your email and password."); return; }
    setLoading(true); setErr("");
    try {
      const r = await fetch("/api/auth.php", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password: pw }) });
      if (!r.ok) { setErr("Invalid email or password."); setLoading(false); return; }
      const u = await r.json();
      onLogin(u);
    } catch (e) { setErr("Connection error. Please try again."); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "system-ui,sans-serif" }}>
      <div className="hidden lg:flex flex-col justify-between p-12 w-5/12 bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"><BarChart3 size={18} className="text-white" /></div>
          <span className="text-white font-bold text-lg">NexusCRM</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white leading-snug mb-3">Your entire business,<br />one platform.</h1>
          <p className="text-indigo-200 text-base mb-8">Contacts · Pipeline · Invoicing · AI · Commissions</p>
          <div className="grid grid-cols-2 gap-3">
            {[["AI-Powered", "Email drafts & deal coaching"], ["Role-Based", "Sales rep access control"], ["Integrated", "MS365 · QuickBooks · Xero"], ["Commissions", "Real-time earnings tracking"]].map(([t, d]) => (
              <div key={t} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="font-semibold text-white text-sm">{t}</p>
                <p className="text-indigo-300 text-xs mt-0.5">{d}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-indigo-400 text-xs">© 2025 NexusCRM</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center"><BarChart3 size={14} className="text-white" /></div>
            <span className="font-bold text-gray-900">NexusCRM</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-7">Sign in to your account</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-2.5 text-gray-400" />
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErr(""); }} className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="you@company.com" onKeyDown={e => e.key === "Enter" && login()} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-2.5 text-gray-400" />
                <input type={show ? "text" : "password"} value={pw} onChange={e => { setPw(e.target.value); setErr(""); }} className="w-full border border-gray-200 rounded-xl pl-9 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="••••••••" onKeyDown={e => e.key === "Enter" && login()} />
                <button onClick={() => setShow(s => !s)} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">{show ? <EyeOff size={14} /> : <Eye size={14} />}</button>
              </div>
            </div>
            {err && <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2 text-xs text-red-600">{err}</div>}
            <button onClick={login} disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? "Signing in…" : (<>Sign In <ArrowRight size={14} /></>)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export function Dashboard({ user, users, contacts, deals, invoices, activities, tasks }) {
  const totalRevenue = (invoices || []).filter(i => i.status === "paid").reduce((a, b) => a + (b.amount || 0), 0);
  const openPipeline = (deals || []).filter(d => !["Closed Won", "Closed Lost"].includes(d.stage)).reduce((a, b) => a + (b.deal_value || b.value || 0), 0);
  const wonDeals = (deals || []).filter(d => d.stage === "Closed Won").length;
  const lostDeals = (deals || []).filter(d => d.stage === "Closed Lost").length;
  const winRate = (wonDeals + lostDeals) > 0 ? Math.round((wonDeals / (wonDeals + lostDeals)) * 100) : 0;
  const todayStr = today();
  const todayTasks = (tasks || []).filter(t => t.due_date === todayStr && t.status !== "completed");
  const recentActivities = [...(activities || [])].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  const stageData = STAGES.map(s => ({
    stage: s.replace("Closed ", ""),
    value: (deals || []).filter(d => d.stage === s).reduce((a, b) => a + (b.deal_value || b.value || 0), 0),
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Welcome back, {(user?.name || "").split(" ")[0]}</p>
        </div>
        <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">{new Date().toLocaleDateString("en-GB", { weekday: "long", month: "long", day: "numeric" })}</div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: fmt(totalRevenue), icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Open Pipeline", value: fmt(openPipeline), icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Contacts", value: (contacts || []).length, icon: Users, color: "text-cyan-600", bg: "bg-cyan-50" },
          { label: "Win Rate", value: `${winRate}%`, icon: Target, color: "text-violet-600", bg: "bg-violet-50" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm">
            <div className={`${bg} p-2.5 rounded-xl`}><Icon size={18} className={color} /></div>
            <div><p className="text-xs text-gray-400">{label}</p><p className="text-xl font-bold text-gray-900">{value}</p></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <p className="text-sm font-semibold text-gray-700 mb-3">Deals by Stage</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={stageData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="stage" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${v / 1000}k`} />
            <Tooltip formatter={v => fmt(v)} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {stageData.map((e, i) => <Cell key={i} fill={SC[STAGES[i]] || "#6366f1"} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">Recent Activities</p>
            <Activity size={14} className="text-gray-300" />
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivities.length === 0 && <EmptyState icon={Activity} message="No activities yet" />}
            {recentActivities.map(a => (
              <div key={a.id} className="px-4 py-3 flex items-start gap-3">
                <Badge label={a.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 leading-snug">{a.notes || a.outcome || a.type}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.contact} · {a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">Tasks Due Today</p>
            <CheckCircle size={14} className="text-gray-300" />
          </div>
          <div className="divide-y divide-gray-50">
            {todayTasks.length === 0 && <EmptyState icon={CheckCircle} message="No tasks due today" />}
            {todayTasks.map(t => (
              <div key={t.id} className="px-4 py-3 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.priority === "High" ? "bg-red-400" : t.priority === "Medium" ? "bg-amber-400" : "bg-gray-300"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 truncate">{t.title}</p>
                  <p className="text-xs text-gray-400">{t.assigned_to || "Unassigned"}</p>
                </div>
                <Badge label={t.priority} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ContactsPage ─────────────────────────────────────────────────────────────
export function ContactsPage({ contacts, setContacts, companies, notes, setNotes, deals, activities }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const blank = { name: "", email: "", phone: "", company: "", title: "", status: "Lead", owner: "", tags: "" };
  const [form, setForm] = useState(blank);
  const [noteText, setNoteText] = useState("");

  const filtered = (contacts || []).filter(c =>
    !q || [c.name, c.email, c.company, c.title].some(v => (v || "").toLowerCase().includes(q.toLowerCase()))
  );

  const save = () => {
    if (!form.name || !form.email) return;
    const obj = { ...form, tags: form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : [] };
    if (editId) {
      setContacts(p => p.map(c => c.id === editId ? { ...c, ...obj } : c));
      if (sel?.id === editId) setSel(c => ({ ...c, ...obj }));
      setEditId(null);
    } else {
      const nc = { ...obj, id: Date.now() };
      setContacts(p => [...p, nc]);
    }
    setForm(blank); setShowAdd(false);
  };

  const del = (id, e) => {
    e.stopPropagation();
    if (confirm("Delete this contact?")) { setContacts(p => p.filter(c => c.id !== id)); if (sel?.id === id) setSel(null); }
  };

  const addNote = () => {
    if (!noteText.trim() || !sel) return;
    const n = { id: Date.now(), contactId: sel.id, text: noteText, date: today() };
    setNotes(p => [...(p || []), n]);
    setNoteText("");
  };

  const statusColors = { Active: "bg-emerald-100 text-emerald-700", Lead: "bg-blue-100 text-blue-700", Inactive: "bg-gray-100 text-gray-500" };

  return (
    <div className="p-6 flex gap-4 h-full">
      <div className={`${sel ? "hidden lg:flex" : "flex"} flex-col flex-1 min-w-0`}>
        <div className="flex items-center justify-between mb-5">
          <div><h1 className="text-xl font-bold text-gray-900">Contacts</h1><p className="text-sm text-gray-400">{filtered.length} contacts</p></div>
          <Btn onClick={() => { setForm(blank); setEditId(null); setShowAdd(true); }}><Plus size={14} />Add Contact</Btn>
        </div>
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search contacts…" className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
          <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-400">
            <div className="col-span-3">Name</div><div className="col-span-2">Company</div><div className="col-span-2">Title</div><div className="col-span-2">Status</div><div className="col-span-3">Email</div>
          </div>
          <div className="divide-y divide-gray-50 overflow-y-auto" style={{ maxHeight: "calc(100vh - 260px)" }}>
            {filtered.length === 0 && <EmptyState icon={Users} message="No contacts found" />}
            {filtered.map(c => (
              <div key={c.id} onClick={() => setSel(c)} className={`grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-gray-50 cursor-pointer transition-colors ${sel?.id === c.id ? "bg-indigo-50" : ""}`}>
                <div className="col-span-3 flex items-center gap-2 min-w-0"><Av name={c.name} sm /><span className="text-sm font-medium text-gray-900 truncate">{c.name}</span></div>
                <div className="col-span-2 text-xs text-gray-500 truncate">{c.company || "—"}</div>
                <div className="col-span-2 text-xs text-gray-500 truncate">{c.title || "—"}</div>
                <div className="col-span-2"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[c.status] || "bg-gray-100 text-gray-500"}`}>{c.status}</span></div>
                <div className="col-span-2 text-xs text-gray-400 truncate">{c.email}</div>
                <div className="col-span-1 flex items-center gap-1 justify-end" onClick={e => e.stopPropagation()}>
                  <button onClick={e => { e.stopPropagation(); setForm({ ...c, tags: (c.tags || []).join(", ") }); setEditId(c.id); setShowAdd(true); }} className="p-1 text-gray-400 hover:text-indigo-600"><Edit2 size={12} /></button>
                  <button onClick={e => del(c.id, e)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {sel && (
        <div className="w-full lg:w-96 flex-shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col" style={{ maxHeight: "calc(100vh - 80px)" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Av name={sel.name} />
              <div><p className="font-semibold text-gray-900 text-sm">{sel.name}</p><p className="text-xs text-gray-400">{sel.title}{sel.title && sel.company ? " · " : ""}{sel.company}</p></div>
            </div>
            <button onClick={() => setSel(null)} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
          </div>
          <div className="overflow-y-auto flex-1 p-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {[["Email", sel.email], ["Phone", sel.phone || "—"], ["Company", sel.company || "—"], ["Title", sel.title || "—"], ["Status", sel.status], ["Owner", sel.owner || "—"]].map(([l, v]) => (
                <div key={l} className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-400 mb-0.5">{l}</p><p className="text-sm font-medium text-gray-800 break-all">{v}</p></div>
              ))}
            </div>
            <CommButtons email={sel.email} phone={sel.phone} />

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Timeline</p>
              <div className="space-y-2">
                {[...(deals || []).filter(d => d.contact === sel.name || d.contactId === sel.id).map(d => ({ type: "deal", date: d.close_date || d.closeDate || "", text: `Deal: ${d.title || d.name} — ${fmt(d.deal_value || d.value)}`, stage: d.stage })),
                  ...(activities || []).filter(a => a.contact === sel.name || a.contactId === sel.id).map(a => ({ type: "activity", date: a.date, text: `${a.type}: ${a.notes || a.outcome || ""}` })),
                  ...(notes || []).filter(n => n.contactId === sel.id).map(n => ({ type: "note", date: n.date, text: n.text }))
                ].sort((a, b) => new Date(b.date) - new Date(a.date)).map((item, i) => (
                  <div key={i} className="flex gap-2 text-xs">
                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${item.type === "deal" ? "bg-indigo-400" : item.type === "activity" ? "bg-emerald-400" : "bg-gray-300"}`} />
                    <div><p className="text-gray-700">{item.text}</p><p className="text-gray-400">{item.date}</p></div>
                  </div>
                ))}
                {!(deals || []).some(d => d.contact === sel.name) && !(activities || []).some(a => a.contact === sel.name) && !(notes || []).some(n => n.contactId === sel.id) && <p className="text-xs text-gray-400">No timeline entries yet.</p>}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Add Note</p>
              <div className="flex gap-2">
                <input value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Write a note…" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" onKeyDown={e => e.key === "Enter" && addNote()} />
                <Btn sm onClick={addNote}><Send size={12} /></Btn>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <Modal title={editId ? "Edit Contact" : "Add Contact"} onClose={() => { setShowAdd(false); setEditId(null); }}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Full Name*" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Jane Smith" />
              <Inp label="Email*" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="jane@co.com" />
              <Inp label="Phone" value={form.phone || ""} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+44 7700 900000" />
              <Inp label="Company" value={form.company || ""} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Acme Ltd" />
              <Inp label="Job Title" value={form.title || ""} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="CEO" />
              <Sel label="Status" opts={["Lead", "Active", "Inactive"]} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} />
            </div>
            <Inp label="Owner" value={form.owner || ""} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} placeholder="Sales rep name" />
            <Inp label="Tags (comma separated)" value={typeof form.tags === "string" ? form.tags : (form.tags || []).join(", ")} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
            <div className="flex gap-2 pt-1"><Btn onClick={save}>{editId ? "Save Changes" : "Add Contact"}</Btn><Btn variant="outline" onClick={() => { setShowAdd(false); setEditId(null); }}>Cancel</Btn></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── CompaniesPage ────────────────────────────────────────────────────────────
export function CompaniesPage({ companies, setCompanies, contacts }) {
  const [q, setQ] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const blank = { name: "", industry: "", website: "", employees: "", revenue: "", status: "Active" };
  const [form, setForm] = useState(blank);

  const filtered = (companies || []).filter(c =>
    !q || [c.name, c.industry, c.website].some(v => (v || "").toLowerCase().includes(q.toLowerCase()))
  );

  const save = () => {
    if (!form.name) return;
    if (editId) {
      setCompanies(p => p.map(c => c.id === editId ? { ...c, ...form } : c));
      setEditId(null);
    } else {
      setCompanies(p => [...p, { ...form, id: Date.now() }]);
    }
    setForm(blank); setShowAdd(false);
  };

  const del = id => { if (confirm("Delete this company?")) setCompanies(p => p.filter(c => c.id !== id)); };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-gray-900">Companies</h1><p className="text-sm text-gray-400">{filtered.length} companies</p></div>
        <Btn onClick={() => { setForm(blank); setEditId(null); setShowAdd(true); }}><Plus size={14} />Add Company</Btn>
      </div>
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search companies…" className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-400">
          <div className="col-span-3">Name</div><div className="col-span-2">Industry</div><div className="col-span-1">Employees</div><div className="col-span-2">Revenue</div><div className="col-span-2">Status</div><div className="col-span-2">Website</div>
        </div>
        <div className="divide-y divide-gray-50">
          {filtered.length === 0 && <EmptyState icon={Building2} message="No companies found" />}
          {filtered.map(c => (
            <div key={c.id} className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-3 flex items-center gap-2">
                <div className="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0"><Building2 size={13} className="text-indigo-600" /></div>
                <span className="text-sm font-medium text-gray-900 truncate">{c.name}</span>
              </div>
              <div className="col-span-2 text-xs text-gray-500">{c.industry || "—"}</div>
              <div className="col-span-1 text-xs text-gray-500">{c.employees || "—"}</div>
              <div className="col-span-2 text-xs text-gray-500">{c.revenue || "—"}</div>
              <div className="col-span-2"><Badge label={c.status || "Active"} /></div>
              <div className="col-span-1 text-xs text-indigo-500 truncate">
                {c.website ? <a href={c.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline" onClick={e => e.stopPropagation()}><Globe size={11} />{c.website.replace(/https?:\/\//, "")}</a> : "—"}
              </div>
              <div className="col-span-1 flex items-center gap-1 justify-end">
                <button onClick={() => { setForm({ name: c.name, industry: c.industry || "", website: c.website || "", employees: c.employees || "", revenue: c.revenue || "", status: c.status || "Active" }); setEditId(c.id); setShowAdd(true); }} className="p-1 text-gray-400 hover:text-indigo-600"><Edit2 size={12} /></button>
                <button onClick={() => del(c.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAdd && (
        <Modal title={editId ? "Edit Company" : "Add Company"} onClose={() => { setShowAdd(false); setEditId(null); }}>
          <div className="space-y-3">
            <Inp label="Company Name*" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Acme Ltd" />
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Industry" value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))} placeholder="SaaS, Fintech…" />
              <Sel label="Status" opts={["Active", "Inactive", "Lead"]} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} />
              <Inp label="Employees" value={form.employees} onChange={e => setForm(f => ({ ...f, employees: e.target.value }))} placeholder="50–200" />
              <Inp label="Revenue" value={form.revenue} onChange={e => setForm(f => ({ ...f, revenue: e.target.value }))} placeholder="£5M ARR" />
            </div>
            <Inp label="Website" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://…" />
            <div className="flex gap-2 pt-1"><Btn onClick={save}>{editId ? "Save Changes" : "Add Company"}</Btn><Btn variant="outline" onClick={() => { setShowAdd(false); setEditId(null); }}>Cancel</Btn></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── PipelinePage (Kanban) ────────────────────────────────────────────────────
export function PipelinePage({ deals, setDeals, contacts, companies, users }) {
  const [drag, setDrag] = useState(null);
  const [showAdd, setShowAdd] = useState(null); // stage name
  const blank = { title: "", contact: "", company: "", stage: "Lead", deal_value: "", probability: 50, owner: "", close_date: "", notes: "" };
  const [form, setForm] = useState(blank);

  const drop = stage => {
    if (drag !== null) {
      setDeals(p => p.map(d => d.id === drag ? { ...d, stage } : d));
      setDrag(null);
    }
  };

  const addDeal = () => {
    if (!form.title) return;
    setDeals(p => [...p, { ...form, id: Date.now(), deal_value: Number(form.deal_value) || 0, stage: showAdd }]);
    setForm(blank); setShowAdd(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-gray-900">Pipeline</h1><p className="text-sm text-gray-400">{(deals || []).length} deals</p></div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {STAGES.map(stage => {
          const stageDeals = (deals || []).filter(d => d.stage === stage);
          const stageVal = stageDeals.reduce((a, b) => a + (b.deal_value || b.value || 0), 0);
          const colBg = stage === "Closed Won" ? "bg-emerald-50/60" : stage === "Closed Lost" ? "bg-red-50/60" : "bg-gray-50";
          const colBorder = stage === "Closed Won" ? "border-emerald-200" : stage === "Closed Lost" ? "border-red-200" : "border-gray-200";
          return (
            <div key={stage} className={`flex-shrink-0 w-64 rounded-2xl border ${colBorder} ${colBg} p-3`}
              onDragOver={e => e.preventDefault()} onDrop={() => drop(stage)}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: SC[stage] }} />
                  <span className="text-xs font-semibold text-gray-700">{stage}</span>
                  <span className="bg-white text-gray-500 text-xs px-1.5 py-0.5 rounded-full border border-gray-200">{stageDeals.length}</span>
                </div>
                <span className="text-xs text-gray-500 font-medium">{fmt(stageVal)}</span>
              </div>
              <div className="space-y-2 min-h-12">
                {stageDeals.map(d => (
                  <div key={d.id} draggable onDragStart={() => setDrag(d.id)} onDragEnd={() => setDrag(null)}
                    className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all hover:border-indigo-200">
                    <p className="text-xs font-semibold text-gray-800 leading-snug mb-1">{d.title || d.name}</p>
                    <p className="text-xs text-gray-400 mb-2">{d.contact || "—"}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">{fmt(d.deal_value || d.value)}</span>
                      <span className="text-xs text-gray-400">{d.probability != null ? `${d.probability}%` : ""}</span>
                    </div>
                    {d.close_date && <p className="text-xs text-gray-300 mt-1">{d.close_date}</p>}
                  </div>
                ))}
              </div>
              <button onClick={() => { setForm({ ...blank, stage }); setShowAdd(stage); }}
                className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 text-xs text-gray-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors border border-dashed border-gray-200 hover:border-indigo-300">
                <Plus size={12} />Add Deal
              </button>
            </div>
          );
        })}
      </div>

      {showAdd && (
        <Modal title={`Add Deal — ${showAdd}`} onClose={() => setShowAdd(null)}>
          <div className="space-y-3">
            <Inp label="Deal Title*" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Enterprise Package" />
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Contact" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="Contact name" />
              <Inp label="Company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Company name" />
              <Inp label="Value (£)" type="number" value={form.deal_value} onChange={e => setForm(f => ({ ...f, deal_value: e.target.value }))} placeholder="50000" />
              <Inp label="Probability %" type="number" value={form.probability} onChange={e => setForm(f => ({ ...f, probability: e.target.value }))} placeholder="75" />
              <Inp label="Close Date" type="date" value={form.close_date} onChange={e => setForm(f => ({ ...f, close_date: e.target.value }))} />
              <Inp label="Owner" value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} placeholder="Sales rep" />
            </div>
            <Inp label="Notes" textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Deal notes…" />
            <div className="flex gap-2 pt-1"><Btn onClick={addDeal}>Add Deal</Btn><Btn variant="outline" onClick={() => setShowAdd(null)}>Cancel</Btn></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── ActivitiesPage ───────────────────────────────────────────────────────────
export function ActivitiesPage({ activities, setActivities, contacts, companies, users, currentUser }) {
  const [filter, setFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const blank = { type: "Call", contact: "", company: "", date: today(), time: "", duration: "", outcome: "", notes: "", owner: currentUser?.name || "" };
  const [form, setForm] = useState(blank);

  const todayStr = today();
  const weekEnd = new Date(); weekEnd.setDate(weekEnd.getDate() + 7);

  const filtered = (activities || []).filter(a => {
    if (filter === "Mine") return a.owner === currentUser?.name;
    if (filter === "Today") return a.date === todayStr;
    if (filter === "This Week") return a.date >= todayStr && a.date <= weekEnd.toISOString().split("T")[0];
    return true;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const typeIcon = { Call: Phone, Email: Mail, Meeting: Calendar, Note: FileText, Task: CheckCircle };

  const save = () => {
    if (!form.type) return;
    if (editId) {
      setActivities(p => p.map(a => a.id === editId ? { ...a, ...form } : a));
      setEditId(null);
    } else {
      setActivities(p => [...p, { ...form, id: Date.now() }]);
    }
    setForm(blank); setShowAdd(false);
  };

  const del = id => { if (confirm("Delete this activity?")) setActivities(p => p.filter(a => a.id !== id)); };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-gray-900">Activities</h1><p className="text-sm text-gray-400">{filtered.length} shown</p></div>
        <Btn onClick={() => { setForm(blank); setEditId(null); setShowAdd(true); }}><Plus size={14} />Add Activity</Btn>
      </div>
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-4 w-fit">
        {["All", "Mine", "Today", "This Week"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>{f}</button>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {filtered.length === 0 && <EmptyState icon={Activity} message="No activities found" />}
        {filtered.map(a => {
          const Icon = typeIcon[a.type] || Activity;
          return (
            <div key={a.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"><Icon size={14} className="text-indigo-600" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge label={a.type} />
                  <span className="text-sm font-medium text-gray-800">{a.contact || "—"}</span>
                  {a.company && <span className="text-xs text-gray-400">· {a.company}</span>}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{a.notes || a.outcome || "No notes"}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span>{a.date}{a.time ? ` ${a.time}` : ""}</span>
                  {a.duration && <span>{a.duration}</span>}
                  {a.owner && <span>· {a.owner}</span>}
                  {a.outcome && <span className="text-emerald-500">· {a.outcome}</span>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => { setForm({ type: a.type, contact: a.contact || "", company: a.company || "", date: a.date, time: a.time || "", duration: a.duration || "", outcome: a.outcome || "", notes: a.notes || "", owner: a.owner || "" }); setEditId(a.id); setShowAdd(true); }} className="p-1 text-gray-400 hover:text-indigo-600"><Edit2 size={12} /></button>
                <button onClick={() => del(a.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && (
        <Modal title={editId ? "Edit Activity" : "Add Activity"} onClose={() => { setShowAdd(false); setEditId(null); }}>
          <div className="space-y-3">
            <Sel label="Type" opts={["Call", "Email", "Meeting", "Note", "Task"]} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} />
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Contact" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="Contact name" />
              <Inp label="Company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Company name" />
              <Inp label="Date" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              <Inp label="Time" type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
              <Inp label="Duration" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="30 mins" />
              <Inp label="Outcome" value={form.outcome} onChange={e => setForm(f => ({ ...f, outcome: e.target.value }))} placeholder="Positive, Follow-up…" />
            </div>
            <Inp label="Owner" value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} placeholder="Assigned to" />
            <Inp label="Notes" textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Activity notes…" />
            <div className="flex gap-2 pt-1"><Btn onClick={save}>{editId ? "Save Changes" : "Add Activity"}</Btn><Btn variant="outline" onClick={() => { setShowAdd(false); setEditId(null); }}>Cancel</Btn></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── ProposalsPage ────────────────────────────────────────────────────────────
export function ProposalsPage({ proposals, setProposals, contacts, companies }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sel, setSel] = useState(null);
  const blankLine = { description: "", qty: 1, unit_price: "" };
  const blank = { number: "", contact: "", company: "", status: "Draft", date: today(), expiry: "", vat: false, notes: "", lines: [{ ...blankLine }] };
  const [form, setForm] = useState(blank);

  const lineTotal = lines => (lines || []).reduce((a, l) => a + (Number(l.qty) || 1) * (Number(l.unit_price) || 0), 0);
  const withVat = (lines, vat) => { const sub = lineTotal(lines); return vat ? sub * 1.2 : sub; };

  const save = () => {
    if (!form.number || !form.contact) return;
    const obj = { ...form, total: withVat(form.lines, form.vat) };
    if (editId) {
      setProposals(p => p.map(x => x.id === editId ? { ...x, ...obj } : x));
      setEditId(null);
    } else {
      setProposals(p => [...p, { ...obj, id: Date.now() }]);
    }
    setForm(blank); setShowAdd(false);
  };

  const del = id => { if (confirm("Delete proposal?")) setProposals(p => p.filter(x => x.id !== id)); };

  const updateLine = (i, field, val) => setForm(f => ({ ...f, lines: f.lines.map((l, j) => j === i ? { ...l, [field]: val } : l) }));

  const statusColors = { Draft: "bg-gray-100 text-gray-500", Sent: "bg-blue-100 text-blue-700", Accepted: "bg-emerald-100 text-emerald-700", Rejected: "bg-red-100 text-red-600" };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-gray-900">Proposals</h1><p className="text-sm text-gray-400">{(proposals || []).length} proposals</p></div>
        <Btn onClick={() => { setForm(blank); setEditId(null); setShowAdd(true); }}><Plus size={14} />New Proposal</Btn>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-400">
          <div className="col-span-2">Number</div><div className="col-span-3">Contact</div><div className="col-span-2">Company</div><div className="col-span-2">Status</div><div className="col-span-1">Date</div><div className="col-span-2">Total</div>
        </div>
        <div className="divide-y divide-gray-50">
          {(proposals || []).length === 0 && <EmptyState icon={FileText} message="No proposals yet" />}
          {(proposals || []).map(p => (
            <div key={p.id} onClick={() => setSel(p)} className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="col-span-2 text-sm font-medium text-indigo-600">{p.number}</div>
              <div className="col-span-3 text-sm text-gray-800 truncate">{p.contact}</div>
              <div className="col-span-2 text-xs text-gray-500 truncate">{p.company || "—"}</div>
              <div className="col-span-2"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[p.status] || "bg-gray-100 text-gray-500"}`}>{p.status}</span></div>
              <div className="col-span-1 text-xs text-gray-400">{p.date}</div>
              <div className="col-span-1 text-sm font-semibold text-gray-900">{fmt(p.total || lineTotal(p.lines))}</div>
              <div className="col-span-1 flex items-center gap-1 justify-end" onClick={e => e.stopPropagation()}>
                <button onClick={e => { e.stopPropagation(); setForm({ number: p.number, contact: p.contact, company: p.company || "", status: p.status, date: p.date, expiry: p.expiry || "", vat: p.vat || false, notes: p.notes || "", lines: p.lines?.length ? p.lines : [{ ...blankLine }] }); setEditId(p.id); setShowAdd(true); }} className="p-1 text-gray-400 hover:text-indigo-600"><Edit2 size={12} /></button>
                <button onClick={e => { e.stopPropagation(); del(p.id); }} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAdd && (
        <Modal title={editId ? "Edit Proposal" : "New Proposal"} wide onClose={() => { setShowAdd(false); setEditId(null); }}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Proposal Number*" value={form.number} onChange={e => setForm(f => ({ ...f, number: e.target.value }))} placeholder="PROP-001" />
              <Sel label="Status" opts={["Draft", "Sent", "Accepted", "Rejected"]} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} />
              <Inp label="Contact*" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="Contact name" />
              <Inp label="Company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Company name" />
              <Inp label="Date" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              <Inp label="Expiry Date" type="date" value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Line Items</p>
              {form.lines.map((l, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 mb-2 items-center">
                  <div className="col-span-6"><input value={l.description} onChange={e => updateLine(i, "description", e.target.value)} placeholder="Description" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" /></div>
                  <div className="col-span-2"><input value={l.qty} onChange={e => updateLine(i, "qty", e.target.value)} type="number" placeholder="Qty" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" /></div>
                  <div className="col-span-3"><input value={l.unit_price} onChange={e => updateLine(i, "unit_price", e.target.value)} type="number" placeholder="Unit price" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" /></div>
                  <div className="col-span-1 text-right">
                    {form.lines.length > 1 && <button onClick={() => setForm(f => ({ ...f, lines: f.lines.filter((_, j) => j !== i) }))} className="text-gray-400 hover:text-red-500"><X size={14} /></button>}
                  </div>
                </div>
              ))}
              <button onClick={() => setForm(f => ({ ...f, lines: [...f.lines, { ...blankLine }] }))} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">+ Add line</button>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.vat} onChange={e => setForm(f => ({ ...f, vat: e.target.checked }))} className="rounded" />
                <span className="text-sm text-gray-700">Apply VAT (20%)</span>
              </label>
              <div className="ml-auto text-right">
                <p className="text-xs text-gray-400">Subtotal: {fmt(lineTotal(form.lines))}</p>
                <p className="text-sm font-bold text-gray-900">Total: {fmt(withVat(form.lines, form.vat))}</p>
              </div>
            </div>
            <Inp label="Notes" textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Proposal notes…" />
            <div className="flex gap-2 pt-1"><Btn onClick={save}>{editId ? "Save Changes" : "Create Proposal"}</Btn><Btn variant="outline" onClick={() => { setShowAdd(false); setEditId(null); }}>Cancel</Btn></div>
          </div>
        </Modal>
      )}

      {sel && (
        <Modal title={`Proposal ${sel.number}`} wide onClose={() => setSel(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[sel.status] || "bg-gray-100 text-gray-500"}`}>{sel.status}</span>
              <span className="text-2xl font-bold text-gray-900">{fmt(sel.total || lineTotal(sel.lines))}</span>
              {sel.vat && <span className="text-xs text-gray-400">inc. VAT</span>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["Contact", sel.contact], ["Company", sel.company || "—"], ["Date", sel.date], ["Expiry", sel.expiry || "—"]].map(([l, v]) => (
                <div key={l} className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-400">{l}</p><p className="text-sm font-medium text-gray-800">{v}</p></div>
              ))}
            </div>
            {sel.lines?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Line Items</p>
                <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50">
                  {sel.lines.map((l, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2">
                      <p className="text-sm text-gray-700">{l.description || "Item"}</p>
                      <p className="text-sm font-medium text-gray-900">{l.qty}x {fmt(l.unit_price)} = {fmt((Number(l.qty) || 1) * (Number(l.unit_price) || 0))}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {sel.notes && <div className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-400 mb-1">Notes</p><p className="text-sm text-gray-700">{sel.notes}</p></div>}
            <div className="flex gap-2">
              <Btn variant="green" onClick={() => { setProposals(p => p.map(x => x.id === sel.id ? { ...x, status: "Accepted" } : x)); setSel(s => ({ ...s, status: "Accepted" })); }}>Mark Accepted</Btn>
              <Btn variant="danger" onClick={() => { setProposals(p => p.map(x => x.id === sel.id ? { ...x, status: "Rejected" } : x)); setSel(s => ({ ...s, status: "Rejected" })); }}>Mark Rejected</Btn>
              <Btn variant="outline" onClick={() => setSel(null)}>Close</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── InvoicesPage ─────────────────────────────────────────────────────────────
export function InvoicesPage({ invoices, setInvoices, contacts, companies }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sel, setSel] = useState(null);
  const blankLine = { description: "", qty: 1, unit_price: "" };
  const blank = { number: "", contact: "", company: "", status: "Draft", amount: "", due_date: "", is_recurring: false, recurring_interval: "Monthly", line_items: [{ ...blankLine }] };
  const [form, setForm] = useState(blank);

  const todayStr = today();
  const lineTotal = lines => (lines || []).reduce((a, l) => a + (Number(l.qty) || 1) * (Number(l.unit_price) || 0), 0);

  const enriched = (invoices || []).map(inv => ({
    ...inv,
    _overdue: inv.status !== "paid" && inv.status !== "Paid" && inv.due_date && inv.due_date < todayStr,
  }));

  const save = () => {
    if (!form.number || !form.contact) return;
    const amt = lineTotal(form.line_items) || Number(form.amount) || 0;
    const obj = { ...form, amount: amt };
    if (editId) {
      setInvoices(p => p.map(x => x.id === editId ? { ...x, ...obj } : x));
      setEditId(null);
    } else {
      setInvoices(p => [...p, { ...obj, id: Date.now() }]);
    }
    setForm(blank); setShowAdd(false);
  };

  const del = id => { if (confirm("Delete invoice?")) setInvoices(p => p.filter(x => x.id !== id)); };
  const updateLine = (i, field, val) => setForm(f => ({ ...f, line_items: f.line_items.map((l, j) => j === i ? { ...l, [field]: val } : l) }));

  const statusColor = (inv) => {
    if (inv._overdue) return "bg-red-100 text-red-600";
    const s = (inv.status || "").toLowerCase();
    return { draft: "bg-gray-100 text-gray-500", sent: "bg-blue-100 text-blue-700", paid: "bg-emerald-100 text-emerald-700", overdue: "bg-red-100 text-red-600" }[s] || "bg-gray-100 text-gray-500";
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-gray-900">Invoices</h1></div>
        <Btn onClick={() => { setForm(blank); setEditId(null); setShowAdd(true); }}><Plus size={14} />New Invoice</Btn>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          ["Total Paid", fmt(enriched.filter(i => (i.status || "").toLowerCase() === "paid").reduce((a, b) => a + (b.amount || 0), 0)), "text-emerald-600", "bg-emerald-50"],
          ["Outstanding", fmt(enriched.filter(i => (i.status || "").toLowerCase() === "sent").reduce((a, b) => a + (b.amount || 0), 0)), "text-amber-600", "bg-amber-50"],
          ["Overdue", fmt(enriched.filter(i => i._overdue).reduce((a, b) => a + (b.amount || 0), 0)), "text-red-600", "bg-red-50"],
        ].map(([l, v, tc, bg]) => (
          <div key={l} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
            <div className={`${bg} p-2.5 rounded-xl`}><FileText size={16} className={tc} /></div>
            <div><p className="text-xs text-gray-400">{l}</p><p className="text-lg font-bold text-gray-900">{v}</p></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-400">
          <div className="col-span-2">Number</div><div className="col-span-3">Contact</div><div className="col-span-2">Status</div><div className="col-span-2">Amount</div><div className="col-span-2">Due Date</div><div className="col-span-1">Rec.</div>
        </div>
        <div className="divide-y divide-gray-50">
          {enriched.length === 0 && <EmptyState icon={FileText} message="No invoices yet" />}
          {enriched.map(inv => (
            <div key={inv.id} onClick={() => setSel(inv)} className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="col-span-2 text-sm font-medium text-indigo-600">{inv.number}</div>
              <div className="col-span-3 text-sm text-gray-800 truncate">{inv.contact}</div>
              <div className="col-span-2"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(inv)}`}>{inv._overdue ? "Overdue" : inv.status}</span></div>
              <div className="col-span-2 text-sm font-semibold text-gray-900">{fmt(inv.amount)}</div>
              <div className="col-span-2 text-xs text-gray-400">{inv.due_date || "—"}</div>
              <div className="col-span-1">
                {inv.is_recurring && <span className="inline-flex items-center gap-0.5 text-xs text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-full"><Repeat size={9} />{(inv.recurring_interval || "").charAt(0)}</span>}
              </div>
              <div className="flex items-center gap-1 justify-end" onClick={e => e.stopPropagation()}>
                <button onClick={e => { e.stopPropagation(); setForm({ number: inv.number, contact: inv.contact, company: inv.company || "", status: inv.status, amount: inv.amount, due_date: inv.due_date || "", is_recurring: inv.is_recurring || false, recurring_interval: inv.recurring_interval || "Monthly", line_items: inv.line_items?.length ? inv.line_items : [{ ...blankLine }] }); setEditId(inv.id); setShowAdd(true); }} className="p-1 text-gray-400 hover:text-indigo-600"><Edit2 size={12} /></button>
                <button onClick={e => { e.stopPropagation(); del(inv.id); }} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAdd && (
        <Modal title={editId ? "Edit Invoice" : "New Invoice"} wide onClose={() => { setShowAdd(false); setEditId(null); }}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Invoice Number*" value={form.number} onChange={e => setForm(f => ({ ...f, number: e.target.value }))} placeholder="INV-001" />
              <Sel label="Status" opts={["Draft", "Sent", "Paid", "Overdue"]} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} />
              <Inp label="Contact*" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="Contact name" />
              <Inp label="Company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="Company name" />
              <Inp label="Due Date" type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Line Items</p>
              {form.line_items.map((l, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 mb-2 items-center">
                  <div className="col-span-6"><input value={l.description} onChange={e => updateLine(i, "description", e.target.value)} placeholder="Description" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" /></div>
                  <div className="col-span-2"><input value={l.qty} onChange={e => updateLine(i, "qty", e.target.value)} type="number" placeholder="Qty" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" /></div>
                  <div className="col-span-3"><input value={l.unit_price} onChange={e => updateLine(i, "unit_price", e.target.value)} type="number" placeholder="Price" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" /></div>
                  <div className="col-span-1 text-right">{form.line_items.length > 1 && <button onClick={() => setForm(f => ({ ...f, line_items: f.line_items.filter((_, j) => j !== i) }))} className="text-gray-400 hover:text-red-500"><X size={14} /></button>}</div>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <button onClick={() => setForm(f => ({ ...f, line_items: [...f.line_items, { ...blankLine }] }))} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">+ Add line</button>
                <p className="text-sm font-bold text-gray-900">Total: {fmt(lineTotal(form.line_items))}</p>
              </div>
            </div>
            <div className="border border-gray-100 rounded-xl p-3">
              <label className="flex items-center gap-2 cursor-pointer mb-2">
                <input type="checkbox" checked={form.is_recurring} onChange={e => setForm(f => ({ ...f, is_recurring: e.target.checked }))} className="rounded" />
                <span className="text-sm text-gray-700">Recurring Invoice</span>
                <Repeat size={14} className="text-purple-500" />
              </label>
              {form.is_recurring && (
                <Sel label="Interval" opts={["Weekly", "Monthly", "Quarterly", "Annually"]} value={form.recurring_interval} onChange={e => setForm(f => ({ ...f, recurring_interval: e.target.value }))} />
              )}
            </div>
            <div className="flex gap-2 pt-1"><Btn onClick={save}>{editId ? "Save Changes" : "Create Invoice"}</Btn><Btn variant="outline" onClick={() => { setShowAdd(false); setEditId(null); }}>Cancel</Btn></div>
          </div>
        </Modal>
      )}

      {sel && (
        <Modal title={`Invoice ${sel.number}`} wide onClose={() => setSel(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(sel)}`}>{sel._overdue ? "Overdue" : sel.status}</span>
              <span className="text-2xl font-bold text-gray-900">{fmt(sel.amount)}</span>
              {sel.is_recurring && <span className="inline-flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full"><Repeat size={11} />{sel.recurring_interval}</span>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[["Contact", sel.contact], ["Company", sel.company || "—"], ["Due Date", sel.due_date || "—"], ["Status", sel._overdue ? "Overdue" : sel.status]].map(([l, v]) => (
                <div key={l} className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-400">{l}</p><p className="text-sm font-medium text-gray-800">{v}</p></div>
              ))}
            </div>
            {sel.line_items?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Line Items</p>
                <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50">
                  {sel.line_items.map((l, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2">
                      <p className="text-sm text-gray-700">{l.description || "Item"}</p>
                      <p className="text-sm font-medium text-gray-900">{l.qty}x {fmt(l.unit_price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2">
              {(sel.status || "").toLowerCase() !== "paid" && <Btn variant="green" onClick={() => { setInvoices(p => p.map(x => x.id === sel.id ? { ...x, status: "Paid" } : x)); setSel(s => ({ ...s, status: "Paid", _overdue: false })); }}>Mark Paid</Btn>}
              <Btn variant="outline" onClick={() => setSel(null)}>Close</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── CampaignsPage ────────────────────────────────────────────────────────────
export function CampaignsPage({ campaigns, setCampaigns, contacts }) {
  const [showAdd, setShowAdd] = useState(false);
  const blank = { name: "", status: "Draft", subject: "", date: today(), segment: "All", sent: 0, opened: 0, clicked: 0 };
  const [form, setForm] = useState(blank);

  const save = () => {
    if (!form.name) return;
    setCampaigns(p => [...p, { ...form, id: Date.now() }]);
    setForm(blank); setShowAdd(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-gray-900">Campaigns</h1><p className="text-sm text-gray-400">{(campaigns || []).length} campaigns</p></div>
        <Btn onClick={() => setShowAdd(true)}><Plus size={14} />New Campaign</Btn>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(campaigns || []).map(c => {
          const openRate = c.sent ? Math.round((c.opened / c.sent) * 100) : 0;
          const clickRate = c.sent ? Math.round((c.clicked / c.sent) * 100) : 0;
          return (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-2"><p className="font-semibold text-gray-900 text-sm">{c.name}</p><Badge label={c.status} /></div>
              <p className="text-xs text-gray-400 mb-3">{c.subject || "No subject"} · {c.segment}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[["Sent", c.sent || 0], ["Open %", `${openRate}%`], ["Click %", `${clickRate}%`]].map(([l, v]) => (
                  <div key={l} className="bg-gray-50 rounded-lg py-2"><p className="text-xs text-gray-400">{l}</p><p className="text-sm font-bold text-gray-800">{v}</p></div>
                ))}
              </div>
            </div>
          );
        })}
        {(campaigns || []).length === 0 && <EmptyState icon={Mail} message="No campaigns yet" />}
      </div>
      {showAdd && (
        <Modal title="New Campaign" onClose={() => setShowAdd(false)}>
          <div className="space-y-3">
            <Inp label="Campaign Name*" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Q2 Outreach" />
            <Sel label="Status" opts={["Draft", "Scheduled", "Active", "Sent"]} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} />
            <Inp label="Subject Line" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Email subject…" />
            <Inp label="Send Date" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            <Sel label="Segment" opts={["All", "Active", "Lead", "Inactive"]} value={form.segment} onChange={e => setForm(f => ({ ...f, segment: e.target.value }))} />
            <div className="flex gap-2 pt-1"><Btn onClick={save}>Create Campaign</Btn><Btn variant="outline" onClick={() => setShowAdd(false)}>Cancel</Btn></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── ImportPage ───────────────────────────────────────────────────────────────
export function ImportPage({ contacts, setContacts, companies, setCompanies }) {
  const [tab, setTab] = useState("contacts");
  const [dragging, setDragging] = useState(false);
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState({});
  const [imported, setImported] = useState(null);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const contactFields = ["name", "email", "phone", "company", "title", "status"];
  const companyFields = ["name", "industry", "website", "employees", "revenue"];
  const fields = tab === "contacts" ? contactFields : companyFields;

  const parseCSV = text => {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) { setError("File must have a header row and at least one data row."); return; }
    const hdrs = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
    const data = lines.slice(1).map(line => {
      const vals = line.split(",").map(v => v.trim().replace(/^"|"$/g, ""));
      const obj = {};
      hdrs.forEach((h, i) => { obj[h] = vals[i] || ""; });
      return obj;
    }).filter(r => Object.values(r).some(v => v));
    setHeaders(hdrs);
    setRows(data);
    const autoMap = {};
    fields.forEach(f => {
      const match = hdrs.find(h => h.toLowerCase().replace(/\s+/g, "") === f.toLowerCase() || h.toLowerCase().includes(f.toLowerCase()));
      if (match) autoMap[f] = match;
    });
    setMapping(autoMap);
    setImported(null);
    setError("");
  };

  const handleFile = file => {
    if (!file) return;
    if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      setError("Excel files not supported. Please export as CSV and re-upload."); return;
    }
    if (!file.name.endsWith(".csv")) { setError("Please upload a .csv file."); return; }
    const reader = new FileReader();
    reader.onload = e => parseCSV(e.target.result);
    reader.readAsText(file);
  };

  const doImport = () => {
    const mapped = rows.map(row => {
      const obj = {};
      fields.forEach(f => { if (mapping[f]) obj[f] = row[mapping[f]] || ""; });
      return { ...obj, id: Date.now() + Math.random() };
    }).filter(r => r.name);
    if (tab === "contacts") setContacts(p => [...p, ...mapped]);
    else setCompanies(p => [...p, ...mapped]);
    setImported(mapped.length);
    setRows([]); setHeaders([]); setMapping({});
  };

  const reset = () => { setRows([]); setHeaders([]); setMapping({}); setImported(null); setError(""); };

  return (
    <div className="p-6">
      <div className="mb-5"><h1 className="text-xl font-bold text-gray-900">Import Data</h1><p className="text-sm text-gray-400">Upload a CSV to import contacts or companies</p></div>
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5 w-fit">
        {["contacts", "companies"].map(t => (
          <button key={t} onClick={() => { setTab(t); reset(); }} className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${tab === t ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>{t === "contacts" ? "Import Contacts" : "Import Companies"}</button>
        ))}
      </div>

      {imported !== null ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
          <CheckCircle size={40} className="text-emerald-500 mx-auto mb-3" />
          <p className="text-lg font-bold text-emerald-800">Import Complete!</p>
          <p className="text-sm text-emerald-600 mt-1">{imported} {tab} imported successfully.</p>
          <button onClick={reset} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700">Import More</button>
        </div>
      ) : rows.length === 0 ? (
        <div
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer ${dragging ? "border-indigo-400 bg-indigo-50" : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => fileRef.current?.click()}
        >
          <Upload size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-600 mb-1">Drag & drop a CSV file here, or click to browse</p>
          <p className="text-xs text-gray-400">Accepts .csv files · Excel: export as CSV first</p>
          {error && <p className="mt-3 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg inline-block">{error}</p>}
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={e => handleFile(e.target.files[0])} />
        </div>
      ) : (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Map Columns ({rows.length} rows detected)</p>
            <div className="grid grid-cols-2 gap-3">
              {fields.map(f => (
                <div key={f}>
                  <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">{f} {f === "name" ? "*" : ""}</label>
                  <select value={mapping[f] || ""} onChange={e => setMapping(m => ({ ...m, [f]: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
                    <option value="">— skip —</option>
                    {headers.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <p className="px-4 py-3 text-xs font-semibold text-gray-500 border-b border-gray-100">Preview (first 5 rows)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="bg-gray-50">{headers.map(h => <th key={h} className="px-3 py-2 text-left text-gray-400 font-medium">{h}</th>)}</tr></thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.slice(0, 5).map((row, i) => (
                    <tr key={i}>{headers.map(h => <td key={h} className="px-3 py-2 text-gray-700">{row[h]}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-3">
            <Btn onClick={doImport} disabled={!mapping.name}><Download size={14} />Import {rows.length} {tab}</Btn>
            <Btn variant="outline" onClick={reset}>Cancel</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AIAssistant ──────────────────────────────────────────────────────────────
export function AIAssistant({ currentUser }) {
  const [messages, setMessages] = useState([{ role: "assistant", text: "Hi! I'm your NexusCRM AI assistant. Ask me to draft emails, coach deals, write proposals, or anything else." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    const prompt = input.trim();
    if (!prompt || loading) return;
    setInput("");
    setMessages(m => [...m, { role: "user", text: prompt }]);
    setLoading(true);
    try {
      const r = await fetch("/api/ai.php", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
      const d = await r.json();
      setMessages(m => [...m, { role: "assistant", text: d.text || d.response || d.error || "No response received." }]);
    } catch (e) {
      setMessages(m => [...m, { role: "assistant", text: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full" style={{ height: "calc(100vh - 64px)" }}>
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
        <Sparkles size={18} className="text-indigo-600" />
        <h1 className="text-lg font-bold text-gray-900">AI Assistant</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"><Sparkles size={13} className="text-white" /></div>}
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "bg-indigo-600 text-white rounded-br-sm" : "bg-white border border-gray-100 text-gray-800 shadow-sm rounded-bl-sm"}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mr-2"><Sparkles size={13} className="text-white" /></div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center"><span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} /><span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} /><span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} /></div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="px-6 py-4 border-t border-gray-100 bg-white">
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()} placeholder="Ask anything — draft an email, coach a deal, write a proposal…" className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          <button onClick={send} disabled={!input.trim() || loading} className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-40 flex items-center gap-1.5 text-sm font-medium"><Send size={14} />Send</button>
        </div>
      </div>
    </div>
  );
}

// ─── SettingsPage ─────────────────────────────────────────────────────────────
export function SettingsPage({ user, users, setUsers, deals, onLogout, onUpdateProfile }) {
  const [tab, setTab] = useState("profile");
  const [profile, setProfile] = useState({ name: user?.name || "", email: user?.email || "", password: "" });
  const [saved, setSaved] = useState(false);
  const blankUser = { name: "", email: "", password: "", role: "sales", commissionRate: 10 };
  const [newUser, setNewUser] = useState(blankUser);
  const [addingUser, setAddingUser] = useState(false);

  const saveProfile = async () => {
    if (onUpdateProfile) onUpdateProfile(profile);
    try {
      await fetch(`/api/users.php?id=${user?.id}`, { method: "PUT", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(profile) });
    } catch (e) { }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addUser = async () => {
    if (!newUser.name || !newUser.email) return;
    const u = { ...newUser, id: Date.now() };
    try {
      const r = await fetch("/api/users.php", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(u) });
      const created = await r.json();
      setUsers(p => [...p, created.id ? created : u]);
    } catch (e) { setUsers(p => [...p, u]); }
    setNewUser(blankUser); setAddingUser(false);
  };

  const deleteUser = async id => {
    if (!confirm("Delete this user?")) return;
    try { await fetch(`/api/users.php?id=${id}`, { method: "DELETE", credentials: "include" }); } catch (e) { }
    setUsers(p => p.filter(u => u.id !== id));
  };

  const salesUsers = (users || []).filter(u => u.role === "sales");
  const commissionRows = salesUsers.map(u => ({
    ...u,
    earned: (deals || []).filter(d => d.stage === "Closed Won" && d.owner === u.name).reduce((a, b) => a + (b.deal_value || b.value || 0) * (u.commissionRate || 0) / 100, 0),
  }));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        {onLogout && <Btn variant="outline" onClick={onLogout}><LogOut size={14} />Sign Out</Btn>}
      </div>
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5 w-fit">
        {["profile", "users", "commissions"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${tab === t ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>{t}</button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 max-w-lg">
          <div className="flex items-center gap-3 mb-4"><Av name={user?.name} /><div><p className="font-semibold text-gray-900">{user?.name}</p><Badge label={user?.role} /></div></div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Full Name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
              <Inp label="Email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
            </div>
            <Inp label="New Password (leave blank to keep)" type="password" value={profile.password} onChange={e => setProfile(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" />
            <div className="flex items-center gap-3">
              <Btn onClick={saveProfile}>Save Changes</Btn>
              {saved && <span className="text-xs text-emerald-600 flex items-center gap-1"><Check size={12} />Saved!</span>}
            </div>
          </div>
        </div>
      )}

      {tab === "users" && (
        <div className="space-y-4 max-w-2xl">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-400">
              <div className="col-span-4">Name</div><div className="col-span-4">Email</div><div className="col-span-2">Role</div><div className="col-span-1">Comm.</div><div className="col-span-1"></div>
            </div>
            <div className="divide-y divide-gray-50">
              {(users || []).length === 0 && <EmptyState icon={Users} message="No users yet" />}
              {(users || []).map(u => (
                <div key={u.id} className="grid grid-cols-12 gap-2 px-4 py-3 items-center">
                  <div className="col-span-4 flex items-center gap-2"><Av name={u.name} sm /><span className="text-sm font-medium text-gray-900 truncate">{u.name}</span></div>
                  <div className="col-span-4 text-xs text-gray-500 truncate">{u.email}</div>
                  <div className="col-span-2"><Badge label={u.role} /></div>
                  <div className="col-span-1 text-xs text-gray-500">{u.commissionRate != null ? `${u.commissionRate}%` : "—"}</div>
                  <div className="col-span-1 flex justify-end">{u.id !== user?.id && <button onClick={() => deleteUser(u.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>}</div>
                </div>
              ))}
            </div>
          </div>

          {!addingUser ? (
            <Btn onClick={() => setAddingUser(true)}><UserPlus size={14} />Add User</Btn>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">New User</p>
              <div className="grid grid-cols-2 gap-3">
                <Inp label="Full Name*" value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} placeholder="Jane Smith" />
                <Inp label="Email*" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} placeholder="jane@co.com" />
                <Inp label="Password*" type="password" value={newUser.password} onChange={e => setNewUser(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" />
                <Sel label="Role" opts={["admin", "sales"]} value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))} />
                <Inp label="Commission Rate %" type="number" value={newUser.commissionRate} onChange={e => setNewUser(p => ({ ...p, commissionRate: Number(e.target.value) }))} />
              </div>
              <div className="flex gap-2 mt-3"><Btn onClick={addUser}>Add User</Btn><Btn variant="outline" onClick={() => setAddingUser(false)}>Cancel</Btn></div>
            </div>
          )}
        </div>
      )}

      {tab === "commissions" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden max-w-2xl">
          <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-400">
            <div className="col-span-4">Sales Rep</div><div className="col-span-2">Rate</div><div className="col-span-3">Closed Won</div><div className="col-span-3">Commission Earned</div>
          </div>
          <div className="divide-y divide-gray-50">
            {commissionRows.length === 0 && <EmptyState icon={Percent} message="No sales users found" />}
            {commissionRows.map(u => {
              const closedWon = (deals || []).filter(d => d.stage === "Closed Won" && d.owner === u.name).reduce((a, b) => a + (b.deal_value || b.value || 0), 0);
              return (
                <div key={u.id} className="grid grid-cols-12 gap-2 px-4 py-3 items-center">
                  <div className="col-span-4 flex items-center gap-2"><Av name={u.name} sm /><span className="text-sm font-medium text-gray-900">{u.name}</span></div>
                  <div className="col-span-2 text-sm text-gray-700">{u.commissionRate || 0}%</div>
                  <div className="col-span-3 text-sm font-medium text-gray-900">{fmt(closedWon)}</div>
                  <div className="col-span-3 text-sm font-bold text-emerald-700">{fmt(u.earned)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── IntegrationsPage ─────────────────────────────────────────────────────────
export function IntegrationsPage() {
  const integrations = [
    { name: "Microsoft Outlook", desc: "Sync emails and compose directly from contact cards", icon: "📧", category: "Communication" },
    { name: "Microsoft Teams", desc: "Chat with contacts and join meetings from the CRM", icon: "💬", category: "Communication" },
    { name: "WhatsApp Business", desc: "Send WhatsApp messages directly from contact cards", icon: "📱", category: "Communication" },
    { name: "QuickBooks", desc: "Sync invoices, payments, and accounting data", icon: "💰", category: "Finance" },
    { name: "Xero", desc: "Two-way sync of invoices and financial records", icon: "📊", category: "Finance" },
    { name: "Zapier", desc: "Automate workflows by connecting 5,000+ apps", icon: "⚡", category: "Automation" },
    { name: "HubSpot", desc: "Import contacts, companies, and deals from HubSpot", icon: "🔶", category: "CRM Migration" },
    { name: "Salesforce", desc: "Bi-directional sync with Salesforce CRM", icon: "☁️", category: "CRM Migration" },
  ];
  const categories = [...new Set(integrations.map(i => i.category))];

  return (
    <div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">Integrations</h1>
        <p className="text-sm text-gray-400 mt-0.5">Connect NexusCRM to your existing tools</p>
      </div>
      {categories.map(cat => (
        <div key={cat} className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{cat}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {integrations.filter(i => i.category === cat).map(intg => (
              <div key={intg.name} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="text-2xl mt-0.5 flex-shrink-0">{intg.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900 text-sm">{intg.name}</p>
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Coming Soon</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{intg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
