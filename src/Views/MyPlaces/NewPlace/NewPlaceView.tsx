import { FormProvider } from "../../../hooks/UseForm/FormProvider";
import DefaultLoggedLayout from "../../Layouts/DefaultLoggedLayout";
import NewPlaceForm from "./NewPlaceForm";

type TNewPlaceView = {
  idEstablecimiento: number;
};
export default function NewPlaceView(props: TNewPlaceView) {
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
          <NewPlaceForm idEstablecimiento={props.idEstablecimiento} />
        </FormProvider>
    </DefaultLoggedLayout>
  );
}
