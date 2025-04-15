
import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TypewriterText from "@/components/TypewriterText";

interface RAGContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  easyModeContent: string;
  mediumModeContent: string;
  advancedModeContent: string;
}

// Using memo to prevent unnecessary re-renders
export const RAGContent = memo(function RAGContent({ 
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
                <TypewriterText text={easyModeContent} />
              )}
            </TabsContent>
            <TabsContent value="medium">
              {activeTab === "medium" && (
                <TypewriterText text={mediumModeContent} />
              )}
            </TabsContent>
            <TabsContent value="advanced">
              {activeTab === "advanced" && (
                <TypewriterText text={advancedModeContent} />
              )}
            </TabsContent>
          </CardContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
});
