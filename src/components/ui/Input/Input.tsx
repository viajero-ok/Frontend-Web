import { IonInput } from "@ionic/react";
import * as React from "react";
import styled from "styled-components";
import { cn } from "../Form/Field";

const StyledIonInput = styled(IonInput)`
  --highlight-color-focused: oklch(0.75 0.183 55.934);
  --border-radius: 0.375rem;
  &::part(label),               /* For iOS mode, if supported */
  [slot="label"],               /* For slotted label elements */
  .label-text.sc-ion-input-md {
    /* For Material Design mode */
    color: var(--color-gray-600);
    font-weight: bold;
  }
  color: var(--color-gray-600);
`;

const StyledNumberIonInput = styled(IonInput)`
  --highlight-color-focused: oklch(0.75 0.183 55.934);
  --border-radius: 0px !important;

  &::part(label),               /* For iOS mode, if supported */
  [slot="label"],               /* For slotted label elements */
  .label-text.sc-ion-input-md {
    /* For Material Design mode */
    color: var(--color-gray-600);
    font-weight: bold;
  }
  color: var(--color-gray-600);
`;

const Input = React.forwardRef<typeof StyledIonInput, any>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex flex-col items-end">
        <StyledIonInput
          type="text"
          {...props}
          value={props.value}
          onIonInput={props.onChange}
          ref={ref}
          fill="outline"
          className="!flex !shadow-sm"
          placeholder={props.placeholder}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

const NumberInput = React.forwardRef<typeof StyledNumberIonInput, any>(
  ({ className, type, ...props }, ref) => {
    const [value, setValue] = React.useState<number | undefined>(props.value);

    return (
      <div className="flex flex-col items-end h-full">
        <div className="flex flex-row gap-1 items-center w-full h-full">
          {/* <button
            className={cn(
              "flex bg-gray-50 border border-[#bbb] rounded-l-md px-2 h-full items-center cursor-pointer",
              "hover:shadow-sm hover:border-black active:border-[var(--color-viajero)]"
            )}
            onClick={(e) => {
              e.preventDefault();
              setValue((prev: number | undefined) => (prev ? prev - 1 : 1));
            }}
            disabled={!value}
          >
            <IonIcon className="text-gray-600" icon={chevronBack} />
          </button> */}
          <StyledNumberIonInput
            type="text"
            {...props}
            onIonInput={props.onChange}
            ref={ref}
            fill="outline"
            className="!flex !shadow-sm"
            placeholder={props.placeholder}
          />
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              setValue((prev: number | undefined) => (prev ? prev + 1 : 1));
            }}
            className={cn(
              "flex bg-gray-50 border border-[#bbb] rounded-r-md px-2 h-full items-center cursor-pointer",
              "hover:shadow-sm hover:border-black active:border-[var(--color-viajero)]"
            )}
          >
            <IonIcon className="text-gray-600" icon={chevronForward} />
          </button> */}
        </div>
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";

const formatTime = (time: number | undefined): string => {
  if (typeof time == "undefined") return "";
  if (time < 0) return "";
  if (time <= 9) return `0${time}`;
  return `${time}`;
};

const TimeInput = React.forwardRef<HTMLInputElement, any>(
  ({ className, ...props }, ref) => {
    const [hours, setHours] = React.useState<string>(formatTime(props.hora));
    const [minutes, setMinutes] = React.useState<string>(
      formatTime(props.minuto)
    );

    const refHours = React.useRef<HTMLInputElement>(null);
    const refMinutes = React.useRef<HTMLInputElement>(null);

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row justify-center items-center content-center h-[42pt] w-full border border-[#bbb] rounded-md hover:border-black px-2",
          "text-gray-600"
        )}
        onClick={() =>
          hours.length == 2
            ? refMinutes.current?.focus()
            : refHours.current?.focus()
        }
        onChange={(e: any) => {
          if (!props.onChange) return;
          const h = refHours.current?.value ?? "";
          const m = refMinutes.current?.value ?? "";
          props.onChange({
            ...e,
            target: { ...e.target, value: `${h}:${m}` },
          });
        }}
      >
        <input
          value={hours}
          ref={refHours}
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              refMinutes.current?.focus(); // move to next
            }
            if (hours.length == 2) refMinutes.current?.focus();
            if (e.key.length > 1) return;
            if (/^\d$/.test(e.key)) return;
            e.preventDefault();
          }}
          onInput={(e: React.FormEvent<HTMLInputElement>) =>
            setHours(e.currentTarget.value)
          }
          className={cn(
            "flex flex-row text-center w-[20pt] h-full p-0 focus-visible:outline-none text-lg"
          )}
          placeholder="00"
          maxLength={2}
        />
        <div className="flex h-full items-center pb-1 text-lg">:</div>
        <input
          value={minutes}
          ref={refMinutes}
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Backspace" && minutes.length == 0) {
              refHours.current?.focus(); // move to previous
            }
            if (e.key.length > 1) return;
            if (/^\d$/.test(e.key)) return;
            e.preventDefault();
          }}
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            setMinutes(e.currentTarget.value);
          }}
          className={cn(
            "flex flex-row text-center w-[20pt] h-full p-0 focus-visible:outline-none text-lg"
          )}
          placeholder="00"
          maxLength={2}
        />
      </div>
    );
  }
);
TimeInput.displayName = "TimeInput";

export { TimeInput, Input, NumberInput };
