import { IonInput } from "@ionic/react";
import { useMaskito } from "@maskito/react";

type TDateWheel = {
  password?: boolean;
  required?: boolean;
  label: string;
  onChange: (value: string) => void;
};
export default function DateWheel(props: TDateWheel) {
  const handleInput = (e: any) => {
    props.onChange(e.target.value);
    return;
  };

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
