import { IonIcon, useIonRouter } from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";
import {
  registrarHorario,
  THorarios,
} from "../../../../../App/Actividades/TurnosyHorarios";
import { useForm } from "../../../../../hooks/UseForm/FormProvider";
import TurnosRow from "./TurnosRow";
import { z } from "zod";
import NewTurno from "./NewTurno";
import { useActividad } from "../../../Provider/ActividadProvider";

type TTurnos = {
  idOferta: string;
  handleAgregar: () => void;
};
export default function TurnosForm(props: TTurnos) {
  const router = useIonRouter();

  // const handleTurno = () => {
  //   console.log(props.idOferta);
  //   registrarHorario(props.idOferta).then((response: any) => {
  //     console.log("id: ", response.data.id_horario);
  //     setTurnos((prev: THorarios[]) => [
  //       ...prev,
  //       {
  //         id_horario: response.data.id_horario,
  //         inicio: {
  //           hora_inicio: "",
  //           minuto_inicio: "",
  //         },
  //         fin: {
  //           hora_fin: "",
  //           minuto_fin: "",
  //         },
  //         aplica_todos_los_dias: false,
  //         dias_semana: {
  //           aplica_lunes: false,
  //           aplica_martes: false,
  //           aplica_miercoles: false,
  //           aplica_jueves: false,
  //           aplica_viernes: false,
  //           aplica_sabado: false,
  //           aplica_domingo: false,
  //         },
  //         sin_cupo: false,
  //         cupo_maximo: 0,
  //       },
  //     ]);
  //   });
  // };

  /** REFACTOR */

  const [agregarTurno, setAgregarTurno] = useState<boolean>(false);

  const { turnos } = useActividad();

  return (
    <div className="">
      <div className="p-4 border border-gray-200 bg-gray-50 rounded-md flex flex-row justify-between items-center">
        <div className="text-gray-600 text-2xl font-bold">Turnos</div>
        <button
          className="viajero-button px-4 py-2 flex flex-row items-center text-sm disabled:bg-gray-200!"
          onClick={() => setAgregarTurno(true)}
          disabled={agregarTurno}
        >
          <IonIcon icon={add} />
          &nbsp;Agregar nuevo
        </button>

        {/* {turnos.length > 0 && (
          <IonButton
            style={{ "--background": "#F08408" }}
            onClick={() => {
              setTurnos((prev: any[]) => [...prev, {}]);
            }}
          >
            <IonIcon icon={add} />
            &nbsp;AGREGAR OTRO
          </IonButton>
        )} */}
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <div className="grid grid-cols-12 gap-2 w-full">
          <div className="p-4 rounded-md border border-gray-200 bg-gray-50 text-gray-600 text-xl font-bold col-span-4">
            Horario
          </div>
          <div className="p-4 rounded-md border border-gray-200 bg-gray-50 text-gray-600 text-xl font-bold col-span-5">
            Días
          </div>
          <div className="p-4 rounded-md border border-gray-200 bg-gray-50 text-gray-600 text-xl font-bold col-span-2">
            Cupo
          </div>
          <div className="p-4 rounded-md border border-gray-200 bg-gray-50 text-gray-600 text-xl font-bold col-span-1">
            Acciones
          </div>
        </div>
        {agregarTurno && <NewTurno cerrar={() => setAgregarTurno(false)} />}
        {turnos &&
          turnos.map((turno: any, index: number) => (
            <TurnosRow key={index} turno={turno} />
          ))}
      </div>
    </div>
  );
}
