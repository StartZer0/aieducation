
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TypewriterText from "@/components/TypewriterText";

interface LLMContentProps {
  content: string;
}

export function LLMContent({ content }: LLMContentProps) {
  return (
    <Card className="h-[800px] overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardTitle className="text-center">LLM Generated Content</CardTitle>
      </CardHeader>
      <CardContent className="p-6 h-[730px] overflow-auto">
        <TypewriterText text={content} />
      </CardContent>
    </Card>
  );
}
