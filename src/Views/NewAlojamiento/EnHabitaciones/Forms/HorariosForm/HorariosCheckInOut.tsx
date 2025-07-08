import { IonIcon } from "@ionic/react";
import { chevronUp, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { Check, CheckSection } from "../../../../../components/ui/Check/Check";
import {
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../../components/ui/Form/Field";
import { TimeInput } from "../../../../../components/ui/Input/Input";
import { useModal } from "../../../../../components/ui/Modal/Modal";
import { useAlojamientoEnHabitaciones } from "../../Provider/AlojamientoEnHabitacionesProvider";
import { THorariosCheckInCheckOutContext } from "../../Provider/useAlojamientoTab";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  //const { updateHorario } = useAlojamientoEnHabitaciones();

  useEffect(() => {
    setErrors(horario.errors ? horario.errors.join(". ") : "");
  }, [horario]);

  const handleAplicaTodos = () => {
    // updateHorario(
    //   horario.id_horario,
    //   (prev: THorariosCheckInCheckOutContext) => {
    //     const copy = { ...prev };
    //     copy.aplica_todos_los_dias = !horario.aplica_todos_los_dias;
    //     return copy;
    //   }
    // );
  };

  const handleCheckDay = (
    key: keyof THorariosCheckInCheckOutContext["dias_semana"]
  ) => {
    // updateHorario(
    //   horario.id_horario,
    //   (prev: THorariosCheckInCheckOutContext) => {
    //     const copy = { ...prev };
    //     copy.dias_semana[key] = !horario.dias_semana[key];
    //     return copy;
    //   }
    // );
  };

  const handleSetTime = (time: string, key: "check_in" | "check_out") => {
    // updateHorario(
    //   horario.id_horario,
    //   (prev: THorariosCheckInCheckOutContext) => {
    //     const copy = { ...prev };
    //     if (key == "check_in") {
    //       copy.check_in.hora_check_in =
    //         time.split(":")[0] != "" ? Number(time.split(":")[0]) : -1;
    //       copy.check_in.minuto_check_in =
    //         time.split(":")[1] != "" ? Number(time.split(":")[1]) : -1;
    //       return copy;
    //     }
    //     copy.check_out.hora_check_out =
    //       time.split(":")[0] != "" ? Number(time.split(":")[0]) : -1;
    //     copy.check_out.minuto_check_out =
    //       time.split(":")[1] != "" ? Number(time.split(":")[1]) : -1;
    //     return copy;
    //   }
    // );
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

const crearHorarioSchema = z.object({
  check_in: z.string(),
  check_out: z.string(),
  dias_semana: z.object({
    aplica_lunes: z.boolean(),
    aplica_martes: z.boolean(),
    aplica_miercoles: z.boolean(),
    aplica_jueves: z.boolean(),
    aplica_viernes: z.boolean(),
    aplica_sabado: z.boolean(),
    aplica_domingo: z.boolean(),
  }),
  aplica_todos_los_dias: z.boolean(),
});

export default function HorariosCheckInOut() {
  const [agregar, setAgregar] = useState<boolean>(false);

  const { idOferta, horarioSchema, horariosForm } =
    useAlojamientoEnHabitaciones();
  const form = horariosForm;
  const { modal, setOpen } = useModal();

  const handleAgregar = () => {
    // registrarHorario({ id_oferta: idOferta }).catch((error) => {
    //   modal({
    //     variant: "danger",
    //     title: "Error",
    //     description: error.message,
    //     actions: (
    //       <>
    //         <button
    //           onClick={() => setOpen(false)}
    //           className="viajero-button-ghost px-4 py-2"
    //         >
    //           Aceptar
    //         </button>
    //       </>
    //     ),
    //   });
    // });
  };

  const handleEliminar = (id_horario: string) => {
    //eliminarHorario(id_horario);
  };

  const crearHorarioForm = useForm<z.infer<typeof crearHorarioSchema>>({
    resolver: zodResolver(crearHorarioSchema),
    mode: "onSubmit",
  });
  const formWatch = crearHorarioForm.watch();

  type DiasSemanaKey = keyof z.infer<
    typeof crearHorarioSchema.shape.dias_semana
  >;
  const handleCheckDay = (nestedKey: DiasSemanaKey) => {
    const key = `dias_semana.${nestedKey}` as `dias_semana.${DiasSemanaKey}`;
    crearHorarioForm.setValue(
      key,
      !crearHorarioForm.getValues().dias_semana[
        key.split(".")[1] as DiasSemanaKey
      ]
    );
  };

  const handleAplicaTodos = () => {
    const prev = crearHorarioForm.getValues().aplica_todos_los_dias;
    crearHorarioForm.setValue("dias_semana.aplica_lunes", !prev);
    crearHorarioForm.setValue("dias_semana.aplica_martes", !prev);
    crearHorarioForm.setValue("dias_semana.aplica_miercoles", !prev);
    crearHorarioForm.setValue("dias_semana.aplica_jueves", !prev);
    crearHorarioForm.setValue("dias_semana.aplica_viernes", !prev);
    crearHorarioForm.setValue("dias_semana.aplica_sabado", !prev);
    crearHorarioForm.setValue("dias_semana.aplica_domingo", !prev);
    crearHorarioForm.setValue("aplica_todos_los_dias", !prev);
  };

  return (
    <div className="grid cols-11 w-full">
      <div className="flex flex-row items-center justify-between w-full p-4 gap-4 border border-gray-200 bg-gray-50 rounded-md">
        <div className="text-gray-600 text-2xl font-bold">
          Horarios de Check-In y Check-Out
        </div>
        <button
          onClick={() => {
            setAgregar(true);
          }}
          className="viajero-button px-4 py-2 disabled:bg-gray-200! disabled:cursor-default! disabled:shadow-none!"
          disabled={agregar}
        >
          Agregar nuevo
        </button>
      </div>
      <div className="grid grid-cols-11 w-full mt-2 gap-2">
        <CheckSection
          label="In"
          className="col-span-1 h-[42pt] text-lg"
        />
        <CheckSection
          label="Out"
          className="col-span-1 h-[42pt] text-lg"
        />
        <CheckSection label="Días" className="col-span-7 h-[42pt] text-lg" />
        <CheckSection label="Acciones" className="col-span-2 h-[42pt] text-lg" />
      </div>
      {agregar && (
        <Form {...crearHorarioForm}>
          <form onSubmit={crearHorarioForm.handleSubmit(() => {})}>
            <div className="grid grid-cols-11 gap-2">
              <div className="col-span-1 flex flex-col gap-2 mt-2">
                <FormField
                  control={crearHorarioForm.control}
                  name="check_in"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TimeInput
                          className="h-[42pt]"
                          placeholder="00:00"
                          set={(time: string) =>
                            crearHorarioForm.setValue("check_in", time)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1 flex flex-col gap-2 mt-2">
                <FormField
                  control={crearHorarioForm.control}
                  name="check_in"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TimeInput
                          className="h-[42pt]"
                          placeholder="00:00"
                          set={(time: string) =>
                            crearHorarioForm.setValue("check_out", time)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-7 flex flex-row mt-2 w-full">
                <FormField
                  control={crearHorarioForm.control}
                  name="dias_semana"
                  render={({ field }) => (
                    <FormItem className="flex flex-row w-full">
                      <FormControl>
                        <div className="flex flex-row gap-2 w-full">
                          <Check
                            checked={
                              formWatch.dias_semana?.aplica_lunes ||
                              formWatch.aplica_todos_los_dias
                            }
                            className="h-[42pt]"
                            onClick={() => handleCheckDay("aplica_lunes")}
                          >
                            L
                          </Check>
                          <Check
                            checked={
                              crearHorarioForm.watch().dias_semana
                                ?.aplica_martes ||
                              crearHorarioForm.watch().aplica_todos_los_dias
                            }
                            className="h-[42pt]"
                            onClick={() => handleCheckDay("aplica_martes")}
                          >
                            M
                          </Check>
                          <Check
                            checked={
                              crearHorarioForm.watch().dias_semana
                                ?.aplica_miercoles ||
                              crearHorarioForm.watch().aplica_todos_los_dias
                            }
                            className="h-[42pt]"
                            onClick={() => handleCheckDay("aplica_miercoles")}
                          >
                            M
                          </Check>
                          <Check
                            checked={
                              crearHorarioForm.watch().dias_semana
                                ?.aplica_jueves ||
                              crearHorarioForm.watch().aplica_todos_los_dias
                            }
                            className="h-[42pt]"
                            onClick={() => handleCheckDay("aplica_jueves")}
                          >
                            J
                          </Check>
                          <Check
                            checked={
                              crearHorarioForm.watch().dias_semana
                                ?.aplica_viernes ||
                              crearHorarioForm.watch().aplica_todos_los_dias
                            }
                            className="h-[42pt]"
                            onClick={() => handleCheckDay("aplica_viernes")}
                          >
                            V
                          </Check>
                          <Check
                            checked={
                              crearHorarioForm.watch().dias_semana
                                ?.aplica_sabado ||
                              crearHorarioForm.watch().aplica_todos_los_dias
                            }
                            className="h-[42pt]"
                            onClick={() => handleCheckDay("aplica_sabado")}
                          >
                            S
                          </Check>
                          <Check
                            checked={
                              crearHorarioForm.watch().dias_semana
                                ?.aplica_domingo ||
                              crearHorarioForm.watch().aplica_todos_los_dias
                            }
                            className="h-[42pt]"
                            onClick={() => handleCheckDay("aplica_domingo")}
                          >
                            D
                          </Check>
                          <Check
                            onClick={() => handleAplicaTodos()}
                            checked={
                              formWatch.aplica_todos_los_dias ||
                              formWatch.dias_semana
                                ? Object.keys(formWatch.dias_semana).filter(
                                    (key: string) =>
                                      !formWatch.dias_semana[
                                        key as DiasSemanaKey
                                      ]
                                  ).length == 0
                                : false
                            }
                            className="h-[42pt] w-full"
                          >
                            Todos
                          </Check>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 flex flex-row gap-2 mt-2 w-full">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setAgregar(false);
                  }}
                  className="viajero-button-ghost px-4 py-2 h-full items-center"
                >
                  Cancelar
                </button>
                <button className="viajero-button h-full w-full flex items-center">
                  Agregar
                </button>
              </div>
            </div>
          </form>
        </Form>
      )}
      {/* {horarios.map(
        (horario: THorariosCheckInCheckOutContext, index: number) => (
          <Row
            key={index}
            index={index}
            handleEliminar={eliminarHorario}
            form={form}
            {...horario}
          />
        )
      )} */}
    </div>
  );
}
