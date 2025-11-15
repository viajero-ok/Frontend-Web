import { IonDatetime } from "@ionic/react";
import * as React from "react";
import styled from "styled-components";
import { Input } from "../Input/Input";
import { cn } from "../Form/Field";

const StyledIonDateTime = styled(IonDatetime)`
  --highlight-color-focused: oklch(0.75 0.183 55.934);
  --border-radius: 0.375rem;
  background-color: white;
  .alert-button-inner {
    color: oklch(0.75 0.183 55.934);
  }
`;

const DatePicker = React.forwardRef<typeof StyledIonDateTime, any>(
  ({ className, type, onChange, ...props }, ref) => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
      <div className="datepicker-container group flex flex-col relative w-full items-stretch">
        <Input
          readonly
          placeholder="Selecciona una fecha"
          value={props.value ? props.value.split("T")[0] : null}
          className="w-full"
          onFocus={() => setOpen(true)}
          onBlur={(e: any) => {
            if (!e.relatedTarget?.closest(".datepicker-popup")) {
              setOpen(false);
            }
          }}
        />
        <StyledIonDateTime
          onIonChange={(e) => {
            onChange(e);
            setOpen(false);
          }}
          {...props}
          value={props.value}
          fill="outline"
          className={cn(
            "datepicker-popup",
            "!flex !shadow-sm absolute z-10 mt-0",
            open ? "!visible" : "!hidden",
            "w-full"
          )}
          placeholder={props.placeholder}
          presentation="date"
        />
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";

// const SelectOption = React.forwardRef<typeof IonSelectOption, any>(
//   ({ ...props }) => {
//     return <IonSelectOption {...props}></IonSelectOption>;
//   }
// );
// SelectOption.displayName = "SelectOption";

export { DatePicker };
