import { z } from "zod";
import { BooleanValueObject } from "../ValueObjects";

export const ObtenerDatosRegistradosEstablecimientoSchema = z.object({
  nombre: z
    .string({ message: "El campo es requerido" })
    .min(3, "Mínimo 3 caracteres")
    .max(100, "Máximo 100 caracteres"),
  numero_habilitacion: z.string({ message: "El campo es requerido" }),
  descripcion: z
    .string({ message: "El campo es requerido" })
    .min(10, "Mínimo 10 caracteres")
    .max(250, "Máximo 250 caracteres"),
  telefono: z
    .string({ message: "El campo es requerido" })
    .length(11, "Debe tener 11 digitos")
    .regex(/^[0-9]+$/, "Debe contener solo dígitos"),
  mail: z
    .string({ message: "El campo es requerido" })
    .email("El formato de email es incorrecto"),
  calle: z.string({ message: "El campo es requerido" }),
  sin_numero: z.union([z.literal("0"), z.literal("1")]),
  numero: z.string(),
  id_localidad: z.number({ message: "El campo es requerido" }),
  id_departamento: z.number({ message: "El campo es requerido" }),
  id_provincia: z.number({ message: "El campo es requerido" }),
  latitud: z.string({ message: "El campo es requerido" }),
  longitud: z.string({ message: "El campo es requerido" }),
});

export type EstablecimientoModel = {
  nombre: string;
  numero_habilitacion: string;
  descripcion: string;
  telefono: string;
  mail: string;
  calle: string;
  sin_numero: BooleanValueObject;
  numero: string;
  id_localidad: number;
  id_departamento: number;
  id_provincia: number;
  latitud: string;
  longitud: string;
};
