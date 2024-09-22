import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonList,
  IonRow,
  IonText,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import { transform } from "ol/proj";

export default function SignupCompleteView() {
  const router = useIonRouter();
  return (
    <IonContent>
      <IonGrid
        style={{
          position: "absolute",
          top: "50%",
          left: "25%",
          transform: "translateY(-50%) transformX(-50%)",
          border: "1pt solid red"
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
        <IonRow>
          <IonCol>
            <IonCard
              button
              style={{ display: "inline-block" }}
              onClick={() => {
                if (!router) return;
                router.push("/signup/complete/prestador");
              }}
            >
              <IonTitle
                style={{
                  padding: "12pt",
                  backgroundColor: "rgba(20, 20, 20, 0.4)",
                  borderRadius: "15pt",
                  fontWeight: "bolder",
                  fontSize: "24pt",
                  color: "white",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              >
                Soy Prestador
              </IonTitle>
              <IonImg
                src="/public/3.3. Registro de usuario/Prestador.png"
                style={{ width: "250pt" }}
              />
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard
              button
              style={{ display: "inline-block" }}
              onClick={() => {
                if (!router) return;
                router.push("/signup/complete/turista");
              }}
            >
              <IonTitle
                style={{
                  padding: "12pt",
                  backgroundColor: "rgba(20, 20, 20, 0.4)",
                  borderRadius: "15pt",
                  fontWeight: "bolder",
                  fontSize: "24pt",
                  color: "white",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
              >
                Soy Turista
              </IonTitle>
              <IonImg
                src="/public/3.3. Registro de usuario/Turista.png"
                style={{ width: "250pt" }}
              />
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
