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
import DateWheel from "../DateWheel/DateWheel";
import { Maskito } from "@maskito/core";

interface IField {
  value?: string;
  form: any;
  name: string;
  label: string;
  valid?: any;
  password?: boolean;
  required?: boolean;
  select?: boolean;
  options?: { id: number; text: string }[];
  date?: boolean;
  mask?: any;
  disabled?: boolean;
}
export default function Field(props: IField) {
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const handleOnChange = (v: string) => {
    if (!props.form) return;
    props.form.setValue(props.name, v);
    setValue(v);
    if (props.valid)
      setError((prev: string) => props.valid.validate(v).join(", "));
  };

  return (
    <>
      <IonItem lines={error.length > 0 ? "none" : "inset"}>
        {!props.select && !props.date && (
          <IonInput
            disabled={props.disabled ?? false}
            type={props.password ? "password" : "text"}
            placeholder={props.required ? props.label + " (*)" : props.label}
            onInput={(e: any) => handleOnChange(e.target.value)}
            ref={
              props.mask
                ? async (cardRef) => {
                    if (cardRef) {
                      const input = await cardRef.getInputElement();
                      props.mask(input);
                    }
                  }
                : undefined
            }
          ></IonInput>
        )}
        {props.select && props.options && (
          <IonSelect
            disabled={props.disabled ?? false}
            label={props.required ? props.label + " (*)" : props.label}
            onIonChange={(e: any) => handleOnChange(e.target.value)}
          >
            {props.options.map((value: any) => (
              <IonSelectOption value={value.id}>{value.text}</IonSelectOption>
            ))}
          </IonSelect>
        )}
        {props.date && (
          <DateWheel
            label={props.label}
            required={props.required ?? false}
            onChange={handleOnChange}
          />
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
