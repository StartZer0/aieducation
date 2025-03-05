
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HighlightedTerm } from './HighlightedTerm';

interface ContentRendererProps {
  content: React.ReactNode;
}

export function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <ScrollArea className="h-full pr-4">
      <div className="content-area pb-20">{content}</div>
    </ScrollArea>
  );
}
