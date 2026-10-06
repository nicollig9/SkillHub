import DashboardRoute from '@/components/DashboardRoute';
import RecruiterDashboard from '@/components/RecruiterDashboard';

export default function CompanyDashboardRoute() {
  return (
    <DashboardRoute requiredRole="RECRUTADOR">
      <RecruiterDashboard />
    </DashboardRoute>
  );
}