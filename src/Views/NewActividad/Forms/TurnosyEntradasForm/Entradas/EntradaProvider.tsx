import React from "react";
import { z, ZodObject, ZodSchema } from "zod";

const entradaSchema = z.object({
  nombre: z.string({ message: "El nombre es requerido" }),
  descripcion: z.string({ message: "La descripción es requerida" }),
});

type EntradaContext = {
  entrada: any;
  entradaSchema: ZodSchema<z.infer<typeof entradaSchema>>;
};

const EntradaContext = React.createContext<EntradaContext>(
  {} as EntradaContext
);

const EntradaProvider = ({ children }: { children: React.ReactNode }) => {
  const [entrada, setEntrada] = React.useState<any>();

  const context = {
    entrada,
    entradaSchema,
  };
  return (
    <EntradaContext.Provider value={context}>
      {children}
    </EntradaContext.Provider>
  );
};

const useEntrada = () => {
  const context = React.useContext(EntradaContext);
  if (!context)
    throw new Error(
      "useEntrada should be used within <EntradaContextProvider></EntradaContextProvider>"
    );

  return {
    ...context,
  };
};

export { EntradaProvider, useEntrada };
