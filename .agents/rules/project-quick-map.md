# WASTESENSE - Rapid Modification & Architecture Cheat Sheet

Use this cheat sheet to jump DIRECTLY to the correct file without searching or running exploratory commands.

---

## 1. Quick Feature-to-File Matrix (Instant Jump)

| User Request / UI Section | Exact Target File | Description |
|---|---|---|
| **Landing Hero / Taglines / Main CTA** | `components/landing/LandingHero.tsx` | Top banner, headline, CTA button, hero dashboard preview |
| **Landing Metrics Bar** | `components/landing/LandingMetrics.tsx` | Real-time operational stats ticker below hero |
| **Landing Bento Grid (Features)** | `components/landing/LandingBento.tsx` | Feature highlights, AI engine, smart routing, citizen trust |
| **Landing 4-Stage Lifecycle** | `components/landing/LandingLifecycle.tsx` | Detect -> Dispatch -> Verify -> Analytics workflow steps |
| **Landing Role Portals** | `components/landing/LandingRolePortals.tsx` | 3 cards linking to Admin, Citizen, and Worker portals |
| **Landing Navbar / Header** | `components/landing/LandingNavbar.tsx` | Top navigation bar with logo, links, and Login button |
| **Landing Footer** | `components/landing/LandingFooter.tsx` | Footer links and copyright |
| **Login / Authentication** | `app/login/page.tsx` | Role selector tabs (Admin, Citizen, Worker), login inputs, demo credentials |
| **Global Header / Topbar** | `components/dashboard/Header.tsx` | Top navigation bar inside Admin/Citizen portals, alerts pill, profile dropdown |
| **Admin Sidebar** | `components/dashboard/Sidebar.tsx` | Left navigation menu for all Admin modules |
| **Citizen Sidebar** | `components/citizen/CitizenSidebar.tsx` | Left navigation menu for Citizen portal |
| **Worker Mobile Nav / Header** | `components/worker/WorkerNav.tsx` | Top sticky mobile navbar for Worker portal |
| **Smart Bin Simulation Modal** | `components/admin/SmartBinSimulatorModal.tsx` | Interactive fill-level, weight, temperature sensor slider modal |
| **Worker Camera & Task Completion** | `components/worker/CompleteTaskModal.tsx` | Photo proof upload modal for resolving collection tasks |
| **Global State & Supabase Sync** | `context/WasteSenseContext.tsx` | React Context holding all bins, complaints, tasks, workers, vehicles, logs |
| **Initial Mock Data** | `data/mockData.ts` | Default seed datasets (12 bins, 8 complaints, tasks, workers, vehicles, analytics) |
| **TypeScript Definitions** | `types/index.ts` | Interfaces for SmartBin, Complaint, CollectionTask, Worker, Vehicle, etc. |
| **Global Theme & CSS** | `app/globals.css` | Tailwind base, custom scrollbars, dark theme background colors |
| **Supabase Client & Service** | `lib/supabaseClient.ts` & `lib/supabaseService.ts` | Remote DB connection and sync layer |

---

## 2. Route-to-Page Map

### Admin Portal (`/admin/*`)
- `/admin/dashboard` ➔ `app/admin/dashboard/page.tsx` (KPI cards, priority list, operational summary)
- `/admin/smart-bins` ➔ `app/admin/smart-bins/page.tsx` (IoT digital twin grid & sensor monitor)
- `/admin/tasks` ➔ `app/admin/tasks/page.tsx` (Dispatch queue, task assignment)
- `/admin/complaints` ➔ `app/admin/complaints/page.tsx` (Citizen issue triage table)
- `/admin/map` ➔ `app/admin/map/page.tsx` (Interactive hotspot & vehicle tracking map)
- `/admin/ai` ➔ `app/admin/ai/page.tsx` (Priority scoring algorithm engine & telemetry analysis)
- `/admin/analytics` ➔ `app/admin/analytics/page.tsx` (Recharts trend graphs, SLA charts, landfill diversion)
- `/admin/pickups` ➔ `app/admin/pickups/page.tsx` (Completed collection logs & audit history)
- `/admin/workers` ➔ `app/admin/workers/page.tsx` (Sanitation worker fleet directory)
- `/admin/vehicles` ➔ `app/admin/vehicles/page.tsx` (Collection truck fleet monitor)
- `/admin/settings` ➔ `app/admin/settings/page.tsx` (Thresholds, telemetry jitter, API keys)
- `/admin/notifications` ➔ `app/admin/notifications/page.tsx` (Critical sensor alerts feed)

### Citizen Portal (`/citizen/*`)
- `/citizen/dashboard` ➔ `app/citizen/dashboard/page.tsx` (Citizen overview, quick stats, active tickets)
- `/citizen/report` ➔ `app/citizen/report/page.tsx` (Submit garbage complaint form with photo & GPS)
- `/citizen/complaints` ➔ `app/citizen/complaints/page.tsx` (Track submitted ticket timeline & status)
- `/citizen/bins` ➔ `app/citizen/bins/page.tsx` (Nearby smart bins lookup with fill indicators)
- `/citizen/pickup` ➔ `app/citizen/pickup/page.tsx` (Request special bulk / recyclable pickup)
- `/citizen/awareness` ➔ `app/citizen/awareness/page.tsx` (Waste segregation interactive guide)
- `/citizen/profile` ➔ `app/citizen/profile/page.tsx` (User profile & eco-points score)

### Field Worker Portal (`/worker/*`)
- `/worker/dashboard` ➔ `app/worker/dashboard/page.tsx` (Worker shift dashboard, quick actions, active task)
- `/worker/tasks` ➔ `app/worker/tasks/page.tsx` (Assigned route task cards queue)
- `/worker/task/[id]` ➔ `app/worker/task/[id]/page.tsx` (Task detail view, route navigation, proof submission)
- `/worker/profile` ➔ `app/worker/profile/page.tsx` (Worker metrics, vehicle assignment, shift status)

---

## 3. Rapid Change Workflow Guidelines

1. **NO Redundant File Scans**: Never grep or search the directory when a user asks for a known component or page. Reference the table above and jump directly to the target file.
2. **Surgical Edits**: Use `replace_file_content` targeting only the lines that need updating.
3. **Keep State Centralized**: All operational data mutations belong in `context/WasteSenseContext.tsx`.
4. **Use `@/` Path Alias**: Always import using `@/components`, `@/context`, `@/data`, `@/types`.
