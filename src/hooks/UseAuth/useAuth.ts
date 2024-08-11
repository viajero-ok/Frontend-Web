import { useEffect, useState } from "react";
import { getDatosUsuario } from "../../App/Auth/Cuenta";

interface IUseProvideAuth {}
export const useProvideAuth = (props: any) => {
  const [perfiles, setPerfiles] = useState<number[]>([]);
  useEffect(() => {
    getDatosUsuario()
      .then((response: any) => {
        setPerfiles(response.data.perfiles);
      })
      .catch((error: any) => {});
  }, []);

  return {};
};
