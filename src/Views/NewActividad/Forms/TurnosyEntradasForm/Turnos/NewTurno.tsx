import { zodResolver } from "@hookform/resolvers/zod";
import { maskitoTimeOptionsGenerator } from "@maskito/kit";
import { useMaskito } from "@maskito/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodIssue } from "zod";
import { eliminarHorario } from "../../../../../App/Actividades/TurnosyHorarios";
import { Check } from "../../../../../components/ui/Check/Check";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../../components/ui/Form/Field";
import { Input, TimeInput } from "../../../../../components/ui/Input/Input";
import { useActividad } from "../../../Provider/ActividadProvider";
import { useToast } from "../../../../../components/ui/Toast/Toast";

const numeric = z.preprocess((val) => {
  if (typeof val === "string" && /^[0-9]+$/.test(val)) {
    return Number(val);
  } else if (typeof val === "string") {
    return undefined;
  }
  return val;
}, z.number({ message: "Debe ser un número" }).optional());

const formSchema = z.object({
  hora_inicio: z.number({ message: "La hora de inicio es requerida" }),
  minuto_inicio: z.number({ message: "La hora de inicio es requerida" }),
  hora_fin: z.number({ message: "La hora de finalización es requerida" }),
  minuto_fin: z.number({ message: "La hora de finalización es requerida" }),
  aplica_todos_los_dias: z.boolean(),
  aplica_lunes: z.boolean(),
  aplica_martes: z.boolean(),
  aplica_miercoles: z.boolean(),
  aplica_jueves: z.boolean(),
  aplica_viernes: z.boolean(),
  aplica_sabado: z.boolean(),
  aplica_domingo: z.boolean(),
  sin_cupo: z.boolean(),
  cupo_maximo: numeric,
});

export default function NewTurno({ cerrar }: { cerrar: () => void }) {
  const [errors, setErrors] = useState<any[]>([]);
  const [allDays, setAllDays] = useState<boolean>(false);

  const { idOferta, actualizarTurnosEntradas, agregarTurno } = useActividad();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      aplica_todos_los_dias: false,
      aplica_lunes: false,
      aplica_martes: false,
      aplica_miercoles: false,
      aplica_jueves: false,
      aplica_viernes: false,
      aplica_sabado: false,
      aplica_domingo: false,
      sin_cupo: false,
    },
  });

  const handleSetTime = (value: string, key: "inicio" | "fin") => {
    const hora = value.split(":")[0];
    const minuto = value.split(":")[1];
    form.setValue(key == "inicio" ? "hora_inicio" : "hora_fin", parseInt(hora));
    form.setValue(
      key == "inicio" ? "minuto_inicio" : "minuto_fin",
      parseInt(minuto)
    );
  };

  const selectAllDays = (value: boolean) => {
    form.setValue("aplica_todos_los_dias", value);
    setAllDays(value);
  };

  const selectDay = (
    value: boolean,
    key:
      | "aplica_lunes"
      | "aplica_martes"
      | "aplica_miercoles"
      | "aplica_jueves"
      | "aplica_viernes"
      | "aplica_sabado"
      | "aplica_domingo"
  ) => {
    form.setValue(key, value);
  };

  const handleAgregar = (values: z.infer<typeof formSchema>) => {
    if (
      !allDays &&
      !values.aplica_lunes &&
      !values.aplica_martes &&
      !values.aplica_miercoles &&
      !values.aplica_jueves &&
      !values.aplica_viernes &&
      !values.aplica_sabado &&
      !values.aplica_domingo
    ) {
      setErrors((prev: any[]) => [
        ...prev,
        { message: "El horario debe aplicar al menos para un día" },
      ]);
      return;
    }
    if (!values.sin_cupo && typeof values.cupo_maximo == "undefined") {
      setErrors((prev: any[]) => [
        ...prev,
        { message: "Si el turno es con cupo debe ingresarse el cupo máximo" },
      ]);
      return;
    }

    agregarTurno({
      id_oferta: idOferta,
      check_in: {
        hora_check_in: values.hora_inicio,
        minuto_check_in: values.minuto_inicio,
      },
      check_out: {
        hora_check_out: values.hora_fin,
        minuto_check_out: values.minuto_fin,
      },
      aplica_todos_los_dias: values.aplica_todos_los_dias,
      dias_semana: {
        aplica_lunes: values.aplica_lunes,
        aplica_martes: values.aplica_martes,
        aplica_miercoles: values.aplica_miercoles,
        aplica_jueves: values.aplica_jueves,
        aplica_viernes: values.aplica_viernes,
        aplica_sabado: values.aplica_sabado,
        aplica_domingo: values.aplica_domingo,
      },
      cupo_maximo: values.cupo_maximo ?? 0,
      bl_sin_cupo: values.sin_cupo,
    })
      .then(() => {
        toast({
          variant: "success",
          title: "Turno creado.",
        });
        actualizarTurnosEntradas();
        cerrar();
      })
      .catch(() => {
        toast({
          variant: "success",
          title: "Error al crear el turno, intente nuevamente.",
        });
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAgregar)}
        className="grid grid-cols-10 w-full gap-2"
      >
        <div className="col-span-1">
          <div className="flex flex-col gap-2">
            <TimeInput
              className="h-[42pt]"
              placeholder="00:00"
              set={(value: string) => handleSetTime(value, "inicio")}
              hora={form.getValues().hora_inicio}
              minuto={form.getValues().minuto_inicio}
            />
            <TimeInput
              className="h-[42pt]"
              placeholder="00:00"
              set={(value: string) => handleSetTime(value, "fin")}
              hora={form.getValues().hora_fin}
              minuto={form.getValues().minuto_fin}
            />
          </div>
        </div>
        <div className="col-span-6 flex flex-col justify-center gap-2">
          <Check
            className=" h-[42pt]"
            onChange={(v: boolean) => selectAllDays(v)}
          >
            Aplica todos los días
          </Check>
          <div className="flex flex-row gap-2 justify-center">
            <Check
              checked={form.getValues().aplica_lunes || allDays}
              className="w-full h-[42pt]"
              onChange={(v: boolean) => selectDay(v, "aplica_lunes")}
            >
              L
            </Check>
            <Check
              checked={
                form.getValues().aplica_martes ||
                form.getValues().aplica_todos_los_dias
              }
              className="w-full h-[42pt]"
              onChange={(v: boolean) => selectDay(v, "aplica_martes")}
            >
              M
            </Check>
            <Check
              checked={
                form.getValues().aplica_miercoles ||
                form.getValues().aplica_todos_los_dias
              }
              className="w-full h-[42pt]"
              onChange={(v: boolean) => selectDay(v, "aplica_miercoles")}
            >
              M
            </Check>
            <Check
              checked={
                form.getValues().aplica_jueves ||
                form.getValues().aplica_todos_los_dias
              }
              className="w-full h-[42pt]"
              onChange={(v: boolean) => selectDay(v, "aplica_jueves")}
            >
              J
            </Check>
            <Check
              checked={
                form.getValues().aplica_viernes ||
                form.getValues().aplica_todos_los_dias
              }
              className="w-full h-[42pt]"
              onChange={(v: boolean) => selectDay(v, "aplica_viernes")}
            >
              V
            </Check>
            <Check
              checked={
                form.getValues().aplica_sabado ||
                form.getValues().aplica_todos_los_dias
              }
              className="w-full h-[42pt]"
              onChange={(v: boolean) => selectDay(v, "aplica_sabado")}
            >
              S
            </Check>
            <Check
              checked={
                form.getValues().aplica_domingo ||
                form.getValues().aplica_todos_los_dias
              }
              className="w-full h-[42pt]"
              onChange={(v: boolean) => selectDay(v, "aplica_domingo")}
            >
              D
            </Check>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <Check
            checked={form.getValues().sin_cupo}
            onChange={(v: boolean) => {
              form.setValue("sin_cupo", v);
              form.setValue("cupo_maximo", undefined);
            }}
            className="h-[42pt]"
          >
            Sin cupo
          </Check>
          <FormField
            control={form.control}
            name="cupo_maximo"
            render={({ field }) => (
              <FormItem className="w-full h-[42pt]">
                <FormControl>
                  <Input placeholder="Cupo máximo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          {/* <IonButton color="danger" onClick={() => handleEliminar()}>
            <IonIcon icon={trash} />
          </IonButton> */}
          <button
            onClick={(e) => {
              e.preventDefault();
              cerrar();
            }}
            className="viajero-button-ghost px-4 py-2 h-full items-center"
          >
            Cancelar
          </button>
          <button
            onClick={() =>
              setErrors(
                formSchema.safeParse(form.getValues()).error?.errors ?? []
              )
            }
            className="viajero-button px-4 py-2 h-full items-center"
          >
            Agregar
          </button>
        </div>
      </form>
      <div className="flex flex-row w-full text-xs text-red-400 mr-4 justify-end">
        {[...new Set(errors.map((error: ZodIssue) => error.message))].join(
          ". "
        )}
      </div>
    </Form>
  );
}
