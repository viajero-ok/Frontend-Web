import { IonCheckbox } from "@ionic/react";
import * as React from "react";
import styled from "styled-components";
import { cn } from "../Form/Field";
import { ClassNameValue } from "tailwind-merge";

export const CheckSection = ({
  label,
  className,
}: {
  label: string;
  className?: ClassNameValue;
}) => {
  return (
    <div
      className={cn(
        "text-xl text-gray-600 pl-4 font-bold flex border border-gray-200 rounded-md bg-gray-50 items-center",
        className
      )}
    >
      {label}
    </div>
  );
};

const handleSelectCheckItem = (
  id: number,
  value: boolean,
  set: React.Dispatch<React.SetStateAction<number[]>>
) => {
  if (!value) {
    set((prev: number[]) => [...prev].filter((v: number) => v != id));
    return;
  }

  set((prev: number[]) => [...prev, id]);
};

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
      <div className={cn(className)}>
        <StyledIonCheckbox
          checked={props.value}
          {...props}
          onIonChange={(e: any) =>
            props.onChange && props.onChange(e.target.checked)
          }
          ref={ref}
          fill="outline"
          className={cn("!flex !shadow-sm")}
        />
      </div>
    );
  }
);
Check.displayName = "Check";

export { Check, handleSelectCheckItem };
