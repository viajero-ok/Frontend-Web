import { IonButton, IonCardSubtitle, IonTitle } from "@ionic/react";
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
      <IonTitle>Completá los datos de tu establecimiento</IonTitle>
      <IonTitle>Datos generales</IonTitle>
      <FormProvider schema={schema}>
        <NewPlaceForm />
      </FormProvider>
    </DefaultLoggedLayout>
  );
}
