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
          position: "fixed",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
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
                src="images/registro/hostel.jpg"
                style={{ width: "250pt" }}
              />
            </IonCard>
          </IonCol>
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
                src="images/registro/train.jpg"
                style={{ width: "250pt" }}
              />
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
