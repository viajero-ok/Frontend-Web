import { IonContent, IonPage } from "@ionic/react";
import { useParams } from "react-router";
import Checkout from "./Checkout";

const PagarTestPage: React.FC = () => {
  const params: any = useParams();

  return (
    <IonPage>
      <IonContent>
        <h1>Hello, World!</h1>
        <Checkout />
      </IonContent>
    </IonPage>
  );
};

export default PagarTestPage;
