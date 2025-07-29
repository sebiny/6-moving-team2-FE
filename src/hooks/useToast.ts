import React, { useEffect, useState } from "react";

function useToast(duration = 2000) {
  const [toast, setToast] = useState<string>("");
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast("");
    }, duration);
    return () => clearTimeout(timer);
  }, [toast, duration]);
  return;
}

export default useToast;
