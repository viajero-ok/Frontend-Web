import { IonIcon } from "@ionic/react";
import { close, pencil, pencilOutline, trash } from "ionicons/icons";
import { Input } from "../../../../components/ui/Input/Input";
import { useEffect, useState } from "react";
import { useEvento } from "../../Provider/EventoProvider";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/Form/Field";
import { Select, SelectOption } from "../../../../components/ui/Select/Select";
import { useToast } from "../../../../components/ui/Toast/Toast";

const Schema = z.object({
  id_red_social: z.number({ message: "El campo es requerido" }),
  nombre_usuario: z.string({ message: "El campo es requerido" }),
  url: z.string({ message: "El campo es requerido" }),
});

/** Red social a registrar */
const NewRedSocial = ({ onCancelar }: { onCancelar: () => void }) => {
  const [url, setUrl] = useState<string>("");
  const {
    idOferta,
    agregarRedSocial,
    datosRegistroRedes,
    actualizarEventoTab,
    listadoRedes,
  } = useEvento();

  const { toast } = useToast();

  const handleAgregar = (values: z.infer<typeof Schema>) => {
    agregarRedSocial({ ...values, id_entidad: idOferta, id_tipo_entidad: 1 })
      .then(() => {
        actualizarEventoTab();
        toast({
          variant: "success",
          title: "Red social registrada exitosamente",
        });
        onCancelar();
      })
      .catch(() => {
        toast({
          variant: "danger",
          title:
            "Error al intentar registrar la red social. Intente nuevamente",
        });
      });
  };

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    mode: "onSubmit",
  });

  return (
    <div className="flex flex-row gap-2 items-center justify-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAgregar)}
          className="w-full flex flex-row gap-2"
        >
          <FormField
            control={form.control}
            name="id_red_social"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormControl>
                  <Select placeholder="Red social" {...field}>
                    {datosRegistroRedes.redesSociales
                      .filter(
                        (redPosible: any) =>
                          !listadoRedes
                            .map((red) => red.id_red_social)
                            .includes(redPosible.id_red_social)
                      )
                      .map((redSocial: any) => (
                        <SelectOption
                          key={redSocial.id_red_social}
                          value={redSocial.id_red_social}
                        >
                          {redSocial.red_social}
                        </SelectOption>
                      ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nombre_usuario"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Nombre de usuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormControl>
                  <Input placeholder="Url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button className="viajero-button" type="submit">
            Registrar
          </button>
          <button
            className="viajero-button-ghost p-4"
            onClick={(e) => {
              e.preventDefault();
              onCancelar();
            }}
          >
            Cancelar
          </button>
        </form>
      </Form>
    </div>
  );
};

/** Red social registrada */
const RedSocial = ({ redSocial }: { redSocial: any }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const {
    idOferta,
    agregarRedSocial,
    eliminarRedSocial,
    datosRegistroRedes,
    actualizarEventoTab,
    listadoRedes,
  } = useEvento();

  const { toast } = useToast();

  const handleGuardar = (values: z.infer<typeof Schema>) => {
    /** Usa el mismo registrar, porque es solo un registro por cada red social posible */
    agregarRedSocial({ ...values, id_entidad: idOferta, id_tipo_entidad: 1 })
      .then((response) => {
        actualizarEventoTab();
        toast({
          variant: "success",
          title: "Red social guardada exitosamente",
        });
        setEdit(false);
      })
      .catch(() => {
        toast({
          variant: "danger",
          title: "Error al intentar guardar la red social. Intente nuevamente",
        });
      });
  };

  const handleEliminar = () => {
    eliminarRedSocial({
      id_entidad: idOferta,
      id_red_social: redSocial.id_red_social,
      id_tipo_entidad: 1,
    })
      .then(() => {
        actualizarEventoTab();
        setEdit(false);
        toast({
          variant: "success",
          title: "Red social eliminada",
        });
      })
      .catch(() => {
        toast({
          variant: "danger",
          title: "No se pudo eliminar la red social. Intente nuevamente",
        });
      });
  };

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    mode: "onSubmit",
    defaultValues: {
      id_red_social: redSocial.id_red_social,
      nombre_usuario: redSocial.nombre_usuario,
      url: redSocial.url_red_entidad,
    },
  });

  return (
    <div className="flex flex-row gap-2 items-center justify-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleGuardar)}
          className="w-full flex flex-row gap-2"
        >
          <FormField
            control={form.control}
            name="id_red_social"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormControl>
                  <Select disabled={!edit} placeholder="Red social" {...field}>
                    {datosRegistroRedes.redesSociales
                      .filter(
                        (redPosible: any) =>
                          !listadoRedes
                            .map((red) => red.id_red_social)
                            .includes(redPosible.id_red_social) ||
                          redPosible.id_red_social == redSocial.id_red_social
                      )
                      .map((redSocial: any) => (
                        <SelectOption
                          key={redSocial.id_red_social}
                          value={redSocial.id_red_social}
                        >
                          {redSocial.red_social}
                        </SelectOption>
                      ))}
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nombre_usuario"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    disabled={!edit}
                    placeholder="Nombre de usuario"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormControl>
                  <Input disabled={!edit} placeholder="Url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!edit && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setEdit(true);
              }}
              className="viajero-button-ghost p-4"
            >
              Editar
            </button>
          )}
          {edit && (
            <>
              <button className="viajero-button" type="submit">
                Guardar
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEliminar();
                }}
                className="viajero-button bg-red-400! hover:bg-red-400/90!"
              >
                Eliminar
              </button>
              <button
                className="viajero-button-ghost p-4"
                onClick={(e) => {
                  e.preventDefault();
                  setEdit(false);
                }}
              >
                Cancelar
              </button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default function RedesSocialesForm() {
  const [agregar, setAgregar] = useState<boolean>(false);

  const { listadoRedes, datosRegistroRedes } = useEvento();

  useEffect(() => {
    console.log("listadoRedes: ", listadoRedes);
  }, [listadoRedes]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 w-full">
        <div className="border border-gray-200 rounded-md bg-gray-50 text-xl font-bold text-gray-600 p-4 w-full">
          Redes sociales del evento
        </div>
        <button
          className="viajero-button"
          disabled={
            agregar ||
            datosRegistroRedes.redesSociales.filter((red: any) =>
              listadoRedes
                .map((r) => r.id_red_social)
                .includes(red.id_red_social)
            ).length == 0
          }
          onClick={() => setAgregar(true)}
        >
          Agregar
        </button>
      </div>
      {agregar && <NewRedSocial onCancelar={() => setAgregar(false)} />}
      {listadoRedes.map((red: any) => (
        <RedSocial key={red.id_red_x_entidad} redSocial={red} />
      ))}
    </div>
  );
}
