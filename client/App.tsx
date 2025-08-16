import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Images from "./pages/Images";
import Videos from "./pages/Videos";
import ThreeDModels from "./pages/3DModels";
import Icons from "./pages/Icons";
import GenerateAI from "./pages/GenerateAI";
import BrandAI from "./pages/BrandAI";
import Profile from "./pages/Profile";
import Contributor from "./pages/Contributor";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Searching from "./pages/Searching";
import Soon from "./pages/Soon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/3d-models" element={<ThreeDModels />} />
            <Route path="/icons" element={<Icons />} />
            <Route path="/generate-ai" element={<GenerateAI />} />
            <Route path="/brand-ai" element={<BrandAI />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contributor" element={<Contributor />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/Searching" element={<Searching />} />
            <Route path="/Soon" element={<Soon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
