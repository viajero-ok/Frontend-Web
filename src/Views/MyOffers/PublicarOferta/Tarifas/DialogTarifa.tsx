import { IonActionSheet, IonCard } from "@ionic/react";
import { Dispatch, SetStateAction } from "react";
import FormTarifa from "./FormTarifa";

type TDialogTarifa = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
};
export default function DialogTarifa(props: TDialogTarifa) {
  return (
    <IonActionSheet
      isOpen={props.open}
      onDidDismiss={() => props.setOpen(false)}
      style={{}}
    >
      <IonCard>
        <FormTarifa />
      </IonCard>
    </IonActionSheet>
  );
}
