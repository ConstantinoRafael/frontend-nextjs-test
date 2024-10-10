import { useState, useEffect } from "react";

type CounterProps = {
  initialCount: number;
  onCounterComplete: () => void;
};

export const Counter: React.FC<CounterProps> = ({
  initialCount,
  onCounterComplete,
}) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    const mountEvent = new CustomEvent("onCounterMount");
    window.dispatchEvent(mountEvent);
    console.log("Componente montado!");

    return () => {
      const unmountEvent = new CustomEvent("onCounterUnmount");
      window.dispatchEvent(unmountEvent);
      console.log("Componente desmontado!");
    };
  }, []);

  useEffect(() => {
    if (count < 10) {
      const updateEvent = new CustomEvent("onCounterUpdate", {
        detail: count,
      });
      window.dispatchEvent(updateEvent);
      console.log("Componente atualizado!");
    } else {
      onCounterComplete();
    }
  }, [count, onCounterComplete]);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={handleIncrement}>Incrementar +</button>
    </div>
  );
};
