import { IonInput } from "@ionic/react";
import * as React from "react";
import styled from "styled-components";

const StyledIonInput = styled(IonInput)`
  --highlight-color-focused: oklch(0.75 0.183 55.934);
  --border-radius: 0.375rem;
`;

const Input = React.forwardRef<typeof StyledIonInput, any>(
  ({ className, type, disableShowPassword, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    return (
      <div className="flex flex-col items-end">
        <StyledIonInput
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
Input.displayName = "Input";

export { Input };
