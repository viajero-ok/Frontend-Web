import { IonPage } from "@ionic/react";
import LoginView from "../../Views/Login/LoginView";
import VisitorLayout from "../../Views/Layouts/VisitorLayout";

const LogIn: React.FC = () => {
  return (
    <IonPage>
      <VisitorLayout>
        <LoginView />
      </VisitorLayout>
    </IonPage>
  );
};

export default LogIn;
