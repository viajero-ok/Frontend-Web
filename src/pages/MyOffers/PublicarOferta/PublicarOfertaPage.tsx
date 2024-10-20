import { IonPage } from "@ionic/react";
import PublicarOfertaView from "../../../Views/MyOffers/PublicarOferta/PublicarOfertaView";
import DefaultLoggedLayout from "../../../Views/Layouts/DefaultLoggedLayout";

const PublicarOfertaPage: React.FC = () => {
  return (
    <IonPage>
      <DefaultLoggedLayout>
        <PublicarOfertaView />
      </DefaultLoggedLayout>
    </IonPage>
  );
};

export default PublicarOfertaPage;
