import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonGrid,
  IonImg,
  IonRow,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import UncompleteLoggedLayout from "../../Layouts/UncompleteLoggedLayout";

export default function SignupCompleteView() {
  const router = useIonRouter();
  return (
    <UncompleteLoggedLayout>
      <img
        src="/3.2. Principal/Fondo.jpg"
        style={{
          display: "flex",
          position: "absolute",
          width: "auto",
          minHeight: "100%",
        }}
      />
      <IonCard
        style={{
          position: "fixed",
          width: "50%",
          left: "50%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          padding: "31pt",
        }}
      >
        <IonCardHeader>
          <IonGrid style={{}}>
            <IonRow
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1
                style={{
                  borderBottom: "2pt solid #F08408",
                  paddingBottom: "13pt",
                  display: "inline-block",
                  fontWeight: "bold",
                  color: "#F08408",
                }}
              >
                Completá tu registro
              </h1>
            </IonRow>
            <IonRow
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>Elegí como querés registrarte</h3>
            </IonRow>
          </IonGrid>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </UncompleteLoggedLayout>
  );
}
