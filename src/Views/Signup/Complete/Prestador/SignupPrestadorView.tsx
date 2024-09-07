import {
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonList,
  IonRow,
} from "@ionic/react";
import { FormProvider, useForm } from "../../../../hooks/UseForm/FormProvider";
import SignupPrestadorForm from "./SignupPrestadorForm";

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
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol>
            <h1 style={{ fontWeight: "bold" }}>Registrar Prestador</h1>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <FormProvider schema={schema}>
              <SignupPrestadorForm />
            </FormProvider>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
