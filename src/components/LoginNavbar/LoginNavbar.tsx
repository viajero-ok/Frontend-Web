import { IonButton, useIonRouter } from "@ionic/react";
import { colorFill } from "ionicons/icons";

export default function LoginNavbar() {
  const router = useIonRouter();
  const handleRegistrarme = () => {
    if (!router) return;
    router.push("/signup");
  };
  const handleIngresar = () => {
    if (!router) return;
    router.push("/login");
  };
  return (
    <>
      <IonButton
        style={{ marginLeft: "1rem", "--background": "white", "--color": "#F08408", "--border-color": "#F08408", "--border-style": "solid", "--border-width": "1px"}}
        onClick={() => handleIngresar()}
      >
        Ingresá
      </IonButton>
      <IonButton 
        style={{ marginLeft: "1rem", "--background": "#F08408"}} 
        onClick={() => handleRegistrarme()}
      >
        Registrate
      </IonButton>
      
    </>
  );
}
