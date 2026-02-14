import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { finalizarRegistroAlojamiento } from "../../../../../App/Alojamientos/NuevoAlojamiento";
import { cn } from "../../../../../components/ui/Form/Field";
import { useModal } from "../../../../../components/ui/Modal/Modal";
import { useAlojamientoEnHabitaciones } from "../../Provider/AlojamientoEnHabitacionesProvider";
import Habitacion from "./Habitacion";
import Vivienda from "./Vivienda";

export default function HabitacionesForm(props: { idOferta: string }) {
  const [habitacionSelected, setHabitacionSelected] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const router = useIonRouter();

  const {
    habitaciones,
    crearTipologia,
    habitacionesIsDirty,
    alojamientoForm,
    alojamientoEsCompleto,
  } = useAlojamientoEnHabitaciones();
  const { modal, setOpen } = useModal();

  const handleRegistrarAlojamiento = () => {
    finalizarRegistroAlojamiento(props.idOferta).then((response: any) => {
      console.log(response);
    });
  };

  const handleCrearTiplogia = () => {
    crearTipologia().catch((error: any) => {
      modal({
        variant: "danger",
        title: "Error",
        description:
          "Error al intentar crear la nueva tipología. Intente nuevamente.",
        actions: (
          <>
            <button className="viajero-button-ghost px-4 py-2">Aceptar</button>
          </>
        ),
      });
    });
  };

  if (alojamientoForm.getValues().id_sub_categoria_alojamiento == null) {
    return (
      <div>
        <div>
          Primero se deben registrar los datos del alojamiento (primera pestaña)
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 w-full">
      <div className="flex flex-col col-span-4 gap-2">
        <div className="flex flex-row items-center p-4 justify-between border border-gray-200 bg-gray-50 rounded-md">
          <div className="text-gray-600 text-xl font-bold">
            Tipologias ({habitaciones.length})
          </div>
          <button
            disabled={habitacionesIsDirty || !alojamientoEsCompleto}
            className="viajero-button px-4 py-2 disabled:shadow-none! disabled:bg-gray-200!"
            onClick={() => handleCrearTiplogia()}
          >
            Nuevo{" "}
            {alojamientoForm.getValues().id_sub_categoria_alojamiento == 1
              ? "tipo de habitacion"
              : "tipo de vivienda"}
          </button>
        </div>
        <div className="flex flex-row h-[42pt] items-center p-4 justify-between border border-gray-200 bg-gray-50 rounded-md">
          <div className="text-gray-600 font-bold">Nombre</div>
          <div className="text-gray-600 font-bold">Cantidad</div>
        </div>
        <div className="flex flex-col max-h-lvh overflow-y-scroll pr-2 [scrollbar-width:thin] gap-2">
          {habitaciones.map((habitacion: any) => (
            <div className="flex flex-col gap-1">
              <div
                key={habitacion.id_tipo_detalle}
                className={cn(
                  "flex flex-row items-center p-4 justify-between border rounded-md",
                  "hover:bg-[var(--color-viajero)]/5 hover:border-[var(--color-viajero)]",
                  habitacionSelected == habitacion.id_tipo_detalle
                    ? "bg-[var(--color-viajero)]/5 border-[var(--color-viajero)]"
                    : "cursor-pointer border-gray-200",
                )}
                onClick={() =>
                  setHabitacionSelected(habitacion.id_tipo_detalle)
                }
              >
                <div className="text-gray-600">
                  {habitacion.tipo_detalle ?? "Sin nombre"}
                </div>
                <div className="text-gray-600">{habitacion.cantidad ?? 0}</div>
              </div>
              {!habitacion.tipo_detalle && (
                <span className="text-xs text-red-400 pl-2">
                  Tipología incompleta
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-8 ml-4">
        {habitacionSelected != null &&
          (alojamientoForm.getValues().id_sub_categoria_alojamiento == 1 ? (
            <Habitacion
              key={habitacionSelected}
              habitacion={habitaciones.find(
                (habitacion: any) =>
                  habitacion.id_tipo_detalle == habitacionSelected,
              )}
              habitacionSelected={habitacionSelected}
              setHabitacionSelected={setHabitacionSelected}
              idOferta={props.idOferta}
            />
          ) : (
            <Vivienda
              key={habitacionSelected}
              habitacion={habitaciones.find(
                (habitacion: any) =>
                  habitacion.id_tipo_detalle == habitacionSelected,
              )}
              habitacionSelected={habitacionSelected}
              setHabitacionSelected={setHabitacionSelected}
              idOferta={props.idOferta}
            />
          ))}
        <div
          style={{
            justifyContent: "space-around",
            marginTop: "10pt",
            marginBottom: "10pt",
          }}
        ></div>
      </div>
    </div>
  );
}
