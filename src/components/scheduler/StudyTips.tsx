
import React from 'react';
import { LightbulbIcon, CheckCircle2, Clock, Brain, BookOpenCheck, Sparkles } from 'lucide-react';

interface StudyTip {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface StudyTipsProps {
  tips: StudyTip[];
}

const StudyTips: React.FC<StudyTipsProps> = ({ tips }) => {
  return (
    <div className="p-4 space-y-4">
      {tips.map((tip, index) => (
        <div key={index} className="flex items-start gap-3 p-2">
          <div className="w-10 h-10 flex items-center justify-center bg-blue/10 rounded-full shrink-0">
            {tip.icon}
          </div>
          <div>
            <h3 className="font-medium text-lg">{tip.title}</h3>
            <p className="text-muted-foreground">{tip.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudyTips;

// Common study tips for reuse
export const commonStudyTips: StudyTip[] = [
  {
    title: "Active Learning",
    description: "Engage actively with the material by taking notes, asking questions, and discussing concepts.",
    icon: <Brain className="w-5 h-5 text-blue" />
  },
  {
    title: "Spaced Repetition",
    description: "Review material at increasing intervals to improve long-term retention.",
    icon: <Clock className="w-5 h-5 text-blue" />
  },
  {
    title: "Regular Practice",
    description: "Apply concepts through regular practice problems to reinforce understanding.",
    icon: <CheckCircle2 className="w-5 h-5 text-blue" />
  },
  {
    title: "Connect Concepts",
    description: "Link new information with previously learned knowledge to build a stronger mental framework.",
    icon: <Sparkles className="w-5 h-5 text-blue" />
  },
  {
    title: "Teach Others",
    description: "Explaining concepts to others is one of the best ways to solidify your own understanding.",
    icon: <BookOpenCheck className="w-5 h-5 text-blue" />
  }
];
