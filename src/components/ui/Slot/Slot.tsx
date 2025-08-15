import React from "react";
import { Input } from "../Input/Input";

const Slot = React.forwardRef<
  typeof Input,
  any
>(({ children, ...props }, ref) => {
  return React.cloneElement(children as React.ReactElement, {
    ref,
    ...props,
  });
});
Slot.displayName = "Slot";

export { Slot };
