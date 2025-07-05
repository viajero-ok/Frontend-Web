import { IonIcon, useIonRouter } from "@ionic/react";
import {
  arrowUndoOutline,
  calendarClearOutline,
  imagesOutline,
  locationOutline,
  personOutline,
  walkOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import FormSideMenu, {
  Sidebar,
} from "../../components/ui/FormSideMenu/FormSideMenu";
import { Segment } from "../../components/ui/Segment/Segment";
import ActividadForm from "./Forms/ActividadForm/ActividadForm";
import GuiaForm from "./Forms/ActividadForm/GuiaForm";
import TurnosyEntradasForm from "./Forms/TurnosyEntradasForm/TurnosyEntradasForm";
import UbicacionForm from "./Forms/UbicacionForm/UbicacionForm";
import { useActividad } from "./Provider/ActividadProvider";
import Imagenes from "./Forms/Imagenes/Imagenes";
import { useModal } from "../../components/ui/Modal/Modal";
import { obtenerDatosBasicosOfertaTuristica } from "../../App/Ofertas/Ofertas";

type TNewActividadView = {
  idOferta: string;
  id_establecimiento?: number;
};
export default function NewActividadView(props: TNewActividadView) {
  const [segment, setSegment] = useState<string>("actividad-form");
  const [idEstado, setIdEstado] = useState<number | null>(null);

  const { idOferta, puedeRegistrar, registrar } = useActividad();
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
              value="actividad-form"
              label="Actividad"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={walkOutline}
            />
            <Segment
              segment={segment}
              value="guias-form"
              label="Guías turísticos"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={personOutline}
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
              value="ubicacion-form"
              label="Ubicación"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={locationOutline}
            />
            <Segment
              segment={segment}
              value="turnosyentradas-form"
              label="Turnos y entradas"
              set={setSegment}
              className="w-full"
              disabled={false} //TODO: disabled={isDirty}
              icon={calendarClearOutline}
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
      {segment == "actividad-form" && (
        <ActividadForm idOferta={props.idOferta} />
      )}
      {segment == "ubicacion-form" && (
        <UbicacionForm
          idOferta={props.idOferta ?? 0}
          id_establecimiento={props.id_establecimiento ?? 0}
        />
      )}
      {segment == "turnosyentradas-form" && (
        <TurnosyEntradasForm idOferta={props.idOferta} />
      )}
      {segment == "imagenes-form" && <Imagenes />}
      {segment == "guias-form" && <GuiaForm />}
    </FormSideMenu>
  );
}
