import { IonContent, IonHeader, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";

import DefaultLoggedLayout from "../Views/Layouts/DefaultLoggedLayout";
import "./Home.css";
import { useAuth } from "../Auth/Auth";
import { useEffect } from "react";
import HomeVisitanteView from "../Views/Home/Visitante/HomeVisitanteView";
import HomeTuristaView from "../Views/Home/Turista/HomeTuristaView";
import HomePrestadorView from "../Views/Home/Prestador/HomePrestadorView";

const Home: React.FC = () => {
  const auth = useAuth();

  return (
    <DefaultLoggedLayout>
      {auth != "failed" && auth != "loading" && (
        <div>
          {auth.esTurista && <HomeTuristaView />}
          {auth.esPrestador && <HomePrestadorView />}
        </div>
      )}
      {auth == "failed" && <HomeVisitanteView />}
    </DefaultLoggedLayout>
  );
};

export default Home;
