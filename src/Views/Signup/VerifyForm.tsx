import { IonButton, IonInput, IonItem, IonList, IonText } from "@ionic/react";
import { transform } from "ol/proj";

export default function VerifyForm(props: any) {
  return (
    <>
      <IonText
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h1>Validar Cuenta</h1>
      </IonText>
      <div style={{ marginTop: "13pt" }}>
        <IonText color="medium">
          Enviamos un mail a johndoe@fake.com <br />
          con el código de validación
        </IonText>
      </div>
      <IonList
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "13pt",
          marginTop: "13pt",
          marginLeft: "34pt",
          marginRight: "34pt",
          paddingRight: "12pt",
        }}
      >
        <IonItem>
          <IonInput
            maxlength={6}
            placeholder="000000"
            style={{
              letterSpacing: "21pt",
              fontSize: "21pt",
              textAlign: "left",
              left: "70%",
              transform: "translateX(-50%)",
            }}
          ></IonInput>
        </IonItem>
      </IonList>
      <IonButton
        expand="block"
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "13pt",
          marginLeft: "89pt",
          marginRight: "89pt",
          paddingLeft: "12pt",
          paddingRight: "12pt",
        }}
      >
        VALIDAR
      </IonButton>
    </>
  );
}
