import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// ✅ Page Imports
import Index from "./pages/Index";
import Universe from "./pages/Universe";
import NotFound from "./pages/NotFound";
import SydematicsRoom from "./pages/SydematicsRoom"; 
// ✅ Component Imports
import CustomCursor from "@/components/CustomCursor"; // import it here

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Global Custom Cursor */}
          <CustomCursor />

          <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/universe" element={<Universe />} />
              <Route path="*" element={<NotFound />} />
            <Route path="/sydematics-room" element={<SydematicsRoom />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

