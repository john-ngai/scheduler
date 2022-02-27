import {useState} from 'react';

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial)
  return {mode}; // Can also be written as {mode: mode}.
}

export default useVisualMode;
