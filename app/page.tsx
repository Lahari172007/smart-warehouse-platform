'use client'

import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Boxes,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  Command,
  Download,
  Filter,
  Gauge,
  Inbox,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  PackageCheck,
  PanelLeft,
  Play,
  RefreshCw,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  Truck,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Orders', icon: ClipboardList, count: '248' },
  { label: 'Inventory', icon: Boxes, count: '12' },
  { label: 'Picking', icon: PackageCheck },
  { label: 'Exceptions', icon: ShieldAlert, count: '7' },
  { label: 'Analytics', icon: BarChart3 },
]

const orders = [
  { id: 'ORD-84921', customer: 'Northstar Retail', items: '14 items', value: '₹2,36,720', sla: '18m', score: 94, status: 'At risk', carrier: 'DHL Express' },
  { id: 'ORD-84917', customer: 'Canyon & Co.', items: '8 items', value: '₹1,03,420', sla: '42m', score: 87, status: 'Priority', carrier: 'UPS Ground' },
  { id: 'ORD-84896', customer: 'Morrow Studio', items: '22 items', value: '₹3,48,760', sla: '1h 12m', score: 76, status: 'Picking', carrier: 'FedEx 2Day' },
  { id: 'ORD-84882', customer: 'Hearth Supply', items: '6 items', value: '₹71,840', sla: '2h 04m', score: 61, status: 'Allocated', carrier: 'USPS Priority' },
]

const inventory = [
  { sku: 'ST-4420', name: 'Slate Utility Tote', zone: 'A-04', available: 18, reserved: 42, reorder: 30, forecast: '3.2 days', state: 'Low' },
  { sku: 'CM-9912', name: 'Canvas Market Bag', zone: 'B-12', available: 126, reserved: 28, reorder: 50, forecast: '18 days', state: 'Healthy' },
  { sku: 'KP-2088', name: 'Kitchen Prep Set', zone: 'C-02', available: 7, reserved: 24, reorder: 20, forecast: '0.8 days', state: 'Critical' },
  { sku: 'PL-1130', name: 'Packing Label Roll', zone: 'D-01', available: 340, reserved: 10, reorder: 120, forecast: '26 days', state: 'Healthy' },
]

const waves = [
  { id: 'WAVE-024', zone: 'A / B', orders: 42, progress: 72, picker: 'Team Alpha', eta: '14 min', state: 'Active' },
  { id: 'WAVE-025', zone: 'C', orders: 28, progress: 35, picker: 'Team Delta', eta: '31 min', state: 'Active' },
  { id: 'WAVE-026', zone: 'D / E', orders: 64, progress: 0, picker: 'Unassigned', eta: '48 min', state: 'Ready' },
]

const exceptions = [
  { id: 'EX-2024', type: 'Short pick', order: 'ORD-84921', detail: 'KP-2088 · expected 4, found 2', severity: 'Critical', age: '4m' },
  { id: 'EX-2021', type: 'Address review', order: 'ORD-84917', detail: 'Unit number missing from address', severity: 'High', age: '18m' },
  { id: 'EX-2016', type: 'Damaged item', order: 'ORD-84896', detail: 'CM-9912 · carton damage reported', severity: 'Medium', age: '42m' },
]

const activity = [
  ['09:42', 'Allocation recommendation applied', 'ORD-84882 reserved 6 units from B-12', 'success'],
  ['09:38', 'Wave WAVE-024 started', '42 orders assigned to Team Alpha', 'info'],
  ['09:31', 'Stockout risk detected', 'KP-2088 projected to run out in 0.8 days', 'warning'],
  ['09:18', 'Exception escalated', 'EX-2016 sent to Inventory Lead', 'danger'],
]

function MetricCard({ label, value, detail, trend, icon: Icon, tone = 'blue' }: { label: string; value: string; detail: string; trend?: string; icon: typeof Gauge; tone?: string }) {
  return <div className="metric-card">
    <div className={`metric-icon ${tone}`}><Icon size={18} /></div>
    <div className="metric-copy"><p>{label}</p><strong>{value}</strong><span className={trend?.startsWith('-') ? 'negative' : 'positive'}>{trend && (trend.startsWith('-') ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />)}{trend} {detail}</span></div>
  </div>
}

function StatusBadge({ children }: { children: string }) {
  const critical = ['Critical', 'At risk', 'High'].includes(children)
  const success = ['Healthy', 'Ready', 'Resolved'].includes(children)
  return <Badge variant="outline" className={`status-badge ${critical ? 'critical' : success ? 'success' : ''}`}>{children}</Badge>
}

export default function Page() {
  const [active, setActive] = useState('Overview')
  const [role, setRole] = useState('Warehouse manager')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [simulatorOpen, setSimulatorOpen] = useState(false)
  const [applied, setApplied] = useState(false)
  const [resolved, setResolved] = useState<string[]>([])
  const [search, setSearch] = useState('')

  const filteredOrders = useMemo(() => orders.filter((order) => !search || `${order.id} ${order.customer}`.toLowerCase().includes(search.toLowerCase())), [search])
  const visibleExceptions = exceptions.filter((item) => !resolved.includes(item.id))

  const resolveException = (id: string) => setResolved((current) => [...current, id])

  return <main className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Zap size={18} fill="currentColor" /></div><div><strong>Fulfill<span>OS</span></strong><small>Control tower</small></div><button className="close-mobile" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18} /></button></div>
      <div className="site-select"><span className="live-dot" /> <div><small>Active site</small><strong>Newark · WH-04</strong></div><ChevronDown size={15} /></div>
      <nav aria-label="Primary navigation"><p className="nav-label">Workspace</p>{navItems.map(({ label, icon: Icon, count }) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => { setActive(label); setMobileOpen(false) }}><Icon size={17} /><span>{label}</span>{count && <em>{label === 'Exceptions' ? visibleExceptions.length : count}</em>}</button>)}</nav>
      <div className="sidebar-bottom"><button className="nav-item"><Settings size={17} /><span>Settings</span></button><div className="upgrade-card"><Sparkles size={17} /><strong>Decision engine</strong><p>Recommendations are live and learning from your operation.</p><button>View insights <ArrowUpRight size={13} /></button></div><div className="user-mini"><div className="avatar">AL</div><div><strong>Alex Lee</strong><small>Operations lead</small></div><MoreHorizontal size={16} /></div></div>
    </aside>
    <section className="content">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><div className="breadcrumb"><span>Warehouse</span><span>/</span><strong>{active}</strong></div></div><div className="topbar-actions"><div className="global-search"><Search size={16} /><input placeholder="Search orders, SKUs, waves..." value={search} onChange={(event) => setSearch(event.target.value)} /><kbd><Command size={11} /> K</kbd></div><button className="icon-button" aria-label="Notifications"><Bell size={18} /><i /></button><div className="role-switch"><Users size={15} /><select value={role} onChange={(event) => setRole(event.target.value)} aria-label="Switch role"><option>Warehouse manager</option><option>Inventory lead</option><option>Picker</option></select></div></div></header>
      <div className="page-content">
        {active === 'Overview' && <>
          <div className="hero-command"><div className="page-heading"><div><div className="eyebrow"><span className="live-dot" /> Live operations · Updated just now</div><h1>Good morning, Alex.</h1><p>FulfillOS is protecting margin and momentum across Newark today.</p></div><div className="heading-actions"><Button variant="outline" onClick={() => setSimulatorOpen(true)}><Sparkles data-icon="inline-start" /> Allocation simulator</Button><Button onClick={() => setActive('Analytics')}><BarChart3 data-icon="inline-start" /> View report</Button></div></div><div className="hero-insight"><div className="hero-signal"><span className="signal-orbit"><Zap size={17} /></span><div><strong>Command center online</strong><p>6 live signals are aligned. Recommended next move: protect KP-2088 inventory before the 10:30 carrier wave.</p></div></div><div className="hero-readout"><span>Network health</span><strong>87<span>/100</span></strong><small><span className="live-dot" /> Stable</small></div></div></div>
          <div className="metrics-grid"><MetricCard label="Orders today" value="1,284" trend="+12.8%" detail="vs. last Tuesday" icon={ClipboardList} /><MetricCard label="Fulfillment rate" value="94.6%" trend="+2.4%" detail="above target" icon={Gauge} tone="green" /><MetricCard label="At-risk orders" value="18" trend="-6" detail="since 8:00 AM" icon={Clock3} tone="amber" /><MetricCard label="Open exceptions" value={`${visibleExceptions.length + 4}`} trend="-18.2%" detail="vs. yesterday" icon={AlertTriangle} tone="red" /></div>
          <div className="section-grid"><div className="panel pipeline-panel"><div className="panel-heading"><div><h2>Fulfillment pipeline</h2><p>1,284 orders across today&apos;s shift</p></div><button className="text-button" onClick={() => setActive('Orders')}>View orders <ArrowUpRight size={14} /></button></div><div className="pipeline"><div className="pipeline-track"><span style={{ width: '82%' }} /></div>{[['Created','1,284','100%'],['Allocated','1,102','86%'],['Picking','684','62%'],['Packing','412','60%'],['Dispatched','286','69%']].map(([label,value,percent]) => <div className="pipeline-step" key={label}><div className="pipeline-dot" /><strong>{value}</strong><span>{label}</span><small>{percent}</small></div>)}</div><div className="chart-wrap"><div className="chart-label"><span>Orders processed</span><strong>+18.4% <ArrowUpRight size={13} /></strong></div><div className="bar-chart">{[42,56,48,68,61,74,69,82,77,91,84,96,88,100,94,86,98,89,105,97,110,102,116,108].map((height, i) => <span key={i} style={{ height: `${height / 1.25}px` }} className={i > 19 ? 'current' : ''} />)}</div><div className="chart-axis"><span>6 AM</span><span>12 PM</span><span>6 PM</span></div></div></div><div className="panel health-panel"><div className="panel-heading"><div><h2>Operational health</h2><p>Based on 6 live signals</p></div><button className="icon-button"><MoreHorizontal size={17} /></button></div><div className="health-score"><div className="score-ring"><strong>87</strong><span>/ 100</span></div><div><strong>Running smoothly</strong><p>Above your 80 target</p><span className="positive"><ArrowUpRight size={13} /> 4.2% this shift</span></div></div><div className="signal-list">{[['Fulfillment SLA','96%','good'],['Inventory coverage','82%','watch'],['Pick productivity','91%','good'],['Exception velocity','74%','watch']].map(([label,value,state]) => <div className="signal" key={label}><span>{label}</span><div className="signal-bar"><i className={state} style={{ width: value }} /></div><strong>{value}</strong></div>)}</div><button className="full-button" onClick={() => setActive('Analytics')}>Open health report <ArrowUpRight size={14} /></button></div></div>
          <div className="section-grid lower"><div className="panel decision-panel"><div className="panel-heading"><div><div className="title-with-badge"><h2>Decision queue</h2><Badge>4 actions</Badge></div><p>Recommended next actions, ranked by business impact</p></div><button className="text-button">See all <ArrowUpRight size={14} /></button></div><div className="decision-list">{[['Protect stock for ORD-84921','KP-2088 is short by 2 units. Reallocate from ORD-84882 to protect a ₹2,36,720 order.','Critical','94'],['Resolve address exception','ORD-84917 cannot dispatch until the missing unit number is confirmed.','High','87'],['Start next pick wave','WAVE-026 is ready with 64 orders. Assign Team Echo to clear the D/E bottleneck.','Recommended','81']].map(([title,desc,status,score], i) => <div className="decision" key={title}><div className={`decision-icon ${i === 0 ? 'danger' : i === 1 ? 'warning' : 'blue'}`}>{i === 0 ? <ShieldAlert size={17} /> : i === 1 ? <AlertTriangle size={17} /> : <Play size={16} />}</div><div className="decision-body"><div><strong>{title}</strong><StatusBadge>{status}</StatusBadge></div><p>{desc}</p><div className="decision-meta"><span>Impact score <b>{score}</b></span><button onClick={() => i === 0 ? setSimulatorOpen(true) : i === 1 ? setActive('Exceptions') : setActive('Picking')}>{i === 0 ? 'Simulate' : i === 1 ? 'Review exception' : 'Start wave'} <ArrowUpRight size={13} /></button></div></div></div>)}</div></div><div className="panel activity-panel"><div className="panel-heading"><div><h2>Live activity</h2><p>Operator actions and system events</p></div><button className="icon-button"><RefreshCw size={16} /></button></div><div className="activity-list">{activity.map(([time,title,detail,tone]) => <div className="activity" key={title}><span className={`activity-dot ${tone}`} /><div><strong>{title}</strong><p>{detail}</p></div><time>{time}</time></div>)}</div><button className="full-button">View audit history <ArrowUpRight size={14} /></button></div></div>
        </>}
        {active === 'Orders' && <View title="Orders" eyebrow="Fulfillment workspace" description="Prioritize, allocate, and track every order in the operation." icon={ClipboardList}><div className="toolbar"><div className="filter-search"><Search size={16} /><input placeholder="Filter orders..." value={search} onChange={(event) => setSearch(event.target.value)} /></div><Button variant="outline"><Filter data-icon="inline-start" /> Filters</Button><Button><Download data-icon="inline-start" /> Export</Button></div><div className="panel table-panel"><TableHeader columns={['Order / customer','Value','SLA remaining','Priority score','Carrier','Status']} />{filteredOrders.map((order) => <div className="table-row" key={order.id}><div><strong>{order.id}</strong><span>{order.customer} · {order.items}</span></div><strong>{order.value}</strong><span className={order.sla === '18m' ? 'negative' : ''}><Clock3 size={13} /> {order.sla}</span><div className="score-pill">{order.score}</div><span>{order.carrier}</span><StatusBadge>{order.status}</StatusBadge></div>)}</div></View>}
        {active === 'Inventory' && <View title="Inventory intelligence" eyebrow="Stock health" description="See what is available, what is reserved, and what will run out next." icon={Boxes}><div className="inventory-callout"><Sparkles size={19} /><div><strong>2 replenishment actions recommended</strong><p>Based on projected demand, supplier lead time, and reserved stock.</p></div><Button size="sm" onClick={() => setApplied(true)}>{applied ? 'Requests sent' : 'Review all'}</Button></div><div className="inventory-grid">{inventory.map((item) => <div className="inventory-card" key={item.sku}><div className="inventory-card-top"><div className="sku-icon"><Boxes size={18} /></div><StatusBadge>{item.state}</StatusBadge></div><span className="muted-label">{item.sku} · Zone {item.zone}</span><h3>{item.name}</h3><div className="stock-numbers"><div><strong>{item.available}</strong><span>Available</span></div><div><strong>{item.reserved}</strong><span>Reserved</span></div><div><strong>{item.reorder}</strong><span>Reorder pt.</span></div></div><div className="stock-bar"><i style={{ width: `${Math.min(100, item.available / (item.reorder * 2) * 100)}%` }} /></div><div className="inventory-footer"><span><Clock3 size={13} /> Stockout in <b>{item.forecast}</b></span>{item.state !== 'Healthy' && <button onClick={() => setApplied(true)}>{applied ? <Check size={13} /> : <RefreshCw size={13} />} {applied ? 'Requested' : 'Reorder'}</button>}</div></div>)}</div></View>}
        {active === 'Picking' && <View title="Picking workspace" eyebrow="Floor operations" description="Optimize waves, balance zones, and keep pickers moving." icon={PackageCheck}><div className="picking-top"><div className="panel pick-summary"><div className="panel-heading"><div><h2>Zone congestion</h2><p>Live floor density by warehouse zone</p></div><Badge variant="outline" className="success">Normal</Badge></div><div className="zone-map">{['A','B','C','D','E','F','G','H','I','J','K','L'].map((zone,i) => <div key={zone} className={`zone z${i % 4}`}><span>{zone}</span><small>{12 + i * 3}</small></div>)}</div><div className="zone-legend"><span><i className="low" /> Low</span><span><i className="mid" /> Moderate</span><span><i className="high" /> Congested</span></div></div><div className="panel pick-kpis"><MetricCard label="Pick rate" value="148/hr" trend="+8.4%" detail="vs. target" icon={Zap} tone="green" /><MetricCard label="Active pickers" value="24/28" detail="4 available" icon={Users} tone="blue" /><MetricCard label="Blocked tasks" value="6" trend="-3" detail="last hour" icon={ShieldAlert} tone="amber" /></div></div><div className="panel table-panel"><div className="panel-heading"><div><h2>Active waves</h2><p>Recommended sequence accounts for zone congestion</p></div><Button onClick={() => setApplied(true)}><Play data-icon="inline-start" /> {applied ? 'Wave started' : 'Start recommended wave'}</Button></div><TableHeader columns={['Wave','Zones','Orders','Progress','Team','ETA','Status']} />{waves.map((wave) => <div className="table-row" key={wave.id}><strong>{wave.id}</strong><span>{wave.zone}</span><strong>{wave.orders}</strong><div className="progress-cell"><div className="mini-progress"><i style={{ width: `${wave.progress}%` }} /></div><span>{wave.progress}%</span></div><span>{wave.picker}</span><span>{wave.eta}</span><StatusBadge>{wave.state}</StatusBadge></div>)}</div></View>}
        {active === 'Exceptions' && <View title="Exception command center" eyebrow="Needs attention" description="Resolve issues before they become customer-impacting delays." icon={ShieldAlert}><div className="exception-summary"><div><strong>{visibleExceptions.length}</strong><span>open exceptions</span></div><div><strong>18m</strong><span>avg. response time</span></div><div><strong>94%</strong><span>resolved within SLA</span></div></div><div className="exception-list">{visibleExceptions.map((item) => <div className="panel exception-card" key={item.id}><div className={`exception-icon ${item.severity.toLowerCase()}`}><AlertTriangle size={19} /></div><div className="exception-detail"><div className="exception-title"><div><StatusBadge>{item.severity}</StatusBadge><strong>{item.type}</strong></div><time>{item.age} ago</time></div><p>{item.order} · {item.detail}</p><div className="exception-actions"><Button size="sm" onClick={() => resolveException(item.id)}><Check data-icon="inline-start" /> Resolve</Button><Button size="sm" variant="outline">Escalate <ArrowUpRight data-icon="inline-end" /></Button><button className="text-button">View order</button></div></div></div>)}</div></View>}
        {active === 'Analytics' && <View title="Operational analytics" eyebrow="Performance intelligence" description="A clear view of throughput, efficiency, and the constraints shaping your shift." icon={BarChart3}><div className="analytics-toolbar"><div className="toggle-group"><button className="selected">Today</button><button>7 days</button><button>30 days</button></div><Button variant="outline" onClick={() => setApplied(true)}><Download data-icon="inline-start" /> {applied ? 'Report ready' : 'Export report'}</Button></div><div className="analytics-grid"><div className="panel large-chart"><div className="panel-heading"><div><h2>Throughput & SLA</h2><p>Orders processed compared with promised dispatch</p></div><div className="chart-legend"><span><i /> Processed</span><span><i /> SLA target</span></div></div><div className="line-chart"><div className="grid-lines"><i /><i /><i /><i /></div><svg viewBox="0 0 600 180" preserveAspectRatio="none" aria-label="Throughput trend chart"><polyline points="0,140 55,122 110,132 165,92 220,105 275,72 330,80 385,48 440,62 495,28 550,42 600,16" fill="none" stroke="currentColor" strokeWidth="3" /><polyline points="0,118 55,112 110,106 165,100 220,94 275,88 330,82 385,76 440,70 495,64 550,58 600,52" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 6" opacity=".35" /></svg></div><div className="chart-axis"><span>6 AM</span><span>9 AM</span><span>12 PM</span><span>3 PM</span><span>6 PM</span></div></div><div className="panel ranking-panel"><div className="panel-heading"><div><h2>Bottleneck ranking</h2><p>Where the next intervention matters most</p></div></div>{[['C zone picking','38%','critical'],['Address verification','24%','watch'],['Packing station 04','18%','watch'],['Carrier pickup window','12%','good']].map(([label,value,state],i) => <div className="ranking" key={label}><span className="rank-number">0{i+1}</span><div><strong>{label}</strong><div className="ranking-bar"><i className={state} style={{ width: value }} /></div></div><b>{value}</b></div>)}</div></div></View>}
      </div>
    </section>
    {simulatorOpen && <div className="modal-backdrop" role="presentation" onClick={() => setSimulatorOpen(false)}><div className="simulator-modal" role="dialog" aria-modal="true" aria-labelledby="simulator-title" onClick={(event) => event.stopPropagation()}><div className="modal-heading"><div className="modal-icon"><Sparkles size={18} /></div><div><h2 id="simulator-title">Allocation simulator</h2><p>Test a recommendation before changing live inventory.</p></div><button className="icon-button" onClick={() => setSimulatorOpen(false)} aria-label="Close simulator"><X size={18} /></button></div><div className="simulator-order"><span>Constrained order</span><strong>ORD-84921 · Northstar Retail</strong><Badge className="critical">KP-2088 short by 2 units</Badge></div><label className="select-label">Allocation strategy<select defaultValue="priority"><option value="priority">Protect highest priority order</option><option value="dispatch">Earliest dispatch first</option><option value="split">Split shipment across stock</option></select></label><div className="simulation-results"><div><span>Fill rate</span><strong>{applied ? '100%' : '92%'}</strong><small className="positive">+8 pts</small></div><div><span>Orders affected</span><strong>{applied ? '1' : '2'}</strong><small>−1 order</small></div><div><span>SLA risk</span><strong>{applied ? 'Low' : 'High'}</strong><small className="positive">Improves</small></div></div><div className="recommendation"><Sparkles size={16} /><div><strong>Recommended action</strong><p>Reallocate 2 units from ORD-84882. This protects the higher-value order and keeps the secondary order within its 2-hour SLA.</p></div></div><div className="modal-actions"><Button variant="outline" onClick={() => setSimulatorOpen(false)}>Cancel</Button><Button onClick={() => { setApplied(true); setSimulatorOpen(false) }}><Check data-icon="inline-start" /> Apply recommendation</Button></div></div></div>}
  </main>
}

function View({ title, eyebrow, description, icon: Icon, children }: { title: string; eyebrow: string; description: string; icon: typeof Boxes; children: React.ReactNode }) {
  return <><div className="page-heading inner"><div><div className="eyebrow"><Icon size={14} /> {eyebrow}</div><h1>{title}</h1><p>{description}</p></div></div>{children}</>
}
function TableHeader({ columns }: { columns: string[] }) { return <div className="table-header">{columns.map((column) => <span key={column}>{column}</span>)}</div> }
