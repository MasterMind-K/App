import React, { useEffect, useState } from 'react';
import names from '../assets/imiona.json';

const RandomGenerator: React.FC = () => {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [generateRandom, setGenerateRandom] = useState<(() => number) | null>(null);

  useEffect(() => {
    const loadWasm = async () => {
      const script = document.createElement('script');
      script.src = '/hello.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const checkModule = setInterval(() => {
          const module = (window as any).Module;
          if (module && module.cwrap) {
            clearInterval(checkModule);
            const wrapped = module.cwrap('generate_random', 'number', []);
            setGenerateRandom(() => wrapped);
          }
        }, 100);
      };
    };

    loadWasm();
  }, []);

  
const handleClick = () => {
    if (generateRandom) {
      const result = generateRandom(); // result is from 1 to 20
      const index = result; 
      const name = names[index] ?? 'Unknown';
      setSelectedName(name);
    }
  };

  return (
    <div>
      <h1>{selectedName}</h1>
      <button onClick={handleClick}>Generate Name</button>
    </div>
  );
};


export default RandomGenerator;