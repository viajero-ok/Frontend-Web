import { useEffect, useState } from "react";
import {
  guardarImagenDeAlojamiento,
  obtenerDatosRegistradosAlojamiento,
  TObtenerDatosRegistradosAlojamientoResponse,
} from "../../../../../App/Alojamientos/NuevoAlojamiento";
import MultimediaUpload from "../../../../../components/MultimediaUpload/MultimediaUpload";

export default function ImagenesForm({ id }: { id: string }) {
  const [imagenesRegistradas, setImagenesRegistradas] = useState<
    TObtenerDatosRegistradosAlojamientoResponse["imagenes"]
  >([]);
  useEffect(() => {
    obtenerDatosRegistradosAlojamiento(id).then(
      (response: TObtenerDatosRegistradosAlojamientoResponse) => {
        setImagenesRegistradas(response.imagenes);
      }
    );
  }, []);

  return (
    <div className="flex flex-row w-full mt-4">
      <div className="flex flex-row w-full justify-center pb-[62pt]">
        <MultimediaUpload
          className="w-1/3"
          service={guardarImagenDeAlojamiento}
          idOferta={id}
          uploaded={imagenesRegistradas ?? []}
        />
      </div>
    </div>
  );
}
