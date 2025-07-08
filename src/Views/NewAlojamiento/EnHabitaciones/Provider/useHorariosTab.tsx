import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type HorarioTabContextValue = {
  horarioSchema: typeof horarioSchema;
  horariosFormSchema: typeof horariosFormSchema;
  horariosForm: UseFormReturn<z.infer<typeof horariosFormSchema>>;
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
  horarios: z.array(horarioSchema, {message: "required"}),
});

const useHorariosTab = ({ idOferta }: { idOferta: string }) => {
  const horariosForm = useForm<z.infer<typeof horariosFormSchema>>({
    resolver: zodResolver(horariosFormSchema),
    mode: "onSubmit",
  });
  const formWatch = horariosForm.watch();

  const context: HorarioTabContextValue = {
    horarioSchema,
    horariosFormSchema,
    horariosForm,
  };
  return context;
};

export { useHorariosTab };
