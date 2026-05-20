import { useState, useEffect, useRef } from "react";
import {
  LoginPage, Dashboard, ContactDetail, Contacts, Companies, Pipeline,
  ActivitiesTasks, Proposals, Invoices, Campaigns, Integrations,
  AIAssistant, LeadForms, SettingsPage
} from "./components.jsx";
import { LayoutDashboard, Users, Building2, Layers, Activity, ClipboardList, FileText, Mail, Zap, Sparkles, LayoutGrid, Settings } from "lucide-react";

// Demo accounts shown on the login page (auth is server-side)
const DEMO_USERS = [
  { id:1, name:"Alex Morgan",  role:"admin", email:"alex@nexuscrm.io",   password:"admin123", commissionRate:0   },
  { id:2, name:"Sarah Chen",   role:"sales", email:"sarah@nexuscrm.io",  password:"sarah123", commissionRate:7.5 },
  { id:3, name:"James Wilson", role:"sales", email:"james@nexuscrm.io",  password:"james123", commissionRate:5.0 },
];

const NAV = [
  {id:"dashboard",    label:"Dashboard",    icon:LayoutDashboard},
  {id:"contacts",     label:"Contacts",     icon:Users},
  {id:"companies",    label:"Companies",    icon:Building2},
  {id:"pipeline",     label:"Pipeline",     icon:Layers},
  {id:"activities",   label:"Activities",   icon:Activity},
  {id:"proposals",    label:"Proposals",    icon:ClipboardList},
  {id:"invoices",     label:"Invoices",     icon:FileText},
  {id:"campaigns",    label:"Campaigns",    icon:Mail},
  {id:"integrations", label:"Integrations", icon:Zap},
  {id:"ai",           label:"AI Assistant", icon:Sparkles},
  {id:"leadforms",    label:"Lead Forms",   icon:LayoutGrid},
  {id:"settings",     label:"Settings",     icon:Settings},
];

// Detects adds/deletes/updates between two state snapshots and fires API calls.
// On add, updates local state with the server-assigned ID.
function syncDiff(endpoint, prev, next, rawSetter) {
  // Added
  next.filter(n => !prev.find(p => p.id === n.id)).forEach(async item => {
    try {
      const r = await fetch(`/api/${endpoint}.php`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!r.ok) return;
      const saved = await r.json();
      if (saved.id && saved.id !== item.id) {
        rawSetter(d => d.map(x => x.id === item.id ? { ...x, id: saved.id } : x));
      }
    } catch (e) { console.error(e); }
  });

  // Deleted
  prev.filter(p => !next.find(n => n.id === p.id)).forEach(item => {
    fetch(`/api/${endpoint}.php?id=${item.id}`, { method: "DELETE", credentials: "include" })
      .catch(console.error);
  });

  // Updated
  next.filter(n => {
    const old = prev.find(p => p.id === n.id);
    return old && JSON.stringify(old) !== JSON.stringify(n);
  }).forEach(item => {
    fetch(`/api/${endpoint}.php?id=${item.id}`, {
      method: "PUT", credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    }).catch(console.error);
  });
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [users,       setUsersRaw]       = useState([]);
  const [contacts,    setContactsRaw]    = useState([]);
  const [companies,   setCompaniesRaw]   = useState([]);
  const [deals,       setDealsRaw]       = useState([]);
  const [invoices,    setInvoicesRaw]    = useState([]);
  const [campaigns,   setCampaignsRaw]   = useState([]);
  const [activities,  setActivitiesRaw]  = useState([]);
  const [tasks,       setTasksRaw]       = useState([]);
  const [proposals,   setProposalsRaw]   = useState([]);
  const [notes,       setNotesRaw]       = useState([]);
  const dataReady = useRef(false);

  // Check for existing session on mount
  useEffect(() => {
    fetch("/api/auth.php", { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(u => { if (u && u.id) setCurrentUser(u); })
      .catch(() => {});
  }, []);

  // Load all data when user logs in
  useEffect(() => {
    if (!currentUser) return;
    dataReady.current = false;
    const load = (ep, setter) =>
      fetch(`/api/${ep}.php`, { credentials: "include" })
        .then(r => r.json()).then(data => setter(Array.isArray(data) ? data : []))
        .catch(() => {});
    Promise.all([
      load("users",       setUsersRaw),
      load("contacts",    setContactsRaw),
      load("companies",   setCompaniesRaw),
      load("deals",       setDealsRaw),
      load("invoices",    setInvoicesRaw),
      load("campaigns",   setCampaignsRaw),
      load("activities",  setActivitiesRaw),
      load("tasks",       setTasksRaw),
      load("proposals",   setProposalsRaw),
      load("notes",       setNotesRaw),
    ]).then(() => { dataReady.current = true; });
  }, [currentUser]);

  // Factory: wraps a raw setter to also sync changes to the API
  const makeSet = (rawSetter, endpoint) => updater => {
    rawSetter(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (dataReady.current) syncDiff(endpoint, prev, next, rawSetter);
      return next;
    });
  };

  const setUsers      = makeSet(setUsersRaw,      "users");
  const setContacts   = makeSet(setContactsRaw,   "contacts");
  const setCompanies  = makeSet(setCompaniesRaw,  "companies");
  const setDeals      = makeSet(setDealsRaw,       "deals");
  const setInvoices   = makeSet(setInvoicesRaw,    "invoices");
  const setCampaigns  = makeSet(setCampaignsRaw,   "campaigns");
  const setActivities = makeSet(setActivitiesRaw,  "activities");
  const setTasks      = makeSet(setTasksRaw,       "tasks");
  const setProposals  = makeSet(setProposalsRaw,   "proposals");
  const setNotes      = makeSet(setNotesRaw,       "notes");

  const login  = u  => { setCurrentUser(u); setPage("dashboard"); };
  const logout = () => {
    fetch("/api/auth.php", { method: "DELETE", credentials: "include" }).catch(() => {});
    setCurrentUser(null);
    dataReady.current = false;
    [setUsersRaw,setContactsRaw,setCompaniesRaw,setDealsRaw,setInvoicesRaw,
     setCampaignsRaw,setActivitiesRaw,setTasksRaw,setProposalsRaw,setNotesRaw]
      .forEach(s => s([]));
  };

  if (!currentUser) return <LoginPage onLogin={login} users={DEMO_USERS} />;

  const openTasks = tasks.filter(t =>
    (currentUser.role === "admin" || t.owner === currentUser.id) && t.status === "open"
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden" style={{fontFamily:"Inter,system-ui,sans-serif"}}>
      {/* Sidebar */}
      <div className="w-52 bg-white border-r border-gray-100 flex flex-col py-4 flex-shrink-0">
        <div className="px-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Settings size={15} className="text-white"/>
            </div>
            <span className="font-bold text-gray-900 text-sm">NexusCRM</span>
          </div>
        </div>
        <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                page === n.id
                  ? "bg-indigo-600 text-white font-medium shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}>
              <n.icon size={15}/>{n.label}
              {n.id === "activities" && openTasks.length > 0 && (
                <span className={`ml-auto text-xs rounded-full px-1.5 font-medium ${
                  page === n.id ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700"
                }`}>{openTasks.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-2 pt-3 border-t border-gray-50 space-y-1">
          <button onClick={() => setPage("settings")}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 bg-indigo-500`}>
              {(currentUser.name||"?").split(" ").map(n=>n[0]).join("").slice(0,2)}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">{currentUser.name}</p>
              <p className="text-xs text-gray-400 capitalize">{currentUser.role}{currentUser.commissionRate>0&&` · ${currentUser.commissionRate}%`}</p>
            </div>
          </button>
          <button onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all">
            <Settings size={13}/>Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-6xl mx-auto">
          {page==="dashboard"    && <Dashboard user={currentUser} users={users} contacts={contacts} deals={deals} invoices={invoices} activities={activities} tasks={tasks}/>}
          {page==="contacts"     && <Contacts user={currentUser} contacts={contacts} setContacts={setContacts} activities={activities} setActivities={setActivities} notes={notes} setNotes={setNotes}/>}
          {page==="companies"    && <Companies user={currentUser} companies={companies} setCompanies={setCompanies}/>}
          {page==="pipeline"     && <Pipeline user={currentUser} deals={deals} setDeals={setDeals}/>}
          {page==="activities"   && <ActivitiesTasks user={currentUser} activities={activities} setActivities={setActivities} tasks={tasks} setTasks={setTasks}/>}
          {page==="proposals"    && <Proposals proposals={proposals} setProposals={setProposals} setInvoices={setInvoices} setPage={setPage}/>}
          {page==="invoices"     && <Invoices invoices={invoices} setInvoices={setInvoices}/>}
          {page==="campaigns"    && <Campaigns campaigns={campaigns} setCampaigns={setCampaigns}/>}
          {page==="integrations" && <Integrations/>}
          {page==="ai"           && <AIAssistant contacts={contacts} deals={deals}/>}
          {page==="leadforms"    && <LeadForms contacts={contacts} setContacts={setContacts}/>}
          {page==="settings"     && <SettingsPage user={currentUser} users={users} setUsers={setUsers} deals={deals} onLogout={logout}/>}
        </div>
      </div>
    </div>
  );
}
