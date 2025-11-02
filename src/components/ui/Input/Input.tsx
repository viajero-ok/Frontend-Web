import { IonInput, IonLabel, IonText, IonTitle } from "@ionic/react";
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

export const formatTime = (time: number | undefined): string => {
  if (time == null) return "";
  if (typeof time == "undefined") return "";
  if (time < 0) return "";
  if (time <= 9) return `0${time}`;
  return `${time}`;
};

const TimeInput = React.forwardRef<HTMLInputElement, any>(
  ({ className, ...props }, ref) => {
    const [hours, setHours] = React.useState<string | undefined>();
    const [minutes, setMinutes] = React.useState<string | undefined>();

    const refHours = React.useRef<HTMLInputElement>(null);
    const refMinutes = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (!props.reset) return;
      setHours(formatTime(props.hora));
      setMinutes(formatTime(props.minuto));
    }, [props.hora, props.minuto, props.reset]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row justify-center items-center content-center h-[42pt] w-full border border-[#bbb] rounded-md px-2",
          props.disabled
            ? "hover:border-[#bbb] border-gray-200 text-gray-400"
            : "hover:border-black border-[#bbb] text-gray-600"
        )}
        onClick={() =>
          hours?.length == 2
            ? refMinutes.current?.focus()
            : refHours.current?.focus()
        }
        onChange={(e: any) => {
          if (!props.set) return;
          const h = refHours.current?.value ?? "";
          const m = refMinutes.current?.value ?? "";
          props.set(`${h}:${m}`);
        }}
      >
        <input
          disabled={props.disabled}
          value={hours}
          ref={refHours}
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              refMinutes.current?.focus(); // move to next
            }
            if (hours?.length == 2) refMinutes.current?.focus();
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
          disabled={props.disabled}
          value={minutes}
          ref={refMinutes}
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Backspace" && minutes?.length == 0) {
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

const formatValue = (v: string): string => {
  const cleaned = v
    .replaceAll("$", "")
    .replaceAll(",", "")
    .replaceAll(".", "")
    .replaceAll(/^0+/g, "");
  const splitted = cleaned.split("");
  const intPart = splitted
    .slice(0, -2)
    .reverse()
    .map((s: string, index: number, arr: string[]) => {
      return (index + 1) % 3 == 0 && index + 1 < arr.length ? "," + s : s;
    })
    .reverse()
    .join("");
  const floatPart = splitted.slice(-2).join("");
  return `$${intPart.length > 0 ? intPart : "0"}.${floatPart}`;
};

const MoneyInput = React.forwardRef<HTMLInputElement, any>(
  ({ className, ...props }, ref) => {
    const [value, setValue] = React.useState<string>(props.value ?? "");

    const formatValue = (v: string): string => {
      const cleaned = v
        .replaceAll("$", "")
        .replaceAll(",", "")
        .replaceAll(".", "")
        .replaceAll(/^0+/g, "");
      const splitted = cleaned.split("");
      const intPart = splitted
        .slice(0, -2)
        .reverse()
        .map((s: string, index: number, arr: string[]) => {
          return (index + 1) % 3 == 0 && index + 1 < arr.length ? "," + s : s;
        })
        .reverse()
        .join("");
      const floatPart = splitted.slice(-2).join("");
      return `$${intPart.length > 0 ? intPart : "0"}.${floatPart}`;
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row items-center justify-center",
          "border border-[#bbb] rounded-md hover:border-black",
          "focus-visible:outline-[var(--color-viajero)] focus-visible:outline-2 -outline-offset-1"
        )}
      >
        {props.label && (
          <div className="text-nowrap mx-4 text-gray-600 text-md font-bold">
            {props.label}
          </div>
        )}
        <input
          type="text"
          onKeyDown={(e) => {
            if (e.key.length > 1) return;
            if (/^\d$/.test(e.key)) return;
            e.preventDefault();
          }}
          {...props}
          value={value != "$0." ? formatValue(value) : ""}
          onChange={(e) => {
            setValue(e.target.value);
            if (!props.onChange) return;
            props.onChange(formatValue(e.target.value));
          }}
          fill="outline"
          className={cn(
            "!flex !shadow-none w-full p-4 focus-visible:outline-none text-gray-600 text-center"
          )}
          placeholder={"$0.00"}
        />
      </div>
    );
  }
);
MoneyInput.displayName = "MoneyInput";

export {
  Input,
  MoneyInput,
  formatValue as formatMoneyValue,
  NumberInput,
  TimeInput,
};
