import { useEffect, useState } from "react";
import { getDatosUsuario } from "../../App/Auth/Cuenta";

interface IUseProvideAuth {}
export const useProvideAuth = (props: any) => {
  const [perfiles, setPerfiles] = useState<number[]>([]);
  const [usuario, setUsuario] = useState<any>();
  useEffect(() => {
    getDatosUsuario()
      .then((response: any) => {
        setPerfiles(response.data.perfiles);
        setUsuario({
          nombre: response.data.datos_usuario_perfil.datos_turista.nombre,
          apellido: response.data.datos_usuario_perfil.datos_turista.apellido,
          mail: response.data.datos_usuario_perfil.datos_turista.mail,
        });
      })
      .catch((error: any) => {});
  }, []);

  return {
    perfiles: perfiles,
    usuario: usuario,
  };
};
