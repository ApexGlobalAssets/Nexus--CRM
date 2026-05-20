import { useState } from "react";
import {
  LayoutDashboard, Users, Building2, Layers, FileText, Mail, Zap, Settings,
  Plus, Search, TrendingUp, Target, Trash2, Send, Globe, CheckCircle,
  AlertCircle, X, ArrowUpRight, BookOpen, Calendar, ChevronRight, Repeat,
  BarChart3, Link2, RefreshCw, Phone, MessageCircle, Video, Clock,
  ChevronLeft, ClipboardList, Activity, Star, ExternalLink, Check,
  ArrowRight, GitBranch, Bell, Tag, Sparkles, Copy, LayoutGrid, Eye,
  EyeOff, DollarSign, Percent, Lock, UserPlus, LogOut, Edit2
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const BM={active:"bg-emerald-100 text-emerald-700",prospect:"bg-blue-100 text-blue-700",inactive:"bg-gray-100 text-gray-500",paid:"bg-emerald-100 text-emerald-700",sent:"bg-blue-100 text-blue-700",overdue:"bg-red-100 text-red-600",draft:"bg-gray-100 text-gray-500",scheduled:"bg-purple-100 text-purple-700",accepted:"bg-emerald-100 text-emerald-700",declined:"bg-red-100 text-red-600",hot:"bg-orange-100 text-orange-700",enterprise:"bg-indigo-100 text-indigo-700",ai:"bg-purple-100 text-purple-700",fintech:"bg-amber-100 text-amber-700",cloud:"bg-cyan-100 text-cyan-700",data:"bg-teal-100 text-teal-700",startup:"bg-pink-100 text-pink-700",inbound:"bg-lime-100 text-lime-700",Lead:"bg-indigo-100 text-indigo-700",Qualified:"bg-violet-100 text-violet-700",Proposal:"bg-cyan-100 text-cyan-700",Negotiation:"bg-amber-100 text-amber-700","Closed Won":"bg-emerald-100 text-emerald-700","Closed Lost":"bg-red-100 text-red-600",Call:"bg-blue-100 text-blue-700",Meeting:"bg-purple-100 text-purple-700",Email:"bg-indigo-100 text-indigo-700",Note:"bg-gray-100 text-gray-600",High:"bg-red-100 text-red-600",Medium:"bg-amber-100 text-amber-700",Low:"bg-gray-100 text-gray-500",open:"bg-blue-100 text-blue-700",completed:"bg-emerald-100 text-emerald-700",admin:"bg-indigo-100 text-indigo-700",sales:"bg-gray-100 text-gray-600"};
const SC={Lead:"#6366f1",Qualified:"#8b5cf6",Proposal:"#06b6d4",Negotiation:"#f59e0b","Closed Won":"#10b981","Closed Lost":"#ef4444"};
const PIPELINES=[{id:1,name:"Sales",color:"#6366f1"},{id:2,name:"Renewal",color:"#10b981"},{id:3,name:"Onboarding",color:"#f59e0b"}];
const STAGES=["Lead","Qualified","Proposal","Negotiation","Closed Won","Closed Lost"];
const REV=[{m:"Jan",rev:42000,tgt:40000},{m:"Feb",rev:38000,tgt:42000},{m:"Mar",rev:55000,tgt:45000},{m:"Apr",rev:61000,tgt:50000},{m:"May",rev:78000,tgt:55000},{m:"Jun",rev:65000,tgt:60000}];
const PIPE=[{s:"Lead",v:32000},{s:"Qualified",v:12000},{s:"Proposal",v:73000},{s:"Negotiation",v:89000},{s:"Won",v:67000}];
const ALL_FIELDS=[{id:"name",label:"Full Name",type:"text",required:true},{id:"email",label:"Email Address",type:"email",required:true},{id:"phone",label:"Phone Number",type:"tel",required:false},{id:"company",label:"Company Name",type:"text",required:false},{id:"role",label:"Job Title",type:"text",required:false},{id:"budget",label:"Budget Range",type:"text",required:false},{id:"message",label:"Message",type:"textarea",required:false},{id:"source",label:"How did you hear about us?",type:"select",required:false}];
const waLink=phone=>`https://wa.me/${phone.replace(/\D/g,"")}`;
const outlookLink=email=>`https://outlook.office.com/mail/deeplink/compose?to=${email}`;
const teamsLink=email=>`https://teams.microsoft.com/l/chat/0/0?users=${email}`;

export function Bdg({label}){return <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${BM[label]||"bg-gray-100 text-gray-500"}`}>{label}</span>;}
export function Av({name,sm}){const i=(name||"?").split(" ").map(n=>n[0]).join("").slice(0,2);const cols=["bg-indigo-500","bg-violet-500","bg-cyan-500","bg-emerald-500","bg-amber-500","bg-pink-500"];const c=cols[(name||"?").charCodeAt(0)%cols.length];return <div className={`${sm?"w-7 h-7 text-xs":"w-9 h-9 text-sm"} ${c} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>{i}</div>;}
export function Modal({title,onClose,children,wide}){return(<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"><div className={`bg-white rounded-2xl shadow-2xl w-full ${wide?"max-w-2xl":"max-w-md"}`}><div className="flex items-center justify-between px-5 py-4 border-b border-gray-100"><h3 className="font-semibold text-gray-900">{title}</h3><button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={16}/></button></div><div className="p-5 max-h-[80vh] overflow-y-auto">{children}</div></div></div>);}
export function Inp({label,...p}){return(<div>{label&&<label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>}<input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white" {...p}/></div>);}
export function Sel({label,opts,...p}){return(<div>{label&&<label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>}<select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white" {...p}>{opts.map(o=><option key={o.v||o} value={o.v||o}>{o.l||o}</option>)}</select></div>);}
export function Btn({children,variant="primary",sm,...p}){const s={primary:"bg-indigo-600 text-white hover:bg-indigo-700",outline:"border border-gray-200 text-gray-600 hover:bg-gray-50",red:"bg-red-50 text-red-600 hover:bg-red-100",green:"bg-emerald-600 text-white hover:bg-emerald-700"};return <button className={`flex items-center justify-center gap-1.5 ${sm?"px-3 py-1.5 text-xs":"px-4 py-2 text-sm"} rounded-lg font-medium transition-all disabled:opacity-40 ${s[variant]}`} {...p}>{children}</button>;}
export function CommButtons({email,phone,sm}){return(<div className="flex items-center gap-1" onClick={e=>e.stopPropagation()}>{email&&<a href={outlookLink(email)} target="_blank" rel="noreferrer" title="Open in Outlook" className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"><Mail size={sm?11:13}/></a>}{email&&<a href={teamsLink(email)} target="_blank" rel="noreferrer" title="Chat in Teams" className="p-1.5 rounded-lg bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"><MessageCircle size={sm?11:13}/></a>}{phone&&<a href={waLink(phone)} target="_blank" rel="noreferrer" title="WhatsApp" className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"><Phone size={sm?11:13}/></a>}</div>);}

export function LoginPage({onLogin,users}){
  const [email,setEmail]=useState("");const [pw,setPw]=useState("");const [err,setErr]=useState("");const [show,setShow]=useState(false);const [loading,setLoading]=useState(false);
  const login=async()=>{
    setLoading(true);setErr("");
    try{
      const r=await fetch("/api/auth.php",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password:pw})});
      if(!r.ok){setErr("Invalid email or password.");setLoading(false);return;}
      const u=await r.json();
      onLogin(u);
    }catch(e){setErr("Connection error. Please try again.");}
    setLoading(false);
  };
  return(
    <div className="min-h-screen flex" style={{fontFamily:"Inter,system-ui,sans-serif"}}>
      <div className="hidden lg:flex flex-col justify-between p-12 w-5/12 bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900">
        <div className="flex items-center gap-3"><div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"><BarChart3 size={18} className="text-white"/></div><span className="text-white font-bold text-lg">NexusCRM</span></div>
        <div>
          <h1 className="text-4xl font-bold text-white leading-snug mb-3">Your entire business,<br/>one platform.</h1>
          <p className="text-indigo-200 text-base mb-8">Contacts · Pipeline · Invoicing · AI · Commissions</p>
          <div className="grid grid-cols-2 gap-3">
            {[["AI-Powered","Email drafts & deal coaching"],["Role-Based","Sales rep access control"],["Integrated","MS365 · QuickBooks · Xero"],["Commission","Real-time earnings tracking"]].map(([t,d])=>(
              <div key={t} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"><p className="font-semibold text-white text-sm">{t}</p><p className="text-indigo-300 text-xs mt-0.5">{d}</p></div>
            ))}
          </div>
        </div>
        <p className="text-indigo-400 text-xs">© 2024 NexusCRM</p>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8"><div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center"><BarChart3 size={14} className="text-white"/></div><span className="font-bold text-gray-900">NexusCRM</span></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-7">Sign in to your account</p>
          <div className="space-y-4">
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Email address</label>
              <div className="relative"><Mail size={14} className="absolute left-3 top-2.5 text-gray-400"/><input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="you@company.com" onKeyDown={e=>e.key==="Enter"&&login()}/></div>
            </div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Password</label>
              <div className="relative"><Lock size={14} className="absolute left-3 top-2.5 text-gray-400"/><input type={show?"text":"password"} value={pw} onChange={e=>{setPw(e.target.value);setErr("");}} className="w-full border border-gray-200 rounded-xl pl-9 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&login()}/><button onClick={()=>setShow(p=>!p)} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">{show?<EyeOff size={14}/>:<Eye size={14}/>}</button></div>
            </div>
            {err&&<div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2 text-xs text-red-600">{err}</div>}
            <button onClick={login} disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60">{loading?"Signing in…":(<>Sign In <ArrowRight size={14}/></>)}</button>
          </div>
          <div className="mt-6 border border-gray-100 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100"><p className="text-xs font-semibold text-gray-500">Demo accounts — click to auto-fill</p></div>
            {users.map((u,i)=>(
              <button key={u.id} onClick={()=>{setEmail(u.email);setPw(u.password);setErr("");}} className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition-colors text-left ${i>0?"border-t border-gray-50":""}`}>
                <Av name={u.name} sm/><div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-800">{u.name}</p><p className="text-xs text-gray-400">{u.email} · pw: <span className="font-mono">{u.password}</span></p></div>
                <Bdg label={u.role}/>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Dashboard({contacts,companies,deals,activities,invoices,currentUser}){
  const myDeals=currentUser?.role==="sales"?deals.filter(d=>d.owner===currentUser.name):deals;
  const totalRev=invoices.filter(i=>i.status==="paid").reduce((a,b)=>a+b.amount,0);
  const openPipe=myDeals.filter(d=>!["Closed Won","Closed Lost"].includes(d.stage)).reduce((a,b)=>a+b.value,0);
  const wonDeals=myDeals.filter(d=>d.stage==="Closed Won").length;
  const convRate=myDeals.length?Math.round((wonDeals/myDeals.length)*100):0;
  const stageData=STAGES.map(s=>({stage:s,count:myDeals.filter(d=>d.stage===s).length,value:myDeals.filter(d=>d.stage===s).reduce((a,b)=>a+b.value,0)}));
  const myComm=currentUser?.role==="sales"?myDeals.filter(d=>d.stage==="Closed Won").reduce((a,b)=>a+(b.value*(currentUser.commissionRate||0)/100),0):null;
  return(
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-bold text-gray-900">Dashboard</h1><p className="text-sm text-gray-400 mt-0.5">Welcome back, {currentUser?.name?.split(" ")[0]}</p></div>
        <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}</div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {label:"Open Pipeline",value:`$${(openPipe/1000).toFixed(0)}k`,icon:TrendingUp,color:"text-indigo-600",bg:"bg-indigo-50"},
          {label:"Total Revenue",value:`$${(totalRev/1000).toFixed(0)}k`,icon:DollarSign,color:"text-emerald-600",bg:"bg-emerald-50"},
          {label:"Win Rate",value:`${convRate}%`,icon:Target,color:"text-violet-600",bg:"bg-violet-50"},
          {label:"Active Contacts",value:contacts.filter(c=>c.status==="active").length,icon:Users,color:"text-cyan-600",bg:"bg-cyan-50"},
        ].map(({label,value,icon:Icon,color,bg})=>(
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm">
            <div className={`${bg} p-2.5 rounded-xl`}><Icon size={18} className={color}/></div>
            <div><p className="text-xs text-gray-400">{label}</p><p className="text-xl font-bold text-gray-900">{value}</p></div>
          </div>
        ))}
      </div>
      {myComm!==null&&(
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="bg-amber-100 p-2.5 rounded-xl"><DollarSign size={18} className="text-amber-600"/></div>
          <div><p className="text-xs text-amber-600 font-medium">Your Commission Earned</p><p className="text-2xl font-bold text-amber-700">${myComm.toLocaleString()}</p></div>
          <div className="ml-auto text-xs text-amber-500">{currentUser.commissionRate}% rate</div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">Revenue vs Target</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={REV} margin={{top:0,right:0,left:-20,bottom:0}}>
              <defs><linearGradient id="rv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="m" tick={{fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}k`}/>
              <Tooltip formatter={v=>`$${v.toLocaleString()}`}/>
              <Area type="monotone" dataKey="rev" stroke="#6366f1" strokeWidth={2} fill="url(#rv)" name="Revenue"/>
              <Area type="monotone" dataKey="tgt" stroke="#e5e7eb" strokeWidth={1.5} fill="none" strokeDasharray="4 4" name="Target"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-700 mb-3">Pipeline by Stage</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={stageData} margin={{top:0,right:0,left:-20,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
              <XAxis dataKey="stage" tick={{fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v/1000}k`}/>
              <Tooltip formatter={v=>`$${v.toLocaleString()}`}/>
              <Bar dataKey="value" radius={[4,4,0,0]}>
                {stageData.map((e,i)=><Cell key={i} fill={SC[e.stage]||"#6366f1"}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between"><p className="text-sm font-semibold text-gray-700">Recent Activities</p><Activity size={14} className="text-gray-300"/></div>
          <div className="divide-y divide-gray-50">
            {activities.slice(0,5).map(a=>(
              <div key={a.id} className="px-4 py-3 flex items-start gap-3">
                <div className="mt-0.5"><Bdg label={a.type}/></div>
                <div className="flex-1 min-w-0"><p className="text-sm text-gray-700 leading-snug">{a.note}</p><p className="text-xs text-gray-400 mt-0.5">{a.contact} · {a.date}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between"><p className="text-sm font-semibold text-gray-700">Hot Deals</p><Star size={14} className="text-gray-300"/></div>
          <div className="divide-y divide-gray-50">
            {myDeals.filter(d=>d.stage==="Negotiation"||d.stage==="Proposal").slice(0,5).map(d=>(
              <div key={d.id} className="px-4 py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-800 truncate">{d.name}</p><p className="text-xs text-gray-400">{d.company}</p></div>
                <div className="text-right"><p className="text-sm font-semibold text-gray-900">${d.value.toLocaleString()}</p><Bdg label={d.stage}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactDetail({contact,onClose,onUpdate,deals,activities,allContacts}){
  const [tab,setTab]=useState("overview");
  const [editMode,setEditMode]=useState(false);
  const [form,setForm]=useState({...contact});
  const [note,setNote]=useState("");
  const [actType,setActType]=useState("Note");
  const contactDeals=deals.filter(d=>d.contact===contact.name||d.contactId===contact.id);
  const contactActs=activities.filter(a=>a.contact===contact.name||a.contactId===contact.id);
  const save=()=>{onUpdate(form);setEditMode(false);};
  return(
    <div className="fixed inset-0 bg-black/40 flex items-end lg:items-center justify-center z-50 p-0 lg:p-4">
      <div className="bg-white rounded-t-2xl lg:rounded-2xl shadow-2xl w-full lg:max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Av name={contact.name}/>
            <div>
              <h3 className="font-semibold text-gray-900">{contact.name}</h3>
              <p className="text-xs text-gray-400">{contact.role} · {contact.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CommButtons email={contact.email} phone={contact.phone}/>
            <button onClick={()=>setEditMode(e=>!e)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><Edit2 size={14}/></button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><X size={16}/></button>
          </div>
        </div>
        <div className="flex border-b border-gray-100 px-5 flex-shrink-0">
          {["overview","deals","activity"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`py-2.5 px-3 text-xs font-medium capitalize border-b-2 transition-colors ${tab===t?"border-indigo-500 text-indigo-600":"border-transparent text-gray-400 hover:text-gray-600"}`}>{t}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {tab==="overview"&&(
            <div className="space-y-4">
              {editMode?(
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Inp label="Full Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
                    <Inp label="Email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
                    <Inp label="Phone" value={form.phone||""} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/>
                    <Inp label="Company" value={form.company||""} onChange={e=>setForm(f=>({...f,company:e.target.value}))}/>
                    <Inp label="Job Title" value={form.role||""} onChange={e=>setForm(f=>({...f,role:e.target.value}))}/>
                    <Sel label="Status" opts={["active","prospect","inactive"]} value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}/>
                  </div>
                  <Inp label="Tags (comma separated)" value={(form.tags||[]).join(", ")} onChange={e=>setForm(f=>({...f,tags:e.target.value.split(",").map(t=>t.trim()).filter(Boolean)}))}/>
                  <div className="flex gap-2"><Btn onClick={save}>Save</Btn><Btn variant="outline" onClick={()=>setEditMode(false)}>Cancel</Btn></div>
                </div>
              ):(
                <>
                  <div className="grid grid-cols-2 gap-3">
                    {[["Email",contact.email],["Phone",contact.phone||"—"],["Company",contact.company||"—"],["Title",contact.role||"—"],["Status",contact.status],["Source",contact.source||"—"]].map(([l,v])=>(
                      <div key={l} className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-400 mb-0.5">{l}</p><p className="text-sm font-medium text-gray-800">{v}</p></div>
                    ))}
                  </div>
                  {contact.tags?.length>0&&<div className="flex flex-wrap gap-1.5">{contact.tags.map(t=><Bdg key={t} label={t}/>)}</div>}
                </>
              )}
            </div>
          )}
          {tab==="deals"&&(
            <div className="space-y-2">
              {contactDeals.length===0?<p className="text-sm text-gray-400 text-center py-8">No deals yet</p>:contactDeals.map(d=>(
                <div key={d.id} className="border border-gray-100 rounded-xl p-3 flex items-center justify-between">
                  <div><p className="text-sm font-medium text-gray-800">{d.name}</p><p className="text-xs text-gray-400">{d.pipeline||"Sales"} · {d.closeDate}</p></div>
                  <div className="text-right"><p className="text-sm font-semibold text-gray-900">${d.value.toLocaleString()}</p><Bdg label={d.stage}/></div>
                </div>
              ))}
            </div>
          )}
          {tab==="activity"&&(
            <div className="space-y-3">
              <div className="flex gap-2">
                <select value={actType} onChange={e=>setActType(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
                  {["Note","Call","Meeting","Email"].map(t=><option key={t}>{t}</option>)}
                </select>
                <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Add a note..." className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
                <Btn sm onClick={()=>{if(note.trim()){setNote("");}}}><Send size={12}/></Btn>
              </div>
              <div className="space-y-2">
                {contactActs.length===0?<p className="text-sm text-gray-400 text-center py-6">No activities yet</p>:contactActs.map(a=>(
                  <div key={a.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                    <Bdg label={a.type}/>
                    <div className="flex-1"><p className="text-sm text-gray-700">{a.note}</p><p className="text-xs text-gray-400 mt-0.5">{a.date}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Contacts({contacts,setContacts,deals,activities,currentUser}){
  const [q,setQ]=useState("");const [sel,setSel]=useState(null);const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState({name:"",email:"",phone:"",company:"",role:"",status:"prospect",tags:[],source:""});
  const [filterStatus,setFilterStatus]=useState("all");const [filterTag,setFilterTag]=useState("all");
  const visible=currentUser?.role==="sales"?contacts.filter(c=>c.owner===currentUser.name||!c.owner):contacts;
  const allTags=[...new Set(contacts.flatMap(c=>c.tags||[]))];
  const filtered=visible.filter(c=>{
    const mq=!q||c.name.toLowerCase().includes(q.toLowerCase())||c.email.toLowerCase().includes(q.toLowerCase())||(c.company||"").toLowerCase().includes(q.toLowerCase());
    const ms=filterStatus==="all"||c.status===filterStatus;
    const mt=filterTag==="all"||(c.tags||[]).includes(filterTag);
    return mq&&ms&&mt;
  });
  const add=()=>{
    if(!form.name||!form.email)return;
    setContacts(p=>[...p,{...form,id:Date.now(),tags:form.tags||[],owner:currentUser?.name}]);
    setForm({name:"",email:"",phone:"",company:"",role:"",status:"prospect",tags:[],source:""});
    setShowAdd(false);
  };
  return(
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-gray-900">Contacts</h1><p className="text-sm text-gray-400">{filtered.length} of {visible.length}</p></div>
        <Btn onClick={()=>setShowAdd(true)}><Plus size={14}/>Add Contact</Btn>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-48"><Search size={14} className="absolute left-3 top-2.5 text-gray-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search contacts…" className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"/></div>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none bg-white">
          <option value="all">All Status</option>
          {["active","prospect","inactive"].map(s=><option key={s} value={s}>{s}</option>)}
        </select>
        {allTags.length>0&&<select value={filterTag} onChange={e=>setFilterTag(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none bg-white">
          <option value="all">All Tags</option>
          {allTags.map(t=><option key={t} value={t}>{t}</option>)}
        </select>}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {filtered.map(c=>(
            <div key={c.id} onClick={()=>setSel(c)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
              <Av name={c.name}/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2"><p className="text-sm font-medium text-gray-900 truncate">{c.name}</p><Bdg label={c.status}/></div>
                <p className="text-xs text-gray-400 truncate">{c.email} · {c.company||"—"}</p>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                {(c.tags||[]).slice(0,2).map(t=><Bdg key={t} label={t}/>)}
                <CommButtons email={c.email} phone={c.phone} sm/>
              </div>
            </div>
          ))}
          {filtered.length===0&&<div className="py-12 text-center text-sm text-gray-400">No contacts found</div>}
        </div>
      </div>
      {showAdd&&(
        <Modal title="Add Contact" onClose={()=>setShowAdd(false)}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Full Name*" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Jane Smith"/>
              <Inp label="Email*" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="jane@co.com"/>
              <Inp label="Phone" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+1 555 000 0000"/>
              <Inp label="Company" value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))} placeholder="Acme Inc"/>
              <Inp label="Job Title" value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} placeholder="CEO"/>
              <Sel label="Status" opts={["prospect","active","inactive"]} value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}/>
            </div>
            <Inp label="Source" value={form.source} onChange={e=>setForm(f=>({...f,source:e.target.value}))} placeholder="LinkedIn, Referral…"/>
            <Inp label="Tags (comma separated)" value={(form.tags||[]).join(", ")} onChange={e=>setForm(f=>({...f,tags:e.target.value.split(",").map(t=>t.trim()).filter(Boolean)}))}/>
            <div className="flex gap-2 pt-1"><Btn onClick={add}>Add Contact</Btn><Btn variant="outline" onClick={()=>setShowAdd(false)}>Cancel</Btn></div>
          </div>
        </Modal>
      )}
      {sel&&<ContactDetail contact={sel} onClose={()=>setSel(null)} onUpdate={u=>{setContacts(p=>p.map(c=>c.id===u.id?u:c));setSel(u);}} deals={deals} activities={activities}/>}
    </div>
  );
}

export function Companies({companies,setCompanies,contacts,deals}){
  const [q,setQ]=useState("");const [sel,setSel]=useState(null);const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState({name:"",industry:"",website:"",employees:"",revenue:"",tags:[]});
  const filtered=companies.filter(c=>!q||c.name.toLowerCase().includes(q.toLowerCase())||(c.industry||"").toLowerCase().includes(q.toLowerCase()));
  const add=()=>{
    if(!form.name)return;
    setCompanies(p=>[...p,{...form,id:Date.now(),tags:form.tags||[]}]);
    setForm({name:"",industry:"",website:"",employees:"",revenue:"",tags:[]});
    setShowAdd(false);
  };
  return(
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-gray-900">Companies</h1><p className="text-sm text-gray-400">{filtered.length} companies</p></div>
        <Btn onClick={()=>setShowAdd(true)}><Plus size={14}/>Add Company</Btn>
      </div>
      <div className="relative mb-4"><Search size={14} className="absolute left-3 top-2.5 text-gray-400"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search companies…" className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"/></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c=>{
          const compContacts=contacts.filter(ct=>ct.company===c.name);
          const compDeals=deals.filter(d=>d.company===c.name);
          const totalVal=compDeals.reduce((a,b)=>a+b.value,0);
          return(
            <div key={c.id} onClick={()=>setSel(c)} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-indigo-200 cursor-pointer transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center"><Building2 size={16} className="text-indigo-600"/></div>
                  <div><p className="font-semibold text-gray-900 text-sm">{c.name}</p><p className="text-xs text-gray-400">{c.industry||"—"}</p></div>
                </div>
                {(c.tags||[]).slice(0,1).map(t=><Bdg key={t} label={t}/>)}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[["Contacts",compContacts.length],["Deals",compDeals.length],["Pipeline",`$${(totalVal/1000).toFixed(0)}k`]].map(([l,v])=>(
                  <div key={l} className="bg-gray-50 rounded-lg py-2"><p className="text-xs text-gray-400">{l}</p><p className="text-sm font-bold text-gray-800">{v}</p></div>
                ))}
              </div>
              {c.website&&<a href={c.website} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} className="mt-3 flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700"><Globe size={11}/>{c.website.replace(/https?:\/\//,"")}</a>}
            </div>
          );
        })}
      </div>
      {showAdd&&(
        <Modal title="Add Company" onClose={()=>setShowAdd(false)}>
          <div className="space-y-3">
            <Inp label="Company Name*" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Acme Inc"/>
            <Inp label="Industry" value={form.industry} onChange={e=>setForm(f=>({...f,industry:e.target.value}))} placeholder="SaaS, Fintech…"/>
            <Inp label="Website" value={form.website} onChange={e=>setForm(f=>({...f,website:e.target.value}))} placeholder="https://..."/>
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Employees" value={form.employees} onChange={e=>setForm(f=>({...f,employees:e.target.value}))} placeholder="50-200"/>
              <Inp label="Revenue" value={form.revenue} onChange={e=>setForm(f=>({...f,revenue:e.target.value}))} placeholder="$5M ARR"/>
            </div>
            <Inp label="Tags (comma separated)" value={(form.tags||[]).join(", ")} onChange={e=>setForm(f=>({...f,tags:e.target.value.split(",").map(t=>t.trim()).filter(Boolean)}))}/>
            <div className="flex gap-2 pt-1"><Btn onClick={add}>Add Company</Btn><Btn variant="outline" onClick={()=>setShowAdd(false)}>Cancel</Btn></div>
          </div>
        </Modal>
      )}
      {sel&&(
        <Modal title={sel.name} onClose={()=>setSel(null)} wide>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[["Industry",sel.industry||"—"],["Website",sel.website||"—"],["Employees",sel.employees||"—"],["Revenue",sel.revenue||"—"]].map(([l,v])=>(
                <div key={l} className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-400">{l}</p><p className="text-sm font-medium text-gray-800">{v}</p></div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Contacts at {sel.name}</p>
              <div className="space-y-1.5">
                {contacts.filter(c=>c.company===sel.name).map(c=>(
                  <div key={c.id} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                    <Av name={c.name} sm/><div className="flex-1"><p className="text-sm font-medium text-gray-800">{c.name}</p><p className="text-xs text-gray-400">{c.role||"—"}</p></div>
                    <CommButtons email={c.email} phone={c.phone} sm/>
                  </div>
                ))}
                {contacts.filter(c=>c.company===sel.name).length===0&&<p className="text-xs text-gray-400 py-2">No contacts linked</p>}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Deals</p>
              <div className="space-y-1.5">
                {deals.filter(d=>d.company===sel.name).map(d=>(
                  <div key={d.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                    <p className="text-sm font-medium text-gray-800">{d.name}</p>
                    <div className="flex items-center gap-2"><span className="text-sm font-semibold text-gray-900">${d.value.toLocaleString()}</span><Bdg label={d.stage}/></div>
                  </div>
                ))}
                {deals.filter(d=>d.company===sel.name).length===0&&<p className="text-xs text-gray-400 py-2">No deals linked</p>}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function Pipeline({deals,setDeals,contacts,companies,currentUser}){
  const [showAdd,setShowAdd]=useState(false);const [selPipe,setSelPipe]=useState(1);const [drag,setDrag]=useState(null);
  const [form,setForm]=useState({name:"",company:"",contact:"",value:"",stage:"Lead",closeDate:"",owner:"",pipeline:1,priority:"Medium"});
  const myDeals=currentUser?.role==="sales"?deals.filter(d=>d.owner===currentUser.name):deals;
  const pipeDeals=myDeals.filter(d=>(d.pipeline||1)===selPipe);
  const add=()=>{
    if(!form.name)return;
    setDeals(p=>[...p,{...form,id:Date.now(),value:Number(form.value)||0,owner:form.owner||currentUser?.name,pipeline:selPipe}]);
    setForm({name:"",company:"",contact:"",value:"",stage:"Lead",closeDate:"",owner:"",pipeline:1,priority:"Medium"});
    setShowAdd(false);
  };
  const drop=(stage)=>{if(drag!==null){setDeals(p=>p.map(d=>d.id===drag?{...d,stage}:d));setDrag(null);}};
  return(
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-gray-900">Pipeline</h1></div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {PIPELINES.map(p=><button key={p.id} onClick={()=>setSelPipe(p.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selPipe===p.id?"bg-white shadow-sm text-gray-900":"text-gray-500 hover:text-gray-700"}`}>{p.name}</button>)}
          </div>
          <Btn sm onClick={()=>setShowAdd(true)}><Plus size={12}/>Deal</Btn>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {STAGES.map(stage=>{
          const stagDeals=pipeDeals.filter(d=>d.stage===stage);
          const stageVal=stagDeals.reduce((a,b)=>a+b.value,0);
          return(
            <div key={stage} className="flex-shrink-0 w-60" onDragOver={e=>e.preventDefault()} onDrop={()=>drop(stage)}>
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{backgroundColor:SC[stage]}}/><span className="text-xs font-semibold text-gray-600">{stage}</span><span className="bg-gray-100 text-gray-500 text-xs px-1.5 py-0.5 rounded-full">{stagDeals.length}</span></div>
                <span className="text-xs text-gray-400">${(stageVal/1000).toFixed(0)}k</span>
              </div>
              <div className="space-y-2 min-h-20">
                {stagDeals.map(d=>(
                  <div key={d.id} draggable onDragStart={()=>setDrag(d.id)} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all hover:border-indigo-200">
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <p className="text-xs font-semibold text-gray-800 leading-snug">{d.name}</p>
                      <Bdg label={d.priority||"Medium"}/>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{d.company||"—"}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">${d.value.toLocaleString()}</span>
                      {d.closeDate&&<span className="text-xs text-gray-400">{d.closeDate}</span>}
                    </div>
                    {d.owner&&<p className="text-xs text-gray-300 mt-1.5">{d.owner}</p>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {showAdd&&(
        <Modal title="Add Deal" onClose={()=>setShowAdd(false)}>
          <div className="space-y-3">
            <Inp label="Deal Name*" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Acme Enterprise Deal"/>
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Company" value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))} placeholder="Acme Inc"/>
              <Inp label="Contact" value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} placeholder="Jane Smith"/>
              <Inp label="Value ($)" type="number" value={form.value} onChange={e=>setForm(f=>({...f,value:e.target.value}))} placeholder="50000"/>
              <Inp label="Close Date" type="date" value={form.closeDate} onChange={e=>setForm(f=>({...f,closeDate:e.target.value}))}/>
              <Sel label="Stage" opts={STAGES} value={form.stage} onChange={e=>setForm(f=>({...f,stage:e.target.value}))}/>
              <Sel label="Priority" opts={["High","Medium","Low"]} value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}/>
            </div>
            {currentUser?.role==="admin"&&<Inp label="Owner" value={form.owner} onChange={e=>setForm(f=>({...f,owner:e.target.value}))} placeholder="Sales rep name"/>}
            <div className="flex gap-2 pt-1"><Btn onClick={add}>Add Deal</Btn><Btn variant="outline" onClick={()=>setShowAdd(false)}>Cancel</Btn></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function ActivitiesTasks({activities,setActivities,contacts,deals,currentUser}){
  const [tab,setTab]=useState("activities");const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState({type:"Call",note:"",contact:"",deal:"",date:new Date().toISOString().split("T")[0],priority:"Medium",status:"open"});
  const myActs=currentUser?.role==="sales"?activities.filter(a=>a.owner===currentUser.name||!a.owner):activities;
  const add=()=>{
    if(!form.note)return;
    setActivities(p=>[...p,{...form,id:Date.now(),owner:currentUser?.name}]);
    setForm({type:"Call",note:"",contact:"",deal:"",date:new Date().toISOString().split("T")[0],priority:"Medium",status:"open"});
    setShowAdd(false);
  };
  const toggle=(id)=>setActivities(p=>p.map(a=>a.id===id?{...a,status:a.status==="completed"?"open":"completed"}:a));
  const acts=myActs.filter(a=>tab==="activities"?["Call","Meeting","Email","Note"].includes(a.type):a.status==="open"||a.status==="completed");
  return(
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-900">Activities & Tasks</h1>
        <Btn onClick={()=>setShowAdd(true)}><Plus size={14}/>Add</Btn>
      </div>
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-4 w-fit">
        {["activities","tasks"].map(t=><button key={t} onClick={()=>setTab(t)} className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${tab===t?"bg-white shadow-sm text-gray-900":"text-gray-500"}`}>{t}</button>)}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {acts.map(a=>(
          <div key={a.id} className="flex items-start gap-3 px-4 py-3">
            <button onClick={()=>toggle(a.id)} className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${a.status==="completed"?"bg-emerald-500 border-emerald-500":"border-gray-300 hover:border-indigo-400"}`}>
              {a.status==="completed"&&<Check size={10} className="text-white"/>}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap"><Bdg label={a.type}/><span className={`text-sm ${a.status==="completed"?"line-through text-gray-400":"text-gray-800"}`}>{a.note}</span></div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                {a.contact&&<span className="text-xs text-gray-400">{a.contact}</span>}
                {a.deal&&<span className="text-xs text-gray-400">· {a.deal}</span>}
                <span className="text-xs text-gray-300">{a.date}</span>
              </div>
            </div>
            <Bdg label={a.priority||"Medium"}/>
          </div>
        ))}
        {acts.length===0&&<div className="py-12 text-center text-sm text-gray-400">No {tab} yet</div>}
      </div>
      {showAdd&&(
        <Modal title="Add Activity / Task" onClose={()=>setShowAdd(false)}>
          <div className="space-y-3">
            <Sel label="Type" opts={["Call","Meeting","Email","Note","Task"]} value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}/>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Note / Description*</label><textarea value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none" rows={3} placeholder="What happened or needs to happen?"/></div>
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Contact" value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} placeholder="Contact name"/>
              <Inp label="Deal" value={form.deal} onChange={e=>setForm(f=>({...f,deal:e.target.value}))} placeholder="Deal name"/>
              <Inp label="Date" type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/>
              <Sel label="Priority" opts={["High","Medium","Low"]} value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}/>
            </div>
            <div className="flex gap-2 pt-1"><Btn onClick={add}>Add</Btn><Btn variant="outline" onClick={()=>setShowAdd(false)}>Cancel</Btn></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function Proposals({proposals,setProposals,deals,contacts,currentUser}){
  const [showAdd,setShowAdd]=useState(false);const [sel,setSel]=useState(null);
  const [form,setForm]=useState({title:"",deal:"",contact:"",value:"",status:"draft",validUntil:"",notes:""});
  const myProps=currentUser?.role==="sales"?proposals.filter(p=>p.owner===currentUser.name):proposals;
  const add=()=>{
    if(!form.title)return;
    setProposals(p=>[...p,{...form,id:Date.now(),created:new Date().toISOString().split("T")[0],owner:currentUser?.name,value:Number(form.value)||0}]);
    setForm({title:"",deal:"",contact:"",value:"",status:"draft",validUntil:"",notes:""});
    setShowAdd(false);
  };
  return(
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-gray-900">Proposals</h1><p className="text-sm text-gray-400">{myProps.length} proposals</p></div>
        <Btn onClick={()=>setShowAdd(true)}><Plus size={14}/>New Proposal</Btn>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {myProps.map(p=>(
          <div key={p.id} onClick={()=>setSel(p)} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md cursor-pointer transition-all hover:border-indigo-200">
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-gray-900 text-sm leading-snug">{p.title}</p>
              <Bdg label={p.status}/>
            </div>
            <p className="text-xs text-gray-400 mb-3">{p.contact||p.deal||"—"}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">${(p.value||0).toLocaleString()}</span>
              <span className="text-xs text-gray-400">{p.created}</span>
            </div>
            {p.validUntil&&<p className="text-xs text-amber-500 mt-1.5">Valid until {p.validUntil}</p>}
          </div>
        ))}
        {myProps.length===0&&<div className="col-span-3 py-16 text-center text-sm text-gray-400">No proposals yet</div>}
      </div>
      {showAdd&&(
        <Modal title="New Proposal" onClose={()=>setShowAdd(false)}>
          <div className="space-y-3">
            <Inp label="Proposal Title*" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Enterprise Package Proposal"/>
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Deal" value={form.deal} onChange={e=>setForm(f=>({...f,deal:e.target.value}))} placeholder="Deal name"/>
              <Inp label="Contact" value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} placeholder="Contact name"/>
              <Inp label="Value ($)" type="number" value={form.value} onChange={e=>setForm(f=>({...f,value:e.target.value}))}/>
              <Inp label="Valid Until" type="date" value={form.validUntil} onChange={e=>setForm(f=>({...f,validUntil:e.target.value}))}/>
              <Sel label="Status" opts={["draft","sent","accepted","declined"]} value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}/>
            </div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Notes</label><textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none" rows={3}/></div>
            <div className="flex gap-2 pt-1"><Btn onClick={add}>Create Proposal</Btn><Btn variant="outline" onClick={()=>setShowAdd(false)}>Cancel</Btn></div>
          </div>
        </Modal>
      )}
      {sel&&(
        <Modal title={sel.title} onClose={()=>setSel(null)} wide>
          <div className="space-y-4">
            <div className="flex items-center gap-3"><Bdg label={sel.status}/><span className="text-2xl font-bold text-gray-900">${(sel.value||0).toLocaleString()}</span></div>
            <div className="grid grid-cols-2 gap-3">
              {[["Deal",sel.deal||"—"],["Contact",sel.contact||"—"],["Created",sel.created],["Valid Until",sel.validUntil||"—"],["Owner",sel.owner||"—"]].map(([l,v])=>(
                <div key={l} className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-400">{l}</p><p className="text-sm font-medium text-gray-800">{v}</p></div>
              ))}
            </div>
            {sel.notes&&<div className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-400 mb-1">Notes</p><p className="text-sm text-gray-700">{sel.notes}</p></div>}
            <div className="flex gap-2">
              <Btn variant="green" onClick={()=>{setProposals(p=>p.map(pr=>pr.id===sel.id?{...pr,status:"accepted"}:pr));setSel(s=>({...s,status:"accepted"}));}}>Mark Accepted</Btn>
              <Btn variant="red" onClick={()=>{setProposals(p=>p.map(pr=>pr.id===sel.id?{...pr,status:"declined"}:pr));setSel(s=>({...s,status:"declined"}));}}>Mark Declined</Btn>
              <Btn variant="outline" onClick={()=>setSel(null)}>Close</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function Invoices({invoices,setInvoices,contacts,currentUser}){
  const [showAdd,setShowAdd]=useState(false);const [sel,setSel]=useState(null);
  const [form,setForm]=useState({number:"",contact:"",amount:"",status:"draft",dueDate:"",items:[{desc:"",qty:1,price:""}]});
  const myInvs=currentUser?.role==="sales"?invoices.filter(i=>i.owner===currentUser.name):invoices;
  const totalPaid=myInvs.filter(i=>i.status==="paid").reduce((a,b)=>a+b.amount,0);
  const totalOut=myInvs.filter(i=>i.status==="sent"||i.status==="overdue").reduce((a,b)=>a+b.amount,0);
  const add=()=>{
    if(!form.number||!form.contact)return;
    const amt=form.items.reduce((a,b)=>a+(Number(b.price)||0)*(Number(b.qty)||1),0);
    setInvoices(p=>[...p,{...form,id:Date.now(),amount:amt||Number(form.amount)||0,created:new Date().toISOString().split("T")[0],owner:currentUser?.name}]);
    setForm({number:"",contact:"",amount:"",status:"draft",dueDate:"",items:[{desc:"",qty:1,price:""}]});
    setShowAdd(false);
  };
  return(
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-gray-900">Invoices</h1></div>
        <Btn onClick={()=>setShowAdd(true)}><Plus size={14}/>New Invoice</Btn>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[["Total Paid","$"+totalPaid.toLocaleString(),"text-emerald-600","bg-emerald-50"],["Outstanding","$"+totalOut.toLocaleString(),"text-amber-600","bg-amber-50"],["Invoices",myInvs.length,"text-indigo-600","bg-indigo-50"]].map(([l,v,tc,bg])=>(
          <div key={l} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
            <div className={`${bg} p-2.5 rounded-xl`}><FileText size={16} className={tc}/></div>
            <div><p className="text-xs text-gray-400">{l}</p><p className="text-lg font-bold text-gray-900">{v}</p></div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {myInvs.map(inv=>(
            <div key={inv.id} onClick={()=>setSel(inv)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-900">{inv.number} · {inv.contact}</p><p className="text-xs text-gray-400">Due {inv.dueDate||"—"} · Created {inv.created}</p></div>
              <div className="text-right"><p className="text-sm font-semibold text-gray-900">${(inv.amount||0).toLocaleString()}</p><Bdg label={inv.status}/></div>
            </div>
          ))}
          {myInvs.length===0&&<div className="py-12 text-center text-sm text-gray-400">No invoices yet</div>}
        </div>
      </div>
      {showAdd&&(
        <Modal title="New Invoice" onClose={()=>setShowAdd(false)} wide>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Invoice #*" value={form.number} onChange={e=>setForm(f=>({...f,number:e.target.value}))} placeholder="INV-001"/>
              <Inp label="Contact / Company*" value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} placeholder="Acme Inc"/>
              <Sel label="Status" opts={["draft","sent","paid","overdue"]} value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}/>
              <Inp label="Due Date" type="date" value={form.dueDate} onChange={e=>setForm(f=>({...f,dueDate:e.target.value}))}/>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Line Items</p>
              {form.items.map((item,i)=>(
                <div key={i} className="grid grid-cols-5 gap-2 mb-2">
                  <div className="col-span-3"><input value={item.desc} onChange={e=>setForm(f=>({...f,items:f.items.map((it,j)=>j===i?{...it,desc:e.target.value}:it)}))} placeholder="Description" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"/></div>
                  <input value={item.qty} onChange={e=>setForm(f=>({...f,items:f.items.map((it,j)=>j===i?{...it,qty:e.target.value}:it)}))} placeholder="Qty" type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
                  <input value={item.price} onChange={e=>setForm(f=>({...f,items:f.items.map((it,j)=>j===i?{...it,price:e.target.value}:it)}))} placeholder="Price" type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
                </div>
              ))}
              <button onClick={()=>setForm(f=>({...f,items:[...f.items,{desc:"",qty:1,price:""}]}))} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">+ Add line</button>
            </div>
            <div className="text-right text-sm font-semibold text-gray-700">Total: ${form.items.reduce((a,b)=>a+(Number(b.price)||0)*(Number(b.qty)||1),0).toLocaleString()}</div>
            <div className="flex gap-2 pt-1"><Btn onClick={add}>Create Invoice</Btn><Btn variant="outline" onClick={()=>setShowAdd(false)}>Cancel</Btn></div>
          </div>
        </Modal>
      )}
      {sel&&(
        <Modal title={`Invoice ${sel.number}`} onClose={()=>setSel(null)} wide>
          <div className="space-y-4">
            <div className="flex items-center gap-3"><Bdg label={sel.status}/><span className="text-2xl font-bold text-gray-900">${(sel.amount||0).toLocaleString()}</span></div>
            <div className="grid grid-cols-2 gap-3">
              {[["Contact",sel.contact],["Due Date",sel.dueDate||"—"],["Created",sel.created],["Owner",sel.owner||"—"]].map(([l,v])=>(
                <div key={l} className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-400">{l}</p><p className="text-sm font-medium text-gray-800">{v}</p></div>
              ))}
            </div>
            {sel.items&&sel.items.length>0&&(
              <div><p className="text-xs font-semibold text-gray-500 mb-2">Line Items</p>
                <div className="divide-y divide-gray-50 border border-gray-100 rounded-xl overflow-hidden">
                  {sel.items.map((it,i)=>(
                    <div key={i} className="flex items-center justify-between px-3 py-2">
                      <p className="text-sm text-gray-700">{it.desc||"Item"}</p>
                      <p className="text-sm font-medium text-gray-900">{it.qty}x ${Number(it.price||0).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2">
              {sel.status!=="paid"&&<Btn variant="green" onClick={()=>{setInvoices(p=>p.map(i=>i.id===sel.id?{...i,status:"paid"}:i));setSel(s=>({...s,status:"paid"}));}}>Mark Paid</Btn>}
              <Btn variant="outline" onClick={()=>setSel(null)}>Close</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function Campaigns({campaigns,setCampaigns,contacts}){
  const [showAdd,setShowAdd]=useState(false);const [sel,setSel]=useState(null);
  const [form,setForm]=useState({name:"",type:"Email",status:"draft",subject:"",body:"",segment:"all",scheduledAt:""});
  const add=()=>{
    if(!form.name)return;
    setCampaigns(p=>[...p,{...form,id:Date.now(),sent:0,opened:0,clicked:0,created:new Date().toISOString().split("T")[0]}]);
    setForm({name:"",type:"Email",status:"draft",subject:"",body:"",segment:"all",scheduledAt:""});
    setShowAdd(false);
  };
  return(
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-gray-900">Campaigns</h1><p className="text-sm text-gray-400">{campaigns.length} campaigns</p></div>
        <Btn onClick={()=>setShowAdd(true)}><Plus size={14}/>New Campaign</Btn>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map(c=>{
          const openRate=c.sent?Math.round((c.opened/c.sent)*100):0;
          const clickRate=c.sent?Math.round((c.clicked/c.sent)*100):0;
          return(
            <div key={c.id} onClick={()=>setSel(c)} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md cursor-pointer transition-all hover:border-indigo-200">
              <div className="flex items-start justify-between mb-2"><p className="font-semibold text-gray-900 text-sm">{c.name}</p><Bdg label={c.status}/></div>
              <p className="text-xs text-gray-400 mb-3">{c.type} · {c.segment==="all"?"All contacts":c.segment}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[["Sent",c.sent],["Open %",`${openRate}%`],["Click %",`${clickRate}%`]].map(([l,v])=>(
                  <div key={l} className="bg-gray-50 rounded-lg py-2"><p className="text-xs text-gray-400">{l}</p><p className="text-sm font-bold text-gray-800">{v}</p></div>
                ))}
              </div>
            </div>
          );
        })}
        {campaigns.length===0&&<div className="col-span-3 py-16 text-center text-sm text-gray-400">No campaigns yet</div>}
      </div>
      {showAdd&&(
        <Modal title="New Campaign" onClose={()=>setShowAdd(false)} wide>
          <div className="space-y-3">
            <Inp label="Campaign Name*" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Q2 Outreach"/>
            <div className="grid grid-cols-2 gap-3">
              <Sel label="Type" opts={["Email","SMS","LinkedIn"]} value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}/>
              <Sel label="Status" opts={["draft","scheduled","active"]} value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}/>
              <Sel label="Segment" opts={[{v:"all",l:"All Contacts"},{v:"active",l:"Active"},{v:"prospect",l:"Prospects"}]} value={form.segment} onChange={e=>setForm(f=>({...f,segment:e.target.value}))}/>
              <Inp label="Scheduled At" type="datetime-local" value={form.scheduledAt} onChange={e=>setForm(f=>({...f,scheduledAt:e.target.value}))}/>
            </div>
            <Inp label="Subject" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} placeholder="Email subject line"/>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Body</label><textarea value={form.body} onChange={e=>setForm(f=>({...f,body:e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none" rows={4} placeholder="Campaign message…"/></div>
            <div className="flex gap-2 pt-1"><Btn onClick={add}>Create Campaign</Btn><Btn variant="outline" onClick={()=>setShowAdd(false)}>Cancel</Btn></div>
          </div>
        </Modal>
      )}
      {sel&&(
        <Modal title={sel.name} onClose={()=>setSel(null)} wide>
          <div className="space-y-4">
            <div className="flex items-center gap-2"><Bdg label={sel.status}/><Bdg label={sel.type}/></div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[["Sent",sel.sent],["Opened",sel.opened],["Clicked",sel.clicked]].map(([l,v])=>(
                <div key={l} className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-400">{l}</p><p className="text-2xl font-bold text-gray-900">{v}</p></div>
              ))}
            </div>
            {sel.subject&&<div className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-400 mb-1">Subject</p><p className="text-sm font-medium text-gray-800">{sel.subject}</p></div>}
            {sel.body&&<div className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-400 mb-1">Body</p><p className="text-sm text-gray-700 whitespace-pre-wrap">{sel.body}</p></div>}
            <Btn variant="outline" onClick={()=>setSel(null)}>Close</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function Integrations(){
  const [connected,setConnected]=useState({outlook:true,teams:true,whatsapp:false,quickbooks:false,xero:false,zapier:false,hubspot:false,salesforce:false});
  const integrations=[
    {key:"outlook",name:"Microsoft Outlook",desc:"Sync emails and send directly from CRM",icon:"📧",category:"Communication"},
    {key:"teams",name:"Microsoft Teams",desc:"Chat with contacts via Teams links",icon:"💬",category:"Communication"},
    {key:"whatsapp",name:"WhatsApp Business",desc:"Send WhatsApp messages from contact cards",icon:"📱",category:"Communication"},
    {key:"quickbooks",name:"QuickBooks",desc:"Sync invoices and payments",icon:"💰",category:"Finance"},
    {key:"xero",name:"Xero",desc:"Accounting and invoice management",icon:"📊",category:"Finance"},
    {key:"zapier",name:"Zapier",desc:"Connect 5000+ apps with no code",icon:"⚡",category:"Automation"},
    {key:"hubspot",name:"HubSpot",desc:"Import contacts and deals from HubSpot",icon:"🔶",category:"CRM"},
    {key:"salesforce",name:"Salesforce",desc:"Bi-directional Salesforce sync",icon:"☁️",category:"CRM"},
  ];
  const categories=[...new Set(integrations.map(i=>i.category))];
  return(
    <div className="p-6">
      <div className="mb-5"><h1 className="text-xl font-bold text-gray-900">Integrations</h1><p className="text-sm text-gray-400">Connect your tools to NexusCRM</p></div>
      {categories.map(cat=>(
        <div key={cat} className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{cat}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {integrations.filter(i=>i.category===cat).map(intg=>(
              <div key={intg.key} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="text-2xl mt-0.5">{intg.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{intg.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{intg.desc}</p>
                </div>
                <button onClick={()=>setConnected(p=>({...p,[intg.key]:!p[intg.key]}))} className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${connected[intg.key]?"bg-emerald-50 text-emerald-700 hover:bg-red-50 hover:text-red-600":"bg-indigo-50 text-indigo-700 hover:bg-indigo-100"}`}>
                  {connected[intg.key]?"Connected":"Connect"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AIAssistant({contacts,deals,currentUser}){
  const [prompt,setPrompt]=useState("");const [result,setResult]=useState("");const [loading,setLoading]=useState(false);const [tab,setTab]=useState("compose");
  const callClaude=async(prompt)=>{
    setLoading(true);setResult("");
    try{
      const r=await fetch("/api/ai.php",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt})});
      const d=await r.json();
      setResult(d.text||d.error||"No response received.");
    }catch(e){setResult("⚠️ Error connecting to AI.");}
    setLoading(false);
  };
  const templates=[
    {label:"Follow-up Email",prompt:"Write a professional follow-up email for a prospect who attended a demo last week. Keep it concise and focused on value."},
    {label:"Deal Coaching",prompt:`Analyze these deals and suggest which to prioritize: ${deals.slice(0,3).map(d=>`${d.name} ($${d.value}, ${d.stage})`).join(", ")}`},
    {label:"Objection Handling",prompt:"Give me 5 responses to the objection: 'We already have a solution for that.' Make them persuasive but not pushy."},
    {label:"Cold Outreach",prompt:"Write a cold outreach email for a B2B SaaS product targeting mid-market companies. Subject line + 3 paragraph email."},
    {label:"Proposal Summary",prompt:"Write an executive summary for a software proposal. Emphasize ROI, time-to-value, and reduced operational costs."},
    {label:"Meeting Agenda",prompt:"Create a discovery call agenda for a 30-minute meeting with a new enterprise prospect. Include open-ended questions."},
  ];
  return(
    <div className="p-6">
      <div className="flex items-center gap-2 mb-5"><Sparkles size={20} className="text-indigo-600"/><h1 className="text-xl font-bold text-gray-900">AI Assistant</h1></div>
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5 w-fit">
        {["compose","templates","insights"].map(t=><button key={t} onClick={()=>setTab(t)} className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${tab===t?"bg-white shadow-sm text-gray-900":"text-gray-500"}`}>{t}</button>)}
      </div>
      {tab==="compose"&&(
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Ask Claude anything — draft an email, analyze a deal, write a proposal…" className="w-full border-0 outline-none resize-none text-sm text-gray-700 placeholder-gray-300 min-h-24"/>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
              <span className="text-xs text-gray-300">{prompt.length} chars</span>
              <Btn onClick={()=>callClaude(prompt)} disabled={!prompt.trim()||loading}><Sparkles size={13}/>{loading?"Thinking…":"Generate"}</Btn>
            </div>
          </div>
          {result&&(
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3"><p className="text-xs font-semibold text-gray-500">AI Response</p><button onClick={()=>navigator.clipboard.writeText(result)} className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800"><Copy size={11}/>Copy</button></div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{result}</p>
            </div>
          )}
        </div>
      )}
      {tab==="templates"&&(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {templates.map(t=>(
            <button key={t.label} onClick={()=>{setTab("compose");setPrompt(t.prompt);}} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md hover:border-indigo-200 text-left transition-all">
              <p className="font-semibold text-gray-900 text-sm mb-1">{t.label}</p>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{t.prompt}</p>
            </button>
          ))}
        </div>
      )}
      {tab==="insights"&&(
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Pipeline Insights</p>
            <div className="space-y-2">
              {deals.filter(d=>d.stage==="Negotiation").slice(0,3).map(d=>(
                <div key={d.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl">
                  <div className="flex-1"><p className="text-sm font-medium text-gray-800">{d.name}</p><p className="text-xs text-gray-400">{d.company} · {d.stage}</p></div>
                  <div className="text-right"><p className="text-sm font-semibold text-gray-900">${d.value.toLocaleString()}</p></div>
                  <button onClick={()=>{setTab("compose");setPrompt(`Give me a coaching tip for closing this deal: "${d.name}" worth $${d.value} at ${d.company} currently in ${d.stage} stage.`);}} className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1.5 rounded-lg hover:bg-indigo-100 font-medium">Coach</button>
                </div>
              ))}
            </div>
          </div>
          <button onClick={()=>callClaude(`I have ${deals.length} deals in my pipeline worth $${deals.reduce((a,b)=>a+b.value,0).toLocaleString()} total. Win rate is ${deals.length?Math.round((deals.filter(d=>d.stage==="Closed Won").length/deals.length)*100):0}%. Give me 3 specific actions to improve my sales performance.`)} className="w-full bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-4 text-left hover:border-indigo-300 transition-colors">
            <div className="flex items-center gap-2 mb-1"><Sparkles size={14} className="text-indigo-600"/><p className="text-sm font-semibold text-indigo-700">Generate Pipeline Analysis</p></div>
            <p className="text-xs text-indigo-400">AI will analyze your current pipeline and suggest improvements</p>
          </button>
          {result&&(
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3"><p className="text-xs font-semibold text-gray-500">AI Analysis</p><button onClick={()=>navigator.clipboard.writeText(result)} className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800"><Copy size={11}/>Copy</button></div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{result}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function LeadForms({leadForms,setLeadForms,contacts,setContacts}){
  const [showCreate,setShowCreate]=useState(false);const [sel,setSel]=useState(null);const [preview,setPreview]=useState(false);
  const [form,setForm]=useState({name:"",fields:[...ALL_FIELDS.filter(f=>f.required)],primaryColor:"#6366f1",headline:"Get in touch",subheadline:"We'd love to hear from you.",submitText:"Submit"});
  const toggleField=(fId)=>setForm(f=>{const has=f.fields.find(x=>x.id===fId);return{...f,fields:has?f.fields.filter(x=>x.id!==fId):[...f.fields,ALL_FIELDS.find(x=>x.id===fId)]};});
  const create=()=>{if(!form.name)return;setLeadForms(p=>[...p,{...form,id:Date.now(),submissions:0,created:new Date().toISOString().split("T")[0]}]);setShowCreate(false);};
  return(
    <div className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div><h1 className="text-xl font-bold text-gray-900">Lead Forms</h1><p className="text-sm text-gray-400">Capture leads from your website</p></div>
        <Btn onClick={()=>setShowCreate(true)}><Plus size={14}/>Create Form</Btn>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {leadForms.map(f=>(
          <div key={f.id} onClick={()=>setSel(f)} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md cursor-pointer transition-all hover:border-indigo-200">
            <div className="flex items-start justify-between mb-3">
              <p className="font-semibold text-gray-900 text-sm">{f.name}</p>
              <div className="w-3 h-3 rounded-full" style={{backgroundColor:f.primaryColor||"#6366f1"}}/>
            </div>
            <p className="text-xs text-gray-400 mb-3">{f.fields?.length||0} fields · {f.submissions||0} submissions</p>
            <div className="flex items-center gap-2">
              <button onClick={e=>{e.stopPropagation();setSel(f);setPreview(true);}} className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"><Eye size={11}/>Preview</button>
              <button onClick={e=>{e.stopPropagation();const code=`<iframe src="/forms/${f.id}" width="100%" height="500" frameborder="0"></iframe>`;navigator.clipboard.writeText(code);}} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 font-medium"><Copy size={11}/>Embed</button>
            </div>
          </div>
        ))}
        {leadForms.length===0&&<div className="col-span-3 py-16 text-center text-sm text-gray-400">No forms yet — create your first lead form</div>}
      </div>
      {showCreate&&(
        <Modal title="Create Lead Form" onClose={()=>setShowCreate(false)} wide>
          <div className="space-y-4">
            <Inp label="Form Name*" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Contact Form"/>
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Headline" value={form.headline} onChange={e=>setForm(f=>({...f,headline:e.target.value}))}/>
              <Inp label="Submit Button Text" value={form.submitText} onChange={e=>setForm(f=>({...f,submitText:e.target.value}))}/>
            </div>
            <Inp label="Sub-headline" value={form.subheadline} onChange={e=>setForm(f=>({...f,subheadline:e.target.value}))}/>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Fields</p>
              <div className="grid grid-cols-2 gap-2">
                {ALL_FIELDS.map(fld=>(
                  <label key={fld.id} className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" checked={!!form.fields.find(x=>x.id===fld.id)} onChange={()=>!fld.required&&toggleField(fld.id)} disabled={fld.required} className="rounded"/>
                    <span className="text-sm text-gray-700">{fld.label}</span>
                    {fld.required&&<span className="text-xs text-gray-400 ml-auto">required</span>}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3"><label className="text-xs font-medium text-gray-500">Brand Color</label><input type="color" value={form.primaryColor} onChange={e=>setForm(f=>({...f,primaryColor:e.target.value}))} className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"/></div>
            <div className="flex gap-2 pt-1"><Btn onClick={create}>Create Form</Btn><Btn variant="outline" onClick={()=>setShowCreate(false)}>Cancel</Btn></div>
          </div>
        </Modal>
      )}
      {sel&&!preview&&(
        <Modal title={sel.name} onClose={()=>setSel(null)} wide>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[["Fields",sel.fields?.length||0],["Submissions",sel.submissions||0],["Created",sel.created]].map(([l,v])=>(
                <div key={l} className="bg-gray-50 rounded-xl p-3"><p className="text-xs text-gray-400">{l}</p><p className="text-sm font-medium text-gray-800">{v}</p></div>
              ))}
            </div>
            <div><p className="text-xs font-semibold text-gray-500 mb-2">Embed Code</p>
              <div className="bg-gray-900 rounded-xl p-3 font-mono text-xs text-green-400">{`<iframe src="/forms/${sel.id}" width="100%" height="500" frameborder="0"></iframe>`}</div>
              <button onClick={()=>navigator.clipboard.writeText(`<iframe src="/forms/${sel.id}" width="100%" height="500" frameborder="0"></iframe>`)} className="mt-2 flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"><Copy size={11}/>Copy embed code</button>
            </div>
            <div className="flex gap-2"><Btn onClick={()=>setPreview(true)}><Eye size={13}/>Preview Form</Btn><Btn variant="outline" onClick={()=>setSel(null)}>Close</Btn></div>
          </div>
        </Modal>
      )}
      {sel&&preview&&(
        <Modal title={`Preview: ${sel.name}`} onClose={()=>{setPreview(false);setSel(null);}} wide>
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <div className="p-6" style={{backgroundColor:sel.primaryColor||"#6366f1"}}>
              <h2 className="text-xl font-bold text-white">{sel.headline}</h2>
              <p className="text-white/80 text-sm mt-1">{sel.subheadline}</p>
            </div>
            <div className="p-5 space-y-3 bg-white">
              {(sel.fields||[]).map(fld=>(
                <div key={fld.id}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{fld.label}{fld.required&&<span className="text-red-400 ml-0.5">*</span>}</label>
                  {fld.type==="textarea"?<textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" rows={3}/>:fld.type==="select"?<select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"><option>Select…</option></select>:<input type={fld.type} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" placeholder={fld.label}/>}
                </div>
              ))}
              <button className="w-full py-2.5 rounded-xl text-white text-sm font-semibold" style={{backgroundColor:sel.primaryColor||"#6366f1"}}>{sel.submitText||"Submit"}</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function SettingsPage({currentUser,setCurrentUser,users,setUsers}){
  const [tab,setTab]=useState("profile");
  const [profile,setProfile]=useState({...currentUser});
  const [newUser,setNewUser]=useState({name:"",email:"",password:"",role:"sales",commissionRate:10});
  const saveProfile=()=>{ setCurrentUser(profile); setUsers(u=>u.map(x=>x.id===profile.id?profile:x)); };
  return(
    <div className="p-6">
      <div className="mb-5"><h1 className="text-xl font-bold text-gray-900">Settings</h1></div>
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5 w-fit flex-wrap">
        {["profile","users","commissions","notifications","billing"].map(t=><button key={t} onClick={()=>setTab(t)} className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${tab===t?"bg-white shadow-sm text-gray-900":"text-gray-500"}`}>{t}</button>)}
      </div>
      {tab==="profile"&&(
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 max-w-lg space-y-4">
          <div className="flex items-center gap-3 mb-2"><Av name={profile.name}/><div><p className="font-semibold text-gray-900">{profile.name}</p><Bdg label={profile.role}/></div></div>
          <div className="grid grid-cols-2 gap-3">
            <Inp label="Full Name" value={profile.name} onChange={e=>setProfile(p=>({...p,name:e.target.value}))}/>
            <Inp label="Email" value={profile.email} onChange={e=>setProfile(p=>({...p,email:e.target.value}))}/>
            <Inp label="Password" type="password" value={profile.password} onChange={e=>setProfile(p=>({...p,password:e.target.value}))}/>
            <Inp label="Phone" value={profile.phone||""} onChange={e=>setProfile(p=>({...p,phone:e.target.value}))}/>
          </div>
          <Btn onClick={saveProfile}>Save Changes</Btn>
        </div>
      )}
      {tab==="users"&&currentUser?.role==="admin"&&(
        <div className="space-y-4 max-w-2xl">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
            {users.map(u=>(
              <div key={u.id} className="flex items-center gap-3 px-4 py-3">
                <Av name={u.name} sm/>
                <div className="flex-1"><p className="text-sm font-medium text-gray-900">{u.name}</p><p className="text-xs text-gray-400">{u.email}</p></div>
                <Bdg label={u.role}/>
                {u.commissionRate!=null&&<span className="text-xs text-gray-400">{u.commissionRate}% comm</span>}
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"><UserPlus size={14}/>Add User</p>
            <div className="grid grid-cols-2 gap-3">
              <Inp label="Name" value={newUser.name} onChange={e=>setNewUser(p=>({...p,name:e.target.value}))}/>
              <Inp label="Email" value={newUser.email} onChange={e=>setNewUser(p=>({...p,email:e.target.value}))}/>
              <Inp label="Password" value={newUser.password} onChange={e=>setNewUser(p=>({...p,password:e.target.value}))}/>
              <Sel label="Role" opts={["admin","sales"]} value={newUser.role} onChange={e=>setNewUser(p=>({...p,role:e.target.value}))}/>
              <Inp label="Commission %" type="number" value={newUser.commissionRate} onChange={e=>setNewUser(p=>({...p,commissionRate:Number(e.target.value)}))}/>
            </div>
            <div className="mt-3"><Btn onClick={()=>{if(newUser.name&&newUser.email){setUsers(u=>[...u,{...newUser,id:Date.now()}]);setNewUser({name:"",email:"",password:"",role:"sales",commissionRate:10});}}}>Add User</Btn></div>
          </div>
        </div>
      )}
      {tab==="commissions"&&(
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 max-w-lg">
          <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2"><Percent size={14}/>Commission Rates</p>
          <div className="space-y-3">
            {users.filter(u=>u.role==="sales").map(u=>(
              <div key={u.id} className="flex items-center gap-3">
                <Av name={u.name} sm/>
                <p className="text-sm font-medium text-gray-800 flex-1">{u.name}</p>
                <div className="flex items-center gap-1.5">
                  <input type="number" value={u.commissionRate||0} onChange={e=>setUsers(p=>p.map(x=>x.id===u.id?{...x,commissionRate:Number(e.target.value)}:x))} className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 text-center"/>
                  <span className="text-sm text-gray-400">%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==="notifications"&&(
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 max-w-md space-y-3">
          {[["New lead assigned","Email + In-app"],["Deal stage changed","In-app"],["Invoice paid","Email + In-app"],["Task due today","In-app"],["Campaign sent","Email"]].map(([label,channels])=>(
            <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div><p className="text-sm font-medium text-gray-800">{label}</p><p className="text-xs text-gray-400">{channels}</p></div>
              <button className="w-10 h-6 bg-indigo-600 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"/></button>
            </div>
          ))}
        </div>
      )}
      {tab==="billing"&&(
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 max-w-md">
          <div className="flex items-center justify-between mb-4">
            <div><p className="font-semibold text-gray-900">Pro Plan</p><p className="text-xs text-gray-400">$49/month · Up to 10 users</p></div>
            <Bdg label="active"/>
          </div>
          <div className="space-y-2 mb-4">
            {[["Users",`${users.length} / 10`],["Contacts","Unlimited"],["Storage","10 GB"],["Next billing","Jul 1, 2024"]].map(([l,v])=>(
              <div key={l} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0"><span className="text-sm text-gray-500">{l}</span><span className="text-sm font-medium text-gray-800">{v}</span></div>
            ))}
          </div>
          <Btn variant="outline">Manage Billing</Btn>
        </div>
      )}
    </div>
  );
}
