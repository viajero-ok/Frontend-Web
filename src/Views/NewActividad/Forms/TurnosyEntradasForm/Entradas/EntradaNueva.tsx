import { useForm } from "react-hook-form";
import {
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../../components/ui/Form/Field";
import { useEntrada } from "./EntradaProvider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../../components/ui/Input/Input";
import { IonIcon } from "@ionic/react";
import { closeSharp } from "ionicons/icons";
import { Dispatch, SetStateAction } from "react";
import { useActividad } from "../../../Provider/ActividadProvider";
import { useToast } from "../../../../../components/ui/Toast/Toast";

export default function EntradaNueva({
  setAgregarEntrada,
}: {
  setAgregarEntrada: Dispatch<SetStateAction<boolean>>;
}) {
  const { entradaSchema } = useEntrada();
  const { idOferta, agregarEntrada, actualizar } = useActividad();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof entradaSchema>>({
    resolver: zodResolver(entradaSchema),
    mode: "onSubmit",
  });

  const onSubmit = (values: z.infer<typeof entradaSchema>) => {
    agregarEntrada({ ...values, id_oferta: idOferta })
      .then(() => {
        toast({
          variant: "success",
          title: "Entrada registrada",
        });
        actualizar();
        setAgregarEntrada(false);
      })
      .catch(() => {});
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-2"
      >
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem className="w-full h-[42pt] col-span-5">
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem className="w-full h-[42pt] col-span-5">
              <FormControl>
                <Input placeholder="Descripción" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex flex-row gap-2">
          <button
            type="submit"
            className="viajero-button px-4 py-2 flex flex-row items-center w-full h-[42pt]"
          >
            Agregar
          </button>
          <button
            className={cn(
              "flex items-center justify-center content-center w-fit px-2 h-[42pt] viajero-button-ghost",
              "border! border-[#bbb]!"
            )}
            onClick={() => {
              form.reset();
              setAgregarEntrada(false);
            }}
          >
            <IonIcon icon={closeSharp} />
          </button>
        </div>
      </form>
    </Form>
  );
}
