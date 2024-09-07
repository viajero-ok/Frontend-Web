import { IonImg, IonPage } from "@ionic/react";
import SignupView from "../../Views/Signup/SignupView";
const SignUp: React.FC = () => {
  return (
    <IonPage>
      <IonImg src="/images/sierras.jpg" style={{ width: "100%", position: "fixed"}} />
      <SignupView />
    </IonPage>
  );
};

export default SignUp;
