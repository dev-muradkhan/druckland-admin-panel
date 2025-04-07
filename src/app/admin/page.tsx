// app/admin/page.tsx
import DashboardPage from '@/components/dashboard/DashboardPage';

export default function AdminDashboard() {
  return <DashboardPage />;
}

export const metadata = {
  title: 'Dashboard - Druckland Admin',
  description: 'Overview of your store\'s performance and statistics'
};