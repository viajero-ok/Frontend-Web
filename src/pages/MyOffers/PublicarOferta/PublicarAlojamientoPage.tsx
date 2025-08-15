import { IonPage } from "@ionic/react";
import { useParams } from "react-router";
import DefaultLoggedLayout from "../../../Views/Layouts/DefaultLoggedLayout";
import { PublicarOfertaProvider } from "../../../Views/MyOffers/PublicarOferta/PublicarAlojamiento/PublicarAlojamientoProvider";
import PublicarAlojamientoView from "../../../Views/MyOffers/PublicarOferta/PublicarAlojamiento/PublicarAlojamientoView";

const PublicarAlojamientoPage: React.FC = () => {
  const params: any = useParams();

  return (
    params &&
    params.id && (
      <IonPage>
        <DefaultLoggedLayout>
          <PublicarOfertaProvider idOferta={params.id}>
            <PublicarAlojamientoView />
          </PublicarOfertaProvider>
        </DefaultLoggedLayout>
      </IonPage>
    )
  );
};

export default PublicarAlojamientoPage;
