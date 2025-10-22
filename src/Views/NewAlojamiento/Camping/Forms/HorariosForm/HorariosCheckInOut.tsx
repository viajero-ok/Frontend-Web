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
import {
  formatTime,
  TimeInput,
} from "../../../../../components/ui/Input/Input";
import { useModal } from "../../../../../components/ui/Modal/Modal";
import { THorariosCheckInCheckOutContext } from "../../Provider/useCampingTab";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../../../components/ui/Toast/Toast";
import { useAlojamientoCamping } from "../../Provider/CampingProvider";


type DiasSemanaKey = keyof z.infer<typeof crearHorarioSchema.shape.dias_semana>;

const Row = ({
  index,
  handleEliminar,
  form,
  ...horario
}: any & {
  index: number;
  handleEliminar: (id_horario: string) => Promise<void>;
  form: UseFormReturn<any>;
}) => {
  const [editar, setEditar] = useState<boolean>(false);
  //const { updateHorario } = useAlojamientoEnHabitaciones();

  const { idOferta, eliminarHorario, modificarHorario, actualizarHorarios } =
    useAlojamientoCamping();
  const { toast } = useToast();

  const onEliminar = () => {
    eliminarHorario(horario.id_horario)
      .then(() => {
        toast({
          variant: "success",
          title: "Horario eliminado exitosamente.",
        });
        actualizarHorarios();
      })
      .catch(() => {
        toast({
          variant: "danger",
          title: "Error al intentar elimiinar el horario. Intente nuevamente.",
        });
      });
  };

  const editarHorarioForm = useForm<z.infer<typeof crearHorarioSchema>>({
    resolver: zodResolver(crearHorarioSchema),
    mode: "onSubmit",
    defaultValues: {
      check_in: `${formatTime(Number(horario.check_in_hora))}:${formatTime(
        Number(horario.check_in_minuto)
      )}`,
      check_out: `${formatTime(Number(horario.check_out_hora))}:${formatTime(
        Number(horario.check_out_minuto)
      )}`,
      dias_semana: {
        aplica_lunes: horario.aplica_lunes == 1,
        aplica_martes: horario.aplica_martes == 1,
        aplica_miercoles: horario.aplica_miercoles == 1,
        aplica_jueves: horario.aplica_jueves == 1,
        aplica_viernes: horario.aplica_viernes == 1,
        aplica_sabado: horario.aplica_sabado == 1,
        aplica_domingo: horario.aplica_domingo == 1,
      },
      aplica_todos_los_dias: horario.aplica_todos_los_dias ?? false,
    },
  });
  const formWatch = editarHorarioForm.watch();

  const handleCheckDay = (nestedKey: DiasSemanaKey) => {
    const key = `dias_semana.${nestedKey}` as `dias_semana.${DiasSemanaKey}`;
    editarHorarioForm.setValue(
      key,
      !editarHorarioForm.getValues().dias_semana[
        key.split(".")[1] as DiasSemanaKey
      ]
    );
  };

  const handleAplicaTodos = () => {
    const prev = editarHorarioForm.getValues().aplica_todos_los_dias;
    editarHorarioForm.setValue("dias_semana.aplica_lunes", !prev);
    editarHorarioForm.setValue("dias_semana.aplica_martes", !prev);
    editarHorarioForm.setValue("dias_semana.aplica_miercoles", !prev);
    editarHorarioForm.setValue("dias_semana.aplica_jueves", !prev);
    editarHorarioForm.setValue("dias_semana.aplica_viernes", !prev);
    editarHorarioForm.setValue("dias_semana.aplica_sabado", !prev);
    editarHorarioForm.setValue("dias_semana.aplica_domingo", !prev);
    editarHorarioForm.setValue("aplica_todos_los_dias", !prev);
  };

  const handleModificar = (values: z.infer<typeof crearHorarioSchema>) => {
    modificarHorario({
      id_oferta: idOferta,
      id_horario: horario.id_horario,
      check_in: {
        hora_check_in: Number(values.check_in.split(":")[0]),
        minuto_check_in: Number(values.check_in.split(":")[1]),
      },
      check_out: {
        hora_check_out: Number(values.check_out.split(":")[0]),
        minuto_check_out: Number(values.check_out.split(":")[1]),
      },
      dias_semana: values.dias_semana,
      aplica_todos_los_dias: values.aplica_todos_los_dias,
    })
      .then(() => {
        setEditar(false);
        actualizarHorarios();
        toast({
          variant: "success",
          title: "Horario modificado exitosamente.",
        });
      })
      .catch((error) => {
        toast({
          variant: "danger",
          title: "Error al intentar modificar el horario. Intente nuevamente.",
        });
      });
  };

  return (
    <Form {...editarHorarioForm}>
      <form onSubmit={editarHorarioForm.handleSubmit(handleModificar)}>
        <div className="grid grid-cols-11 gap-2">
          <div className="col-span-1 flex flex-col gap-2 mt-2">
            <FormField
              control={editarHorarioForm.control}
              name="check_in"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TimeInput
                      reset={!editar}
                      hora={horario.check_in_hora}
                      minuto={horario.check_in_minuto}
                      disabled={!editar}
                      className="h-[42pt]"
                      placeholder="00:00"
                      set={(time: string) =>
                        editarHorarioForm.setValue("check_in", time)
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
              control={editarHorarioForm.control}
              name="check_out"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TimeInput
                      reset={!editar}
                      hora={horario.check_out_hora}
                      minuto={horario.check_out_minuto}
                      disabled={!editar}
                      className="h-[42pt]"
                      placeholder="00:00"
                      set={(time: string) =>
                        editarHorarioForm.setValue("check_out", time)
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
              control={editarHorarioForm.control}
              name="dias_semana"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormControl>
                    <div className="flex flex-row gap-2 w-full">
                      <Check
                        disabled={!editar}
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
                        disabled={!editar}
                        checked={
                          editarHorarioForm.watch().dias_semana
                            ?.aplica_martes ||
                          editarHorarioForm.watch().aplica_todos_los_dias
                        }
                        className="h-[42pt]"
                        onClick={() => handleCheckDay("aplica_martes")}
                      >
                        M
                      </Check>
                      <Check
                        disabled={!editar}
                        checked={
                          editarHorarioForm.watch().dias_semana
                            ?.aplica_miercoles ||
                          editarHorarioForm.watch().aplica_todos_los_dias
                        }
                        className="h-[42pt]"
                        onClick={() => handleCheckDay("aplica_miercoles")}
                      >
                        M
                      </Check>
                      <Check
                        disabled={!editar}
                        checked={
                          editarHorarioForm.watch().dias_semana
                            ?.aplica_jueves ||
                          editarHorarioForm.watch().aplica_todos_los_dias
                        }
                        className="h-[42pt]"
                        onClick={() => handleCheckDay("aplica_jueves")}
                      >
                        J
                      </Check>
                      <Check
                        disabled={!editar}
                        checked={
                          formWatch.dias_semana?.aplica_viernes ||
                          formWatch.aplica_todos_los_dias
                        }
                        className="h-[42pt]"
                        onClick={() => handleCheckDay("aplica_viernes")}
                      >
                        V
                      </Check>
                      <Check
                        disabled={!editar}
                        checked={
                          formWatch.dias_semana?.aplica_sabado ||
                          formWatch.aplica_todos_los_dias
                        }
                        className="h-[42pt]"
                        onClick={() => handleCheckDay("aplica_sabado")}
                      >
                        S
                      </Check>
                      <Check
                        disabled={!editar}
                        checked={
                          formWatch.dias_semana?.aplica_domingo ||
                          formWatch.aplica_todos_los_dias
                        }
                        className="h-[42pt]"
                        onClick={() => handleCheckDay("aplica_domingo")}
                      >
                        D
                      </Check>
                      <Check
                        disabled={!editar}
                        onClick={() => handleAplicaTodos()}
                        checked={
                          formWatch.aplica_todos_los_dias ||
                          formWatch.dias_semana
                            ? Object.keys(formWatch.dias_semana).filter(
                                (key: string) =>
                                  !formWatch.dias_semana[key as DiasSemanaKey]
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
          {!editar ? (
            <div className="col-span-2 mt-2 flex flex-row gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditar(true);
                }}
                className="viajero-button-ghost w-full h-[42pt] flex items-center"
              >
                Editar
              </button>
              <button
                className={cn(
                  "viajero-button w-full! h-[42pt] flex items-center",
                  "bg-red-400! hover:border-red-400/90!"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  onEliminar();
                }}
              >
                Eliminar
              </button>
            </div>
          ) : (
            <div className="col-span-2 mt-2 flex flex-row gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditar(false);
                  editarHorarioForm.reset();
                }}
                className="viajero-button-ghost w-full h-[42pt] flex items-center"
              >
                Cancelar
              </button>
              <button
                className={cn(
                  "viajero-button w-full! h-[42pt] flex items-center"
                )}
                type="submit"
              >
                Guardar
              </button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

const crearHorarioSchema = z.object({
  check_in: z
    .string({ message: "El campo es requerido" })
    .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: "Hora inválida",
    }),
  check_out: z
    .string({ message: "El campo es requerido" })
    .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: "Hora inválida",
    }),
  dias_semana: z
    .object({
      aplica_lunes: z.boolean(),
      aplica_martes: z.boolean(),
      aplica_miercoles: z.boolean(),
      aplica_jueves: z.boolean(),
      aplica_viernes: z.boolean(),
      aplica_sabado: z.boolean(),
      aplica_domingo: z.boolean(),
    })
    .refine(
      (dias) =>
        dias.aplica_lunes ||
        dias.aplica_martes ||
        dias.aplica_miercoles ||
        dias.aplica_jueves ||
        dias.aplica_viernes ||
        dias.aplica_sabado ||
        dias.aplica_domingo,
      {
        message: "El horario debe aplicar para al menos un día",
      }
    ),
  aplica_todos_los_dias: z.boolean().default(false),
});

export default function HorariosCheckInOut() {
  const [agregar, setAgregar] = useState<boolean>(false);

  const {
    idOferta,
    horarioSchema,
    horariosForm,
    horarios,
    actualizarHorarios,
    agregarHorario,
  } = useAlojamientoCamping();
  const form = horariosForm;
  const { modal, setOpen } = useModal();

  const handleAgregar = (values: z.infer<typeof crearHorarioSchema>) => {
    agregarHorario({
      id_oferta: idOferta,
      check_in: {
        hora_check_in: Number(values.check_in.split(":")[0]),
        minuto_check_in: Number(values.check_in.split(":")[1]),
      },
      check_out: {
        hora_check_out: Number(values.check_out.split(":")[0]),
        minuto_check_out: Number(values.check_out.split(":")[1]),
      },
      dias_semana: values.dias_semana,
      aplica_todos_los_dias: values.aplica_todos_los_dias,
    })
      .then(() => {
        setAgregar(false);
        crearHorarioForm.reset();
        actualizarHorarios();
      })
      .catch((error) => {
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
    //eliminarHorario(id_horario);
  };

  const crearHorarioForm = useForm<z.infer<typeof crearHorarioSchema>>({
    resolver: zodResolver(crearHorarioSchema),
    mode: "onSubmit",
    defaultValues: {
      dias_semana: {
        aplica_lunes: false,
        aplica_martes: false,
        aplica_miercoles: false,
        aplica_jueves: false,
        aplica_viernes: false,
        aplica_sabado: false,
        aplica_domingo: false,
      },
    },
  });
  const formWatch = crearHorarioForm.watch();

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
        <CheckSection label="In" className="col-span-1 h-[42pt] text-lg" />
        <CheckSection label="Out" className="col-span-1 h-[42pt] text-lg" />
        <CheckSection label="Días" className="col-span-7 h-[42pt] text-lg" />
        <CheckSection
          label="Acciones"
          className="col-span-2 h-[42pt] text-lg"
        />
      </div>
      {agregar && (
        <Form {...crearHorarioForm}>
          <form onSubmit={crearHorarioForm.handleSubmit(handleAgregar)}>
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
                  name="check_out"
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
                    <FormItem className="flex flex-col w-full">
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

              <div className="col-span-2 flex flex-row gap-2 mt-2 w-full h-[42pt]">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setAgregar(false);
                    crearHorarioForm.reset();
                  }}
                  className="viajero-button-ghost px-4 py-2 h-full items-center"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="viajero-button h-full w-full flex items-center"
                >
                  Agregar
                </button>
              </div>
            </div>
          </form>
        </Form>
      )}
      {horarios.map((horario: any, index: number) => (
        <Row
          key={index}
          index={index}
          handleEliminar={() => {}}
          form={form}
          {...horario}
        />
      ))}
    </div>
  );
}
