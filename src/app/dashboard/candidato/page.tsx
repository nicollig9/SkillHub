import DashboardRoute from '@/components/DashboardRoute';
import StudentDashboard from '@/components/StudentDashboard';

export default function CandidateDashboardRoute() {
  return (
    <DashboardRoute requiredRole="ALUNO">
      <StudentDashboard />
    </DashboardRoute>
  );
}