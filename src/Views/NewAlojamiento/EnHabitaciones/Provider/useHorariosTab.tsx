import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  actualizarHorarioAlojamiento,
  eliminarHorarioAlojamiento,
  obtenerHorariosRegistradosAlojamiento,
  registrarHorarioAlojamiento,
  TBodyActualizarHorarioAlojamiento,
  TBodyRegistrarHorarioAlojamiento,
} from "../../../../App/Alojamientos/NuevoAlojamiento";

export type HorarioTabContextValue = {
  horarioSchema: typeof horarioSchema;
  horariosFormSchema: typeof horariosFormSchema;
  horariosForm: UseFormReturn<z.infer<typeof horariosFormSchema>>;
  horarios: any[];
  actualizarHorarios: () => void;
  agregarHorario: (body: TBodyRegistrarHorarioAlojamiento) => Promise<any>;
  modificarHorario: (body: TBodyActualizarHorarioAlojamiento) => Promise<any>;
  eliminarHorario: (idHorario: number) => Promise<void>;
};

const horarioSchema = z.object({
  hora_check_in: z
    .number({ message: "El horario de Check-In es requerido" })
    .min(0, "El horario de Check-In debe ser en el formato HH:MM")
    .max(23, "El horario de Check-In debe ser en el formato HH:MM"),
  minuto_check_in: z
    .number({ message: "El horario de Check-In es requerido" })
    .min(0, "El horario de Check-In debe ser en el formato HH:MM")
    .max(59, "El horario de Check-In debe ser en el formato HH:MM"),
  hora_check_out: z
    .number({ message: "El horario de Check-Out es requerido" })
    .min(0, "El horario de Check-Out debe ser en el formato HH:MM")
    .max(23, "El horario de Check-Out debe ser en el formato HH:MM"),
  minuto_check_out: z
    .number({ message: "El horario de Check-Out es requerido" })
    .min(0, "El horario de Check-Out debe ser en el formato HH:MM")
    .max(59, "El horario de Check-Out debe ser en el formato HH:MM"),
  algun_dia: z.boolean().refine((val) => val === true, {
    message: "Al menos un día debe ser seleccionado",
  }),
});
const horariosFormSchema = z.object({
  horarios: z.array(horarioSchema, { message: "required" }),
});

const useHorariosTab = ({ idOferta }: { idOferta: string }) => {
  const [horarios, setHorarios] = React.useState<any[]>([]);

  const horariosForm = useForm<z.infer<typeof horariosFormSchema>>({
    resolver: zodResolver(horariosFormSchema),
    mode: "onSubmit",
  });
  const formWatch = horariosForm.watch();

  const actualizarHorarios = () => {
    obtenerHorariosRegistradosAlojamiento(idOferta)
      .then((response) => {
        console.log("response: ", response.data);
        setHorarios(response.data.result);
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    actualizarHorarios();
  }, []);

  const agregarHorario = async (body: TBodyRegistrarHorarioAlojamiento) => {
    try {
      return await registrarHorarioAlojamiento(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const modificarHorario = async (body: TBodyActualizarHorarioAlojamiento) => {
    try {
      return await actualizarHorarioAlojamiento(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const eliminarHorario = async (idHorario: number) => {
    try {
      await eliminarHorarioAlojamiento(idHorario);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const context: HorarioTabContextValue = {
    horarioSchema,
    horariosFormSchema,
    horariosForm,
    horarios,
    actualizarHorarios,
    agregarHorario,
    modificarHorario,
    eliminarHorario,
  };
  return context;
};

export { useHorariosTab };
