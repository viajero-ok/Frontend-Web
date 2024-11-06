import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonGrid,
  IonImg,
  IonRow,
  IonTitle,
  IonButton,
  useIonRouter,
  IonCol,
} from "@ionic/react";
import UncompleteLoggedLayout from "../../Layouts/UncompleteLoggedLayout";

export default function SignupCompleteView() {
  const router = useIonRouter();
  return (
    <UncompleteLoggedLayout>
      <img
        src="/3.2. Principal/Fondo.jpg"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <IonContent className="ion-padding">
        <IonCard
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "auto",
            padding: "20px",
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
                <h3>Elegí cómo querés registrarte</h3>
              </IonRow>
            </IonGrid>
          </IonCardHeader>
          <IonCardContent style={{
            backgroundColor: "#FAD2A4",
            padding: "20px",
          }}>
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="6" style={{ display: "flex", marginBottom: "20px" }}>
                  <IonCard style={{ 
                    width: "100%", 
                    margin: "10pt", 
                    display: "flex", 
                    flexDirection: "column",
                    backgroundColor: "white" // Asegura que las tarjetas sean blancas
                  }}>
                    <IonCardHeader>
                      <IonTitle style={{ 
                        fontWeight: "bold", 
                        fontSize: "20pt", 
                        color: "#F08408",
                        borderBottom: "2pt solid #F08408",
                        paddingBottom: "10pt",
                        marginBottom: "10pt",
                        textAlign: "center"
                      }}>Prestador</IonTitle>
                    </IonCardHeader>
                    <IonCardContent style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column" }}>
                      <p>Registrá y publicá tus establecimientos y ofertas turísticas.</p>
                      <IonImg
                        src="/public/3.3. Registro de usuario/Prestador.png"
                        style={{ width: "100%", marginTop: "10pt", marginBottom: "10pt" }}
                      />
                      <IonButton expand="block" style={{
                        "--background": "#F08408",
                        "--color": "white",
                        "--border-radius": "20px",
                        margin: "10pt 0"
                      }} onClick={() => {
                        if (!router) return;
                        router.push("/signup/complete/prestador");
                      }}>
                        Potenciá tus ofertas
                      </IonButton>
                      <p>Gestioná todas tus reservas desde un solo lugar y accedé a reportes detallados para optimizar tu negocio.</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                
                <IonCol size="12" sizeMd="6" style={{ display: "flex", marginBottom: "20px" }}>
                  <IonCard style={{ 
                    width: "100%", 
                    margin: "10pt", 
                    display: "flex", 
                    flexDirection: "column",
                    backgroundColor: "white" // Asegura que las tarjetas sean blancas
                  }}>
                    <IonCardHeader>
                      <IonTitle style={{ 
                        fontWeight: "bold", 
                        fontSize: "20pt", 
                        color: "#F08408",
                        borderBottom: "2pt solid #F08408",
                        paddingBottom: "10pt",
                        marginBottom: "10pt",
                        textAlign: "center"
                      }}>Turista</IonTitle>
                    </IonCardHeader>
                    <IonCardContent style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column" }}>
                      <p>Explorá una amplia variedad de alojamientos, actividades y eventos turísticos.</p>
                      <IonImg
                        src="/public/3.3. Registro de usuario/Turista.png"
                        style={{ width: "100%", marginTop: "10pt", marginBottom: "10pt" }}
                      />
                      <IonButton expand="block" style={{
                        "--background": "#F08408",
                        "--color": "white",
                        "--border-radius": "20px",
                        margin: "10pt 0"
                      }} onClick={() => {
                        if (!router) return;
                        router.push("/signup/complete/turista");
                      }}>
                        Comenzá tu aventura
                      </IonButton>
                      <p>Reservá en segundos y llevá un seguimiento de todas tus experiencias desde tu cuenta.</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </UncompleteLoggedLayout>
  );
}
