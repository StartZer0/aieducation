
import React from 'react';
import SubjectGrid from '../components/SubjectGrid';
import AIAssistant from '../components/AIAssistant';
import { BookOpen, Clock } from 'lucide-react';

interface RecentlyViewedItem {
  id: string;
  title: string;
  subject: string;
  path: string;
  lastViewed: string;
}

const Dashboard = () => {
  const recentlyViewed: RecentlyViewedItem[] = [
    {
      id: '1',
      title: 'Quadratic Functions',
      subject: 'Mathematics',
      path: '/study/mathematics/quadratic-functions',
      lastViewed: '2 hours ago',
    },
    {
      id: '2',
      title: 'Cellular Respiration',
      subject: 'Science',
      path: '/study/science/cellular-respiration',
      lastViewed: '1 day ago',
    },
    {
      id: '3',
      title: 'Introduction to Algorithms',
      subject: 'Computer Science',
      path: '/study/computer-science/intro-algorithms',
      lastViewed: '3 days ago',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="content-container">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, Student</h1>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">Continue your learning journey</p>
        </div>
        
        {/* Recently viewed section */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <h2 className="text-2xl font-semibold flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue" />
              Recently Viewed
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {recentlyViewed.map(item => (
              <a 
                key={item.id}
                href={item.path}
                className="glass-card p-5 hover-lift"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-blue flex items-center justify-center mr-3">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-foreground/60">{item.subject}</p>
                    </div>
                  </div>
                  <span className="text-xs text-foreground/40">{item.lastViewed}</span>
                </div>
                
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue rounded-full"
                    style={{ width: `${Math.random() * 50 + 50}%` }}
                  ></div>
                </div>
              </a>
            ))}
          </div>
        </div>
        
        {/* Subjects section */}
        <div>
          <div className="flex items-center justify-center mb-6">
            <h2 className="text-2xl font-semibold flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue" />
              All Subjects
            </h2>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <SubjectGrid />
          </div>
        </div>
      </div>
      
      <AIAssistant />
    </div>
  );
};

export default Dashboard;
