<<<<<<< Updated upstream
import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonIcon,
  IonRow,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import Field from "../../../../../components/Field/Field";
import { add } from "ionicons/icons";
import { useForm } from "../../../../../hooks/UseForm/FormProvider";
import { Dispatch, SetStateAction, useState } from "react";
import Check from "../../../../../components/Check/Check";
import TurnosRow from "./TurnosRow";
import {
  registrarHorario,
  THorarios,
} from "../../../../../App/Actividades/TurnosyHorarios";
=======
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";
import { useActividad } from "../../../Provider/ActividadProvider";
import NewTurno from "./NewTurno";
import TurnosRow from "./TurnosRow";
>>>>>>> Stashed changes

type TTurnos = {};
export default function TurnosForm(props: TTurnos) {
<<<<<<< Updated upstream
  const form = useForm();
  const [turnos, setTurnos] = useState<THorarios[]>([]);
  const router = useIonRouter();


  const handleTurno = () => {
    console.log(props.idOferta);
    registrarHorario(props.idOferta).then((response: any) => {
      console.log("id: ", response.data.id_horario);
      setTurnos((prev: THorarios[]) => [
        ...prev,
        {
          id_horario: response.data.id_horario,
          inicio: {
            hora_inicio: "",
            minuto_inicio: "",
          },
          fin: {
            hora_fin: "",
            minuto_fin: "",
          },
          aplica_todos_los_dias: false,
          dias_semana: {
            aplica_lunes: false,
            aplica_martes: false,
            aplica_miercoles: false,
            aplica_jueves: false,
            aplica_viernes: false,
            aplica_sabado: false,
            aplica_domingo: false,
          },
          sin_cupo: false,
          cupo_maximo: 0,
        },
      ]);
    });
  };



  return (
    <div
      style={{
        padding: "10pt",
        paddingBottom: "20pt",
        marginBottom: "30pt",
        width: "80%",
        marginLeft: "10%",
        border: "2px solid #F08408",
        borderRadius: "10pt",
      }}
    >
      <IonRow
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>Datos básicos</h3>
      </IonRow>
      <IonRow
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "13pt",
        }}
      >
        {turnos.length > 0 &&
          turnos.map((horario: any, index: number) => (
            <TurnosRow
              key={index}
              id={horario.id_horario}
              setRows={setTurnos}
            />
          ))}
        {turnos.length == 0 && (
          <IonButton
            style={{ "--background": "#F08408" }}
            onClick={() => handleTurno()}
          >
            <IonIcon icon={add} />
            &nbsp;AGREGAR UN TURNO
          </IonButton>
        )}
        {turnos.length > 0 && (
          <IonButton
            style={{ "--background": "#F08408" }}
            onClick={() => {
              setTurnos((prev: any[]) => [
                ...prev,
                {},
              ])
            }}
          >
            <IonIcon icon={add} />
            &nbsp;AGREGAR OTRO
          </IonButton>
        )}
      </IonRow>
=======
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
>>>>>>> Stashed changes
    </div>
  );
}

