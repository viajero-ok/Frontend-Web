import { IonIcon } from "@ionic/react";
import { Dispatch, SetStateAction } from "react";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "../Form/Field";

export const Segment = ({
  segment,
  label,
  value,
  set,
  disabled,
  className,
  icon,
}: {
  segment: string;
  label: string;
  value: string;
  set: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  className?: ClassNameValue;
  icon?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-2 items-center px-2 py-2 text-gray-600 text-sm border rounded-md",
        segment == value
          ? "bg-[var(--color-viajero)]/5 border-[var(--color-viajero)]"
          : "bg-transparent border-transparent",
        disabled
          ? "text-gray-400 cursor-default"
          : "cursor-pointer hover:bg-[var(--color-viajero)]/5",
        className
      )}
      onClick={() => !disabled && set(value)}
    >
      {icon && <IonIcon icon={icon} />}
      {label}
    </div>
  );
};
