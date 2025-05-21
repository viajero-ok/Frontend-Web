import { IonSelect, IonSelectOption } from "@ionic/react";
import * as React from "react";
import styled from "styled-components";

const StyledIonSelect = styled(IonSelect)`
  --highlight-color-focused: oklch(0.75 0.183 55.934);
  --border-radius: 0.375rem;
  .alert-button-inner {
    color: oklch(0.75 0.183 55.934);
  }
`;

const Select = React.forwardRef<typeof StyledIonSelect, any>(
  (
    { className, type, disableShowPassword, onChange, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    return (
      <div className="flex flex-col items-end">
        <StyledIonSelect
          onIonChange={onChange}
          type={showPassword ? "text" : type}
          {...props}
          value={props.value}
          onIonInput={props.onChange}
          ref={ref}
          fill="outline"
          className="!flex !shadow-sm"
          placeholder={props.placeholder}
        />
        {type == "password" && !disableShowPassword ? (
          <span
            className="text-gray-600 text-sm hover:underline cursor-pointer select-none"
            onClick={() => setShowPassword((prev: boolean) => !prev)}
          >
            {showPassword ? "ocultar" : "mostrar"}
          </span>
        ) : null}
      </div>
    );
  }
);
Select.displayName = "Select";

const SelectOption = React.forwardRef<typeof IonSelectOption, any>(
  ({ ...props }) => {
    return <IonSelectOption {...props}></IonSelectOption>;
  }
);
SelectOption.displayName = "SelectOption";

export { Select, SelectOption };
