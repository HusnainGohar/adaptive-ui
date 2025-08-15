import { createContext, useContext } from "react";
import { useUserQuery } from "../hooks/auth";
import { usePersonaQuery } from "../hooks/usePersonaQuery";

const PersonaContext = createContext();

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function PersonaProvider({ children }) {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useUserQuery();
  const stats = user?.stats;

  // Use the persona query hook
  const {
    data: personaData,
    isLoading: isPersonaLoading,
    error: personaError,
  } = usePersonaQuery(stats);

  const persona = personaData?.persona;
  const loading = isUserLoading || isPersonaLoading;
  const error = userError || personaError?.message || null;

  return (
    <PersonaContext.Provider value={{ persona, loading, error }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  return useContext(PersonaContext);
}
