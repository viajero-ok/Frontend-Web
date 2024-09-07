import { useEffect, useState } from "react";
import { getDatosUsuario } from "../../App/Auth/Cuenta";
import { PERFILES } from "../../App/consts/UsuarioConsts";

type TData = {
  perfiles: any[];
  usuario: any;
  tienePerfil: boolean;
  isLogged: boolean;
  perfilSeleccionado: number;
};

interface IUseProvideAuth {}
export const useProvideAuth = (props: any) => {
  const [data, setData] = useState<TData>({
    perfiles: [],
    usuario: null,
    tienePerfil: false,
    isLogged: false,
    perfilSeleccionado: -1,
  });

  const handleGetDatosUsuario = () => {
    getDatosUsuario()
      .then((response: any) => {
        const perfiles = response.data.perfilesUsuario.map(
          (perfil: any) => perfil
        );
        let usuario = null;
        if (response.data.tiene_perfil)
          usuario = {
            nombre: response.data.datos_usuario_perfil.datos_turista.nombre,
            apellido: response.data.datos_usuario_perfil.datos_turista.apellido,
            mail: response.data.datos_usuario_perfil.datos_turista.mail,
          };
        const tiene_perfil = response.data.tiene_perfil;
        const isLogged = true;

        setData((prev: TData) => ({
          perfiles: perfiles,
          usuario: usuario,
          tienePerfil: tiene_perfil,
          isLogged: isLogged,
          perfilSeleccionado: perfiles.length > 0 ? 0 : -1,
        }));

        if (
          !response.data.tiene_perfil &&
          !window.location.toString().includes("signup/complete")
        )
          window.location.replace("signup/complete");
      })
      .catch((error: any) => {
        setData((prev: TData) => ({
          perfiles: [],
          usuario: null,
          tienePerfil: false,
          isLogged: false,
          perfilSeleccionado: -1,
        }));
      });
  };

  useEffect(() => {
    handleGetDatosUsuario();
  }, []);

  const logout = () => {
    setData((prev: TData) => ({
      perfiles: [],
      usuario: null,
      tienePerfil: false,
      isLogged: false,
      perfilSeleccionado: -1,
    }));
    // window.location.reload();
  };

  const login = () => {
    handleGetDatosUsuario();
  };

  const cambiarPerfil = () => {
    if (data.perfilSeleccionado == -1) return;
    if (!data) return;
    setData((prev: TData) => {
      let next;
      if (prev.perfilSeleccionado == -1) next = -1;
      if (prev.perfilSeleccionado == prev.perfiles.length - 1) next = 0;
      else next = prev.perfilSeleccionado + 1;
      return { ...prev, perfilSeleccionado: next };
    });
    console.log("Llega")
  };

  const getPerfil = (): number => {
    if (!data || data.perfiles.length == 0 || data.perfilSeleccionado == -1)
      return PERFILES.INVITADO.id;
    return data.perfiles[data.perfilSeleccionado].id_perfil;
  };

  return {
    ...data,
    logout,
    login,
    cambiarPerfil,
    getPerfil,
  };
};
