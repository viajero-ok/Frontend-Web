import * as React from "react";
import { IonInput } from "@ionic/react";
import styled from "styled-components";
import { cn } from "../Form/Field";

const StyledIonInput = styled(IonInput)`
  --highlight-color-focused: oklch(0.75 0.183 55.934);
  --border-radius: 0.375rem;
`;

// export default function Input({props}: any) {
//   return (
//     <div className="p-8">
//       <StyledIonInput
//         {...props}
//         fill="outline"
//         className="!flex !m-4 !w-fit !shadow-sm "
//         placeholder="hello, world!"
//       />
//     </div>
//   );
// }

const Input = React.forwardRef<typeof StyledIonInput, any>(
  ({ className, type, ...props }, ref) => {
    return (
      <StyledIonInput
        type={type}
        {...props}
        value={props.value}
        onIonInput={props.onChange}
        ref={ref}
        fill="outline"
        className="!flex !shadow-sm"
        placeholder={props.placeholder}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
