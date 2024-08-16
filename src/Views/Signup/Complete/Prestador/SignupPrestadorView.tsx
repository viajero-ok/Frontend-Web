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
import SignupTuristaForm from "../Turista/SignupTuristaForm";

export default function SignupTuristaView() {
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
            <h1 style={{ fontWeight: "bold" }}>Registrar Turista</h1>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonList>
              <FormProvider schema={schema}>
                <SignupTuristaForm />
              </FormProvider>
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
