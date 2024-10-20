import { FormProvider } from "../../../hooks/UseForm/FormProvider";
import DefaultLoggedLayout from "../../Layouts/DefaultLoggedLayout";
import OfferSelection from "./OfferSelection";

export default function NewOfferView() {
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
        <OfferSelection />
      </FormProvider>
    </DefaultLoggedLayout>
  );
}
