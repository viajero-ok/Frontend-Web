import { IonToast } from "@ionic/react";
import { useState } from "react";
import { publicarAlojamiento } from "../../../App/Publicaciones/PublicacionesAlojamientos";
import { useModal } from "../../../components/ui/Modal/Modal";
import { usePublicarOferta } from "./Provider/PublicarOfertaProvider";
import Tarifas from "./Tarifas/Tarifas";

export default function PublicarOfertaView() {
  const [datosRegistrados, setDatosRegistrados] = useState<any | null>(null);
  const [tarifas, setTarifas] = useState<any[]>([]);
  const [selectedTarifa, setSelectedTarifa] = useState<any>(null);

  const { idOferta } = usePublicarOferta();
  const { modal, setOpen } = useModal();

  const handlePublicar = () => {
    publicarAlojamiento(idOferta)
      .then(() => {
        console.log("publicada");
      })
      .catch((error) => {
        modal({
          variant: "danger",
          title: "Error",
          description:
            "No se pudo publicar la oferta.\n" + error.response.data.message,
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button-ghost px-4 py-2"
              >
                Aceptar
              </button>
            </>
          ),
        });
      });
  };

  const handleConfirmarPublicar = () => {
    modal({
      variant: "default",
      title: "Publicar oferta",
      description:
        "Estas por hacer pública tu oferta para que los turistas puedan reservarla. ¿Estás seguro?",
      actions: (
        <>
          <button
            onClick={() => setOpen(false)}
            className="viajero-button-ghost px-4 py-2"
          >
            Cancelar
          </button>
          <button
            onClick={() => handlePublicar()}
            className="viajero-button px-4 py-2"
          >
            Publicar
          </button>
        </>
      ),
    });
  };

  return (
    <div className="mt-4 px-8">
      <div className="flex flex-row p-4 border border-gray-200 bg-gray-50 rounded-md justify-between">
        <div className="text-gray-600 text-3xl font-bold">
          Publicar oferta turística
        </div>
        <button
          className="viajero-button bg-green-400! hover:bg-green-400/90! px-4 py-2 flex flex-row items-center gap-2"
          onClick={() => handleConfirmarPublicar()}
        >
          Publicar
        </button>
      </div>
      <div className="mt-4 border border-gray-200 p-4 rounded-md">
        <div>
          <div className="text-xl text-gray-600 font-bold">
            {datosRegistrados &&
              datosRegistrados.datos_oferta.datos_oferta.nombre}
          </div>
          <div className="text-gray-600">
            {datosRegistrados &&
              datosRegistrados.datos_oferta.datos_oferta.descripcion}
          </div>
        </div>
        <Tarifas tarifas={tarifas} setSelectedTarifa={setSelectedTarifa} />
      </div>
    </div>
  );
}
