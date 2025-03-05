
import React, { useEffect, useRef } from 'react';

interface InteractiveFunctionGraphProps {
  containerId: string;
  className?: string;
}

export function InteractiveFunctionGraph({ containerId, className = "" }: InteractiveFunctionGraphProps) {
  const initialized = useRef(false);

  useEffect(() => {
    // Skip if already initialized or if window.Plotly is not available
    if (initialized.current || !window.Plotly) return;
    
    // Get all required elements
    const parameterA = document.getElementById(`parameter-a-${containerId}`);
    const parameterAValue = document.getElementById(`parameter-a-value-${containerId}`);
    const parameterB = document.getElementById(`parameter-b-${containerId}`);
    const parameterBValue = document.getElementById(`parameter-b-value-${containerId}`);
    const parameterC = document.getElementById(`parameter-c-${containerId}`);
    const parameterCValue = document.getElementById(`parameter-c-value-${containerId}`);
    const currentEquation = document.getElementById(`current-function-equation-${containerId}`);
    const testInput = document.getElementById(`test-x-${containerId}`);
    const testBtn = document.getElementById(`test-btn-${containerId}`);
    const testResult = document.getElementById(`test-result-${containerId}`);
    const vertexValue = document.getElementById(`vertex-value-${containerId}`);
    const yInterceptValue = document.getElementById(`y-intercept-value-${containerId}`);
    const discriminantValue = document.getElementById(`discriminant-value-${containerId}`);
    const rootsValue = document.getElementById(`roots-value-${containerId}`);
    const opensValue = document.getElementById(`opens-value-${containerId}`);
    
    if (!parameterA || !parameterAValue || !parameterB || !parameterBValue || 
        !parameterC || !parameterCValue || !currentEquation || !testInput || 
        !testBtn || !testResult || !vertexValue || !yInterceptValue || 
        !discriminantValue || !rootsValue || !opensValue) {
      console.error("One or more required elements not found for graphing");
      return;
    }
    
    // Current function parameters
    let a = parseFloat((parameterA as HTMLInputElement).value);
    let b = parseFloat((parameterB as HTMLInputElement).value);
    let c = parseFloat((parameterC as HTMLInputElement).value);
    
    // Function to calculate y value for given x
    function calculateY(x: number) {
      return a * x * x + b * x + c;
    }
    
    // Function to update the equation display
    function updateEquationDisplay() {
      let equation = 'f(x) = ';
      
      if (a !== 0) {
        equation += a === 1 ? 'x²' : a === -1 ? '-x²' : `${a}x²`;
      }
      
      if (b !== 0) {
        const sign = b > 0 ? (a !== 0 ? ' + ' : '') : ' - ';
        equation += sign + (Math.abs(b) === 1 ? 'x' : `${Math.abs(b)}x`);
      }
      
      if (c !== 0 || (a === 0 && b === 0)) {
        const sign = c > 0 ? ((a !== 0 || b !== 0) ? ' + ' : '') : ' - ';
        equation += sign + `${Math.abs(c)}`;
      }
      
      currentEquation.textContent = equation;
    }
    
    // Function to update function properties
    function updateFunctionProperties() {
      // Calculate vertex
      const vertexX = a !== 0 ? -b / (2 * a) : 'N/A';
      const vertexY = typeof vertexX === 'number' ? calculateY(vertexX) : 'N/A';
      vertexValue.textContent = a !== 0 ? `(${Number(vertexX).toFixed(2)}, ${Number(vertexY).toFixed(2)})` : 'N/A';
      
      // Y-intercept
      yInterceptValue.textContent = c.toString();
      
      // Discriminant and roots
      const discriminant = b * b - 4 * a * c;
      discriminantValue.textContent = discriminant.toFixed(2);
      
      if (a === 0) {
        rootsValue.textContent = b !== 0 ? `${(-c / b).toFixed(2)}` : 'No root or all values';
      } else if (discriminant < 0) {
        rootsValue.textContent = 'No real roots';
      } else if (discriminant === 0) {
        rootsValue.textContent = `${(-b / (2 * a)).toFixed(2)}`;
      } else {
        const sqrtDiscriminant = Math.sqrt(discriminant);
        const root1 = (-b + sqrtDiscriminant) / (2 * a);
        const root2 = (-b - sqrtDiscriminant) / (2 * a);
        rootsValue.textContent = `${root1.toFixed(2)}, ${root2.toFixed(2)}`;
      }
      
      // Opens direction
      opensValue.textContent = a > 0 ? 'Upward' : a < 0 ? 'Downward' : 'Horizontally';
    }
    
    // Function to plot the graph
    function plotGraph() {
      // Generate data points
      const xValues = [];
      const yValues = [];
      
      // Calculate reasonable x range based on current function
      const vertexX = a !== 0 ? -b / (2 * a) : 0;
      const range = Math.max(5, Math.abs(vertexX) * 2 + 2);
      const start = -range;
      const end = range;
      const step = (end - start) / 100;
      
      for (let x = start; x <= end; x += step) {
        xValues.push(x);
        yValues.push(calculateY(x));
      }
      
      // Create trace for the main function
      const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
        name: currentEquation.textContent,
        line: {
          color: '#3498db',
          width: 3
        }
      };
      
      // Add vertex point if applicable
      let data = [trace];
      if (a !== 0) {
        const vertexTrace = {
          x: [vertexX],
          y: [calculateY(vertexX)],
          type: 'scatter',
          mode: 'markers',
          name: 'Vertex',
          marker: {
            color: '#ff5722',
            size: 10
          }
        };
        data.push(vertexTrace);
      }
      
      // Define layout
      const layout = {
        title: `Graph of ${currentEquation.textContent}`,
        xaxis: {
          title: 'x',
          zeroline: true,
          showgrid: true,
          range: [start, end]
        },
        yaxis: {
          title: 'f(x)',
          zeroline: true,
          showgrid: true
        },
        showlegend: false,
        hovermode: 'closest',
        autosize: true
      };
      
      // Set reasonable y-axis range
      const yValues2 = yValues.filter(y => !isNaN(y) && isFinite(y));
      if (yValues2.length > 0) {
        const minY = Math.min(...yValues2);
        const maxY = Math.max(...yValues2);
        const yRange = maxY - minY;
        layout.yaxis.range = [
          minY - yRange * 0.1,
          maxY + yRange * 0.1
        ];
      }
      
      // Create the plot
      window.Plotly.newPlot(containerId, data, layout, {
        responsive: true,
        displayModeBar: false
      });
    }
    
    // Function to update everything
    function updateAll() {
      a = parseFloat((parameterA as HTMLInputElement).value);
      b = parseFloat((parameterB as HTMLInputElement).value);
      c = parseFloat((parameterC as HTMLInputElement).value);
      
      updateEquationDisplay();
      updateFunctionProperties();
      plotGraph();
      
      // Update test result if there's a value
      if ((testInput as HTMLInputElement).value !== '') {
        const x = parseFloat((testInput as HTMLInputElement).value);
        testResult.textContent = calculateY(x).toFixed(2);
      }
    }
    
    // Set up event listeners
    parameterA.addEventListener('input', function(this: HTMLInputElement) {
      parameterAValue.textContent = this.value;
      updateAll();
    });
    
    parameterB.addEventListener('input', function(this: HTMLInputElement) {
      parameterBValue.textContent = this.value;
      updateAll();
    });
    
    parameterC.addEventListener('input', function(this: HTMLInputElement) {
      parameterCValue.textContent = this.value;
      updateAll();
    });
    
    testBtn.addEventListener('click', function() {
      const x = parseFloat((testInput as HTMLInputElement).value);
      testResult.textContent = calculateY(x).toFixed(2);
    });
    
    testInput.addEventListener('keyup', function(this: HTMLInputElement, event: KeyboardEvent) {
      if (event.key === 'Enter') {
        const x = parseFloat(this.value);
        testResult.textContent = calculateY(x).toFixed(2);
      }
    });
    
    // Initialize
    updateAll();
    
    initialized.current = true;
  }, [containerId]);

  return (
    <div className={`graph-container ${className}`}>
      {/* Function Display */}
      <div className="equation-display">
        <p id={`current-function-equation-${containerId}`} className="text-lg font-medium">f(x) = x² + 0x + 0</p>
      </div>
      
      {/* Parameter Controls */}
      <div className="function-controls grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        {/* Parameter a */}
        <div className="function-control">
          <label htmlFor={`parameter-a-${containerId}`} className="block text-sm font-medium mb-1">Parameter a:</label>
          <div className="slider-container flex items-center gap-2">
            <input 
              type="range" 
              id={`parameter-a-${containerId}`} 
              min="-5" 
              max="5" 
              step="0.1" 
              defaultValue="1"
              className="flex-1"
            />
            <span id={`parameter-a-value-${containerId}`} className="w-8 text-right">1.0</span>
          </div>
        </div>
        
        {/* Parameter b */}
        <div className="function-control">
          <label htmlFor={`parameter-b-${containerId}`} className="block text-sm font-medium mb-1">Parameter b:</label>
          <div className="slider-container flex items-center gap-2">
            <input 
              type="range" 
              id={`parameter-b-${containerId}`} 
              min="-10" 
              max="10" 
              step="0.5" 
              defaultValue="0"
              className="flex-1"
            />
            <span id={`parameter-b-value-${containerId}`} className="w-8 text-right">0</span>
          </div>
        </div>
        
        {/* Parameter c */}
        <div className="function-control">
          <label htmlFor={`parameter-c-${containerId}`} className="block text-sm font-medium mb-1">Parameter c:</label>
          <div className="slider-container flex items-center gap-2">
            <input 
              type="range" 
              id={`parameter-c-${containerId}`} 
              min="-10" 
              max="10" 
              step="0.5" 
              defaultValue="0"
              className="flex-1"
            />
            <span id={`parameter-c-value-${containerId}`} className="w-8 text-right">0</span>
          </div>
        </div>
      </div>
      
      {/* Graph Container */}
      <div 
        id={containerId} 
        className="plot-container h-80 w-full border border-border rounded-md bg-card/50 my-4"
      ></div>
      
      {/* Function Properties */}
      <div className="function-properties bg-muted/30 p-4 rounded-md my-4">
        <h4 className="text-sm font-medium mb-2">Function Properties</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2">
          <li className="text-sm">Vertex: <span id={`vertex-value-${containerId}`} className="font-medium text-primary">(0, 0)</span></li>
          <li className="text-sm">Y-intercept: <span id={`y-intercept-value-${containerId}`} className="font-medium text-primary">0</span></li>
          <li className="text-sm">Discriminant: <span id={`discriminant-value-${containerId}`} className="font-medium text-primary">0</span></li>
          <li className="text-sm">Roots: <span id={`roots-value-${containerId}`} className="font-medium text-primary">None</span></li>
          <li className="text-sm">Opens: <span id={`opens-value-${containerId}`} className="font-medium text-primary">Upward</span></li>
        </ul>
      </div>
      
      {/* Test Value Area */}
      <div className="test-value-container my-4">
        <label htmlFor={`test-x-${containerId}`} className="block text-sm font-medium mb-2">Test a value:</label>
        <div className="test-input-group flex flex-wrap items-center gap-3">
          <div className="input-pair flex items-center">
            <span className="mr-1">x =</span>
            <input 
              type="number" 
              id={`test-x-${containerId}`} 
              defaultValue="0" 
              step="0.5" 
              className="w-20 px-2 py-1 border border-border rounded-md"
            />
          </div>
          <button 
            id={`test-btn-${containerId}`}
            className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm hover:bg-primary/90 transition-colors"
          >
            Calculate
          </button>
          <div className="input-pair flex items-center">
            <span className="mr-1">f(x) =</span>
            <span id={`test-result-${containerId}`} className="font-medium">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
