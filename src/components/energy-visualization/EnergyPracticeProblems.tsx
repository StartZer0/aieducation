
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import './energy-visualization.css';

const EnergyPracticeProblems: React.FC = () => {
  // Tabs state
  const [activeTab, setActiveTab] = useState<string>("problem1");
  
  // Constants
  const GRAVITY = 9.81;

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

  // Problem 1 refs
  const visualization1Ref = useRef<HTMLDivElement>(null);
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
  const visualization2Ref = useRef<HTMLDivElement>(null);
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
  const visualization3Ref = useRef<HTMLDivElement>(null);
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

  // Tab switching functionality
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Initialize visualizations on mount and cleanup on unmount
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

  // Initialize visualization for Problem 1: High Diver
  const initVisualization1 = () => {
    if (!visualization1Ref.current || !diver1Ref.current || !platform1Ref.current || 
        !water1Ref.current || !heightMarker1Ref.current || !heightLabel1Ref.current || 
        !velocityVector1Ref.current || !potentialEnergy1Ref.current || 
        !kineticEnergy1Ref.current || !totalEnergy1Ref.current) return;
    
    const visHeight = visualization1Ref.current.clientHeight;
    const visWidth = visualization1Ref.current.clientWidth;
    
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
    
    setDiverPosition1(0);
  };

  // Animate diver for Problem 1
  const animateDiver = () => {
    if (!diver1Ref.current || !velocityVector1Ref.current || !potentialEnergy1Ref.current || 
        !kineticEnergy1Ref.current || !visualization1Ref.current) {
      return;
    }
    
    if (diverPosition1 >= 1) {
      // Animation complete
      cancelAnimationFrame(animationId1 as number);
      setAnimationId1(null);
      return;
    }
    
    // Next frame - using a fixed small increment for smooth animation
    const newPos = diverPosition1 + 0.005;
    
    // Calculate current position
    const visHeight = visualization1Ref.current.clientHeight;
    const platformTop = 50;
    const waterTop = visHeight - 80;
    const diverTop = platformTop + newPos * (waterTop - platformTop);
    
    // Update diver position
    diver1Ref.current.style.top = diverTop + 'px';
    
    // Calculate current energy values
    const currentHeight = height1 * (1 - newPos);
    const potential = mass1 * GRAVITY * currentHeight;
    const total = mass1 * GRAVITY * height1;
    const kinetic = total - potential;
    
    // Calculate current velocity
    const currentVelocity = Math.sqrt(2 * GRAVITY * (height1 - currentHeight));
    
    // Update energy bars
    potentialEnergy1Ref.current.style.width = (potential / total * 100) + '%';
    kineticEnergy1Ref.current.style.width = (kinetic / total * 100) + '%';
    
    // Update velocity vector
    if (newPos > 0.1) {
      const maxVelocity = Math.sqrt(2 * GRAVITY * height1);
      const vectorLength = (currentVelocity / maxVelocity) * 50;
      
      velocityVector1Ref.current.style.opacity = '1';
      velocityVector1Ref.current.style.width = vectorLength + 'px';
      velocityVector1Ref.current.style.left = (diver1Ref.current.offsetLeft + 20) + 'px';
      velocityVector1Ref.current.style.top = (diverTop + 20) + 'px';
      velocityVector1Ref.current.style.transform = 'rotate(90deg)';
    }
    
    // Update position state for next frame
    setDiverPosition1(newPos);
    
    // Continue animation
    const id = requestAnimationFrame(animateDiver);
    setAnimationId1(id);
  };

  // Start/pause simulation for Problem 1
  const startSimulation1 = () => {
    if (animationId1 !== null) {
      cancelAnimationFrame(animationId1);
      setAnimationId1(null);
    } else {
      const id = requestAnimationFrame(animateDiver);
      setAnimationId1(id);
    }
  };

  // Reset simulation for Problem 1
  const resetSimulation1 = () => {
    if (animationId1 !== null) {
      cancelAnimationFrame(animationId1);
      setAnimationId1(null);
    }
    
    initVisualization1();
  };

  // Event handlers for Problem 1 inputs
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
    if (animationId1 === null) {
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

  // Initialize visualization for Problem 2: Upward Projection
  const initVisualization2 = () => {
    if (!visualization2Ref.current || !object2Ref.current || !ground2Ref.current || 
        !trajectory2Ref.current || !heightMarker2Ref.current || !heightLabel2Ref.current || 
        !velocityVector2Ref.current || !potentialEnergy2Ref.current || 
        !kineticEnergy2Ref.current || !lostEnergy2Ref.current || !totalEnergy2Ref.current) return;
    
    const visHeight = visualization2Ref.current.clientHeight;
    const visWidth = visualization2Ref.current.clientWidth;
    
    // Position elements
    ground2Ref.current.style.bottom = '0px';
    
    // Initial object position
    object2Ref.current.style.bottom = '10px';
    object2Ref.current.style.left = (visWidth / 2 - 10) + 'px';
    
    // Theoretical max height without resistance
    const theoreticalMaxHeight = initialVelocity2 * initialVelocity2 / (2 * GRAVITY);
    
    // Determine scale based on max height
    const pixelsPerMeter = (visHeight - 50) / Math.max(theoreticalMaxHeight, maxHeight2);
    
    // Trajectory
    trajectory2Ref.current.style.left = (visWidth / 2 - 50) + 'px';
    trajectory2Ref.current.style.width = '100px';
    trajectory2Ref.current.style.bottom = '10px';
    trajectory2Ref.current.style.height = (maxHeight2 * pixelsPerMeter) + 'px';
    
    // Height marker
    heightMarker2Ref.current.style.left = (visWidth / 2 - 50) + 'px';
    heightMarker2Ref.current.style.bottom = '10px';
    heightMarker2Ref.current.style.height = '0px';
    
    // Height label
    heightLabel2Ref.current.style.left = (visWidth / 2 - 90) + 'px';
    heightLabel2Ref.current.style.bottom = '15px';
    heightLabel2Ref.current.textContent = 'h = 0 m';
    
    // Velocity vector - initially pointing up
    velocityVector2Ref.current.style.opacity = '1';
    velocityVector2Ref.current.style.width = '30px';
    velocityVector2Ref.current.style.left = (visWidth / 2 + 15) + 'px';
    velocityVector2Ref.current.style.bottom = '20px';
    velocityVector2Ref.current.style.transform = 'rotate(-90deg)';
    
    // Energy values
    const initialKE = 0.5 * mass2 * initialVelocity2 * initialVelocity2;
    const maxPE = mass2 * GRAVITY * maxHeight2;
    const energyLoss = initialKE - maxPE;
    
    // Update energy bars
    totalEnergy2Ref.current.style.width = '100%';
    kineticEnergy2Ref.current.style.width = '100%';
    potentialEnergy2Ref.current.style.width = '0%';
    lostEnergy2Ref.current.style.width = '0%';
    
    // Update results
    if (initialEnergy2Ref.current) initialEnergy2Ref.current.textContent = initialKE.toFixed(2);
    if (theoreticalHeight2Ref.current) theoreticalHeight2Ref.current.textContent = theoreticalMaxHeight.toFixed(2);
    if (actualHeight2Ref.current) actualHeight2Ref.current.textContent = maxHeight2.toFixed(2);
    if (energyLoss2Ref.current) energyLoss2Ref.current.textContent = energyLoss.toFixed(2);
    
    setObjectPosition2(0);
    setObjectDirection2(1);
  };

  // Animate object for Problem 2
  const animateObject2 = () => {
    if (!object2Ref.current || !velocityVector2Ref.current || !potentialEnergy2Ref.current || 
        !kineticEnergy2Ref.current || !lostEnergy2Ref.current || !visualization2Ref.current || 
        !heightMarker2Ref.current || !heightLabel2Ref.current) {
      return;
    }
    
    if (objectPosition2 >= 2) {
      // Animation complete
      cancelAnimationFrame(animationId2 as number);
      setAnimationId2(null);
      return;
    }
    
    // Next frame - using a small fixed increment for smooth animation
    const deltaPosition = 0.005 * (objectPosition2 < 1 ? 1 : 1.5); // Move faster on the way down
    const newPos = objectPosition2 + deltaPosition;
    
    // Check for direction change at max height
    let newDirection = objectDirection2;
    if (newPos >= 1 && objectDirection2 === 1) {
      newDirection = -1; // Change direction to down
    }
    
    // Calculate current height
    let currentHeight;
    if (newPos <= 1) {
      // Going up
      currentHeight = maxHeight2 * newPos;
    } else {
      // Coming down
      currentHeight = maxHeight2 * (2 - newPos);
    }
    
    // Calculate visual position
    const visHeight = visualization2Ref.current.clientHeight;
    const pixelsPerMeter = (visHeight - 50) / maxHeight2;
    const objectY = 10 + currentHeight * pixelsPerMeter;
    
    // Update object position
    object2Ref.current.style.bottom = objectY + 'px';
    
    // Update height marker
    heightMarker2Ref.current.style.height = objectY + 'px';
    heightLabel2Ref.current.style.bottom = (objectY / 2) + 'px';
    heightLabel2Ref.current.textContent = `h = ${currentHeight.toFixed(1)} m`;
    
    // Calculate current energy values
    const initialKE = 0.5 * mass2 * initialVelocity2 * initialVelocity2;
    const potential = mass2 * GRAVITY * currentHeight;
    
    // Calculate how much energy has been lost so far
    // More loss as we get closer to the peak
    const peakRatio = newPos <= 1 ? newPos : 2 - newPos;
    const lossRatio = Math.pow(peakRatio, resistance2); // More loss with higher resistance
    
    const totalLoss = initialKE - mass2 * GRAVITY * maxHeight2;
    const currentLoss = totalLoss * lossRatio;
    
    // Remaining energy is distributed between potential and kinetic
    const total = initialKE;
    const available = total - currentLoss;
    const kinetic = available - potential;
    
    // Calculate current velocity based on kinetic energy
    let currentVelocity = Math.sqrt(2 * kinetic / mass2) * (newDirection === 1 ? 1 : -1);
    if (newPos > 0.98 && newPos < 1.02) {
      currentVelocity = 0; // Exactly at the peak
    }
    
    // Update energy bars
    potentialEnergy2Ref.current.style.width = (potential / total * 100) + '%';
    kineticEnergy2Ref.current.style.width = (kinetic / total * 100) + '%';
    lostEnergy2Ref.current.style.width = (currentLoss / total * 100) + '%';
    
    // Update velocity vector
    const absVelocity = Math.abs(currentVelocity);
    const maxVelocity = initialVelocity2;
    const vectorLength = (absVelocity / maxVelocity) * 40;
    
    velocityVector2Ref.current.style.opacity = absVelocity > 0.5 ? '1' : '0';
    velocityVector2Ref.current.style.width = vectorLength + 'px';
    velocityVector2Ref.current.style.left = object2Ref.current.offsetLeft + (newDirection === 1 ? 15 : -vectorLength) + 'px';
    velocityVector2Ref.current.style.bottom = objectY + 'px';
    velocityVector2Ref.current.style.transform = `rotate(${newDirection === 1 ? -90 : 90}deg)`;
    
    // Update state for next frame
    setObjectPosition2(newPos);
    setObjectDirection2(newDirection);
    
    // Continue animation
    const id = requestAnimationFrame(animateObject2);
    setAnimationId2(id);
  };

  // Start/pause simulation for Problem 2
  const startSimulation2 = () => {
    if (animationId2 !== null) {
      cancelAnimationFrame(animationId2);
      setAnimationId2(null);
    } else {
      const id = requestAnimationFrame(animateObject2);
      setAnimationId2(id);
    }
  };

  // Reset simulation for Problem 2
  const resetSimulation2 = () => {
    if (animationId2 !== null) {
      cancelAnimationFrame(animationId2);
      setAnimationId2(null);
    }
    
    initVisualization2();
  };

  // Event handlers for Problem 2 inputs
  const handleInitialVelocityChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVelocity = parseFloat(e.target.value);
    setInitialVelocity2(newVelocity);
    
    // Update results
    const initialKE = 0.5 * mass2 * newVelocity * newVelocity;
    const theoreticalMaxHeight = newVelocity * newVelocity / (2 * GRAVITY);
    const maxPE = mass2 * GRAVITY * maxHeight2;
    const energyLoss = initialKE - maxPE;
    
    if (initialEnergy2Ref.current) initialEnergy2Ref.current.textContent = initialKE.toFixed(2);
    if (theoreticalHeight2Ref.current) theoreticalHeight2Ref.current.textContent = theoreticalMaxHeight.toFixed(2);
    if (energyLoss2Ref.current) energyLoss2Ref.current.textContent = energyLoss.toFixed(2);
    
    // Cap actual max height based on theoretical
    if (maxHeight2 > theoreticalMaxHeight) {
      setMaxHeight2(theoreticalMaxHeight);
      if (actualHeight2Ref.current) actualHeight2Ref.current.textContent = theoreticalMaxHeight.toFixed(2);
    }
    
    // Update visualization if not animating
    if (animationId2 === null) {
      initVisualization2();
    }
  };

  const handleMassChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMass = parseFloat(e.target.value);
    setMass2(newMass);
    
    // Update results
    const initialKE = 0.5 * newMass * initialVelocity2 * initialVelocity2;
    const maxPE = newMass * GRAVITY * maxHeight2;
    const energyLoss = initialKE - maxPE;
    
    if (initialEnergy2Ref.current) initialEnergy2Ref.current.textContent = initialKE.toFixed(2);
    if (energyLoss2Ref.current) energyLoss2Ref.current.textContent = energyLoss.toFixed(2);
  };

  const handleMaxHeightChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxHeight = parseFloat(e.target.value);
    
    // Theoretical max height without resistance
    const theoreticalMaxHeight = initialVelocity2 * initialVelocity2 / (2 * GRAVITY);
    
    // Ensure max height doesn't exceed theoretical max
    const cappedHeight = Math.min(newMaxHeight, theoreticalMaxHeight);
    setMaxHeight2(cappedHeight);
    
    // Update results
    const initialKE = 0.5 * mass2 * initialVelocity2 * initialVelocity2;
    const maxPE = mass2 * GRAVITY * cappedHeight;
    const energyLoss = initialKE - maxPE;
    
    if (actualHeight2Ref.current) actualHeight2Ref.current.textContent = cappedHeight.toFixed(2);
    if (energyLoss2Ref.current) energyLoss2Ref.current.textContent = energyLoss.toFixed(2);
    
    // Update visualization if not animating
    if (animationId2 === null) {
      initVisualization2();
    }
  };

  const handleResistanceChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newResistance = parseInt(e.target.value);
    setResistance2(newResistance);
  };

  // Initialize visualization for Problem 3: Bouncing Ball
  const initVisualization3 = () => {
    if (!visualization3Ref.current || !ball3Ref.current || !table3Ref.current || 
        !heightMarker3Ref.current || !heightLabel3Ref.current || !velocityVector3Ref.current || 
        !potentialEnergy3Ref.current || !kineticEnergy3Ref.current || 
        !lostEnergy3Ref.current || !totalEnergy3Ref.current) return;
    
    const visHeight = visualization3Ref.current.clientHeight;
    const visWidth = visualization3Ref.current.clientWidth;
    
    // Position elements
    const tableY = visHeight - 50;
    table3Ref.current.style.top = tableY + 'px';
    
    // Initial ball position
    const pixelsPerMeter = (tableY - 50) / Math.max(initialHeight3, reboundHeight3);
    const initialY = tableY - initialHeight3 * pixelsPerMeter;
    
    ball3Ref.current.style.top = initialY + 'px';
    ball3Ref.current.style.left = (visWidth / 2 - 10) + 'px';
    
    // Height marker
    heightMarker3Ref.current.style.left = (visWidth / 2 - 50) + 'px';
    heightMarker3Ref.current.style.top = initialY + 'px';
    heightMarker3Ref.current.style.height = (tableY - initialY) + 'px';
    
    // Height label
    heightLabel3Ref.current.style.left = (visWidth / 2 - 90) + 'px';
    heightLabel3Ref.current.style.top = (initialY + (tableY - initialY) / 2) + 'px';
    heightLabel3Ref.current.textContent = `h = ${initialHeight3.toFixed(1)} m`;
    
    // Velocity vector - initially hidden
    velocityVector3Ref.current.style.opacity = '0';
    
    // Calculate energy values
    const initialPE = mass3 * GRAVITY * initialHeight3;
    const impactKE = initialPE; // Conservation of energy
    const reboundPE = mass3 * GRAVITY * reboundHeight3;
    const energyLoss = initialPE - reboundPE;
    
    // Calculate velocities
    const impactVelocity = Math.sqrt(2 * GRAVITY * initialHeight3);
    const reboundVelocity = Math.sqrt(2 * GRAVITY * reboundHeight3);
    
    // Update energy bars
    totalEnergy3Ref.current.style.width = '100%';
    potentialEnergy3Ref.current.style.width = '100%';
    kineticEnergy3Ref.current.style.width = '0%';
    lostEnergy3Ref.current.style.width = '0%';
    
    // Update results
    if (energyLost3aRef.current) energyLost3aRef.current.textContent = (initialPE - reboundPE).toFixed(4);
    if (kineticBeforeImpact3Ref.current) kineticBeforeImpact3Ref.current.textContent = impactKE.toFixed(4);
    if (velocityBeforeImpact3Ref.current) velocityBeforeImpact3Ref.current.textContent = impactVelocity.toFixed(2);
    if (energyGained3cRef.current) energyGained3cRef.current.textContent = reboundPE.toFixed(4);
    if (reboundVelocity3Ref.current) reboundVelocity3Ref.current.textContent = reboundVelocity.toFixed(2);
    
    setBallPosition3(0);
    setBallDirection3(1);
  };

  // Animate ball for Problem 3
  const animateBall3 = () => {
    if (!ball3Ref.current || !velocityVector3Ref.current || !potentialEnergy3Ref.current || 
        !kineticEnergy3Ref.current || !lostEnergy3Ref.current || !visualization3Ref.current || 
        !heightMarker3Ref.current || !heightLabel3Ref.current) {
      return;
    }
    
    if (ballPosition3 >= 3) {
      // Animation complete
      cancelAnimationFrame(animationId3 as number);
      setAnimationId3(null);
      return;
    }
    
    // Next frame - using a small fixed increment for smooth animation
    const newPos = ballPosition3 + 0.01;
    
    // Handle direction changes
    let newDirection = ballDirection3;
    if (newPos >= 1 && newPos < 1.05 && ballDirection3 === 1) {
      // Impact
      newDirection = -1; // Change direction to up
    } else if (newPos >= 2 && ballDirection3 === -1) {
      // Peak of rebound
      newDirection = 1; // Change direction to down
    }
    
    // Calculate current height
    let currentHeight;
    if (newPos < 1) {
      // Initial fall
      currentHeight = initialHeight3 * (1 - newPos);
    } else if (newPos < 2) {
      // Rebound up
      currentHeight = reboundHeight3 * (newPos - 1);
    } else {
      // Rebound down
      currentHeight = reboundHeight3 * (3 - newPos);
    }
    
    // Calculate visual position
    const visHeight = visualization3Ref.current.clientHeight;
    const tableY = visHeight - 50;
    const pixelsPerMeter = (tableY - 50) / Math.max(initialHeight3, reboundHeight3);
    const ballY = tableY - currentHeight * pixelsPerMeter;
    
    // Update ball position
    ball3Ref.current.style.top = ballY + 'px';
    
    // Update height marker
    heightMarker3Ref.current.style.top = ballY + 'px';
    heightMarker3Ref.current.style.height = (tableY - ballY) + 'px';
    heightLabel3Ref.current.style.top = (ballY + (tableY - ballY) / 2) + 'px';
    heightLabel3Ref.current.textContent = `h = ${currentHeight.toFixed(1)} m`;
    
    // Calculate current energy values
    const initialPE = mass3 * GRAVITY * initialHeight3;
    const currentPE = mass3 * GRAVITY * currentHeight;
    
    // Energy values depend on which phase we're in
    let energyLoss = 0;
    let availableEnergy = initialPE;
    
    if (newPos >= 1) {
      // After impact, some energy is lost
      energyLoss = initialPE - mass3 * GRAVITY * reboundHeight3;
      availableEnergy = initialPE - energyLoss;
    }
    
    const kinetic = availableEnergy - currentPE;
    
    // Calculate current velocity based on kinetic energy
    const currentVelocity = Math.sqrt(2 * kinetic / mass3) * (newDirection === 1 ? 1 : -1);
    
    // Update energy bars
    potentialEnergy3Ref.current.style.width = (currentPE / initialPE * 100) + '%';
    kineticEnergy3Ref.current.style.width = (kinetic / initialPE * 100) + '%';
    lostEnergy3Ref.current.style.width = (energyLoss / initialPE * 100) + '%';
    
    // Update velocity vector
    const absVelocity = Math.abs(currentVelocity);
    const maxVelocity = Math.sqrt(2 * GRAVITY * initialHeight3);
    const vectorLength = (absVelocity / maxVelocity) * 40;
    
    if (absVelocity > 0.5) {
      velocityVector3Ref.current.style.opacity = '1';
      velocityVector3Ref.current.style.width = vectorLength + 'px';
      velocityVector3Ref.current.style.left = ball3Ref.current.offsetLeft + 20 + 'px';
      velocityVector3Ref.current.style.top = ballY + 'px';
      velocityVector3Ref.current.style.transform = `rotate(${newDirection === 1 ? 90 : -90}deg)`;
    } else {
      velocityVector3Ref.current.style.opacity = '0';
    }
    
    // Update state for next frame
    setBallPosition3(newPos);
    setBallDirection3(newDirection);
    
    // Continue animation
    const id = requestAnimationFrame(animateBall3);
    setAnimationId3(id);
  };

  // Start/pause simulation for Problem 3
  const startSimulation3 = () => {
    if (animationId3 !== null) {
      cancelAnimationFrame(animationId3);
      setAnimationId3(null);
    } else {
      const id = requestAnimationFrame(animateBall3);
      setAnimationId3(id);
    }
  };

  // Reset simulation for Problem 3
  const resetSimulation3 = () => {
    if (animationId3 !== null) {
      cancelAnimationFrame(animationId3);
      setAnimationId3(null);
    }
    
    initVisualization3();
  };

  // Event handlers for Problem 3 inputs
  const handleInitialHeightChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseFloat(e.target.value);
    setInitialHeight3(newHeight);
    
    // Ensure rebound height is not greater than initial height
    if (reboundHeight3 > newHeight) {
      setReboundHeight3(newHeight);
    }
    
    // Update results
    const initialPE = mass3 * GRAVITY * newHeight;
    const impactKE = initialPE; // Conservation of energy
    const reboundPE = mass3 * GRAVITY * Math.min(reboundHeight3, newHeight);
    
    // Calculate velocities
    const impactVelocity = Math.sqrt(2 * GRAVITY * newHeight);
    const reboundVelocity = Math.sqrt(2 * GRAVITY * Math.min(reboundHeight3, newHeight));
    
    if (energyLost3aRef.current) energyLost3aRef.current.textContent = (initialPE - reboundPE).toFixed(4);
    if (kineticBeforeImpact3Ref.current) kineticBeforeImpact3Ref.current.textContent = impactKE.toFixed(4);
    if (velocityBeforeImpact3Ref.current) velocityBeforeImpact3Ref.current.textContent = impactVelocity.toFixed(2);
    if (energyGained3cRef.current) energyGained3cRef.current.textContent = reboundPE.toFixed(4);
    if (reboundVelocity3Ref.current) reboundVelocity3Ref.current.textContent = reboundVelocity.toFixed(2);
    
    // Update visualization if not animating
    if (animationId3 === null) {
      initVisualization3();
    }
  };

  const handleReboundHeightChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseFloat(e.target.value);
    
    // Ensure rebound height is not greater than initial height
    const cappedHeight = Math.min(newHeight, initialHeight3);
    setReboundHeight3(cappedHeight);
    
    // Update results
    const initialPE = mass3 * GRAVITY * initialHeight3;
    const reboundPE = mass3 * GRAVITY * cappedHeight;
    
    // Calculate rebound velocity
    const reboundVelocity = Math.sqrt(2 * GRAVITY * cappedHeight);
    
    if (energyLost3aRef.current) energyLost3aRef.current.textContent = (initialPE - reboundPE).toFixed(4);
    if (energyGained3cRef.current) energyGained3cRef.current.textContent = reboundPE.toFixed(4);
    if (reboundVelocity3Ref.current) reboundVelocity3Ref.current.textContent = reboundVelocity.toFixed(2);
    
    // Update visualization if not animating
    if (animationId3 === null) {
      initVisualization3();
    }
  };

  const handleMassChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMass = parseFloat(e.target.value);
    setMass3(newMass);
    
    // Update results - mass affects energy values but not velocities
    const initialPE = newMass * GRAVITY * initialHeight3;
    const impactKE = initialPE;
    const reboundPE = newMass * GRAVITY * reboundHeight3;
    
    if (energyLost3aRef.current) energyLost3aRef.current.textContent = (initialPE - reboundPE).toFixed(4);
    if (kineticBeforeImpact3Ref.current) kineticBeforeImpact3Ref.current.textContent = impactKE.toFixed(4);
    if (energyGained3cRef.current) energyGained3cRef.current.textContent = reboundPE.toFixed(4);
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
              ref={visualization1Ref}
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
                  <label htmlFor="height1" className="block mb-1">Height (m): <span>{height1.toFixed(1)}</span></label>
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
                  <label htmlFor="mass1" className="block mb-1">Mass (kg): <span>{mass1.toFixed(0)}</span></label>
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
                {animationId1 !== null ? "Pause Simulation" : "Start Simulation"}
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
          
          {/* Problem 2: Upward Projection */}
          <div className={`p-4 ${activeTab === "problem2" ? "block" : "hidden"}`}>
            <div className="bg-gray-100 p-4 rounded mb-4 text-sm">
              <p>An object of mass <strong>0.75 kg</strong> is projected vertically upwards with a velocity of <strong>12 m s<sup>-1</sup></strong>. If it reaches a height of <strong>6.75 m</strong>, calculate the energy loss caused by air resistance (Take g = 9.81 m s<sup>-2</sup>).</p>
            </div>
            
            <div 
              ref={visualization2Ref}
              className="relative h-[400px] border border-gray-300 mb-4 overflow-hidden bg-gray-50"
            >
              <div ref={ground2Ref} className="ground absolute left-0 right-0 bottom-0 h-[10px] bg-gray-500"></div>
              <div ref={object2Ref} className="object absolute w-[20px] h-[20px] rounded-full bg-red-500"></div>
              <div ref={trajectory2Ref} className="trajectory absolute border-t border-dashed border-gray-400"></div>
              <div ref={heightMarker2Ref} className="height-marker absolute border-l border-dashed border-gray-400"></div>
              <div ref={heightLabel2Ref} className="height-label absolute text-xs text-gray-500"></div>
              <div ref={velocityVector2Ref} className="velocity-vector absolute h-[2px] bg-red-500 transform-origin-left-center"></div>
              
              <div className="energy-bar-container absolute top-[20px] right-[20px] w-[150px] h-[300px] border border-gray-300 bg-white p-[10px]">
                <div className="energy-label text-xs mb-[2px]">Potential Energy</div>
                <div ref={potentialEnergy2Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-green-500 transition-width duration-300"></div>
                <div className="energy-label text-xs mb-[2px]">Kinetic Energy</div>
                <div ref={kineticEnergy2Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-red-500 transition-width duration-300"></div>
                <div className="energy-label text-xs mb-[2px]">Lost Energy</div>
                <div ref={lostEnergy2Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-orange-500 transition-width duration-300"></div>
                <div className="energy-label text-xs mb-[2px]">Total Energy</div>
                <div ref={totalEnergy2Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-purple-500 transition-width duration-300"></div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <div className="mb-3">
                  <label htmlFor="initialVelocity2" className="block mb-1">Initial Velocity (m/s): <span>{initialVelocity2.toFixed(1)}</span></label>
                  <input 
                    type="range" 
                    id="initialVelocity2" 
                    min="5" 
                    max="20" 
                    step="0.5" 
                    value={initialVelocity2}
                    onChange={handleInitialVelocityChange2}
                    className="w-full"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mass2" className="block mb-1">Mass (kg): <span>{mass2.toFixed(2)}</span></label>
                  <input 
                    type="range" 
                    id="mass2" 
                    min="0.1" 
                    max="2" 
                    step="0.05" 
                    value={mass2}
                    onChange={handleMassChange2}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="mb-3">
                  <label htmlFor="maxHeight2" className="block mb-1">Actual Max Height (m): <span>{maxHeight2.toFixed(2)}</span></label>
                  <input 
                    type="range" 
                    id="maxHeight2" 
                    min="1" 
                    max="10" 
                    step="0.25" 
                    value={maxHeight2}
                    onChange={handleMaxHeightChange2}
                    className="w-full"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="resistance2" className="block mb-1">Air Resistance: <span>
                    {resistance2 === 1 ? 'Low' : resistance2 === 2 ? 'Medium' : 'High'}
                  </span></label>
                  <input 
                    type="range" 
                    id="resistance2" 
                    min="1" 
                    max="3" 
                    step="1" 
                    value={resistance2}
                    onChange={handleResistanceChange2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mb-4">
              <button 
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={startSimulation2}
              >
                {animationId2 !== null ? "Pause Simulation" : "Start Simulation"}
              </button>
              <button 
                className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                onClick={resetSimulation2}
              >
                Reset
              </button>
            </div>
            
            <div className="bg-gray-100 p-4 rounded">
              <div className="mb-4">
                <div className="bg-gray-200 p-2 rounded mb-2 font-mono text-sm">
                  Initial Kinetic Energy = ½mv²<br />
                  Maximum Potential Energy without losses = mgh<br />
                  Energy loss = Initial Energy - Maximum Potential Energy
                </div>
                <div>
                  <p>Initial kinetic energy: <span ref={initialEnergy2Ref}>0.00</span> J</p>
                  <p>Maximum height without resistance: <span ref={theoreticalHeight2Ref}>0.00</span> m</p>
                  <p>Actual maximum height: <span ref={actualHeight2Ref}>0.00</span> m</p>
                  <p>Energy loss due to air resistance: <span ref={energyLoss2Ref} className="text-red-600 font-bold">0.00</span> J</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Problem 3: Bouncing Ball */}
          <div className={`p-4 ${activeTab === "problem3" ? "block" : "hidden"}`}>
            <div className="bg-gray-100 p-4 rounded mb-4 text-sm">
              <p>A steel ball bearing of mass <strong>0.05 kg</strong> at a height of <strong>2.0 m</strong> above a steel table is released from rest and it is found to rebound to a height of <strong>1.8 m</strong>. Calculate:</p>
              <p>(a) The gravitational potential energy lost during the fall.</p>
              <p>(b) The kinetic energy and velocity of the ball bearing just before impact.</p>
              <p>(c) The gravitational potential energy gained by the ball bearing when it rebounds to a height of 1.8 m.</p>
              <p>(d) The ball bearing's rebound velocity. (Take g = 9.81 m s<sup>-2</sup>).</p>
            </div>
            
            <div 
              ref={visualization3Ref}
              className="relative h-[400px] border border-gray-300 mb-4 overflow-hidden bg-gray-50"
            >
              <div ref={table3Ref} className="table absolute w-[200px] h-[20px] bg-gray-500 left-1/2 transform -translate-x-1/2"></div>
              <div ref={ball3Ref} className="ball absolute w-[20px] h-[20px] rounded-full bg-gray-400"></div>
              <div ref={heightMarker3Ref} className="height-marker absolute border-l border-dashed border-gray-400"></div>
              <div ref={heightLabel3Ref} className="height-label absolute text-xs text-gray-500"></div>
              <div ref={velocityVector3Ref} className="velocity-vector absolute h-[2px] bg-red-500 transform-origin-left-center"></div>
              
              <div className="energy-bar-container absolute top-[20px] right-[20px] w-[150px] h-[300px] border border-gray-300 bg-white p-[10px]">
                <div className="energy-label text-xs mb-[2px]">Potential Energy</div>
                <div ref={potentialEnergy3Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-green-500 transition-width duration-300"></div>
                <div className="energy-label text-xs mb-[2px]">Kinetic Energy</div>
                <div ref={kineticEnergy3Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-red-500 transition-width duration-300"></div>
                <div className="energy-label text-xs mb-[2px]">Lost Energy</div>
                <div ref={lostEnergy3Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-orange-500 transition-width duration-300"></div>
                <div className="energy-label text-xs mb-[2px]">Total Energy</div>
                <div ref={totalEnergy3Ref} className="energy-bar h-[30px] mb-[5px] w-0 bg-purple-500 transition-width duration-300"></div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[200px]">
                <div className="mb-3">
                  <label htmlFor="initialHeight3" className="block mb-1">Initial Height (m): <span>{initialHeight3.toFixed(1)}</span></label>
                  <input 
                    type="range" 
                    id="initialHeight3" 
                    min="1" 
                    max="3" 
                    step="0.1" 
                    value={initialHeight3}
                    onChange={handleInitialHeightChange3}
                    className="w-full"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="reboundHeight3" className="block mb-1">Rebound Height (m): <span>{reboundHeight3.toFixed(1)}</span></label>
                  <input 
                    type="range" 
                    id="reboundHeight3" 
                    min="0.5" 
                    max="2.5" 
                    step="0.1" 
                    value={reboundHeight3}
                    onChange={handleReboundHeightChange3}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <div className="mb-3">
                  <label htmlFor="mass3" className="block mb-1">Mass (kg): <span>{mass3.toFixed(2)}</span></label>
                  <input 
                    type="range" 
                    id="mass3" 
                    min="0.01" 
                    max="0.1" 
                    step="0.01" 
                    value={mass3}
                    onChange={handleMassChange3}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mb-4">
              <button 
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={startSimulation3}
              >
                {animationId3 !== null ? "Pause Simulation" : "Start Simulation"}
              </button>
              <button 
                className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                onClick={resetSimulation3}
              >
                Reset
              </button>
            </div>
            
            <div className="bg-gray-100 p-4 rounded">
              <div className="mb-4">
                <div className="bg-gray-200 p-2 rounded mb-2 font-mono text-sm">
                  GPE = mgh<br />
                  KE = ½mv²<br />
                  v = √(2gh)
                </div>
                <div>
                  <p>(a) Gravitational potential energy lost during fall: <span ref={energyLost3aRef} className="text-red-600 font-bold">0.00</span> J</p>
                  <p>(b) Kinetic energy before impact: <span ref={kineticBeforeImpact3Ref} className="text-red-600 font-bold">0.00</span> J</p>
                  <p>(b) Velocity before impact: <span ref={velocityBeforeImpact3Ref} className="text-red-600 font-bold">0.00</span> m/s</p>
                  <p>(c) Gravitational potential energy gained on rebound: <span ref={energyGained3cRef} className="text-red-600 font-bold">0.00</span> J</p>
                  <p>(d) Rebound velocity: <span ref={reboundVelocity3Ref} className="text-red-600 font-bold">0.00</span> m/s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnergyPracticeProblems;
