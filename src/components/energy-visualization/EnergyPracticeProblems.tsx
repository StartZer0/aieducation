
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import './energy-visualization.css';
import Problem1HighDiver from './Problem1HighDiver';
import Problem2UpwardProjection from './Problem2UpwardProjection';
import Problem3BouncingBall from './Problem3BouncingBall';
import Problem4FairgroundVehicle from './Problem4FairgroundVehicle';

const EnergyPracticeProblems: React.FC = () => {
  // Tabs state
  const [activeTab, setActiveTab] = useState<string>("problem1");
  
  // Problem 1 states
  const [height1, setHeight1] = useState<number>(11.4);
  const [mass1, setMass1] = useState<number>(70);
  const [diverPosition1, setDiverPosition1] = useState<number>(0);
  const [animationId1, setAnimationId1] = useState<number | null>(null);
  
  // Problem 2 states
  const [initialVelocity2, setInitialVelocity2] = useState<number>(12);
  const [mass2, setMass2] = useState<number>(0.75);
  const [maxHeight2, setMaxHeight2] = useState<number>(6.75);
  const [resistance2, setResistance2] = useState<number>(2);
  const [objectPosition2, setObjectPosition2] = useState<number>(0);
  const [objectDirection2, setObjectDirection2] = useState<number>(1);
  const [animationId2, setAnimationId2] = useState<number | null>(null);
  
  // Problem 3 states
  const [initialHeight3, setInitialHeight3] = useState<number>(2.0);
  const [reboundHeight3, setReboundHeight3] = useState<number>(1.8);
  const [mass3, setMass3] = useState<number>(0.05);
  const [ballPosition3, setBallPosition3] = useState<number>(0);
  const [ballDirection3, setBallDirection3] = useState<number>(1);
  const [animationId3, setAnimationId3] = useState<number | null>(null);
  
  // Problem 4 states
  const [mass4, setMass4] = useState<number>(1200);
  const [initialSpeed4, setInitialSpeed4] = useState<number>(2);
  const [height4, setHeight4] = useState<number>(50);
  const [distance4, setDistance4] = useState<number>(75);
  const [finalSpeed4, setFinalSpeed4] = useState<number>(28);
  const [vehiclePosition4, setVehiclePosition4] = useState<number>(0);
  const [animationId4, setAnimationId4] = useState<number | null>(null);

  // Tab switching functionality
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationId1) cancelAnimationFrame(animationId1);
      if (animationId2) cancelAnimationFrame(animationId2);
      if (animationId3) cancelAnimationFrame(animationId3);
      if (animationId4) cancelAnimationFrame(animationId4);
    };
  }, [animationId1, animationId2, animationId3, animationId4]);
  
  return (
    <Card className="w-full shadow-sm">
      <div className="w-full border-0 p-4">
        <div className="container mx-auto bg-white">
          <header className="bg-blue-600 text-white p-4 text-center">
            <h1 className="text-xl font-bold">Kinetic & Potential Energy Practice Problems</h1>
          </header>
          
          <div className="tabs flex bg-blue-700 flex-wrap">
            <div 
              className={`flex-1 p-3 text-white text-center cursor-pointer border-b-3 transition-all ${activeTab === "problem1" ? "bg-blue-800 border-b-2 border-blue-400" : ""}`}
              onClick={() => handleTabClick("problem1")}
            >
              Problem 1: High Diver
            </div>
            <div 
              className={`flex-1 p-3 text-white text-center cursor-pointer border-b-3 transition-all ${activeTab === "problem2" ? "bg-blue-800 border-b-2 border-blue-400" : ""}`}
              onClick={() => handleTabClick("problem2")}
            >
              Problem 2: Upward Projection
            </div>
            <div 
              className={`flex-1 p-3 text-white text-center cursor-pointer border-b-3 transition-all ${activeTab === "problem3" ? "bg-blue-800 border-b-2 border-blue-400" : ""}`}
              onClick={() => handleTabClick("problem3")}
            >
              Problem 3: Bouncing Ball
            </div>
            <div 
              className={`flex-1 p-3 text-white text-center cursor-pointer border-b-3 transition-all ${activeTab === "problem4" ? "bg-blue-800 border-b-2 border-blue-400" : ""}`}
              onClick={() => handleTabClick("problem4")}
            >
              Problem 4: Fairground Vehicle
            </div>
          </div>
          
          {/* Problem 1: High Diver */}
          <div className={`p-4 ${activeTab === "problem1" ? "block" : "hidden"}`}>
            <Problem1HighDiver 
              height={height1}
              mass={mass1}
              setHeight={setHeight1}
              setMass={setMass1}
              animationId={animationId1}
              setAnimationId={setAnimationId1}
              diverPosition={diverPosition1}
              setDiverPosition={setDiverPosition1}
            />
          </div>
          
          {/* Problem 2: Upward Projection */}
          <div className={`p-4 ${activeTab === "problem2" ? "block" : "hidden"}`}>
            <Problem2UpwardProjection 
              initialVelocity={initialVelocity2}
              mass={mass2}
              maxHeight={maxHeight2}
              resistance={resistance2}
              setInitialVelocity={setInitialVelocity2}
              setMass={setMass2}
              setMaxHeight={setMaxHeight2}
              setResistance={setResistance2}
              objectPosition={objectPosition2}
              setObjectPosition={setObjectPosition2}
              objectDirection={objectDirection2}
              setObjectDirection={setObjectDirection2}
              animationId={animationId2}
              setAnimationId={setAnimationId2}
            />
          </div>
          
          {/* Problem 3: Bouncing Ball */}
          <div className={`p-4 ${activeTab === "problem3" ? "block" : "hidden"}`}>
            <Problem3BouncingBall 
              initialHeight={initialHeight3}
              reboundHeight={reboundHeight3}
              mass={mass3}
              setInitialHeight={setInitialHeight3}
              setReboundHeight={setReboundHeight3}
              setMass={setMass3}
              ballPosition={ballPosition3}
              setBallPosition={setBallPosition3}
              ballDirection={ballDirection3}
              setBallDirection={setBallDirection3}
              animationId={animationId3}
              setAnimationId={setAnimationId3}
            />
          </div>
          
          {/* Problem 4: Fairground Vehicle */}
          <div className={`p-4 ${activeTab === "problem4" ? "block" : "hidden"}`}>
            <Problem4FairgroundVehicle 
              mass={mass4}
              initialSpeed={initialSpeed4}
              height={height4}
              distance={distance4}
              finalSpeed={finalSpeed4}
              setMass={setMass4}
              setInitialSpeed={setInitialSpeed4}
              setHeight={setHeight4}
              setDistance={setDistance4}
              setFinalSpeed={setFinalSpeed4}
              vehiclePosition={vehiclePosition4}
              setVehiclePosition={setVehiclePosition4}
              animationId={animationId4}
              setAnimationId={setAnimationId4}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnergyPracticeProblems;
