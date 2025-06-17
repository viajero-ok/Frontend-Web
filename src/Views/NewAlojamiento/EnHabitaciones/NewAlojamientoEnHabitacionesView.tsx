import { IonGrid, IonRow } from "@ionic/react";
import { Dispatch, SetStateAction, useState } from "react";
import { finalizarRegistroAlojamiento } from "../../../App/Alojamientos/NuevoAlojamiento";
import { cn } from "../../../components/ui/Form/Field";
import { useModal } from "../../../components/ui/Modal/Modal";
import DefaultLoggedLayout from "../../Layouts/DefaultLoggedLayout";
import AlojamientoForm from "./Forms/AlojamientoForm/AlojamientoForm";
import HabitacionesForm from "./Forms/HabitacionesForm/HabitacionesForm";
import ImagenesForm from "./Forms/ImagenesForm/ImagenesForm";
import { AlojamientoEnHabitacionesProvider } from "./Provider/AlojamientoEnHabitacionesProvider";
import { ClassNameValue } from "tailwind-merge";

export type TImagenRegistrada = {
  id_imagen: number;
  nombre: string;
  datos: string;
};

export const Segment = ({
  segment,
  label,
  value,
  set,
  disabled,
  className,
}: {
  segment: string;
  label: string;
  value: string;
  set: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  className?: ClassNameValue;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center p-4 text-gray-600 font-bold text-xl border rounded-md",
        segment == value
          ? "bg-[var(--color-viajero)]/5 border-[var(--color-viajero)]"
          : "bg-gray-50 border-gray-200",
        disabled
          ? "text-gray-400 cursor-default"
          : "cursor-pointer hover:border-[var(--color-viajero)] hover:bg-[var(--color-viajero)]/5",
        className
      )}
      onClick={() => !disabled && set(value)}
    >
      {label}
    </div>
  );
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

  return (
    <DefaultLoggedLayout>
      <AlojamientoEnHabitacionesProvider idOferta={props.idOferta}>
        <IonGrid>
          <IonRow style={{ marginTop: "12pt" }}>
            <div className="flex flex-row gap-2 w-full justify-center">
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
            </div>
          </IonRow>
          <IonRow>
            {segment == "alojamiento-form" && (
              <AlojamientoForm id={props.idOferta} />
            )}
            {segment == "imagenes-form" && <ImagenesForm id={props.idOferta} />}
            {segment == "habitaciones-form" && (
              <HabitacionesForm idOferta={props.idOferta} />
            )}
          </IonRow>
        </IonGrid>
      </AlojamientoEnHabitacionesProvider>
    </DefaultLoggedLayout>
  );
}
