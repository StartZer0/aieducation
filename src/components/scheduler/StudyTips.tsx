
import React from 'react';

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
