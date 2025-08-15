import { IonPage } from "@ionic/react";
import DefaultLoggedLayout from "../../Views/Layouts/DefaultLoggedLayout";
import MisReservasView from "../../Views/MisReservas/MisReservasView";
const MisReservas: React.FC = () => {
  return (
    <IonPage>
      <DefaultLoggedLayout>
        <MisReservasView />
      </DefaultLoggedLayout>
    </IonPage>
  );
};

export default MisReservas;
