
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TypewriterText from "@/components/TypewriterText";
import { KineticEnergyVisualization } from "@/components/KineticEnergyVisualization";

export default function ContentComparison() {
  const [activeTab, setActiveTab] = useState<string>("medium");

  const llmContent = `**Kinetic energy** and **potential energy** are two main types of mechanical energy. Here's a quick breakdown:

---

### 🔹 **Kinetic Energy (KE)**  
- **Definition**: The energy an object has due to its motion.  
- **Formula**:  
  \\[
  KE = \\frac{1}{2}mv^2
  \\]  
  where:  
  - *m* = mass of the object (kg)  
  - *v* = velocity of the object (m/s)

- **Examples**:  
  - A car driving down the road  
  - A ball flying through the air  
  - A person running

---

### 🔹 **Potential Energy (PE)**  
- **Definition**: Stored energy an object has because of its position or condition.  
- **Most common type**: **Gravitational Potential Energy**

- **Formula** (for gravitational PE):  
  \\[
  PE = mgh
  \\]  
  where:  
  - *m* = mass (kg)  
  - *g* = gravitational acceleration (9.8 m/s² on Earth)  
  - *h* = height above the ground (m)

- **Examples**:  
  - A rock at the edge of a cliff  
  - A stretched rubber band (elastic potential energy)  
  - Water behind a dam

---

### 🧠 Quick Way to Remember:  
- **Kinetic** = Moving  
- **Potential** = Position (or stored)

Would you like an example problem using both?`;

  const easyModeContent = `# Easy Explanation of Kinetic and Potential Energy

Imagine you're playing with a ball on a hill. When you hold the ball at the top of the hill, it's not moving, but it has something special called **potential energy**. This is energy that's just waiting to be used - like having power stored up because of where the ball is positioned.

Scientists write potential energy as: **E_p = mgh**

This means:
- m is how heavy the ball is (its mass)
- g is how strongly Earth pulls things down (gravity, which is 9.8 m/s²)
- h is how high the ball is above the ground

Now, when you let go of the ball, something amazing happens! As it rolls down the hill, that stored-up potential energy starts changing into **kinetic energy** - the energy of movement. The faster the ball rolls, the more kinetic energy it has.

Scientists write kinetic energy as: **E_k = ½mv²**

This means:
- m is still how heavy the ball is
- v is how fast it's moving (its speed)
- We multiply by ½ because that's what the math tells us when we work it out step by step

Let's see how we get this formula. When a force (F) pushes something for some time, it causes the object to speed up. Using Newton's second law (F = ma), and some simple movement math, we can show that:
- The distance traveled (s) equals ½vt (when starting from rest)
- The work done (W) equals force times distance (W = Fs)
- This work becomes kinetic energy: W = ½mv²

Something really cool happens when an object falls: **the potential energy it loses exactly equals the kinetic energy it gains** (if there's no air resistance). We can write this as:
- ½mv² = mgh

This works for lots of things:

**For a dropped ball**: If you drop a ball from a height of 10 meters, you can use ½mv² = mgh to figure out how fast it will be moving when it hits the ground.

**For a pendulum swing**: When a pendulum swings, it's constantly trading potential energy for kinetic energy and back again. At the highest point, it has maximum potential energy (mgh₀). At any other height (h), its kinetic energy is ½mv² = mgh₀ - mgh.

**For a roller coaster**: As a roller coaster car goes down a track, it loses height (and potential energy) but gains speed (and kinetic energy). Some energy is also lost to friction, which we can calculate as: mgh - ½mv².

The formulas do have some limits though:
- They don't work for very fast speeds (close to the speed of light)
- The gravity formula works best when the height change is small compared to Earth's size
- The gravitational force actually changes slightly as you move higher from Earth

Energy is never created or destroyed - it just changes form. That's why when potential energy decreases, kinetic energy increases (or sometimes heat energy from friction).

Whether it's a ball bouncing, a cyclist coasting downhill, or a fairground ride, the same basic principles apply: position gives you potential energy, and motion gives you kinetic energy!`;

  const mediumModeContent = `# Medium Explanation of Kinetic and Potential Energy

Kinetic and potential energy are two fundamental forms of mechanical energy that help us understand how objects move and interact with their environment.

## Kinetic Energy

Kinetic energy is the energy possessed by an object due to its motion. The faster an object moves, the more kinetic energy it has. The mathematical formula for kinetic energy is:

**E_k = ½mv²**

Where m is the mass of the object and v is its velocity.

This formula can be derived from Newton's laws of motion. When a constant force F acts on an object of mass m for time t, the object accelerates. Using Newton's second law, we know that F = ma, and acceleration a = v/t (assuming the object starts from rest). The distance traveled during this time is s = ½vt.

The work done on the object is:
W = Fs = F × ½vt

Substituting F = ma = m(v/t), we get:
W = m(v/t) × ½vt = ½mv²

This work done becomes the kinetic energy of the object.

## Potential Energy

Potential energy is the energy stored in an object due to its position or configuration. For gravitational potential energy, the formula is:

**E_p = mgh**

Where m is the mass, g is the acceleration due to gravity (9.8 m/s² at Earth's surface), and h is the height.

This formula comes from the work needed to lift an object against gravity. The force required equals the object's weight (mg), and the work done is force times distance (h), giving us mgh.

## Energy Transformations

When an object falls from a height, its potential energy converts to kinetic energy. If we ignore air resistance, the conservation of energy principle gives us:

**½mv² = mgh**

This means the kinetic energy gained equals the potential energy lost.

Here are some practical applications:

1. **Free-falling object**: If you drop an object from height h, its potential energy decreases while its kinetic energy increases as it falls. At any point during the fall, the sum of potential and kinetic energy remains constant (ignoring air resistance).

2. **Pendulum motion**: When a pendulum swings, energy constantly converts between potential and kinetic forms. At the highest point of the swing (height h₀), it has maximum potential energy and zero kinetic energy. At any lower height h, the kinetic energy is:
   **½mv² = mgh₀ - mgh**

3. **Fairground ride**: For a vehicle moving down a track, like a roller coaster, we can calculate:
   - Loss of potential energy = mgh (where h is the vertical drop)
   - Gain in kinetic energy = ½mv²
   - Work done against friction = mgh - ½mv²

## Important Considerations

There are limitations to these formulas:
- The kinetic energy formula doesn't apply at speeds approaching the speed of light
- The potential energy formula assumes h is small compared to Earth's radius, as g varies with distance from Earth
- In real situations, some energy converts to heat through friction

By understanding these energy concepts, we can analyze and predict the behavior of mechanical systems, from bouncing balls to complex machines, using the principle that energy is conserved but can change from one form to another.`;

  const advancedModeContent = `I'll create an interactive visualization that demonstrates how kinetic energy is gained when a force acts on an object. This will allow you to see the relationship between force, distance, and kinetic energy by adjusting different parameters.

I've created an interactive visualization that demonstrates how kinetic energy is gained when a force acts on an object over a distance, just like in the diagram you shared.

This interactive HTML and D3.js visualization allows you to:

1. **Adjust parameters**:
   - Change the mass of the object
   - Modify the force applied
   - Control the time duration

2. **See the calculations in real-time**:
   - Acceleration (a = F/m)
   - Velocity (v = at)
   - Distance traveled (s = ½at²)
   - Work done (W = Fs)
   - Kinetic energy (Ek = ½mv²)

3. **Visualize the physics**:
   - Watch the object move along a path
   - See the force arrow pushing the object
   - Observe the distance increasing
   - View energy bars that show how work done equals kinetic energy gained

4. **Control the animation**:
   - Play/pause to see the motion in action
   - Reset to start over

The visualization directly represents the concepts from the diagram, showing how a constant force (F) acts on an object of mass (m) initially at rest, causing it to move a distance (s) and gain speed (v) after time (t).

This demonstrates the core principle that the work done on an object (Fs) becomes kinetic energy (½mv²), which is exactly what your textbook diagram is illustrating.

You can interact with the sliders to explore how changing mass, force, and time affects the motion and energy of the object.`;

  const modeContentMap = {
    easy: easyModeContent,
    medium: mediumModeContent,
    advanced: advancedModeContent,
  };

  const getCurrentContent = () => {
    return modeContentMap[activeTab as keyof typeof modeContentMap] || mediumModeContent;
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Educational Content Comparison</h1>
      <h2 className="text-xl text-center text-muted-foreground mb-10">
        "What is Kinetic energy and potential energy?"
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LLM Generated Content */}
        <Card className="h-[800px] overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardTitle className="text-center">LLM Generated Content</CardTitle>
          </CardHeader>
          <CardContent className="p-6 h-[730px] overflow-auto">
            <TypewriterText text={llmContent} speed={0.33} />
          </CardContent>
        </Card>
        
        {/* RAG System Content */}
        <Card className="h-[800px] overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardTitle className="text-center flex items-center justify-center">
              <span>RAG System (A-Level Curriculum)</span>
            </CardTitle>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="easy">Easy</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-6 h-[680px] overflow-auto">
            <TabsContent value="easy" forceMount={activeTab === "easy"}>
              <TypewriterText text={easyModeContent} speed={0.33} />
            </TabsContent>
            <TabsContent value="medium" forceMount={activeTab === "medium"}>
              <TypewriterText text={mediumModeContent} speed={0.33} />
            </TabsContent>
            <TabsContent value="advanced" forceMount={activeTab === "advanced"}>
              <TypewriterText text={advancedModeContent} speed={0.33} />
              <div className="mt-6">
                <KineticEnergyVisualization />
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
