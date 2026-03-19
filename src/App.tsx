import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import DashboardLayout from "@/components/DashboardLayout";
import AuthPage from "@/pages/AuthPage";
import DashboardPage from "@/pages/DashboardPage";
import ProfilePage from "@/pages/ProfilePage";
import SquadPage from "@/pages/SquadPage";
import SchedulePage from "@/pages/SchedulePage";
import GradesPage from "@/pages/GradesPage";
import AttendancePage from "@/pages/AttendancePage";
import TasksPage from "@/pages/TasksPage";
import HomeworkPage from "@/pages/HomeworkPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import MaterialsPage from "@/pages/MaterialsPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return <DashboardLayout />;
};

const AuthGate = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <AuthPage />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/auth" element={<AuthGate />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/squad" element={<SquadPage />} />
                  <Route path="/schedule" element={<SchedulePage />} />
                  <Route path="/grades" element={<GradesPage />} />
                  <Route path="/attendance" element={<AttendancePage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/homework" element={<HomeworkPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/materials" element={<MaterialsPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
