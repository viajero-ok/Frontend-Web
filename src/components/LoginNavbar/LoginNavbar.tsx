import { IonButton, useIonRouter } from "@ionic/react";

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
      <IonButton color="light" onClick={() => handleRegistrarme()}>
        Registrarme
      </IonButton>
      <IonButton
        style={{ marginLeft: "1rem" }}
        onClick={() => handleIngresar()}
      >
        Ingresar
      </IonButton>
    </>
  );
}
