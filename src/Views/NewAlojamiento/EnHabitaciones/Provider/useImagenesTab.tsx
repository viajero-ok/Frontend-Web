import React from "react";
import { LocalOrRemoteImage, renderRemoteImage } from "../../../../components/MultimediaUpload/ImageUploadProvider";
import { obtenerImagenesActividad } from "../../../../App/Actividades/Actividad";
import { eliminarImagenOfertaTuristica, guardarImagenOfertaTuristica, TBodyGuardarImagenOfertaTuristica } from "../../../../App/Ofertas/Ofertas";

export type ImagenesContextValue = {
  imagenes: LocalOrRemoteImage[];
  setImagenes: React.Dispatch<React.SetStateAction<LocalOrRemoteImage[]>>;
};

const useImagenesTab = ({ idOferta }: { idOferta: string }) => {
  const [imagenes, setImagenes] = React.useState<LocalOrRemoteImage[]>([]);

  const actualizarImagenes = () => {
    obtenerImagenesActividad(idOferta)
      .then((response) => {
        setImagenes(
          response.data.map((i: any) => ({
            getId: () => i.id_imagen,
            getNombre: () => i.nombre,
            render: () => renderRemoteImage(`data:image/png;base64,${i.datos}`),
            isRemote: () => true,
            getDatos: () => i.datos,
            getSize: () => i.datos.length,
          }))
        );
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    actualizarImagenes();
  }, []);

  const guardarImagen = async (body: TBodyGuardarImagenOfertaTuristica) => {
    try {
      return await guardarImagenOfertaTuristica(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const eliminarImagen = async (idImagen: number) => {
    try {
      await eliminarImagenOfertaTuristica(idImagen);
      setImagenes((prev: any[]) => [
        ...prev.filter((i: any) => i.id_imagen != idImagen),
      ]);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const context: ImagenesContextValue = {
    imagenes,
    setImagenes,
  };
  return context;
};

export { useImagenesTab };
