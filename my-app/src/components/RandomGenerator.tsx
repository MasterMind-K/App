import React, {useEffect, useState } from 'react';
import names from '../assets/imiona.json';

const RandomGenerator: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [generateRandom, setGenerateRandom] = useState<(() => number) | null>(null);

  // Ładowanie WebAssembly
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

  useEffect(() => {
  if (generateRandom) {
    // Ustawiamy pierwsze imię
    const initialIndex = generateRandom() % names.length;
    setName(names[initialIndex]);

    // Co 24h losujemy nowe imię
    const interval = setInterval(() => {  
    const newIndex = generateRandom() % names.length;
      window.location.reload();
      setName(names[newIndex]);
    }, 86400000); // 24h

    return () => clearInterval(interval);
  }
}, [generateRandom]);


  return (
    <div> 
      <p>{name}</p>
    </div>
  );
};

export default RandomGenerator;
