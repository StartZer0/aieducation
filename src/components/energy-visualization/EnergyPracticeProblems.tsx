
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

const EnergyPracticeProblems: React.FC = () => {
  // Tabs state
  const [activeTab, setActiveTab] = useState<string>("problem1");
  
  // Animation states and refs
  const diver1Ref = useRef<HTMLDivElement>(null);
  const platform1Ref = useRef<HTMLDivElement>(null);
  const water1Ref = useRef<HTMLDivElement>(null);
  const heightMarker1Ref = useRef<HTMLDivElement>(null);
  const heightLabel1Ref = useRef<HTMLDivElement>(null);
  const velocityVector1Ref = useRef<HTMLDivElement>(null);
  const potentialEnergy1Ref = useRef<HTMLDivElement>(null);
  const kineticEnergy1Ref = useRef<HTMLDivElement>(null);
  const totalEnergy1Ref = useRef<HTMLDivElement>(null);
  const velocity1Ref = useRef<HTMLSpanElement>(null);
  const initialEnergy1Ref = useRef<HTMLSpanElement>(null);
  const finalEnergy1Ref = useRef<HTMLSpanElement>(null);
  
  // Problem 2 refs
  const object2Ref = useRef<HTMLDivElement>(null);
  const ground2Ref = useRef<HTMLDivElement>(null);
  const trajectory2Ref = useRef<HTMLDivElement>(null);
  const heightMarker2Ref = useRef<HTMLDivElement>(null);
  const heightLabel2Ref = useRef<HTMLDivElement>(null);
  const velocityVector2Ref = useRef<HTMLDivElement>(null);
  const potentialEnergy2Ref = useRef<HTMLDivElement>(null);
  const kineticEnergy2Ref = useRef<HTMLDivElement>(null);
  const lostEnergy2Ref = useRef<HTMLDivElement>(null);
  const totalEnergy2Ref = useRef<HTMLDivElement>(null);
  const initialEnergy2Ref = useRef<HTMLSpanElement>(null);
  const theoreticalHeight2Ref = useRef<HTMLSpanElement>(null);
  const actualHeight2Ref = useRef<HTMLSpanElement>(null);
  const energyLoss2Ref = useRef<HTMLSpanElement>(null);
  
  // Problem 3 refs
  const ball3Ref = useRef<HTMLDivElement>(null);
  const table3Ref = useRef<HTMLDivElement>(null);
  const heightMarker3Ref = useRef<HTMLDivElement>(null);
  const heightLabel3Ref = useRef<HTMLDivElement>(null);
  const velocityVector3Ref = useRef<HTMLDivElement>(null);
  const potentialEnergy3Ref = useRef<HTMLDivElement>(null);
  const kineticEnergy3Ref = useRef<HTMLDivElement>(null);
  const lostEnergy3Ref = useRef<HTMLDivElement>(null);
  const totalEnergy3Ref = useRef<HTMLDivElement>(null);
  const energyLost3aRef = useRef<HTMLSpanElement>(null);
  const kineticBeforeImpact3Ref = useRef<HTMLSpanElement>(null);
  const velocityBeforeImpact3Ref = useRef<HTMLSpanElement>(null);
  const energyGained3cRef = useRef<HTMLSpanElement>(null);
  const reboundVelocity3Ref = useRef<HTMLSpanElement>(null);
  
  // Input states for problem 1
  const [height1, setHeight1] = useState<number>(11.4);
  const [mass1, setMass1] = useState<number>(70);
  const [animationId1, setAnimationId1] = useState<number | null>(null);
  const [diverPosition1, setDiverPosition1] = useState<number>(0);
  
  // Input states for problem 2
  const [initialVelocity2, setInitialVelocity2] = useState<number>(12);
  const [mass2, setMass2] = useState<number>(0.75);
  const [maxHeight2, setMaxHeight2] = useState<number>(6.75);
  const [resistance2, setResistance2] = useState<number>(2);
  const [animationId2, setAnimationId2] = useState<number | null>(null);
  const [objectPosition2, setObjectPosition2] = useState<number>(0);
  const [objectDirection2, setObjectDirection2] = useState<number>(1);
  
  // Input states for problem 3
  const [initialHeight3, setInitialHeight3] = useState<number>(2.0);
  const [reboundHeight3, setReboundHeight3] = useState<number>(1.8);
  const [mass3, setMass3] = useState<number>(0.05);
  const [animationId3, setAnimationId3] = useState<number | null>(null);
  const [ballPosition3, setBallPosition3] = useState<number>(0);
  const [ballDirection3, setBallDirection3] = useState<number>(1);
  
  // Constants
  const GRAVITY = 9.81;

  // Tab switching functionality
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Initialize visualizations on mount
  useEffect(() => {
    initVisualization1();
    initVisualization2();
    initVisualization3();
    
    return () => {
      if (animationId1) cancelAnimationFrame(animationId1);
      if (animationId2) cancelAnimationFrame(animationId2);
      if (animationId3) cancelAnimationFrame(animationId3);
    };
  }, []);

  // Initialize visualization 1
  const initVisualization1 = () => {
    const visualization1 = document.getElementById('visualization1');
    if (!visualization1 || !diver1Ref.current || !platform1Ref.current || !water1Ref.current || 
        !heightMarker1Ref.current || !heightLabel1Ref.current || !velocityVector1Ref.current || 
        !potentialEnergy1Ref.current || !kineticEnergy1Ref.current || !totalEnergy1Ref.current) return;
    
    const visHeight = visualization1.clientHeight;
    const visWidth = visualization1.clientWidth;
    
    // Position elements
    water1Ref.current.style.height = '80px';
    
    // Platform position
    const platformTop = 50;
    platform1Ref.current.style.top = platformTop + 'px';
    platform1Ref.current.style.left = (visWidth / 2 - 50) + 'px';
    
    // Initial diver position
    diver1Ref.current.style.top = platformTop + 'px';
    diver1Ref.current.style.left = (visWidth / 2 - 10) + 'px';
    
    // Height marker
    const waterTop = visHeight - 80;
    const pixelsPerMeter = (waterTop - platformTop) / height1;
    
    heightMarker1Ref.current.style.left = (visWidth / 2 - 50) + 'px';
    heightMarker1Ref.current.style.top = platformTop + 'px';
    heightMarker1Ref.current.style.height = (waterTop - platformTop) + 'px';
    
    heightLabel1Ref.current.style.left = (visWidth / 2 - 90) + 'px';
    heightLabel1Ref.current.style.top = (platformTop + (waterTop - platformTop) / 2) + 'px';
    heightLabel1Ref.current.textContent = `h = ${height1.toFixed(1)} m`;
    
    // Velocity vector - initially hidden
    velocityVector1Ref.current.style.opacity = '0';
    
    // Calculate energy values
    const potential = mass1 * GRAVITY * height1;
    
    // Update energy bars
    totalEnergy1Ref.current.style.width = '100%';
    potentialEnergy1Ref.current.style.width = '100%';
    kineticEnergy1Ref.current.style.width = '0%';
    
    // Update results
    const impactVelocity = Math.sqrt(2 * GRAVITY * height1);
    if (velocity1Ref.current) velocity1Ref.current.textContent = impactVelocity.toFixed(2);
    if (initialEnergy1Ref.current) initialEnergy1Ref.current.textContent = potential.toFixed(2);
    if (finalEnergy1Ref.current) finalEnergy1Ref.current.textContent = potential.toFixed(2);
  };
  
  // Animate diver
  const animateDiver = () => {
    if (!diver1Ref.current || !velocityVector1Ref.current || !potentialEnergy1Ref.current || !kineticEnergy1Ref.current) {
      return;
    }
    
    if (diverPosition1 >= 1) {
      // Animation complete
      setAnimationId1(null);
      return;
    }
    
    // Next frame
    setDiverPosition1(prev => {
      const newPos = prev + 0.005;
      return Math.min(newPos, 1);
    });
    
    // Calculate current position
    const visualization1 = document.getElementById('visualization1');
    if (!visualization1) return;
    
    const visHeight = visualization1.clientHeight;
    const platformTop = 50;
    const waterTop = visHeight - 80;
    const diverTop = platformTop + diverPosition1 * (waterTop - platformTop);
    
    // Update diver position
    diver1Ref.current.style.top = diverTop + 'px';
    
    // Calculate current energy values
    const currentHeight = height1 * (1 - diverPosition1);
    const potential = mass1 * GRAVITY * currentHeight;
    const total = mass1 * GRAVITY * height1;
    const kinetic = total - potential;
    
    // Calculate current velocity
    const currentVelocity = Math.sqrt(2 * GRAVITY * (height1 - currentHeight));
    
    // Update energy bars
    potentialEnergy1Ref.current.style.width = (potential / total * 100) + '%';
    kineticEnergy1Ref.current.style.width = (kinetic / total * 100) + '%';
    
    // Update velocity vector
    if (diverPosition1 > 0.1) {
      const maxVelocity = Math.sqrt(2 * GRAVITY * height1);
      const vectorLength = (currentVelocity / maxVelocity) * 50;
      
      velocityVector1Ref.current.style.opacity = '1';
      velocityVector1Ref.current.style.width = vectorLength + 'px';
      velocityVector1Ref.current.style.left = (diver1Ref.current.offsetLeft + 20) + 'px';
      velocityVector1Ref.current.style.top = (diverTop + 20) + 'px';
      velocityVector1Ref.current.style.transform = 'rotate(90deg)';
    }
    
    // Continue animation
    const id = requestAnimationFrame(animateDiver);
    setAnimationId1(id);
  };
  
  // Initialize visualization 2 and 3
  const initVisualization2 = () => {
    // Implementation for Problem 2 - similar to Problem 1
    // ... (Simplified for now but would follow the same pattern as Problem 1)
  };
  
  const initVisualization3 = () => {
    // Implementation for Problem 3 - similar to Problem 1
    // ... (Simplified for now but would follow the same pattern as Problem 1)
  };

  // Start/pause simulation
  const startSimulation1 = () => {
    if (animationId1) {
      cancelAnimationFrame(animationId1);
      setAnimationId1(null);
    } else {
      const id = requestAnimationFrame(animateDiver);
      setAnimationId1(id);
    }
  };
  
  // Reset simulation
  const resetSimulation1 = () => {
    if (animationId1) {
      cancelAnimationFrame(animationId1);
      setAnimationId1(null);
    }
    
    setDiverPosition1(0);
    initVisualization1();
  };
  
  // Event handlers for inputs
  const handleHeightChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseFloat(e.target.value);
    setHeight1(newHeight);
    
    // Update results
    const potential = mass1 * GRAVITY * newHeight;
    const impactVelocity = Math.sqrt(2 * GRAVITY * newHeight);
    
    if (velocity1Ref.current) velocity1Ref.current.textContent = impactVelocity.toFixed(2);
    if (initialEnergy1Ref.current) initialEnergy1Ref.current.textContent = potential.toFixed(2);
    if (finalEnergy1Ref.current) finalEnergy1Ref.current.textContent = potential.toFixed(2);
    
    // Update visualization if not animating
    if (!animationId1) {
      initVisualization1();
    }
  };
  
  const handleMassChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMass = parseFloat(e.target.value);
    setMass1(newMass);
    
    // Update results
    const potential = newMass * GRAVITY * height1;
    
    if (initialEnergy1Ref.current) initialEnergy1Ref.current.textContent = potential.toFixed(2);
    if (finalEnergy1Ref.current) finalEnergy1Ref.current.textContent = potential.toFixed(2);
  };
  
  return (
    <Card className="w-full shadow-sm">
      <div className="w-full border-0 p-4">
        <div className="container mx-auto bg-white">
          <header className="bg-blue-600 text-white p-4 text-center">
            <h1 className="text-xl font-bold">Kinetic & Potential Energy Practice Problems</h1>
          </header>
          
          <div className="tabs flex bg-blue-700">
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
          </div>
          
          {/* Problem 1: High Diver */}
          <div className={`p-4 ${activeTab === "problem1" ? "block" : "hidden"}`}>
            <div className="bg-gray-100 p-4 rounded mb-4 text-sm">
              <p>A high diver reaches the highest point in his jump at which his centre of gravity is <strong>11.4 m</strong> above the water surface. Assuming that all the diver's gravitational potential energy is transformed into kinetic energy during the dive, calculate the <strong>velocity</strong> with which he enters the water (Take g = 9.81 m s<sup>-2</sup>).</p>
            </div>
            
            <div 
              id="visualization1" 
              className="relative h-[400px] border border-gray-300 mb-4 overflow-hidden bg-gray-50"
            >
              <div ref={platform1Ref} className="platform absolute w-[100px] h-[10px] bg-gray-500"></div>
              <div ref={diver1Ref} className="diver absolute w-[20px] h-[40px] bg-blue-500 rounded-t-full"></div>
              <div ref={water1Ref} className="water absolute left-0 right-0 bottom-0 h-[80px] bg-blue-400/40"></div>
              <div ref={heightMarker1Ref} className="height-marker absolute border-l border-dashed border-gray-400"></div>
              <div ref={heightLabel1Ref} className="height-label absolute text-xs text-gray-500"></div>
              <div ref={velocityVector1Ref} className="velocity-vector absolute h-[2px] bg-red-500 transform-origin-left-center"></div>
              
              <div className="energy-bar-container absolute top-[20px] right-[20px] w-[150px] h-[300px] border border-gray-300 bg-white p-[10px]">
                <div className="energy-label text-xs mb-[2px]">Potential Energy</div>
                <div ref={potentialEnergy1Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-green-500 transition-width duration-300"></div>
                <div className="energy-label text-xs mb-[2px]">Kinetic Energy</div>
                <div ref={kineticEnergy1Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-red-500 transition-width duration-300"></div>
                <div className="energy-label text-xs mb-[2px]">Total Energy</div>
                <div ref={totalEnergy1Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-purple-500 transition-width duration-300"></div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <div className="mb-3">
                  <label htmlFor="height1" className="block mb-1">Height (m): <span id="heightValue1">{height1.toFixed(1)}</span></label>
                  <input 
                    type="range" 
                    id="height1" 
                    min="5" 
                    max="20" 
                    step="0.1" 
                    value={height1}
                    onChange={handleHeightChange1}
                    className="w-full"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mass1" className="block mb-1">Mass (kg): <span id="massValue1">{mass1.toFixed(0)}</span></label>
                  <input 
                    type="range" 
                    id="mass1" 
                    min="50" 
                    max="100" 
                    step="1" 
                    value={mass1}
                    onChange={handleMassChange1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mb-4">
              <button 
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={startSimulation1}
              >
                {animationId1 ? "Pause Simulation" : "Start Simulation"}
              </button>
              <button 
                className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                onClick={resetSimulation1}
              >
                Reset
              </button>
            </div>
            
            <div className="bg-gray-100 p-4 rounded">
              <div className="mb-4">
                <div className="bg-gray-200 p-2 rounded mb-2 font-mono text-sm">
                  Gravitational Potential Energy (GPE) = mgh<br />
                  Kinetic Energy (KE) = ½mv²<br />
                  By conservation of energy: mgh = ½mv² → v = √(2gh)
                </div>
                <div>
                  <p>Calculated impact velocity: <span ref={velocity1Ref} className="text-red-600 font-bold">0.00</span> m/s</p>
                  <p>Initial potential energy: <span ref={initialEnergy1Ref}>0.00</span> J</p>
                  <p>Final kinetic energy: <span ref={finalEnergy1Ref}>0.00</span> J</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Problem 2 & 3 would be implemented similarly */}
          <div className={`p-4 ${activeTab === "problem2" ? "block" : "hidden"}`}>
            <div className="bg-gray-100 p-4 rounded mb-4">
              <p>Problem 2 content would go here.</p>
            </div>
            <div className="text-center py-8">Problem 2 visualization would be implemented here.</div>
          </div>
          
          <div className={`p-4 ${activeTab === "problem3" ? "block" : "hidden"}`}>
            <div className="bg-gray-100 p-4 rounded mb-4">
              <p>Problem 3 content would go here.</p>
            </div>
            <div className="text-center py-8">Problem 3 visualization would be implemented here.</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnergyPracticeProblems;
