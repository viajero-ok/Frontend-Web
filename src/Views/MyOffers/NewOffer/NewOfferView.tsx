import { FormProvider } from "../../../hooks/UseForm/FormProvider";
import DefaultLoggedLayout from "../../Layouts/DefaultLoggedLayout";
import OfferSelection from "./OfferSelection";
import { NewOfferProvider } from "./Provider/NewOfferProvider";

export default function NewOfferView() {
  const schema = {
    id_establecimiento: 1,
  };
  return (
    <DefaultLoggedLayout>
      <NewOfferProvider>
        <FormProvider schema={schema}>
          <OfferSelection />
        </FormProvider>
      </NewOfferProvider>
    </DefaultLoggedLayout>
  );
}
