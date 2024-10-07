import { IonInput } from "@ionic/react";
import { useMaskito } from "@maskito/react";
import { useEffect, useState } from "react";

type TDateWheel = {
  password?: boolean;
  required?: boolean;
  label: string;
  onChange: (value: string) => void;
  value?: string;
};
export default function DateWheel(props: TDateWheel) {
  const [value, setValue] = useState<string | null>();

  const handleInput = (e: any) => {
    setValue(e.target.value);
    props.onChange(e.target.value);
    return;
  };

  useEffect(() => {
    if (!props.value) return;
    setValue(props.value);
  }, [props.value]);

  const dateMask = useMaskito({
    options: {
      mask: [
        ...Array(4).fill(/\d/),
        "-",
        ...Array(2).fill(/\d/),
        "-",
        ...Array(2).fill(/\d/),
      ],
    },
  });

  return (
    <>
      <IonInput
        value={value}
        type="text"
        placeholder={props.required ? props.label + " (*)" : props.label}
        onInput={(e) => handleInput(e)}
        ref={async (cardRef) => {
          if (cardRef) {
            const input = await cardRef.getInputElement();
            dateMask(input);
          }
        }}
      ></IonInput>
    </>
  );
}
