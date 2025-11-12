import React, { useEffect, useState } from 'react';
import names from '../assets/imiona.json';

const RandomGenerator: React.FC = () => {
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

  const saveNameToFile = (name: string) => {
    fetch('http://localhost:3001/save-name', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(() => console.log('Wysłano do backendu'))
      .catch(err => console.error('Błąd wysyłania:', err));
  };

  // Funkcja do logowania czasu od ostatniego losowania
  useEffect(() => {
    const logInterval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - lastDrawTime;
      const elapsedSec = Math.floor(elapsedMs / 1000);
      const elapsedMin = Math.floor(elapsedSec / 60);
      const elapsedHours = Math.floor(elapsedMin / 60);
      console.log(`Minęło: ${elapsedHours}h ${elapsedMin % 60}m ${elapsedSec % 60}s od ostatniego losowania`);
    }, 1000000); // co ~16 minut

    return () => clearInterval(logInterval);
  }, [lastDrawTime]);

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    if (savedName) {
      setName(JSON.parse(savedName));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('name', JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    if (generateRandom && !name) {
      const initialIndex = generateRandom() % names.length;
      const selectedName = names[initialIndex];
      setName(selectedName);
      saveNameToFile(selectedName);
      setLastDrawTime(Date.now());

      const interval = setInterval(() => {
        const newIndex = generateRandom() % names.length;
        const newName = names[newIndex];
        setName(newName);
        saveNameToFile(newName);
        setLastDrawTime(Date.now());
        window.location.reload();
      }, 86400000); // 24h

      return () => clearInterval(interval);
    }
  }, [generateRandom, name]);

  return (
    <div>
      {name ? <p>{name}</p> : <p>Ładuję imię...</p>}
    </div>
  );
};

export default RandomGenerator;

//Imie chyba zmienia się o 11`