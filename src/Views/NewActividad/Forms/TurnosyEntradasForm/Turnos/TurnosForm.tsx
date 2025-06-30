import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";
import { useActividad } from "../../../Provider/ActividadProvider";
import NewTurno from "./NewTurno";
import TurnosRow from "./TurnosRow";

type TTurnos = {};
export default function TurnosForm(props: TTurnos) {
  const [agregarTurno, setAgregarTurno] = useState<boolean>(false);
  const { turnos } = useActividad();

  return (
    <div className="">
      <div className="p-4 border border-gray-200 bg-gray-50 rounded-md flex flex-row justify-between items-center">
        <div className="text-gray-600 text-xl font-bold">Turnos</div>
        <button
          className="viajero-button px-4 py-2 flex flex-row items-center text-sm disabled:bg-gray-200!"
          onClick={() => setAgregarTurno(true)}
          disabled={agregarTurno}
        >
          <IonIcon icon={add} />
          &nbsp;Agregar nuevo
        </button>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <div className="grid grid-cols-10 gap-2 w-full">
          <div className="p-4 rounded-md border border-gray-200 bg-gray-50 text-gray-600 text-md font-bold col-span-1">
            Horario
          </div>
          <div className="p-4 rounded-md border border-gray-200 bg-gray-50 text-gray-600 text-md font-bold col-span-6">
            Días
          </div>
          <div className="p-4 rounded-md border border-gray-200 bg-gray-50 text-gray-600 text-md font-bold col-span-2">
            Cupo
          </div>
          <div className="p-4 rounded-md border border-gray-200 bg-gray-50 text-gray-600 text-md font-bold col-span-1">
            Acciones
          </div>
        </div>
        {agregarTurno && <NewTurno cerrar={() => setAgregarTurno(false)} />}
        {turnos &&
          turnos.map((turno: any, index: number) => (
            <div className="group">
              <TurnosRow key={index} turno={turno} />
              <div className="group-last:hidden mt-2 h-4 border border-gray-200 bg-gray-50 w-full rounded-md "></div>
            </div>
          ))}
      </div>
    </div>
  );
}
