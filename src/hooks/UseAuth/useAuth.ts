import { useEffect, useState } from "react";
import { getDatosUsuario } from "../../App/Auth/Cuenta";

interface IUseProvideAuth {}
export const useProvideAuth = (props: any) => {
  const [perfiles, setPerfiles] = useState<number[]>([]);
  const [usuario, setUsuario] = useState<any>(null);
  const [tienePerfil, setTienePerfil] = useState<boolean>();

  useEffect(() => {
    getDatosUsuario()
      .then((response: any) => {
        setPerfiles(response.data.perfiles);
        if (response.data.tiene_perfil)
          setUsuario({
            nombre: response.data.datos_usuario_perfil.datos_turista.nombre,
            apellido: response.data.datos_usuario_perfil.datos_turista.apellido,
            mail: response.data.datos_usuario_perfil.datos_turista.mail,
          });
        setTienePerfil(response.data.tiene_perfil);
        console.log("response: ", response.data);
        if (
          !response.data.tiene_perfil &&
          !window.location.toString().includes("signup/complete")
        )
          window.location.replace("signup/complete");
      })
      .catch((error: any) => {
        setUsuario(null);
        console.log("error: ", error);
      });
  }, []);

  const logout = () => {
    setPerfiles([]);
    setUsuario(null);
  };

  return {
    perfiles: perfiles,
    usuario: usuario,
    logout,
  };
};
