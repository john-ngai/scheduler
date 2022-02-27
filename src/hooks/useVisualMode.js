import {useState} from 'react';

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial)
  const transition = newState => setMode(newState);
  return {mode, transition}; // Can also be written as {mode: mode}.
}
export default useVisualMode;
