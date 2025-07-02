import React from "react";
import {
  guardarGuia,
  eliminarGuia as eliminarGuiaService,
  modificarGuia as modificarGuiaService,
  obtenerGuias,
} from "../../../App/Actividades/Actividad";

export type GuiasTabContextValue = {
  guias: any[];
  crearGuia: ({
    nro_resolucion,
    nombre_y_apellido,
  }: {
    nro_resolucion: string;
    nombre_y_apellido: string;
  }) => Promise<void>;
  modificarGuia: ({
    id_guia,
    nro_resolucion,
    nombre_y_apellido,
  }: {
    id_guia: number;
    nro_resolucion: string;
    nombre_y_apellido: string;
  }) => Promise<void>;
  eliminarGuia: (idGuia: number) => Promise<void>;
  actualizarGuias: () => void;
};

const useGuiasTab = ({ idOferta }: { idOferta: string }) => {
  const [guias, setGuias] = React.useState<any[]>([]);

  const actualizarGuias = () => {
    obtenerGuias(idOferta)
      .then((response) => {
        setGuias(response.data);
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    actualizarGuias();
  }, []);

  const crearGuia = async ({
    nro_resolucion,
    nombre_y_apellido,
  }: {
    nro_resolucion: string;
    nombre_y_apellido: string;
  }) => {
    try {
      await guardarGuia({
        id_oferta: idOferta,
        nro_resolucion,
        nombre_y_apellido,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const modificarGuia = async ({
    id_guia,
    nro_resolucion,
    nombre_y_apellido,
  }: {
    id_guia: number;
    nro_resolucion: string;
    nombre_y_apellido: string;
  }) => {
    try {
      await modificarGuiaService({
        id_oferta: idOferta,
        id_guia: id_guia,
        nro_resolucion,
        nombre_y_apellido,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const eliminarGuia = async (idGuia: number) => {
    try {
      await eliminarGuiaService({ id_guia: idGuia, id_oferta: idOferta });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const context: GuiasTabContextValue = {
    guias,
    crearGuia,
    modificarGuia,
    eliminarGuia,
    actualizarGuias,
  };
  return context;
};

export { useGuiasTab };
