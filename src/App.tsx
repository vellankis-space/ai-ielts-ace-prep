
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ModuleSelection from "./pages/ModuleSelection";
import ModuleDetail from "./pages/ModuleDetail";
import TestInterface from "./pages/TestInterface";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/modules" element={<ModuleSelection />} />
          <Route path="/modules/:module" element={<ModuleDetail />} />
          <Route path="/modules/:module/test" element={<TestInterface />} />
          <Route path="/pricing" element={<ModuleSelection />} />
          <Route path="/blog" element={<ModuleSelection />} />
          <Route path="/login" element={<ModuleSelection />} />
          <Route path="/signup" element={<ModuleSelection />} />
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
  </QueryClientProvider>
);

export default App;
