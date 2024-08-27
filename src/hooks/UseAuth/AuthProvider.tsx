import { ReactNode, createContext, useContext } from "react";
import { useProvideAuth } from "./useAuth";

const AuthContext = createContext<any | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: ReactNode;
}> = (props: { children: ReactNode }) => {
  const context = useProvideAuth({});

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
