import { IonPage } from "@ionic/react";
import NewPlaceView from "../../../Views/MyPlaces/NewPlace/NewPlaceView";
import { useParams } from "react-router";

const NewPlace: React.FC = () => {
  const params: any = useParams();

  return (
    <IonPage>
      {params && <NewPlaceView idEstablecimiento={params.id} />}
    </IonPage>
  );
};

export default NewPlace;
