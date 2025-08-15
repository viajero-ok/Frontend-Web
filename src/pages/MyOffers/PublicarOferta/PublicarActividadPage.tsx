import { IonPage } from "@ionic/react";
import { useParams } from "react-router";
import DefaultLoggedLayout from "../../../Views/Layouts/DefaultLoggedLayout";
import { PublicarActividadProvider } from "../../../Views/MyOffers/PublicarOferta/PublicarActividad/PublicarActividadProvider";
import PublicarActividadView from "../../../Views/MyOffers/PublicarOferta/PublicarActividad/PublicarActividadView";

const PublicarActividadPage: React.FC = () => {
  const params: any = useParams();

  return (
    params &&
    params.id && (
      <IonPage>
        <DefaultLoggedLayout>
          <PublicarActividadProvider idOferta={params.id}>
            <PublicarActividadView />
          </PublicarActividadProvider>
        </DefaultLoggedLayout>
      </IonPage>
    )
  );
};

export default PublicarActividadPage;
