import {
  IonAvatar,
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Home.css";
import { getApi } from "../App/Default/DefaultService";
import { useAuth } from "../hooks/UseAuth/AuthProvider";
import { transform } from "ol/proj";
import ProfileChip from "../components/ProfileChip/ProfileChip";
import DefaultLoggedLayout from "../Views/Layouts/DefaultLoggedLayout";
import { useEffect, useState } from "react";
import { PERFILES } from "../App/consts/UsuarioConsts";
import HomeVisitanteView from "../Views/Home/Visitante/HomeVisitanteView";
import HomeTuristaView from "../Views/Home/Turista/HomeTuristaView";
import HomePrestadorView from "../Views/Home/Prestador/HomePrestadorView";

const Home: React.FC = () => {
  const [perfil, setPerfil] = useState<number>();
  const auth = useAuth();

  useEffect(() => {
    if (!auth) return;
    setPerfil(auth.getPerfil());
  }, [auth]);

  return (
    <DefaultLoggedLayout>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
          <h1>Perfil: {perfil}</h1>
        </IonHeader>
        <IonContent>
          {perfil == PERFILES.INVITADO.id && <HomeVisitanteView />}
          {perfil == PERFILES.TURISTA.id && <HomeTuristaView />}
          {perfil == PERFILES.PRESTADOR.id && <HomePrestadorView />}
        </IonContent>
      </IonContent>
    </DefaultLoggedLayout>
  );
};

export default Home;
