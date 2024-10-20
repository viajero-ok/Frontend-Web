import { FormProvider } from "../../../hooks/UseForm/FormProvider";
import DefaultLoggedLayout from "../../Layouts/DefaultLoggedLayout";
import NewPlaceForm from "./NewPlaceForm";

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
