import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonList,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { transform } from "ol/proj";

export default function SignupCompleteView() {
  const router = useIonRouter();
  return (
    <IonContent>
      <IonGrid
        style={{
          position: "fixed",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <IonRow>
          <IonCol>
            <h1
              style={{
                borderBottom: "1pt solid black",
                paddingBottom: "13pt",
                display: "inline-block",
                fontWeight: "bold",
              }}
            >
              Completá tu registro
            </h1>
            <br />
            <h3>Elegí como querés registrarte</h3>
          </IonCol>
        </IonRow>
        <IonRow style={{ marginTop: "56pt" }}>
          <IonCol>
            <IonButton
              onClick={() => {
                if (!router) return;
                router.push("/signup/complete/prestador");
              }}
            >
              Soy prestador
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              onClick={() => {
                if (!router) return;
                router.push("/signup/complete/turista");
              }}
            >
              Soy turista
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
