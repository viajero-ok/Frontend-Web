import {
  IonCheckbox,
  IonCol,
  IonInput,
  IonItem,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import { useForm } from "../../../../../hooks/UseForm/FormProvider";
import Field from "../../../../../components/Field/Field";
import { Dispatch, SetStateAction, useState } from "react";
import Check from "../../../../../components/Check/Check";

type TReservas = {
  tipoPagoAnticipado: any;
  metodosDePago: any;
  setFormMetodosDePago: Dispatch<SetStateAction<number[]>>;
};
export default function Reservas(props: TReservas) {
  const [todos, setTodos] = useState<boolean>(false);
  const [tipoPagoAnticipado, setTipoPagoAnticipado] = useState<number>();
  const form = useForm();

  return (
    props.metodosDePago &&
    props.tipoPagoAnticipado && (
      <>
        <IonRow
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3
            style={{
              padding: "2pt",
              marginBottom: "31pt",
              fontWeight: "bold",
            }}
          >
            Reservas
          </h3>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonRow
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4
                style={{
                  borderBottom: "2pt solid #F08408",
                  padding: "2pt",
                  marginBottom: "31pt",
                }}
              >
                Pago anticipado
              </h4>
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
              <div>
                <IonRow>
                  {/* <Field
                    select
                    options={props.tipoPagoAnticipado.map((tipo: any) => ({
                      id: tipo.id_tipo_pago_anticipado,
                      text: tipo.tipo_pago_anticipado,
                    }))}
                    form={form}
                    name="id_tipo_pago_anticipado"
                    label="Tipo de pago"
                  /> */}
                  <IonItem>
                    <IonSelect
                      label="Tipo de pago"
                      onIonChange={(e) => setTipoPagoAnticipado(e.target.value)}
                    >
                      {props.tipoPagoAnticipado.map((tipo: any) => (
                        <IonSelectOption value={tipo.id_tipo_pago_anticipado}>
                          {tipo.tipo_pago_anticipado}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                </IonRow>
                <IonRow>
                  {tipoPagoAnticipado == 1 && (
                    <Field
                      form={form}
                      name="porcentaje_pago_anticipado"
                      label="Porcentaje"
                    />
                  )}
                  {tipoPagoAnticipado == 2 && (
                    <Field
                      form={form}
                      name="monto_pago_anticipado"
                      label="Monto"
                    />
                  )}
                </IonRow>
              </div>
            </IonRow>
          </IonCol>
          <IonCol>
            <IonRow
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4
                style={{
                  borderBottom: "2pt solid #F08408",
                  padding: "2pt",
                  marginBottom: "31pt",
                }}
              >
                Estadía mínima
              </h4>
            </IonRow>
            <IonRow style={{ marginBottom: "13pt" }}>
              <IonText>
                Indica la mínima cantidad de noche exigidas para reservar
              </IonText>
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
              <Field
                form={form}
                name="minimo_dias_estadia"
                label="Cantidad de noches"
              />
            </IonRow>
          </IonCol>
          <IonCol>
            <IonRow
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h4
                style={{
                  borderBottom: "2pt solid #F08408",
                  padding: "2pt",
                  marginBottom: "31pt",
                }}
              >
                Métodos de pago
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
                <IonRow style={{ marginBottom: "13pt" }}>
                  <IonText>
                    Seleccioná los métodos de pago aceptados en el alojamiento
                  </IonText>
                </IonRow>
                <div>
                  <IonRow>
                    <IonCheckbox
                      labelPlacement="end"
                      style={{ margin: "3pt" }}
                      onIonChange={(e) => setTodos(e.target.checked)}
                    >
                      Todos
                    </IonCheckbox>
                  </IonRow>
                  {props.metodosDePago?.map((metodo: any) => (
                    <IonRow
                      style={{ margin: "3pt" }}
                      key={metodo.id_metodo_pago}
                    >
                      <Check
                        forceChecked={todos}
                        id={metodo.id_metodo_pago}
                        setList={props.setFormMetodosDePago}
                        label={metodo.metodo_pago}
                      />
                    </IonRow>
                  ))}
                </div>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>
      </>
    )
  );
}
