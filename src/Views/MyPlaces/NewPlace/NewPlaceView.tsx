import DefaultLoggedLayout from "../../Layouts/DefaultLoggedLayout";
import NewPlaceForm from "./NewPlaceForm";

type TNewPlaceView = {
  idEstablecimiento: number;
};
export default function NewPlaceView(props: TNewPlaceView) {
  return (
    <DefaultLoggedLayout>
      <NewPlaceForm idEstablecimiento={props.idEstablecimiento} />
    </DefaultLoggedLayout>
  );
}
