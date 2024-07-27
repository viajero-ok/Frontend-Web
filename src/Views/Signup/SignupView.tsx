import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { useState } from "react";
import MapView from "../../components/MapView/MapView";
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
    <IonGrid fixed>
      <IonRow>
        <IonCol size="8" class="banner">
          <MapView
            style={{ height: "100%", width: "100%", position: "absolute" }}
            initPos={{ lat: -31.44219324616496, lgn: -64.19320461965971 }}
          />
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              zIndex: "999999",
              // background: "rgba(38, 157, 84, 10%)",
              background:
                "linear-gradient(135deg, rgba(0, 119, 204, 55%) 5%, rgba(31, 160, 255, 20%) 70%, rgba(250, 255, 250, 45%) 100%)",
            }}
          >
            <img
              style={{
                height: "31pt",
                fontWeight: "bold",
                position: "relative",
                margin: 0,
                float: "left",
                marginLeft: "34pt",
                marginTop: "21pt",
              }}
              src="public\viajero_naranja.png.png"
            ></img>
            <br />
            <br />
            <h1
              style={{
                fontWeight: "bold",
                color: "white",
                margin: 0,
                textAlign: "left",
                marginLeft: "34pt",
                marginTop: "34pt",
                width: "233pt",
                display: "flex",
                flexShrink: 1,
              }}
            >
              Organizá tu viaje de principio a fin en una única plataforma.
            </h1>
          </div>
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
    </IonGrid>
  );
}
