import {
  IonButton,
  IonCardSubtitle,
  IonContent,
  IonRow,
  IonTitle,
} from "@ionic/react";
import DefaultLoggedLayout from "../../Layouts/DefaultLoggedLayout";
import { FormProvider } from "../../../hooks/UseForm/FormProvider";
import NewPlaceForm from "./NewPlaceForm";
import NewPlaceMap from "./NewPlaceMap";

export default function NewPlaceView() {
  const schema = {
    nombreDelEstablecimiento: "",
    numeroDeHabilitacionMunicipal: "",
    descripcion: "",
    telefono: "",
    mail: "",
    calle: "",
    numero: "",
    provincia: "", // fijada como siempre cordoba?
    localidad: "",
    departamento: "",
  };
  return (
    <DefaultLoggedLayout>
        <FormProvider schema={schema}>
          <NewPlaceForm />
        </FormProvider>
    </DefaultLoggedLayout>
  );
}
