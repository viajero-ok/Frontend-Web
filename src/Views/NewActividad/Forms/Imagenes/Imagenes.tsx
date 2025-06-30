import { Dispatch, SetStateAction } from "react";
import MultimediaUpload from "../../../../components/MultimediaUpload/MultimediaUpload";
import { useActividad } from "../../Provider/ActividadProvider";
import { MultimediaUploadProvider } from "../../../../components/MultimediaUpload/MultimediaUploadProvider";

export default function Imagenes() {
  const { idOferta, guardarImagen } = useActividad();

  return (
    <MultimediaUploadProvider
      idOferta={idOferta}
      service={guardarImagen}
      className="w-1/2"
    >
      <></>
    </MultimediaUploadProvider>
  );
}
