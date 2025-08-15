import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../../components/ui/Form/Field";
import { Input } from "../../../../../components/ui/Input/Input";
import { useToast } from "../../../../../components/ui/Toast/Toast";
import { useActividad } from "../../../Provider/ActividadProvider";
import { useEntrada } from "./EntradaProvider";
import { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { closeSharp } from "ionicons/icons";

export default function EntradaRow({ entrada }: { entrada: any }) {
  const [editar, setEditar] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const { entradaSchema } = useEntrada();
  const { idOferta, eliminarEntrada, actualizarEntrada, actualizarTurnosEntradas } =
    useActividad();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof entradaSchema>>({
    resolver: zodResolver(entradaSchema),
    mode: "onSubmit",
  });

  const handleEliminar = () => {
    eliminarEntrada(entrada.id_tipo_entrada)
      .then(() => {
        toast({
          variant: "success",
          title: "Entrada eliminada",
        });
        actualizarTurnosEntradas();
      })
      .catch(() => {});
  };

  const onSubmit = (values: z.infer<typeof entradaSchema>) => {
    actualizarEntrada({
      ...values,
      id_entrada: entrada.id_tipo_entrada,
      id_oferta: idOferta,
    })
      .then(() => {
        toast({
          variant: "success",
          title: "Entrada actualizada",
        });
        actualizarTurnosEntradas();
        setEditar(false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    form.reset({
      nombre: entrada.nombre_tipo_entrada,
      descripcion: entrada.descripcion_tipo_entrada,
    });
  }, [entrada]);

  useEffect(() => {
    if (form.formState.isDirty) setIsDirty(true);
    else setIsDirty(false);
  }, [form.formState]);

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
            <FormItem className="relative w-full col-span-5">
              <FormControl>
                <Input
                  className="h-[42pt]"
                  disabled={!editar}
                  placeholder="Nombre"
                  {...field}
                />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full col-span-5">
              <FormControl>
                <Input
                  className="h-[42pt]"
                  disabled={!editar}
                  placeholder="Descripción"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!editar && (
          <div className="col-span-2 flex flex-row gap-2">
            <button
              onClick={() => setEditar(true)}
              className={cn(
                "flex items-center justify-center content-center w-fit px-2 h-[42pt] viajero-button-ghost",
                "border! border-[#bbb]! w-full"
              )}
            >
              Editar
            </button>
            <button
              className={cn(
                "flex items-center justify-center content-center w-fit px-2 h-[42pt] viajero-button",
                "bg-red-400! hover:bg-red-400/90! w-full"
              )}
              onClick={(e) => {
                e.preventDefault();
                handleEliminar();
              }}
            >
              Eliminar
            </button>
          </div>
        )}
        {editar && (
          <div className="col-span-2 flex flex-row gap-2">
            <button
              type="submit"
              className="viajero-button px-4 py-2 flex flex-row items-center w-full h-[42pt] disabled:bg-gray-200!"
              disabled={!isDirty}
            >
              Guardar
            </button>
            <button
              className={cn(
                "flex items-center justify-center content-center w-fit px-2 h-[42pt] viajero-button-ghost",
                "border! border-[#bbb]!"
              )}
              onClick={() => {
                form.reset();
                setEditar(false);
              }}
            >
              <IonIcon icon={closeSharp} />
            </button>
          </div>
        )}
      </form>
    </Form>
  );
}
