import { IonIcon, useIonRouter } from "@ionic/react";
import {
  arrowUndoOutline,
  calendarClearOutline,
  calendarOutline,
  globeOutline,
  imagesOutline,
  locationOutline,
  personOutline,
  ticketOutline,
  walkOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import FormSideMenu, {
  Sidebar,
} from "../../components/ui/FormSideMenu/FormSideMenu";
import { Segment } from "../../components/ui/Segment/Segment";

import { useModal } from "../../components/ui/Modal/Modal";
import { obtenerDatosBasicosOfertaTuristica } from "../../App/Ofertas/Ofertas";
import { useEvento } from "./Provider/EventoProvider";
import EventoForm from "./Forms/Evento/EventoForm";
import UbicacionForm from "./Forms/UbicacionForm/UbicacionForm";
import Imagenes from "./Forms/Imagenes/Imagenes";
import EntradasForm from "../NewActividad/Forms/TurnosyEntradasForm/Entradas/EntradasForm";
import HorarioEntradasForm from "./Forms/HorarioEntradasForm/HorarioEntradasForm";
import RedesSocialesForm from "./Forms/RedesSociales/RedesSocialesForm";

type TNewEventoView = {
  idOferta: string;
  id_establecimiento?: number;
};
export default function NewEventoView(props: TNewEventoView) {
  const [segment, setSegment] = useState<string>("actividad-form");
  const [idEstado, setIdEstado] = useState<number | null>(null);

  const { idOferta, puedeRegistrar, registrar } = useEvento();
  const { modal, setOpen } = useModal();

  const router = useIonRouter();

  const handleRegistrar = () => {
    if (!puedeRegistrar) return;
    registrar()
      .then(() => {
        modal({
          variant: "success",
          title: "Actividad registrada",
          description: "La actividad fue registrada con éxito.",
          actions: (
            <>
              <button
                onClick={() => {
                  router && router.push("/my-offers");
                  setOpen(false);
                }}
                className="viajero-button px-4 py-2 bg-green-400! hover:bg-green-400/90! text-white!"
              >
                Aceptar
              </button>
            </>
          ),
          canDismiss: false,
        });
      })
      .catch(() => {});
  };

  const handleConfirmarRegistrar = () => {
    modal({
      variant: "default",
      title: "Registrar actividad",
      description: "Confirmá el registro de la actividad",
      actions: (
        <div className="flex flex-row w-full justify-between">
          <button
            onClick={() => setOpen(false)}
            className="viajero-button-ghost px-4 py-2"
          >
            cancelar
          </button>
          <button
            onClick={() => handleRegistrar()}
            className="viajero-button px-4 py-2"
          >
            Registrar
          </button>
        </div>
      ),
    });
  };

  useEffect(() => {
    obtenerDatosBasicosOfertaTuristica(idOferta)
      .then((response) => {
        if (!response.data) return;
        if (!response.data.estado) return;
        setIdEstado(response.data.id_estado);
      })
      .catch(() => {});
  }, []);

  return (
    <FormSideMenu
      renderSidebar={() => (
        <>
          <Sidebar title="Editar oferta">
            <Segment
              segment={segment}
              value="evento-form"
              label="Evento"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={calendarOutline}
            />
            <Segment
              segment={segment}
              value="redes-form"
              label="Redes sociales"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={globeOutline}
            />
            <Segment
              segment={segment}
              value="ubicacion-form"
              label="Ubicación"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={locationOutline}
            />
            <Segment
              segment={segment}
              value="imagenes-form"
              label="Imágenes"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={imagesOutline}
            />
            <Segment
              segment={segment}
              value="horariosyentradas-form"
              label="Entradas"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={ticketOutline}
            />
            <div className="border-t border-gray-200 ml-2" />
            <button
              onClick={() => router.push("/my-offers")}
              className="viajero-button-ghost text-sm justify-start! w-full px-4 py-2 flex flex-row gap-2 items-center -mb-2 pl-2"
            >
              <IonIcon icon={arrowUndoOutline} />
              Volver
            </button>
          </Sidebar>
          {puedeRegistrar && idEstado == 1 && (
            <div className="flex flex-col gap-2 w-fit p-4 border border-gray-200 rounded-md">
              <div className="text-md font-bold text-gray-600">
                ¡Ya podés registrar tu oferta!
              </div>
              <div className="text-sm text-gray-600">
                Todos los datos necesarios han sido registrados
              </div>
              <button
                onClick={() => handleConfirmarRegistrar()}
                className="viajero-button px-4 py-2 animate-pulse"
              >
                Registrar oferta
              </button>
            </div>
          )}
        </>
      )}
    >
      {segment == "evento-form" && (
        <EventoForm idOferta={props.idOferta ?? 0} />
      )}
      {segment == "redes-form" && <RedesSocialesForm />}
      {segment == "ubicacion-form" && (
        <UbicacionForm
          idOferta={props.idOferta ?? 0}
          id_establecimiento={props.id_establecimiento ?? 0}
        />
      )}
      {segment == "horariosyentradas-form" && <HorarioEntradasForm />}
      {segment == "imagenes-form" && <Imagenes />}
    </FormSideMenu>
  );
}
