// context/LoadingContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from "react";

const LoadingContext = createContext({
  isLoading: false,
  setLoading: (value: boolean) => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const UseLoading = () => useContext(LoadingContext);
