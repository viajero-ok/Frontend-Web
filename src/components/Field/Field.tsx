import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useState } from "react";

interface IField {
  value?: string;
  form: any;
  name: string;
  label: string;
  valid?: any;
  password?: boolean;
  required?: boolean;
  select?: boolean;
  options?: string[];
}
export default function Field(props: IField) {
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const handleOnChange = (e: any) => {
    if (!props.form) return;
    props.form.setValue(props.name, e.target.value);
    setValue(e.target.value);
    if (props.valid)
      setError((prev: string) =>
        props.valid.validate(e.target.value).join(", ")
      );
  };

  return (
    <>
      <IonItem lines={error.length > 0 ? "none" : "inset"}>
        {!props.select && (
          <IonInput
            type={props.password ? "password" : "text"}
            placeholder={props.required ? props.label + " (*)" : props.label}
            onInput={handleOnChange}
          ></IonInput>
        )}
        {props.select && props.options && (
          <IonSelect
            label={props.required ? props.label + " (*)" : props.label}
            onIonChange={handleOnChange}
          >
            {props.options.map((value: string) => (
              <IonSelectOption value={value}>{value}</IonSelectOption>
            ))}
          </IonSelect>
        )}
      </IonItem>
      {error.length > 0 && (
        <IonItem
          color="none"
          lines={error.length > 0 ? "inset" : "none"}
          style={{ top: "-21pt" }}
        >
          <span
            style={{
              color: "red",
              paddingBottom: "6pt",
              marginTop: "13pt",
              position: "relative",
            }}
          >
            {error}
          </span>
        </IonItem>
      )}
    </>
  );
}
