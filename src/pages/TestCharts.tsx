
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import NewtonsLaws from '@/components/test-charts/NewtonsLaws';
import TypewriterText from '@/components/test-charts/TypewriterText';

export default function TestCharts() {
  const [showVisualLoader, setShowVisualLoader] = useState(true);
  
  // Hide loader after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVisualLoader(false);
    }, 2000);
    
    return () => clearTimeout(timer);
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

  const aStudentText = `### Newton's First Law: The Law of Inertia
Statement:
"An object at rest remains at rest, and an object in motion continues in uniform motion in a straight line unless acted upon by a net external force."

Mathematical Representation:
\\[
\\sum \\mathbf{F} = 0 \\implies \\mathbf{v} = \\text{constant}
\\]
where:
- \\( \\sum \\mathbf{F} \\) is the net external force acting on the object,
- \\( \\mathbf{v} \\) is the velocity vector of the object.

If no net external force is applied (\\(\\sum \\mathbf{F} = 0\\)), the object will either remain at rest (\\(\\mathbf{v} = 0\\)) or move with a constant velocity in a straight line.

Concept of Inertia:
- Inertia is the resistance of an object to changes in its state of motion.
- The mass (\\(m\\)) of an object quantifies its inertia—the greater the mass, the greater the force required to change its motion.

Example:
- A stationary spacecraft in deep space will continue to remain at rest unless acted upon by an external force (e.g., a thrust from an engine).
- A moving car will continue in motion unless external forces like friction and air resistance slow it down.

---

### Newton's Second Law: The Law of Acceleration
Statement:
"The rate of change of momentum of an object is directly proportional to the net external force acting on it, and this change occurs in the direction of the applied force."

Mathematical Representation:
Newton's second law is formally expressed as:
\\[
\\sum \\mathbf{F} = \\frac{d\\mathbf{p}}{dt}
\\]
where:
- \\( \\mathbf{p} = m \\mathbf{v} \\) is the linear momentum of the object,
- \\( m \\) is the mass (assumed constant in classical mechanics),
- \\( \\mathbf{v} \\) is the velocity,
- \\( \\frac{d\\mathbf{p}}{dt} \\) represents the time derivative of momentum.

Since in most classical cases mass remains constant (\\( \\frac{dm}{dt} = 0 \\)), we can rewrite the equation as:
\\[
\\sum \\mathbf{F} = m \\mathbf{a}
\\]
where:
- \\( \\mathbf{a} = \\frac{d\\mathbf{v}}{dt} \\) is the acceleration.

Implications:
- The acceleration of an object is directly proportional to the applied force.
- The acceleration is inversely proportional to the mass of the object.

Example:
- If a force of 10 N is applied to a 2 kg object, its acceleration is:
  \\[
  a = \\frac{F}{m} = \\frac{10}{2} = 5 \\text{ m/s}^2
  \\]

---

### Newton's Third Law: The Law of Action and Reaction
Statement:
"For every action, there is an equal and opposite reaction."

Mathematical Representation:
If object A exerts a force \\( \\mathbf{F}_{A \\to B} \\) on object B, then object B simultaneously exerts a force \\( \\mathbf{F}_{B \\to A} \\) on object A such that:
\\[
\\mathbf{F}_{A \\to B} = - \\mathbf{F}_{B \\to A}
\\]
where:
- \\( \\mathbf{F}_{A \\to B} \\) is the force exerted by object A on object B,
- \\( \\mathbf{F}_{B \\to A} \\) is the reaction force exerted by object B on object A.

Characteristics of Action-Reaction Forces:
1. Equal in Magnitude: \\( |\\mathbf{F}_{A \\to B}| = |\\mathbf{F}_{B \\to A}| \\).
2. Opposite in Direction: \\( \\mathbf{F}_{A \\to B} = -\\mathbf{F}_{B \\to A} \\).
3. Act on Different Objects: They never act on the same object, meaning they do not cancel out.

Example:
- When a person pushes against a wall with a force \\( F \\), the wall pushes back with an equal force \\( -F \\).
- In rocket propulsion, the exhaust gases exert a downward force, while the rocket experiences an equal and opposite upward thrust.`;

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
            <TypewriterText 
              text={aStudentText} 
              speed={15} 
              highlightTerms={aStudentHighlights}
            />
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
