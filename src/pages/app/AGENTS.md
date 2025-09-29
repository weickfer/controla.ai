# App Page Details

## `index.tsx` — App Shell
- Purpose: Root authenticated workspace that greets the user and switches between transactional, dashboard, and recurring views.
- Data flow: Calls `getUserData` on mount to fetch the authenticated `user`, `transactions`, and `recurring` arrays; stores them in local state while tracking `isLoading` and `authError`.
- Authentication: Shows `LoadingView` while fetching, falls back to `AuthRequiredView` when no user is returned, and otherwise renders the application layout.
- Navigation: Maintains `activeScreen` state to toggle between `TransactionsScreen`, `DashboardScreen`, and `RecurringScreen` on both mobile (tab buttons) and desktop (sidebar buttons).
- Interactions: Passes `transactions` to child pages, wires `deleteTransaction` to remove entries, and surfaces success/error feedback through the `useToast` hook.
- UI notes: Responsive layout with separate mobile and desktop structures, Portuguese copy, and optional floating-action button / modal scaffolding left commented out.

## `auth.tsx` — `AuthRequiredView`
- Purpose: Displays a branded authorization prompt whenever the Supabase token cannot be validated.
- Props: Accepts an optional `authError` string to show diagnostic details in non-production environments.
- UI details: Centers a card explaining the issue and provides a prominent WhatsApp CTA that links to `https://wa.me/5561996661389` for requesting access.
- Dependencies: Uses the shared `Button` component and Lucide `Phone` icon; relies on `process.env.NODE_ENV` for gating the debug message.

## `loading.tsx` — `LoadingView`
- Purpose: Spinner screen rendered while authentication state and initial data are being resolved.
- UI details: Full-height grid layout with the animated `Loader2` icon and supportive Portuguese copy.
- Usage: Returned from `App` whenever `isLoading` is `true` prior to user verification.

## `dashboard.tsx` — `DashboardScreen`
- Purpose: Visualizes aggregated transaction data once the user navigates to the dashboard view.
- Props: Receives a `Transaction[]` dataset from the parent app shell.
- Data shaping: Delegates to `computeDashboardData` to derive `summaryData`, `categoryData`, and `weeklyData` used across cards and charts.
- UI structure: Scrollable layout with summary cards, balance and category highlights, and dual `recharts` visualizations (pie chart by category, bar chart for weekly income vs. expenses).
- Styling: Mixes shadcn `Card`/`ScrollArea` primitives with custom Tailwind classes, color tokens, and Lucide icons.

## `transactions.tsx` — `TransactionsScreen`
- Purpose: Default landing view that lists individual transactions grouped by their posting date.
- Props: Accepts raw `Transaction[]` data and an optional `onDeleteTransaction` handler invoked from the detail modal.
- Local state: Tracks the selected transaction and modal visibility to manage detail viewing and actions.
- Data processing: Groups transactions by `transaction_date`, sorts the dates descending, and renders them with friendly labels (Hoje, Ontem, weekday, or `pt-BR` date).
- Interactions: Clicking a `TransactionItem` opens `TransactionDetailsModal`; deletions trigger the provided callback and reset local selection state.
- UI notes: Uses `ScrollArea` for the feed, includes subtle fade animations, and surfaces Portuguese copy for counts and labels.

## `recurring.tsx` — `RecurringScreen`
- Purpose: Summarizes and lists recurring financial commitments with projected monthly impact.
- Props: Receives a `RecurringTransaction[]` collection pulled from Supabase.
- Derived metrics: Calculates income, expense, and investment totals using helper utilities (`getNextOccurrenceDate`, `getWeekDays`, and `formatCurrencyBRL`); computes monthly equivalents per frequency.
- UI structure: Header with counts, summary card for commitments, and animated list of recurring items inside a scrollable container.
- Interaction details: Highlights frequency via badges, shows next due date and descriptive text, and color-codes values based on transaction type.
