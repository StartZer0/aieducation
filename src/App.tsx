
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Study from "./pages/Study";
import Scheduler from "./pages/Scheduler";
import TestChats from "./pages/TestChats";
import TestChats2 from "./pages/TestChats2";
import ExplainToMe from "./pages/ExplainToMe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/study/:subjectId?/:topicId?" element={<Study />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/test-chats" element={<TestChats />} />
            <Route path="/test-chats2" element={<TestChats2 />} />
            <Route path="/explain-to-me" element={<ExplainToMe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
