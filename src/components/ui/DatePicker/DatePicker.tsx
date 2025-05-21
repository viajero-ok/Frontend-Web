import { IonDatetime } from "@ionic/react";
import * as React from "react";
import styled from "styled-components";
import { Input } from "../Input/Input";
import { cn } from "../Form/Field";

const StyledIonDateTime = styled(IonDatetime)`
  --highlight-color-focused: oklch(0.75 0.183 55.934);
  --border-radius: 0.375rem;
  .alert-button-inner {
    color: oklch(0.75 0.183 55.934);
  }
`;

const DatePicker = React.forwardRef<typeof StyledIonDateTime, any>(
  ({ className, type, disableShowPassword, onChange, ...props }, ref) => {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
      <div className="flex flex-col items-end relative">
        <Input
          readonly
          placeholder="Selecciona una fecha"
          value={props.value ? props.value.split("T")[0] : null}
          className="w-full"
          onFocus={() => setOpen(true)}
        />
        <StyledIonDateTime
          onIonChange={onChange}
          {...props}
          value={props.value}
          onIonInput={props.onChange}
          ref={ref}
          fill="outline"
          className={cn(
            "!flex !shadow-sm absolute mt-14",
            open ? "!visible" : "!hidden"
          )}
          placeholder={props.placeholder}
          presentation="date"
          onBlur={() => setOpen(false)}
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
