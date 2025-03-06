
import React from 'react';
import { Info } from 'lucide-react';

interface StageInfoItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface TutorInfoPanelProps {
  stageInfo: StageInfoItem[];
}

const TutorInfoPanel: React.FC<TutorInfoPanelProps> = ({ stageInfo }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-4">
      <div className="flex items-center mb-3 text-blue-600">
        <Info className="h-4 w-4 mr-2" />
        <h3 className="font-medium">Element Information</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {stageInfo.map((info, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-xs text-gray-500">{info.label}</span>
            <span className={`${info.highlight ? "text-blue-600 font-medium" : "text-gray-700"}`}>
              {info.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorInfoPanel;
