import {
  IonAvatar,
  IonButton,
  IonChip,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  useIonRouter,
} from "@ionic/react";
import { useAuth } from "../../hooks/UseAuth/AuthProvider";
import { useState } from "react";
import { clearJWT } from "../../App/Token";

export default function ProfileChip(props: any) {
  const [open, setOpen] = useState<boolean>(false);
  const auth = useAuth();
  const router = useIonRouter();

  const handleCerrarSesion = () => {
    {
      if (!router) return;
      clearJWT();
      router.push("/");
    }
  };

  return (
    <>
      <IonChip id="chip" onClick={() => setOpen(true)}>
        <IonAvatar>
          <img
            alt="Silhouette of a person's head"
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </IonAvatar>
        <IonLabel>{auth && auth.usuario && `${auth.usuario.nombre}`}</IonLabel>
      </IonChip>
      <IonPopover
        trigger="chip"
        isOpen={open}
        onIonPopoverDidDismiss={() => setOpen(false)}
        style={{}}
      >
        <IonContent class="ion-padding">
          <IonList lines="none">
            <IonItem button disabled>
              Cambiar perfil
            </IonItem>
            <IonItem button disabled>
              Ajustes de cuenta
            </IonItem>
            <IonItem button onClick={() => handleCerrarSesion()}>
              Cerrar sesión
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  );
}
