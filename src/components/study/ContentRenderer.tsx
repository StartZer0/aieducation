
import React from 'react';
import { HighlightedTerm } from './HighlightedTerm';

interface ContentRendererProps {
  content: React.ReactNode;
}

export function ContentRenderer({ content }: ContentRendererProps) {
  return <div className="content-area">{content}</div>;
}
