import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Check } from "../../../../components/ui/Check/Check";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/Form/Field";
import { Input, MoneyInput } from "../../../../components/ui/Input/Input";
import { useEvento } from "../../Provider/EventoProvider";
import { useModal } from "../../../../components/ui/Modal/Modal";
import { useToast } from "../../../../components/ui/Toast/Toast";

const EntradaExistente = (props: { entrada: any }) => {
  const [editar, setEditar] = useState<boolean>(false);

  const {
    idOferta,
    entradaSchema,
    modificarEntrada,
    obtenerEntradas,
    eliminarEntrada,
  } = useEvento();

  const { modal, setOpen } = useModal();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof entradaSchema>>({
    resolver: zodResolver(entradaSchema),
    mode: "onSubmit",
  });

  const handleRegistrarEntrada = (values: z.infer<typeof entradaSchema>) => {
    setEditar(false);
    modificarEntrada({
      ...values,
      id_entrada: props.entrada.id_tipo_entrada || null,
      id_oferta: idOferta,
      precio: parseFloat(values.precio.replace("$", "").replace(",", "")),
    })
      .then(() => {
        obtenerEntradas();
        toast({
          variant: "success",
          title: "Entrada modificada",
        });
      })
      .catch(() => {
        toast({
          variant: "danger",
          title: "Error al intentar eliminar la entrada. Intente nuevamente",
        });
      });
  };

  React.useEffect(() => {
    form.reset({
      nombre: props.entrada.nombre_tipo_entrada,
      incluye: props.entrada.descripcion_tipo_entrada,
      precio: props.entrada.monto_tarifa,
      sin_precio: props.entrada.bl_gratis == 1 ? true : false,
    });
  }, [props.entrada]);

  const handleEliminar = () => {
    modal({
      variant: "danger",
      title: "Eliminar entrada",
      description: (
        <div className="flex flex-col gap-2">
          <div>Esta acción es irreversible.</div>
          <button
            onClick={() => {
              setOpen(false);
              eliminarEntrada({
                id_oferta: idOferta,
                id_entrada: props.entrada.id_tipo_entrada,
              })
                .then(() => {
                  toast({
                    variant: "success",
                    title: "Entrada eliminada",
                  });
                  obtenerEntradas();
                })
                .catch(() => {
                  toast({
                    variant: "danger",
                    title:
                      "Error al intentar eliminar la entrada. Intente nuevamente",
                  });
                });
            }}
            className="viajero-button bg-red-400! hover:bg-red-400/90!"
          >
            Eliminar
          </button>
        </div>
      ),
    });
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegistrarEntrada)}
          className="grid grid-cols-4 gap-2"
        >
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input disabled={!editar} placeholder="Nombre" {...field} />
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
                  <Input
                    disabled={!editar}
                    placeholder="¿Qué incluye?"
                    {...field}
                  />
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
                    <MoneyInput
                      disabled={!editar}
                      placeholder="Precio"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Check disabled={!editar}>Sin precio</Check>
          </div>
          <div className="flex flex-row gap-2 w-full">
            {!editar && (
              <button
                className="viajero-button-ghost p-4 w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setEditar(true);
                }}
              >
                Editar
              </button>
            )}
            {!editar && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEliminar();
                }}
                className="viajero-button bg-red-400! hover:bg-red-400/90! p-4 w-full"
              >
                Eliminar
              </button>
            )}
            {editar && (
              <button type="submit" className="viajero-button p-4 w-full">
                Guardar
              </button>
            )}
            {editar && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEditar(false);
                }}
                className="viajero-button-ghost p-4 w-full"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

const TipoDeEntrada = (props: { new?: boolean; cancelar: () => void }) => {
  const { idOferta, entradaSchema, registrarEntrada, obtenerEntradas } =
    useEvento();

  const form = useForm<z.infer<typeof entradaSchema>>({
    resolver: zodResolver(entradaSchema),
    mode: "onSubmit",
  });

  const handleRegistrarEntrada = (values: z.infer<typeof entradaSchema>) => {
    props.cancelar();
    registrarEntrada({
      ...values,
      id_oferta: idOferta,
      precio: parseFloat(values.precio.replace("$", "").replace(",", "")),
    }).then(() => {
      obtenerEntradas();
    });
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegistrarEntrada)}
          className="grid grid-cols-4 gap-2"
        >
          <FormField
            control={form.control}
            name="nombre"
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

  const { horarioSchema, horarioForm, entradas } = useEvento();
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
      {entradas.map((entrada) => (
        <EntradaExistente entrada={entrada} />
      ))}
      {/* LISTADO DE ENTRADAS */}
    </div>
  );
}
