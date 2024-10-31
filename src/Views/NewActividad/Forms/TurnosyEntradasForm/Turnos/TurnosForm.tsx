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

type TTurnos = {
  idOferta: string;
  handleAgregar: () => void;
};
export default function TurnosForm(props: TTurnos) {
  const form = useForm();
  const [turnos, setTurnos] = useState<THorarios[]>([]);
  const router = useIonRouter();
  

  const handleTurno = () => {
    console.log("llama");
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
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonTitle
            style={{
              borderBottom: "2pt solid #F08408",
              marginBottom: "31pt",
              padding: "2pt",
            }}
          >
            Turnos y Horarios
          </IonTitle>
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
              onClick={() =>
                setTurnos((prev: any[]) => [
                  ...prev,
                  {},
                ])
              }
            >
              <IonIcon icon={add} />
              &nbsp;AGREGAR OTRO
            </IonButton>
          )}
        </IonRow>
      </div>
  );
}

