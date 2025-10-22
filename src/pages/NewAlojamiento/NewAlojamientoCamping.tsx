import { IonPage } from "@ionic/react";
import { useParams } from "react-router";
import DefaultLoggedLayout from "../../Views/Layouts/DefaultLoggedLayout";
import NewAlojamientoCampingView from "../../Views/NewAlojamiento/Camping/NewAlojamientoCampingView";
import { AlojamientoCampingProvider } from "../../Views/NewAlojamiento/Camping/Provider/CampingProvider";

const NewAlojamientoCamping: React.FC = () => {
  const params: any = useParams();

  return (
    <IonPage>
      {params && (
        <DefaultLoggedLayout>
          <AlojamientoCampingProvider idOferta={params.id}>
            <NewAlojamientoCampingView idOferta={params.id} />
          </AlojamientoCampingProvider>
        </DefaultLoggedLayout>
      )}
    </IonPage>
  );
};

export default NewAlojamientoCamping;
