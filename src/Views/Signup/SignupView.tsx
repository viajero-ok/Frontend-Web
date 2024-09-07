import { IonCard, IonCol, IonGrid, IonImg, IonRow } from "@ionic/react";
import { useState } from "react";
import { FormProvider } from "../../hooks/UseForm/FormProvider";
import SignupForm from "./SignupForm";
import VerifyForm from "./VerifyForm";

type TSignupView = {
  params: { [key: string]: string };
};
export default function SignupView(props: any) {
  const { search } = window.location;
  const id = new URLSearchParams(search).get("id");
  const [idUsuario, setIdUsuario] = useState<string>(id ?? "");
  const schema = {
    email: "",
    password: "",
    passwordRepeated: "",
  };

  return (
    <IonCard style={{ margin: "50pt", marginLeft: "100pt", marginRight: "100pt" }}>
      <IonRow>
        <IonCol>
          <IonImg src="/images/mapa.png" style={{ backgroundColor: "white" }} />
        </IonCol>
        <IonCol size="4" style={{ alignContent: "center" }}>
          {idUsuario?.length == 0 ? (
            <FormProvider schema={schema}>
              <SignupForm setIdUsuario={setIdUsuario} />
            </FormProvider>
          ) : (
            <VerifyForm id={idUsuario} />
          )}
        </IonCol>
      </IonRow>
    </IonCard>
  );
}
