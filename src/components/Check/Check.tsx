import { IonCheckbox } from "@ionic/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type TCheck = {
  list: number[];
  label: string;
  id: number;
  setList: Dispatch<SetStateAction<number[]>>;
  forceChecked?: boolean;
};
export default function Check(props: TCheck) {
  const [checked, setChecked] = useState<boolean>(
    props.forceChecked ?? false
  );
  const handleOnCheck = () => {
    props.setList((prev: number[]) => {
      if (prev.includes(props.id)) return prev;
      return [...prev, props.id];
    });
    setChecked(true);
  };
  const handleOnUncheck = () => {
    if (props.forceChecked) return;
    props.setList((prev: number[]) => {
      return [...prev].filter((id: number) => id != props.id);
    });
    setChecked(false);
  };

  useEffect(() => {
    props.forceChecked ? handleOnCheck() : handleOnUncheck();
  }, [props.forceChecked]);

  useEffect(() => {
    setChecked(props.list.includes(props.id))
  }, [props.list, props.id])

  return (
    <IonCheckbox
      checked={props.forceChecked ? true : checked}
      labelPlacement="end"
      onIonChange={(e: any) =>
        e.target.checked ? handleOnCheck() : handleOnUncheck()
      }
    >
      {props.label}
    </IonCheckbox>
  );
}
