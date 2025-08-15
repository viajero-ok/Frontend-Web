import DefaultLoggedLayout from "../../Layouts/DefaultLoggedLayout";
import { EstablecimientoProvider } from "./EstablecimientoProvider";
import NewPlaceForm from "./NewPlaceForm";

type TNewPlaceView = {
  idEstablecimiento: number;
};
export default function NewPlaceView(props: TNewPlaceView) {
  return (
    <DefaultLoggedLayout>
      <EstablecimientoProvider idEstablecimiento={props.idEstablecimiento}>
        <NewPlaceForm />
      </EstablecimientoProvider>
    </DefaultLoggedLayout>
  );
}
