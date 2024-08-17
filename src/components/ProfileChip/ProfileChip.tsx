import {
  IonAvatar,
  IonButton,
  IonChip,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
} from "@ionic/react";
import { useAuth } from "../../hooks/UseAuth/AuthProvider";
import { useState } from "react";

export default function ProfileChip(props: any) {
  const [open, setOpen] = useState<boolean>(false);
  const auth = useAuth();
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
            <IonItem button>Cambiar perfil</IonItem>
            <IonItem button>Ajustes de cuenta</IonItem>
            <IonItem button>Cerrar sesión</IonItem>
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  );
}
