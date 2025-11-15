import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/Form/Field";
import {
  Input,
  MoneyInput,
  TimeInput,
} from "../../../../components/ui/Input/Input";
import { useEvento } from "../../Provider/EventoProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "../../../../components/ui/Check/Check";
import { Save } from "lucide-react";
import { useState } from "react";
import { DatePicker } from "../../../../components/ui/DatePicker/DatePicker";

const TipoDeEntrada = (props: { new?: boolean; cancelar: () => void }) => {
  const { entradaSchema } = useEvento();

  const form = useForm<z.infer<typeof entradaSchema>>({
    resolver: zodResolver(entradaSchema),
    mode: "onSubmit",
  });

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {})}
          className="grid grid-cols-4 gap-2"
        >
          <FormField
            control={form.control}
            name="nombre_entrada"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="incluye"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="¿Qué incluye?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-2">
            <FormField
              control={form.control}
              name="precio"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <MoneyInput placeholder="Precio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Check>Sin precio</Check>
          </div>
          <div className="flex flex-row gap-2 w-full">
            <button className="viajero-button p-4 w-full">Registrar</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                props.cancelar();
              }}
              className="viajero-button-ghost p-4"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default function HorarioEntradasForm() {
  const [nuevaEntrada, setNuevaEntrada] = useState<boolean>(false);

  const { horarioSchema, horarioForm } = useEvento();
  const form = horarioForm;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center gap-2">
        <span className="text-gray-600 font-bold text-xl border border-gray-200 bg-gray-50 p-4 rounded-md w-full">
          Tipos de entradas
        </span>
        <button
          onClick={() => setNuevaEntrada(true)}
          className="viajero-button p-4 text-nowrap"
          disabled={nuevaEntrada}
        >
          Nueva entrada
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 ">
        <div className="border border-gray-200 bg-gray-50 text-lg font-bold text-gray-600 p-4 rounded-md">
          Nombre
        </div>
        <div className="border border-gray-200 bg-gray-50 text-lg font-bold text-gray-600 p-4 rounded-md">
          ¿Qué incluye?
        </div>
        <div className="border border-gray-200 bg-gray-50 text-lg font-bold text-gray-600 p-4 rounded-md">
          Precio
        </div>
        <div className="border border-gray-200 bg-gray-50 text-lg font-bold text-gray-600 p-4 rounded-md w-full h-full"></div>
      </div>
      {nuevaEntrada && (
        <TipoDeEntrada new cancelar={() => setNuevaEntrada(false)} />
      )}
      {[].map(() => (
        <></>
      ))}{" "}
      {/* LISTADO DE ENTRADAS */}
    </div>
  );
}
