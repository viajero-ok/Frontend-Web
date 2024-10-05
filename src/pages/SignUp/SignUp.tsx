import { IonImg, IonPage } from "@ionic/react";
import SignupView from "../../Views/Signup/SignupView";
import VisitorLayout from "../../Views/Layouts/VisitorLayout";
const SignUp: React.FC = () => {
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
      <VisitorLayout>
        <SignupView />
      </VisitorLayout>
    </IonPage>
  );
};

export default SignUp;
