import { IonPage } from "@ionic/react";
import PublicarOfertaView from "../../../Views/MyOffers/PublicarOferta/PublicarOfertaView";
import DefaultLoggedLayout from "../../../Views/Layouts/DefaultLoggedLayout";
import { useParams } from "react-router";

const PublicarOfertaPage: React.FC = () => {
  const params: any = useParams();

  return (
    params &&
    params.id && (
      <IonPage>
        <DefaultLoggedLayout>
          <PublicarOfertaView idOferta={params.id} />
        </DefaultLoggedLayout>
      </IonPage>
    )
  );
};

export default PublicarOfertaPage;
