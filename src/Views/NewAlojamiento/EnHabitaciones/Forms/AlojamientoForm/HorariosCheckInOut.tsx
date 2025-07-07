import { IonIcon } from "@ionic/react";
import { chevronUp, trash } from "ionicons/icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { THorariosCheckInCheckOut } from "../../../../../App/Alojamientos/NuevoAlojamiento";
import { Check, CheckSection } from "../../../../../components/ui/Check/Check";
import { cn } from "../../../../../components/ui/Form/Field";
import { TimeInput } from "../../../../../components/ui/Input/Input";
import { z } from "zod";
import {
  useAlojamientoEnHabitaciones,
} from "../../Provider/AlojamientoEnHabitacionesProvider";
import { useModal } from "../../../../../components/ui/Modal/Modal";
import { UseFormReturn } from "react-hook-form";
import { THorariosCheckInCheckOutContext } from "../../Provider/useAlojamiento";

const Row = ({
  index,
  handleEliminar,
  form,
  ...horario
}: THorariosCheckInCheckOutContext & {
  index: number;
  handleEliminar: (id_horario: string) => Promise<void>;
  form: UseFormReturn<any>;
}) => {
  const [errors, setErrors] = useState<string | undefined>();
  const { updateHorario } = useAlojamientoEnHabitaciones();

  useEffect(() => {
    setErrors(horario.errors ? horario.errors.join(". ") : "");
  }, [horario]);

  const handleAplicaTodos = () => {
    updateHorario(
      horario.id_horario,
      (prev: THorariosCheckInCheckOutContext) => {
        const copy = { ...prev };
        copy.aplica_todos_los_dias = !horario.aplica_todos_los_dias;
        return copy;
      }
    );
  };

  const handleCheckDay = (
    key: keyof THorariosCheckInCheckOutContext["dias_semana"]
  ) => {
    updateHorario(
      horario.id_horario,
      (prev: THorariosCheckInCheckOutContext) => {
        const copy = { ...prev };
        copy.dias_semana[key] = !horario.dias_semana[key];
        return copy;
      }
    );
  };

  const handleSetTime = (time: string, key: "check_in" | "check_out") => {
    updateHorario(
      horario.id_horario,
      (prev: THorariosCheckInCheckOutContext) => {
        const copy = { ...prev };

        if (key == "check_in") {
          copy.check_in.hora_check_in =
            time.split(":")[0] != "" ? Number(time.split(":")[0]) : -1;
          copy.check_in.minuto_check_in =
            time.split(":")[1] != "" ? Number(time.split(":")[1]) : -1;
          return copy;
        }

        copy.check_out.hora_check_out =
          time.split(":")[0] != "" ? Number(time.split(":")[0]) : -1;
        copy.check_out.minuto_check_out =
          time.split(":")[1] != "" ? Number(time.split(":")[1]) : -1;

        return copy;
      }
    );
  };

  const onEliminar = () => {
    handleEliminar(horario.id_horario);
  };

  return (
    <div className="grid grid-cols-14 gap-2">
      <div className="col-span-2 flex flex-col gap-2 mt-2">
        <TimeInput
          className="h-[42pt]"
          placeholder="00:00"
          onChange={(e: any) => handleSetTime(e.target.value, "check_in")}
          hora={horario.check_in.hora_check_in}
          minuto={horario.check_in.minuto_check_in}
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2 mt-2">
        <TimeInput
          className="h-[42pt]"
          placeholder="00:00"
          onChange={(e: any) => handleSetTime(e.target.value, "check_out")}
          hora={horario.check_out.hora_check_out}
          minuto={horario.check_out.minuto_check_out}
        />
      </div>
      <div className="col-span-9 flex flex-row gap-2 mt-2 w-full">
        <Check
          checked={
            horario.dias_semana.aplica_lunes || horario.aplica_todos_los_dias
          }
          className="h-[42pt]"
          onClick={() => handleCheckDay("aplica_lunes")}
        >
          L
        </Check>
        <Check
          checked={
            horario.dias_semana.aplica_martes || horario.aplica_todos_los_dias
          }
          className="h-[42pt]"
          onClick={() => handleCheckDay("aplica_martes")}
        >
          M
        </Check>
        <Check
          checked={
            horario.dias_semana.aplica_miercoles ||
            horario.aplica_todos_los_dias
          }
          className="h-[42pt]"
          onClick={() => handleCheckDay("aplica_miercoles")}
        >
          M
        </Check>
        <Check
          checked={
            horario.dias_semana.aplica_jueves || horario.aplica_todos_los_dias
          }
          className="h-[42pt]"
          onClick={() => handleCheckDay("aplica_jueves")}
        >
          J
        </Check>
        <Check
          checked={
            horario.dias_semana.aplica_viernes || horario.aplica_todos_los_dias
          }
          className="h-[42pt]"
          onClick={() => handleCheckDay("aplica_viernes")}
        >
          V
        </Check>
        <Check
          checked={
            horario.dias_semana.aplica_sabado || horario.aplica_todos_los_dias
          }
          className="h-[42pt]"
          onClick={() => handleCheckDay("aplica_sabado")}
        >
          S
        </Check>
        <Check
          checked={
            horario.dias_semana.aplica_domingo || horario.aplica_todos_los_dias
          }
          className="h-[42pt]"
          onClick={() => handleCheckDay("aplica_domingo")}
        >
          D
        </Check>
        <Check
          onClick={() => handleAplicaTodos()}
          checked={
            horario.aplica_todos_los_dias ||
            Object.values(horario.dias_semana).filter((v: boolean) => v)
              .length == 7
          }
          className="h-[42pt] w-full"
        >
          Todos
        </Check>
      </div>
      <div className="col-span-1 mt-2">
        <button
          className={cn(
            "viajero-button w-full! border bg-transparent! px-2 h-full text-red-400/50! text-xl! border-red-400/25!",
            "flex items-center content-center justify-center hover:shadow-none hover:bg-red-400/5! hover:border-red-400! hover:text-red-400!"
          )}
          onClick={(e) => {
            e.preventDefault();
            onEliminar();
          }}
        >
          <IonIcon icon={trash} />
        </button>
      </div>
      <div className="col-span-12 w-full pl-2 text-xs text-red-400">
        {errors && (
          <>
            <IonIcon icon={chevronUp} /> {errors}
          </>
        )}
      </div>
    </div>
  );
};

export default function HorariosCheckInOut({
  form,
}: {
  form: UseFormReturn<any>;
}) {
  const { idOferta, horarios, registrarHorario, eliminarHorario } =
    useAlojamientoEnHabitaciones();
  const { modal, setOpen } = useModal();

  const handleAgregar = () => {
    registrarHorario({ id_oferta: idOferta }).catch((error) => {
      modal({
        variant: "danger",
        title: "Error",
        description: error.message,
        actions: (
          <>
            <button
              onClick={() => setOpen(false)}
              className="viajero-button-ghost px-4 py-2"
            >
              Aceptar
            </button>
          </>
        ),
      });
    });
  };

  const handleEliminar = (id_horario: string) => {
    eliminarHorario(id_horario);
  };

  return (
    <div className="grid cols-12 w-full">
      <div className="flex flex-row items-center justify-between w-full p-4 gap-4 border border-gray-200 bg-gray-50 rounded-md">
        <div className="text-2xl text-gray-600 font-bold">
          Horarios de check-in y check-out
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAgregar();
          }}
          className="viajero-button px-4 py-2"
        >
          Agregar nuevo
        </button>
      </div>
      <div className="grid grid-cols-14 w-full mt-2 gap-2">
        <CheckSection label="Check-In" className="col-span-2 h-[42pt] text-lg" />
        <CheckSection label="Check-Out" className="col-span-2 h-[42pt] text-lg" />
        <CheckSection label="Días" className="col-span-9 h-[42pt] text-lg" />
        <CheckSection label="" className="col-span-1 h-[42pt] text-lg" />
      </div>
      {horarios.map(
        (horario: THorariosCheckInCheckOutContext, index: number) => (
          <Row
            key={index}
            index={index}
            handleEliminar={eliminarHorario}
            form={form}
            {...horario}
          />
        )
      )}
    </div>
  );
}
