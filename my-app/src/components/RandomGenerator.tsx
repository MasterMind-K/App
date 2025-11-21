import React, { useEffect, useState } from 'react';
import names from '../assets/imiona.json';

interface RandomGeneratorProps {
  intervalMs?: number; // czas w milisekundach, domyślnie 24h
}

const RandomGenerator: React.FC<RandomGeneratorProps> = ({ intervalMs = 86400000 }) => {
  const [name, setName] = useState<string | null>(null);
  const [generateRandom, setGenerateRandom] = useState<(() => number) | null>(null);
  const [lastDrawTime, setLastDrawTime] = useState<number>(Date.now());

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

  // Logowanie czasu od ostatniego losowania
  useEffect(() => {
    const logInterval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - lastDrawTime;
      const elapsedSec = Math.floor(elapsedMs / 1000);
      const elapsedMin = Math.floor(elapsedSec / 60);
      const elapsedHours = Math.floor(elapsedMin / 60);
    }, 5000); // co 5 sekund (debug)

    return () => clearInterval(logInterval);
  }, [lastDrawTime]);

 
  useEffect(() => {
    const savedName = localStorage.getItem('name');
    if (savedName) {
      setName(JSON.parse(savedName));
    }
  }, []);

  useEffect(() => {
    if (name) {
      localStorage.setItem('name', JSON.stringify(name));
    }
  }, [name]);

  useEffect(() => {
    if (generateRandom) {
      if (!name) {
        const initialIndex = generateRandom() % names.length;
        const selectedName = names[initialIndex];
        setName(selectedName);
        setLastDrawTime(Date.now());
        console.log("Pierwsze imię:", selectedName);
      }

      const interval = setInterval(() => {
        const newIndex = generateRandom() % names.length;
        const newName = names[newIndex];
        setName(newName);
        setLastDrawTime(Date.now());
        console.log("Losuję nowe imię:", newName);
      }, intervalMs);

      return () => clearInterval(interval);
    }
  }, [generateRandom, name, intervalMs]);

  return (
    <div>
      {name ? <p>{name}</p> : <p>Ładuję imię...</p>}
    </div>
  );
};

export default RandomGenerator;