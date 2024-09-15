import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonIcon,
  IonRow,
  IonTitle,
} from "@ionic/react";
import Field from "../../../../../../components/Field/Field";
import { add } from "ionicons/icons";
import { useForm } from "../../../../../../hooks/UseForm/FormProvider";

export default function PoliticasNormas(props: any) {
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
          border: "2pt solid #F08408",
          borderRadius: "8pt",
          padding: "6pt",
          marginLeft: "31pt",
          marginRight: "31pt",
          marginBottom: "31pt",
        }}
      >
        <IonCol
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonRow style={{}}>
            <IonCol>
              <Field form={form} name="checkin" label="Check-In" />
            </IonCol>
            <IonCol>
              <Field form={form} name="checkout" label="Check-Out" />
            </IonCol>
          </IonRow>
        </IonCol>
        <IonCol style={{}}>
          <IonRow
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IonCheckbox>Aplica todo los días</IonCheckbox>
          </IonRow>
          <IonRow
            style={{
              paddingTop: "13pt",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                L
              </IonCheckbox>
              <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                M
              </IonCheckbox>
              <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                M
              </IonCheckbox>
              <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                J
              </IonCheckbox>
              <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                V
              </IonCheckbox>
              <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                S
              </IonCheckbox>
              <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
                D
              </IonCheckbox>
            </div>
          </IonRow>
        </IonCol>
        <IonCol
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
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
            <IonButton style={{ "--background": "#F08408" }}>
              <IonIcon icon={add} />
              &nbsp;AGREGAR OTRO
            </IonButton>
          </IonRow>
        </IonCol>
      </IonRow>
    </>
  );
}
