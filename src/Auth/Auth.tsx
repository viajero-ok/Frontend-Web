import React from "react";
import { getDatosUsuario } from "../App/Auth/Cuenta";
import { useIonRouter } from "@ionic/react";

export const PERFILES = {
  INVITADO: { id: 0 },
  TURISTA: { id: 1 },
  PRESTADOR: { id: 2 },
};

type LoggedData = {
  datos_usuario_perfil: {
    datos_prestador?: {
      nombre: string;
      apellido: string;
      mail: string;
      razon_social: string;
    };
    datos_turista?: {};
  };
  tiene_perfil: boolean;
  perfilesUsuario: {
    id_perfil_x_usuario: number;
    id_perfil: number;
    nombre_perfil: string;
  }[];
};

type AuthContextValue =
  | {
      tienePerfil: boolean;
      perfiles: (0 | 1 | 2)[];
      selectedProfile: 0 | 1 | 2;
      esTurista: boolean;
      esPrestador: boolean;
    }
  | "loading"
  | "failed";

const AuthContext = React.createContext<AuthContextValue>(
  {} as AuthContextValue
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = React.useState<AuthContextValue>("loading");

  React.useEffect(() => {
    /** TODO: antes de llamar getDatosUsuario, tiene que ir a buscar a session storage */
    /** Esto es realmente necesario? solamente solucionaria cuando se hace f5 reiteradas veces */
    getDatosUsuario()
      .then((response: { data: LoggedData }) => {
        setData({
          tienePerfil: response.data.tiene_perfil,
          perfiles: response.data.perfilesUsuario.map(
            (p: LoggedData["perfilesUsuario"][number]) =>
              p.id_perfil as 0 | 1 | 2
          ),
          selectedProfile: response.data.tiene_perfil
            ? (response.data.perfilesUsuario[0].id_perfil as 0 | 1 | 2)
            : 0,
          esTurista:
            response.data.perfilesUsuario.filter(
              (p: LoggedData["perfilesUsuario"][number]) => p.id_perfil == 1
            ).length == 1,
          esPrestador:
            response.data.perfilesUsuario.filter(
              (p: LoggedData["perfilesUsuario"][number]) => p.id_perfil == 2
            ).length == 1,
        });
      })
      .catch(() => {
        setData("failed");
      });
  }, []);

  const context: AuthContextValue = data;
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
