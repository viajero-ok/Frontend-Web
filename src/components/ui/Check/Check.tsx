import { IonCheckbox } from "@ionic/react";
import * as React from "react";
import styled from "styled-components";

const StyledIonCheckbox = styled(IonCheckbox)`
  --highlight-color-focused: oklch(0.75 0.183 55.934);
  --border-radius: 0.375rem;
  height: 100%;
  padding: 10pt;
  --size: 18pt;
  border-width: 1px !important;
  border-style: solid !important;
  border-radius: 4px;
  border: 1pt solid #b3b3b3 !important;
`;

const Check = React.forwardRef<typeof StyledIonCheckbox, any>(
  ({ className, type, disableShowPassword, ...props }, ref) => {
    return (
      <StyledIonCheckbox
        checked={props.value}
        {...props}
        onIonChange={(e: any) => props.onChange(e.target.checked)}
        ref={ref}
        fill="outline"
        className="!flex !shadow-sm"
      />
    );
  }
);
Check.displayName = "Check";

export { Check };
