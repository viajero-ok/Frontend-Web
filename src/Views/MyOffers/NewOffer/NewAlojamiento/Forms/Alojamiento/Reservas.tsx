import { IonCheckbox, IonCol, IonRow, IonText } from "@ionic/react";
import { useForm } from "../../../../../../hooks/UseForm/FormProvider";
import Field from "../../../../../../components/Field/Field";

type TReservas = {
  tipoPagoAnticipado: any;
  metodosDePago: any;
};
export default function Reservas(props: TReservas) {
  const form = useForm();
  return (
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
                <Field
                  select
                  options={props.tipoPagoAnticipado.map((tipo: any) => ({
                    id: tipo.id_tipo_pago_anticipado,
                    text: tipo.tipo_pago_anticipado,
                  }))}
                  form={form}
                  name="tipoDePago"
                  label="Tipo de pago"
                />
              </IonRow>
              <IonRow>
                <Field form={form} name="porcentaje" label="Porcentaje" />
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
              name="cantidadDeNoches"
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
                  <IonCheckbox labelPlacement="end" style={{ margin: "3pt" }}>
                    Todos
                  </IonCheckbox>
                </IonRow>
                {props.metodosDePago?.map((metodo: any) => (
                  <IonRow style={{ margin: "3pt" }} key={metodo.id_metodo_pago}>
                    <IonCheckbox labelPlacement="end">
                      {metodo.metodo_pago}
                    </IonCheckbox>
                  </IonRow>
                ))}
              </div>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonRow>
    </>
  );
}
