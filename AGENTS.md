<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# WASTESENSE - Rapid Modification Index

When the user asks to modify any screen, component, logic, or feature, jump DIRECTLY to these files without searching or scanning:

### Landing Page & Public Screens
- **Hero / Header / CTA**: `components/landing/LandingHero.tsx`
- **Live Metrics Bar**: `components/landing/LandingMetrics.tsx`
- **Bento Grid Features**: `components/landing/LandingBento.tsx`
- **4-Stage Lifecycle**: `components/landing/LandingLifecycle.tsx`
- **Role Portals Cards**: `components/landing/LandingRolePortals.tsx`
- **Navbar & Navigation**: `components/landing/LandingNavbar.tsx`
- **Footer**: `components/landing/LandingFooter.tsx`
- **Login Screen**: `app/login/page.tsx`

### Admin Operations Portal (`/admin/*`)
- **Dashboard & KPIs**: `app/admin/dashboard/page.tsx`
- **Smart Bins Fleet**: `app/admin/smart-bins/page.tsx`
- **Sensor Simulator Modal**: `components/admin/SmartBinSimulatorModal.tsx`
- **Smart Bin Card**: `components/admin/SmartBinCard.tsx`
- **Dispatch Tasks**: `app/admin/tasks/page.tsx` & `components/admin/TaskCard.tsx`
- **Citizen Complaints**: `app/admin/complaints/page.tsx` & `components/admin/ComplaintTable.tsx`
- **Hotspot Map**: `app/admin/map/page.tsx` & `components/admin/MapPanel.tsx`
- **AI Decision Engine**: `app/admin/ai/page.tsx`
- **Analytics & Charts**: `app/admin/analytics/page.tsx`
- **Fleet & Workers**: `app/admin/vehicles/page.tsx`, `app/admin/workers/page.tsx`
- **Settings & Config**: `app/admin/settings/page.tsx`
- **Header & Sidebar**: `components/dashboard/Header.tsx`, `components/dashboard/Sidebar.tsx`

### Citizen Portal (`/citizen/*`)
- **Citizen Dashboard**: `app/citizen/dashboard/page.tsx`
- **Report Issue**: `app/citizen/report/page.tsx`
- **Track Complaints**: `app/citizen/complaints/page.tsx`
- **Nearby Bins**: `app/citizen/bins/page.tsx`
- **Special Pickup**: `app/citizen/pickup/page.tsx`
- **Awareness Guide**: `app/citizen/awareness/page.tsx`
- **Citizen Profile**: `app/citizen/profile/page.tsx`
- **Citizen Sidebar**: `components/citizen/CitizenSidebar.tsx`

### Field Worker Portal (`/worker/*`)
- **Worker Dashboard**: `app/worker/dashboard/page.tsx`
- **Task Queue**: `app/worker/tasks/page.tsx`
- **Task Resolution & Proof Modal**: `components/worker/CompleteTaskModal.tsx`
- **Task Detail & Nav**: `app/worker/task/[id]/page.tsx`
- **Worker Topbar**: `components/worker/WorkerNav.tsx`

### Core State & Data
- **Global Store (React Context)**: `context/WasteSenseContext.tsx`
- **Initial Mock Data**: `data/mockData.ts`
- **TypeScript Data Models**: `types/index.ts`
- **Remote DB & Realtime**: `lib/supabaseClient.ts`, `lib/supabaseService.ts`
- **Design Tokens & Theme**: `app/globals.css`, `tailwind.config.js`

