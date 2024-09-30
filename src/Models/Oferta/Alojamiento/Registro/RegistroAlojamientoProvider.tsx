import { ReactNode, createContext, useContext } from "react";
import { useProvideRegistroAlojamiento } from "./useRegistroAlojamiento";

const RegistroAlojamientoContext = createContext<any | undefined>(undefined);

export const RegistroAlojamientoProvider: React.FC<{
  children: ReactNode;
}> = (props: { children: ReactNode }) => {
  const context = useProvideRegistroAlojamiento({});

  return (
    <RegistroAlojamientoContext.Provider value={context}>
      {props.children}
    </RegistroAlojamientoContext.Provider>
  );
};

export const useRegistroAlojamiento = () => {
  return useContext(RegistroAlojamientoContext);
};
