import { IonCol, IonContent, IonGrid, IonList, IonRow } from "@ionic/react";
import { FormProvider } from "../../../../hooks/UseForm/FormProvider";
import SignupTuristaForm from "./SignupTuristaForm";

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
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol>
            <h1 style={{ fontWeight: "bold" }}>Registrar Turista</h1>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <FormProvider schema={schema}>
              <SignupTuristaForm />
            </FormProvider>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
