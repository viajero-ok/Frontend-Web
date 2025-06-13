import { IonPage } from "@ionic/react";
import PublicarOfertaView from "../../../Views/MyOffers/PublicarOferta/PublicarOfertaView";
import DefaultLoggedLayout from "../../../Views/Layouts/DefaultLoggedLayout";
import { useParams } from "react-router";
import { PublicarOfertaProvider } from "../../../Views/MyOffers/PublicarOferta/Provider/PublicarOfertaProvider";

const PublicarOfertaPage: React.FC = () => {
  const params: any = useParams();

  return (
    params &&
    params.id && (
      <IonPage>
        <DefaultLoggedLayout>
          <PublicarOfertaProvider idOferta={params.id}>
            <PublicarOfertaView />
          </PublicarOfertaProvider>
        </DefaultLoggedLayout>
      </IonPage>
    )
  );
};

export default PublicarOfertaPage;
