
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import NewtonsLaws from '@/components/test-charts/NewtonsLaws';
import TypewriterText from '@/components/test-charts/TypewriterText';
import AStudentContent from '@/components/test-charts/AStudentContent';

export default function TestCharts() {
  const [showVisualLoader, setShowVisualLoader] = useState(true);
  const [showAStudentContent, setShowAStudentContent] = useState(false);
  
  // Hide loader after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVisualLoader(false);
    }, 2000);
    
    // Show A+ Student content after initial typing animation
    const contentTimer = setTimeout(() => {
      setShowAStudentContent(true);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
    };
  }, []);
  
  const questionText = "Explain Newton's Three Laws of Motion";
  
  const slowLearnerText = `First Law: Things Like to Stay Put
Imagine a book sitting on a table. It will stay exactly where it is unless something pushes or pulls it. If the book is already moving, it will keep moving in the same direction at the same speed until something stops it. Objects don't start or stop moving by themselves - they need a force to change.

Second Law: Bigger Things Need More Force
The heavier an object is, the more force you need to make it move or change its speed. Pushing a toy car is easy, but pushing a heavy wagon full of rocks takes much more effort. This law shows how the weight of an object affects how it moves.

Third Law: Every Push Has a Push Back
When you do something, something else pushes back with the same amount of force. When you jump, you push down on the ground, and the ground pushes you up. When a rocket shoots fire downward, the fire pushes the rocket upward. Every action has an equal and opposite reaction.

Newton discovered these laws that explain how everything moves in our world - from small marbles to giant rocket ships. These simple rules help us understand motion everywhere around us.`;

  const slowLearnerHighlights = {
    "First Law: Things Like to Stay Put": "#e53e3e",
    "Second Law: Bigger Things Need More Force": "#38a169",
    "Third Law: Every Push Has a Push Back": "#3182ce"
  };

  const aStudentText = "Newton's laws of motion are the foundation of classical mechanics...";

  const aStudentHighlights = {
    "Newton's First Law": "#4299e1",
    "Newton's Second Law": "#48bb78",
    "Newton's Third Law": "#ed8936",
    "Inertia": "#805ad5",
    "momentum": "#d53f8c",
    "acceleration": "#dd6b20",
    "force": "#3182ce",
    "mass": "#38a169"
  };

  return (
    <div className="container mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">{questionText}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* A+ Student */}
        <Card className="h-[600px] overflow-hidden">
          <div className="bg-blue-500 text-white p-3 font-medium text-center">
            A+ Student
          </div>
          <CardContent className="p-4 h-[550px] overflow-auto">
            {showAStudentContent ? (
              <AStudentContent />
            ) : (
              <TypewriterText 
                text={aStudentText} 
                speed={15} 
                highlightTerms={aStudentHighlights}
              />
            )}
          </CardContent>
        </Card>
        
        {/* Visual Learner */}
        <Card className="h-[600px] overflow-hidden">
          <div className="bg-green-500 text-white p-3 font-medium text-center">
            Visual Learner
          </div>
          <CardContent className="p-4 h-[550px] overflow-auto">
            {showVisualLoader ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <NewtonsLaws />
            )}
          </CardContent>
        </Card>
        
        {/* Slow Learner */}
        <Card className="h-[600px] overflow-hidden">
          <div className="bg-purple-500 text-white p-3 font-medium text-center">
            Slow Learner
          </div>
          <CardContent className="p-4 h-[550px] overflow-auto">
            <TypewriterText 
              text={slowLearnerText} 
              speed={20} 
              highlightTerms={slowLearnerHighlights}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
