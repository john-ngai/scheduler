import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (!replace) {
      setMode(mode);
      setHistory((prev) => [...prev, mode]);
    } else {
      setMode(mode);
    }
  };

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
    if (history.length === 1) {
      setMode(history[0]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;
