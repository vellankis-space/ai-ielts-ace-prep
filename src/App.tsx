import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ModuleSelection from "./pages/ModuleSelection";
import ModuleDetail from "./pages/ModuleDetail";
import TestInterface from "./pages/TestInterface";
import TestResults from "./pages/TestResults";
import AuthLayout from "./pages/AuthLayout";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/modules" element={<ModuleSelection />} />
            <Route path="/modules/:module" element={<ModuleDetail />} />
            <Route path="/modules/:module/test" element={
              <ProtectedRoute>
                <TestInterface />
              </ProtectedRoute>
            } />
            <Route path="/modules/:module/results" element={
              <ProtectedRoute>
                <TestResults />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/pricing" element={<ModuleSelection />} />
            <Route path="/blog" element={<ModuleSelection />} />
            <Route path="/login" element={<AuthLayout />} />
            <Route path="/signup" element={<AuthLayout />} />
            <Route path="/forgot-password" element={<AuthLayout />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/about" element={<ModuleSelection />} />
            <Route path="/contact" element={<ModuleSelection />} />
            <Route path="/faq" element={<ModuleSelection />} />
            <Route path="/terms" element={<ModuleSelection />} />
            <Route path="/privacy" element={<ModuleSelection />} />
            <Route path="/diagnostic" element={<ModuleSelection />} />
            <Route path="/mock-test" element={<ModuleSelection />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
