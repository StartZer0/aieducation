
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
import EssayAnalysis from "./pages/EssayAnalysis";
import AITutor from "./pages/AITutor";
import Analytics from "./pages/Analytics";
import AboutMe from "./pages/Architecture";
import GenericGPT from "./pages/GenericGPT";
import ContentComparison from "./pages/ContentComparison";
import ConceptExplorer from "./pages/ConceptExplorer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>
            <Header />
            <main>
              <Index />
            </main>
          </>} />
          <Route path="/dashboard" element={<>
            <Header />
            <main>
              <Dashboard />
            </main>
          </>} />
          <Route path="/study/:subjectId?/:topicId?" element={<>
            <Header />
            <main>
              <Study />
            </main>
          </>} />
          <Route path="/schedule" element={<>
            <Header />
            <main>
              <Scheduler />
            </main>
          </>} />
          <Route path="/test-chats" element={<>
            <Header />
            <main>
              <TestChats />
            </main>
          </>} />
          <Route path="/test-chats2" element={<>
            <Header />
            <main>
              <TestChats2 />
            </main>
          </>} />
          <Route path="/explain-to-me" element={<>
            <Header />
            <main>
              <ExplainToMe />
            </main>
          </>} />
          <Route path="/essay-analysis" element={<>
            <Header />
            <main>
              <EssayAnalysis />
            </main>
          </>} />
          <Route path="/ai-tutor" element={<>
            <Header />
            <main>
              <AITutor />
            </main>
          </>} />
          <Route path="/analytics" element={<>
            <Header />
            <main>
              <Analytics />
            </main>
          </>} />
          <Route path="/about-me" element={<>
            <Header />
            <main>
              <AboutMe />
            </main>
          </>} />
          <Route path="/content-comparison" element={<>
            <Header />
            <main>
              <ContentComparison />
            </main>
          </>} />
          <Route path="/concept-explorer" element={<>
            <Header />
            <main>
              <ConceptExplorer />
            </main>
          </>} />
          {/* GenericGPT route without Header */}
          <Route path="/genericgpt" element={<GenericGPT />} />
          <Route path="*" element={<>
            <Header />
            <main>
              <NotFound />
            </main>
          </>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
