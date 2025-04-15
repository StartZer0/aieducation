
export const llmContent = `**Kinetic energy** and **potential energy** are two main types of mechanical energy. Here's a quick breakdown:

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

export const easyModeContent = `# Easy Explanation of Kinetic and Potential Energy

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

export const mediumModeContent = `# Medium Explanation of Kinetic and Potential Energy

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

export const advancedModeContent = `# Advanced Analysis of Kinetic and Potential Energy

Kinetic and potential energy represent the two primary manifestations of mechanical energy, mathematically formalized through the work-energy theorem and conservative force fields.

### Kinetic Energy: Rigorous Derivation

Kinetic energy quantifies the energy possessed by an object due to its motion. Beginning with Newton's second law, F = ma, we can derive the precise mathematical form through the work-energy relationship.

For an object of mass m experiencing a constant force F for time t, starting from rest:
- Acceleration a = v/t (where v is final velocity)
- By Newton's second law: F = ma = m(v/t)
- Distance traveled: s = ½(0 + v)t = ½vt
- Work done: W = Fs = F × ½vt
- Substituting F = m(v/t): W = m(v/t) × ½vt = ½mv²

Thus, the kinetic energy is rigorously defined as **E_k = ½mv²**

This formula emerges naturally from the fundamental laws of mechanics, demonstrating that kinetic energy is a scalar quantity proportional to both mass and the square of velocity. The dimensional analysis confirms this as [M][L²][T⁻²], consistent with the units of energy.

### Potential Energy: Theoretical Underpinnings

Gravitational potential energy represents stored energy in a conservative force field. The formal definition derives from the line integral of force:

For a conservative force F, potential energy is defined by:
ΔE_p = -∫F·ds

For the specific case of Earth's gravitational field near the surface, where F = mg:
ΔE_p = -∫mg·ds = -mg·Δh = mgh

Thus, **E_p = mgh** represents the change in potential energy for small height variations.

Critically, this formula assumes a uniform gravitational field, which is only approximately true near Earth's surface. For heights that are non-negligible compared to Earth's radius (R), the gravitational field strength varies according to the inverse square law:
g(r) = G·M_earth/r² 

This necessitates integration to calculate potential energy changes over significant height variations:
ΔE_p = GMm(1/r₁ - 1/r₂)

## Energy Conservation and Transformations

The principle of conservation of mechanical energy in absence of non-conservative forces yields:
E_k + E_p = constant

This gives rise to the fundamental relationship for falling bodies:
**½mv² = mgh**

For systems with varying height, such as pendulums, this extends to:
**½mv² = mgh₀ - mgh**

This equation provides a means to determine velocity at any position in the pendulum's trajectory without needing to solve differential equations of motion directly.

## Analysis of Non-Conservative Systems

In practical applications, non-conservative forces like friction necessitate an expanded analysis. For a system like the fairground vehicle described in the PDF:

- Total mechanical energy at start: E_initial = mgh
- Total mechanical energy at end: E_final = ½mv²
- Work done against friction: W_friction = E_initial - E_final = mgh - ½mv²

The average frictional force can be determined through:
F_friction = W_friction/d

Where d is the distance traveled along the path. This yields:
F_friction = (mgh - ½mv²)/d

This analysis demonstrates how energy dissipation can be quantified and related to macroscopic observables.

## Relativistic Considerations

The classical expressions for kinetic energy break down at relativistic velocities. As Einstein's special relativity elucidates, the correct expression becomes:
E = γmc² = mc²/√(1-v²/c²)

Where γ is the Lorentz factor. The classical expression E_k = ½mv² emerges as the first-order term in the binomial expansion of this relativistic formula for v << c.

## Mathematical Analysis of Energy Transformations

For a mechanical system undergoing energy transformation, the instantaneous rate of change satisfies:
dE_k/dt + dE_p/dt = P_external

Where P_external is the power delivered by external forces. For conservative systems with no external power input, this reduces to:
dE_k/dt = -dE_p/dt

This differential relationship demonstrates that the rate of kinetic energy gain equals the rate of potential energy loss at each instant.

The mathematical structure of these energy principles forms the foundation for analyzing complex mechanical systems, from simple harmonic oscillators to multi-body dynamics, providing a powerful analytical framework that transcends the need to solve explicitly for forces and accelerations in many applications.

Through this theoretical framework, we gain not merely computational tools for solving problems but profound insight into the fundamental nature of mechanical systems and the invariant quantities that govern their behavior across diverse physical contexts.`;
