import { FormProvider } from "../../../hooks/UseForm/FormProvider";
import DefaultLoggedLayout from "../../Layouts/DefaultLoggedLayout";
import OfferSelection from "./OfferSelection";

export default function NewOfferView() {
  const schema = {
    id_establecimiento: 1,
  };
  return (
    <DefaultLoggedLayout>
      <FormProvider schema={schema}>
        <OfferSelection />
      </FormProvider>
    </DefaultLoggedLayout>
  );
}
