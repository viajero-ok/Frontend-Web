import { IonCol, IonContent, IonGrid, IonItem, IonList, IonRow } from "@ionic/react";
import { FormProvider, useForm } from "../../../../hooks/UseForm/FormProvider";
import SignupPrestadorForm from "./SignupPrestadorForm";

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
  };
  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol>
            <h1 style={{ fontWeight: "bold" }}>Registrar Prestador</h1>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonList>
                <FormProvider schema={schema}>
                    <SignupPrestadorForm />
                </FormProvider>
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
