import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonRow,
  IonTitle,
  IonLabel,
} from "@ionic/react";
import MapView from "../../components/MapView/MapView";
import { FormProvider } from "../../hooks/UseForm/FormProvider";
import LoginForm from "./LoginForm";

export default function LoginView(props: any) {
  const schema = {
    email: "",
    password: "",
  };

  return (
    <>
      <IonCard
        style={{
          backgroundColor: "rgba(255, 255, 255, 1)",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          padding: "31pt",
          width: "50%",
        }}
      >
        <IonCardHeader
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonImg src="/icon.png" style={{ width: "55pt" }} />
          <IonTitle
            style={{
              fontSize: "24pt",
              fontWeight: "bolder",
              color: "#F08408",
              marginTop: "13pt",
              marginBottom: "13pt",
              textAlign: "center",
            }}
          >
            ¡Hola, viajero!
            <IonLabel style={{ fontSize: "16pt", fontWeight: "bold", textAlign: "center" }}>
              <br /> Ingresá
            </IonLabel>
          </IonTitle>
        </IonCardHeader>

        <IonCardContent
          /* style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }} */
        >
          <FormProvider schema={schema}>
            <LoginForm />
          </FormProvider>
        </IonCardContent>
      </IonCard>
      {/* <IonGrid fixed style={{ backgroundColor: "green" }}>
        <IonRow>
          <IonCol size="4" style={{ alignContent: "center" }}>
            <FormProvider schema={schema}>
              <LoginForm />
            </FormProvider>
          </IonCol>
        </IonRow>
      </IonGrid> */}
    </>
  );
}
