import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonList,
  IonRow,
} from "@ionic/react";
import { FormProvider } from "../../../../hooks/UseForm/FormProvider";
import SignupTuristaForm from "./SignupTuristaForm";
import UncompleteLoggedLayout from "../../../Layouts/UncompleteLoggedLayout";

export default function SignupTuristaView() {
  const schema = {
    nombre: "",
    apellido: "",
    tipoDeDocumento: "",
    numeroDeDocumento: "",
    CUIT: "",
    provincia: "",
    departamento: "",
    localidad: "",
    telefono: "",
    idioma: "",
    genero: "",
  };
  return (
    <UncompleteLoggedLayout>
      <img
        src="/3.2. Principal/Fondo.jpg"
        style={{
          display: "flex",
          position: "absolute",
          width: "auto",
          minHeight: "100%",
        }}
      />
      <IonCard
        style={{
          position: "relative",
          width: "50%",
          left: "50%",
          marginTop: "13pt",
          transform: "translateX(-50%)",
          padding: "31pt",
          paddingBottom: 0,
        }}
      >
        <IonGrid>
          <IonRow
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <h1 style={{ fontWeight: "bold", color: "#F08408" }}>
              Registrar Turista
            </h1>
          </IonRow>
          <IonRow>
            <IonCol>
              <FormProvider schema={schema}>
                <SignupTuristaForm />
              </FormProvider>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    </UncompleteLoggedLayout>
  );
}
