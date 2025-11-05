import React, { useEffect, useState } from 'react';

const RandomGenerator: React.FC = () => {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
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
      const result = generateRandom();
      setRandomNumber(result);
    }
  };

  return (
    <div>
      <h1>Random Number: {randomNumber ?? 'Click the button!'}</h1>
      <button onClick={handleClick}>Generate Random Number</button>
    </div>
  );
};

export default RandomGenerator;