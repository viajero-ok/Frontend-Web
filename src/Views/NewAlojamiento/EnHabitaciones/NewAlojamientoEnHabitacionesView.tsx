import { IonIcon, useIonRouter } from "@ionic/react";
import {
  arrowUndo,
  bedOutline,
  calendarOutline,
  homeOutline,
  imageOutline,
} from "ionicons/icons";
import { useState } from "react";
import { finalizarRegistroAlojamiento } from "../../../App/Alojamientos/NuevoAlojamiento";
import FormSideMenu, {
  Sidebar,
} from "../../../components/ui/FormSideMenu/FormSideMenu";
import { useModal } from "../../../components/ui/Modal/Modal";
import { Segment } from "../../../components/ui/Segment/Segment";
import AlojamientoForm from "./Forms/AlojamientoForm/AlojamientoForm";
import HabitacionesForm from "./Forms/HabitacionesForm/HabitacionesForm";
import ImagenesForm from "./Forms/ImagenesForm/ImagenesForm";
import { useAlojamientoEnHabitaciones } from "./Provider/AlojamientoEnHabitacionesProvider";
import HorariosForm from "./Forms/HorariosForm/HorariosForm";

export type TImagenRegistrada = {
  id_imagen: number;
  nombre: string;
  datos: string;
};

type TNewAlojamientoEnHabitacionesView = {
  idOferta: string;
};
export default function NewAlojamientoEnHabitacionesView(
  props: TNewAlojamientoEnHabitacionesView
) {
  const [segment, setSegment] = useState<string>("alojamiento-form");
  const { modal, setOpen } = useModal();

  const handleRegistrarOferta = () => {
    finalizarRegistroAlojamiento(props.idOferta)
      .then(() => {
        modal({
          variant: "success",
          title: "La oferta turística fue registrada con éxito.",
          canDismiss: false,
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button bg-green-400 hover:bg-green-400/90 px-4 py-2"
              >
                Aceptar
              </button>
            </>
          ),
        });
      })
      .catch((error) => {
        modal({
          variant: "danger",
          title: "Error",
          description: error.message,
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

  const router = useIonRouter();
  const { puedeRegistrar, alojamientoForm } = useAlojamientoEnHabitaciones();

  return (
    <>
      <FormSideMenu
        renderSidebar={() => (
          <>
            <Sidebar title="Editar alojamiento">
              <Segment
                segment={segment}
                value="alojamiento-form"
                label="Datos del alojamiento"
                set={setSegment}
                icon={homeOutline}
              />
              <Segment
                segment={segment}
                value="horarios-form"
                label="Check-In y Check-Out"
                set={setSegment}
                icon={calendarOutline}
              />
              <Segment
                segment={segment}
                value="imagenes-form"
                label="Imágenes del alojamiento"
                set={setSegment}
                icon={imageOutline}
              />
              <Segment
                segment={segment}
                value="habitaciones-form"
                label="Datos de las habitaciones"
                set={setSegment}
                icon={bedOutline}
              />
              <button
                onClick={() => router.push("/my-offers")}
                className="viajero-button-ghost text-sm justify-start! w-full px-4 py-2 flex flex-row gap-1 items-center -mb-2"
              >
                <IonIcon icon={arrowUndo} />
                Volver
              </button>
            </Sidebar>
            {puedeRegistrar && (
              <div className="flex flex-col gap-2 w-fit p-4 border border-gray-200 rounded-md">
                <div className="text-md font-bold text-gray-600">
                  ¡Ya podés registrar tu oferta!
                </div>
                <div className="text-sm text-gray-600">
                  Todos los datos necesarios han sido registrados
                </div>
                <button className="viajero-button px-4 py-2 animate-pulse">
                  Registrar oferta
                </button>
              </div>
            )}
          </>
        )}
      >
        {segment == "alojamiento-form" && (
          <AlojamientoForm id={props.idOferta} />
        )}
        {segment == "horarios-form" && <HorariosForm />}
        {segment == "imagenes-form" && <ImagenesForm />}
        {segment == "habitaciones-form" && (
          <HabitacionesForm idOferta={props.idOferta} />
        )}
      </FormSideMenu>
      {/* <div className="mt-4">
          <div>
            <FormSideMenu title="Editar alojamiento">
              <Segment
                segment={segment}
                value="alojamiento-form"
                label="Datos del alojamiento"
                set={setSegment}
              />
              <Segment
                segment={segment}
                value="imagenes-form"
                label="Imágenes del alojamiento"
                set={setSegment}
              />
              <Segment
                segment={segment}
                value="habitaciones-form"
                label="Datos de las habitaciones"
                set={setSegment}
              />
              <div
                className={cn(
                  "p-4 border rounded-md",
                  "bg-gray-50 border-gray-200"
                )}
              >
                <button
                  onClick={() => handleRegistrarOferta()}
                  className="viajero-button px-4 py-2"
                >
                  Registrar oferta
                </button>
              </div>
            </FormSideMenu>
          </div>
          <div>
            {segment == "alojamiento-form" && (
              <AlojamientoForm id={props.idOferta} />
            )}
            {segment == "imagenes-form" && <ImagenesForm id={props.idOferta} />}
            {segment == "habitaciones-form" && (
              <HabitacionesForm idOferta={props.idOferta} />
            )}
          </div>
        </div> */}
    </>
  );
}
