import { IonPage } from "@ionic/react";
import { useParams } from "react-router";
import DefaultLoggedLayout from "../../Views/Layouts/DefaultLoggedLayout";
import NewAlojamientoIndividualView from "../../Views/NewAlojamiento/Individual/NewAlojamientoIndividualView";
import { AlojamientoIndividualProvider } from "../../Views/NewAlojamiento/Individual/Provider/AlojamientoIndividualProvider";

const NewAlojamientoIndividual: React.FC = () => {
  const params: any = useParams();

  return (
    <IonPage>
      {params && (
        <DefaultLoggedLayout>
          <AlojamientoIndividualProvider idOferta={params.id}>
            <NewAlojamientoIndividualView idOferta={params.id} />
          </AlojamientoIndividualProvider>
        </DefaultLoggedLayout>
      )}
    </IonPage>
  );
};

export default NewAlojamientoIndividual;
