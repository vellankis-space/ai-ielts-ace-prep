import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import { GameModeProvider } from "@/hooks/GameModeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ModuleSelection from "./pages/ModuleSelection";
import ModuleDetail from "./pages/ModuleDetail";
import TestInterface from "./pages/TestInterface";
import TestResults from "./pages/TestResults";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ComingSoonPage from "./pages/ComingSoonPage";
import PricingPage from "./pages/PricingPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import MockTestPage from "./pages/MockTestPage";
import DiagnosticTestPage from "./pages/DiagnosticTestPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import GeneralTrainingWritingPage from "./pages/GeneralTrainingWritingPage";
import AcademicWritingPracticePage from "./pages/AcademicWritingPracticePage";
import AdvancedWritingChallengePage from "./pages/AdvancedWritingChallengePage";
import WritingResultsPage from "./pages/WritingResultsPage";
import GamesPage from "./pages/GamesPage";
import ReadingModulePage from "./pages/ReadingModulePage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GameModeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />

                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/modules" element={<ModuleSelection />} />
                <Route path="/modules/:module" element={<ModuleDetail />} />
                <Route path="/modules/writing/general-training" element={<GeneralTrainingWritingPage />} />
                <Route path="/modules/writing/academic-practice" element={<AcademicWritingPracticePage />} />
                <Route path="/modules/writing/advanced-challenge" element={<AdvancedWritingChallengePage />} />
                <Route path="/modules/writing/results" element={<WritingResultsPage />} />
                <Route path="/modules/reading/test" element={
                  <ProtectedRoute>
                    <ReadingModulePage />
                  </ProtectedRoute>
                } />
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
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/mock-test" element={<MockTestPage />} />
                <Route path="/diagnostic-test" element={<DiagnosticTestPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                <Route path="/games" element={<GamesPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </GameModeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
