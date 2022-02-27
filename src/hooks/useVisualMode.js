const useVisualMode = initial => {
  const [mode, setMode] = useState(intial)
  return {mode}; // Can also be written as {mode: mode}.
}

export default useVisualMode;
