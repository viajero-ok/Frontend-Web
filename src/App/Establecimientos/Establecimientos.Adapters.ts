import { z } from "zod";
import {
  EstablecimientoModel,
  ObtenerDatosRegistradosEstablecimientoSchema,
} from "./Establecimientos.Models";
import { BooleanValueObject } from "../ValueObjects";

export const adaptObtenerDatosRegistradosEstablecimiento = (
  response: z.infer<typeof ObtenerDatosRegistradosEstablecimientoSchema>
): EstablecimientoModel => ({
  ...response,
  sin_numero: new BooleanValueObject(response.sin_numero),
});
