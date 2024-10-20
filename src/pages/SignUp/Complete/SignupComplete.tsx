import { IonPage } from "@ionic/react";
import SignupCompleteView from "../../../Views/Signup/Complete/SignupCompleteView";

const SignupComplete: React.FC = () => {
  return (
    <IonPage>
      <img
        src="/3.2. Principal/Fondo.jpg"
        style={{
          display: "flex",
          position: "absolute",
          width: "auto",
          minHeight: "100%",
        }}
      />
      <SignupCompleteView />
    </IonPage>
  );
};

export default SignupComplete;
