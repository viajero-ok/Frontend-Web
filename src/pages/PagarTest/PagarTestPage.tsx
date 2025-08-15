import { IonContent, IonPage } from "@ionic/react";
import { useParams } from "react-router";
import PagoView from "../../Views/PagoView/PagoView";

const PagarTestPage: React.FC = () => {
  const params: any = useParams();

  return (
    <IonPage>
      <IonContent>
        <PagoView />
      </IonContent>
    </IonPage>
  );
};

export default PagarTestPage;
