import { IonCard, IonCol, IonGrid, IonRow } from "@ionic/react";
import { FormProvider } from "../../../../hooks/UseForm/FormProvider";
import SignupPrestadorForm from "./SignupPrestadorForm";
import UncompleteLoggedLayout from "../../../Layouts/UncompleteLoggedLayout";

export default function SignupPrestadorView() {
  const schema = {
    nombre: "",
    apellido: "",
    tipoDeDocumento: "",
    numeroDeDocumento: "",
    pais: "",
    provincia: "",
    departamento: "",
    localidad: "",
    telefono: "",
    idioma: "",
    genero: "",
    fehcaDeNacimiento: "",
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
              Registrar Prestador
            </h1>
          </IonRow>
          <IonRow>
            <IonCol>
              <FormProvider schema={schema}>
                <SignupPrestadorForm />
              </FormProvider>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    </UncompleteLoggedLayout>
  );
}
