import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonIcon,
  IonRow,
  IonTitle,
} from "@ionic/react";
import Field from "../../../../../components/Field/Field";
import { add } from "ionicons/icons";
import { useForm } from "../../../../../hooks/UseForm/FormProvider";
import { Dispatch, SetStateAction, useState } from "react";
import Check from "../../../../../components/Check/Check";
import CheckInCheckOutRow from "../CheckInCheckOutRow/CheckInCheckOutRow";
import {
  crearHorario,
  THorariosCheckInCheckOut,
} from "../../../../../App/Alojamientos/NuevoAlojamiento";

type TPoliticasNormas = {
  caracteristicas: any;
  formCaracteristicas: number[];
  setFormCaracteristicas: Dispatch<SetStateAction<number[]>>;
  politicasDeCancelacion: any;
  horarios: THorariosCheckInCheckOut[];
  setHorarios: Dispatch<SetStateAction<THorariosCheckInCheckOut[]>>;
  idOferta: string;
};
export default function PoliticasNormas(props: TPoliticasNormas) {
  const form = useForm();

  const handleAgregarHorario = () => {
    console.log("llama");
    crearHorario({ id_oferta: props.idOferta }).then((response: any) => {
      console.log("id: ", response.data.id_horario);
      props.setHorarios((prev: THorariosCheckInCheckOut[]) => [
        ...prev,
        {
          id_horario: response.data.id_horario,
          check_in: {
            hora_check_in: 10,
            minuto_check_in: 30,
          },
          check_out: {
            hora_check_out: 18,
            minuto_check_out: 30,
          },
          aplica_todos_los_dias: false,
          dias_semana: {
            aplica_lunes: true,
            aplica_martes: true,
            aplica_miercoles: true,
            aplica_jueves: true,
            aplica_viernes: true,
            aplica_sabado: true,
            aplica_domingo: true,
          },
        },
      ]);
    });
  };

  return (
    props.caracteristicas &&
    props.politicasDeCancelacion && (
      <>
        <IonRow
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            margin: "31pt",
          }}
        >
          <h3 style={{ fontWeight: "bold" }}>
            Políticas y normas del establecimiento
          </h3>
        </IonRow>
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
            Horarios de ingreso y egreso
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
          {props.horarios.length > 0 &&
            props.horarios.map((horario: any, index: number) => (
              <CheckInCheckOutRow
                key={index}
                id={horario.id_horario}
                setRows={props.setHorarios}
              />
            ))}
          {props.horarios.length == 0 && (
            <IonButton
              style={{ "--background": "#F08408" }}
              onClick={() => handleAgregarHorario()}
            >
              <IonIcon icon={add} />
              &nbsp;AGREGAR UN HORARIO
            </IonButton>
          )}
          {props.horarios.length > 0 && (
            <IonButton
              style={{ "--background": "#F08408" }}
              onClick={() => props.setHorarios((prev: any[]) => [...prev, {}])}
            >
              <IonIcon icon={add} />
              &nbsp;AGREGAR OTRO
            </IonButton>
          )}
        </IonRow>
        <IonRow>
          <IonCol>
            <IonRow
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "13pt",
              }}
            >
              <h4 style={{ borderBottom: "2pt solid #F08408", padding: "2pt" }}>
                Normas
              </h4>
            </IonRow>
            <IonRow>
              <IonCol
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  {props.caracteristicas.caracteristicas_normas?.map(
                    (caracteristica: any) => (
                      <IonRow
                        style={{ margin: "3pt" }}
                        key={caracteristica.id_caracteristica}
                      >
                        <Check
                          list={props.formCaracteristicas}
                          id={caracteristica.id_caracteristica}
                          setList={props.setFormCaracteristicas}
                          label={caracteristica.caracteristica}
                        />
                      </IonRow>
                    )
                  )}
                </div>
                <Field
                  value={form?.schema.text_observacion_normas}
                  form={form}
                  name="texto_observacion_normas"
                  label="Otras"
                />
              </IonCol>
            </IonRow>
          </IonCol>
          <IonCol>
            <IonRow
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "13pt",
              }}
            >
              <h4 style={{ borderBottom: "2pt solid #F08408", padding: "2pt" }}>
                Política de cancelación
              </h4>
            </IonRow>
            <IonRow>
              <IonCol
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonRow>
                  <Field
                    value={form?.schema.id_politica_cancelacion}
                    select
                    options={props.politicasDeCancelacion.map(
                      (politica: any) => ({
                        id: politica.id_politica_cancelacion,
                        text: politica.politica_cancelacion,
                      })
                    )}
                    form={form}
                    name="id_politica_cancelacion"
                    label="Tipo de política"
                  />
                </IonRow>
                <IonRow>
                  <Field
                    value={form?.schema.plazo_dias_cancelacion}
                    form={form}
                    name="plazo_dias_cancelacion"
                    label="Plazo de cancelación (en días)"
                  />
                </IonRow>
              </IonCol>
            </IonRow>
          </IonCol>
          <IonCol>
            <IonRow
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "13pt",
              }}
            >
              <h4 style={{ borderBottom: "2pt solid #F08408", padding: "2pt" }}>
                Política de garantía
              </h4>
            </IonRow>
            <IonRow>
              <IonCol
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <IonRow style={{ margin: "3pt" }}>
                    <IonCheckbox labelPlacement="end">
                      Solicita garantía al ingresar
                    </IonCheckbox>
                  </IonRow>
                  <IonRow>
                    <Field
                      value={form?.schema.monto_garantia}
                      form={form}
                      name="monto_garantia"
                      label="Monto de la garantía"
                    />
                  </IonRow>
                  <IonRow>
                    <Field
                      value={form?.schema.texto_observacion_politica_garantia}
                      form={form}
                      name="texto_observacion_politica_garantia"
                      label="Observaciones"
                    />
                  </IonRow>
                </div>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </>
    )
  );
}
