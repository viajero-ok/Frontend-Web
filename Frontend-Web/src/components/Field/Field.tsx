import { IonContent, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";
import { useState } from "react";

interface IField {
  value?: string;
  form: any;
  name: string;
  label: string;
  valid: any;
  password?: boolean;
  required?: boolean;
}
export default function Field(props: IField) {
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const handleOnChange = (e: any) => {
    if (!props.form) return;
    props.form.setValue(props.name, e.target.value);
    console.log("join: ", props.valid.validate(e.target.value));
    setValue(e.target.value);
    setError((prev: string) => props.valid.validate(e.target.value).join(", "));
  };

  return (
    <>
      <IonItem lines={error.length > 0 ? "none" : "inset"}>
        <IonInput
          type={props.password ? "password" : "text"}
          placeholder={props.required ? props.label + " (*)" : props.label}
          onInput={handleOnChange}
        ></IonInput>
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
