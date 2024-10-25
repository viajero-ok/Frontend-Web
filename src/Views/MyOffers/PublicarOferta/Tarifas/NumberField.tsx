import { IonButton, IonIcon, IonInput } from "@ionic/react";
import { MaskitoOptions } from "@maskito/core";
import { useMaskito } from "@maskito/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type TNumericField = {
  setValue: Dispatch<SetStateAction<number | null>>;
  label?: string;
  money?: boolean;
  placeholder?: string;
  initial?: number | null;
};
export default function NumberField(props: TNumericField) {
  const [value, setValue] = useState<number | null>(props.initial ?? null);

  const formatInitial = (value: string) => {
    const intPart = value.split(".")[0].split("");
    const floatPart = value.split(".")[1];

    const chunks = [];
    while (intPart.length > 0) {
      chunks.unshift(intPart.splice(-3).join(""));
    }

    return `${chunks.join(".")},${floatPart}`;
  };
  const [formatted, setFormatted] = useState<string | null>(
    props.initial ? formatInitial(`${props.initial}`) : null
  );

  useEffect(() => {
    if (value === null) return;
    props.setValue(value);
  }, [value]);

  const plus = () => {
    if (props.money) return;
    setValue((prev: number | null) => (prev == null ? 0 : (prev += 1)));
  };

  const minus = () => {
    if (props.money) return;
    setValue((prev: number | null) => (prev == null ? 0 : (prev -= 1)));
  };

  const options = {
    mask: ({ value }) => {
      const parsedValue = value
        .replace("$", "")
        .replaceAll(",", "")
        .replaceAll(".", "");
      const reversed = parsedValue.split("").reverse().join("");
      const wholeChunks = reversed.substring(2).match(/.{1,3}/g) ?? [];
      const result = wholeChunks.map((chunk) => chunk.length).reverse();

      const resultArrayWithCommas: any = [];
      result.forEach((digits: number, index: number) => {
        if (index != 0) resultArrayWithCommas.push(".");
        resultArrayWithCommas.push(...new Array(digits).fill(/\d/));
      });

      return ["$", ...resultArrayWithCommas, ",", ...new Array(2).fill(/\d/)];
    },
  } satisfies MaskitoOptions;
  const maskedInputRef = useMaskito({ options });

  const handleChange = (e: any) => {
    const val = e.target.value;
    if (val == "$0,00") {
      setValue(null);
      setFormatted(null);
      return;
    }
    const parsed = parseFloat(
      val.replace("$", "").replace(".", "").replace(",", ".")
    );
    setValue(parsed);
    setFormatted(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <span>{props.label && props.label}:</span>
      {!props.money && (
        <IonButton fill="clear" onClick={() => minus()}>
          <IonIcon
            icon={chevronBack}
            style={{ fontSize: "24pt", color: "gray" }}
          />
        </IonButton>
      )}
      {!props.money && (
        <IonInput
          value={value}
          style={{
            display: "inline-block",
            flexDirection: "row",
            textAlign: "center",
          }}
        />
      )}
      {props.money && (
        <IonInput
          value={formatted}
          placeholder={props.placeholder ?? "0"}
          style={{
            display: "inline-block",
            flexDirection: "row",
            textAlign: "center",
            width: "100pt",
          }}
          ref={maskedInputRef}
          onIonInput={(e: any) => handleChange(e)}
        />
      )}
      {!props.money && (
        <IonButton fill="clear" onClick={() => plus()}>
          <IonIcon
            icon={chevronForward}
            style={{ fontSize: "24pt", color: "gray" }}
          />
        </IonButton>
      )}
    </div>
  );
}
