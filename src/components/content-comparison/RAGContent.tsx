
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TypewriterText from "@/components/TypewriterText";
import { KineticEnergyVisualization } from "@/components/KineticEnergyVisualization";

interface RAGContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  easyModeContent: string;
  mediumModeContent: string;
  advancedModeContent: string;
}

export function RAGContent({ 
  activeTab, 
  setActiveTab, 
  easyModeContent, 
  mediumModeContent, 
  advancedModeContent 
}: RAGContentProps) {
  return (
    <Card className="h-[800px] overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardTitle className="text-center flex items-center justify-center">
          <span>RAG System (A-Level Curriculum)</span>
        </CardTitle>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="easy">Easy</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        
          <CardContent className="p-6 h-[680px] overflow-auto">
            <TabsContent value="easy">
              {activeTab === "easy" && (
                <TypewriterText text={easyModeContent} speed={0.33} />
              )}
            </TabsContent>
            <TabsContent value="medium">
              {activeTab === "medium" && (
                <TypewriterText text={mediumModeContent} speed={0.33} />
              )}
            </TabsContent>
            <TabsContent value="advanced">
              {activeTab === "advanced" && (
                <React.Fragment>
                  <TypewriterText text={advancedModeContent} speed={0.33} />
                  <div className="mt-6">
                    <KineticEnergyVisualization />
                  </div>
                </React.Fragment>
              )}
            </TabsContent>
          </CardContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
}
