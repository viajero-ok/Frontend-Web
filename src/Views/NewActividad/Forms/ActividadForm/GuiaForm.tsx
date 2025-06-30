import { zodResolver } from "@hookform/resolvers/zod";
import { IonIcon } from "@ionic/react";
import {
  closeSharp,
  informationCircleOutline,
  pencil,
  trashBin,
} from "ionicons/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { modificarGuia } from "../../../../App/Actividades/Actividad";
import { Check } from "../../../../components/ui/Check/Check";
import {
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/Form/Field";
import { Input } from "../../../../components/ui/Input/Input";
import { useModal } from "../../../../components/ui/Modal/Modal";
import { useActividad } from "../../Provider/ActividadProvider";

const editarGuiaSchema = z.object({
  id_guia: z.number(),
  nro_resolucion: z
    .string({ message: "El campo es requerido" })
    .min(3, "Mínimo 3 caracteres"),
  nombre_y_apellido: z
    .string({ message: "El campo es requerido" })
    .min(3, "Mínimo 3 caracteres"),
});

const GuiaRow = ({
  guia,
  handleConfirmarEliminar,
}: {
  guia: any;
  handleConfirmarEliminar: (idGuia: number) => void;
}) => {
  const [editar, setEditar] = useState<boolean>(false);

  const { modal, setOpen } = useModal();
  const { idOferta, actualizar } = useActividad();

  const formEditar = useForm<z.infer<typeof editarGuiaSchema>>({
    resolver: zodResolver(editarGuiaSchema),
    mode: "onSubmit",
    defaultValues: {
      id_guia: guia.id_guia,
      nro_resolucion: guia.numero_resolucion,
      nombre_y_apellido: guia.nombre_apellido_guia,
    },
  });

  const handleGuardar = (values: z.infer<typeof editarGuiaSchema>) => {
    modificarGuia({ ...values, id_oferta: idOferta })
      .then(() => {
        actualizar();
        setEditar(false);
      })
      .catch((error) => {
        modal({
          variant: "danger",
          title: "Error",
          description: "No fue posible guardar las modificaciones. " + error,
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button-ghost px-4 py-2"
              >
                Aceptar
              </button>
            </>
          ),
        });
      });
  };

  return !editar ? (
    <div key={guia.id_guia} className="group grid grid-cols-12 gap-2 ">
      <div className="col-span-5 p-4 text-md text-gray-600 border border-[#bbb] rounded-md group-odd:bg-[var(--color-viajero)]/5">
        {guia.numero_resolucion}
      </div>
      <div className="col-span-5 p-4 text-md text-gray-600 border border-[#bbb] rounded-md group-odd:bg-[var(--color-viajero)]/5">
        {guia.nombre_apellido_guia}
      </div>
      <div className="col-span-2 flex flex-row gap-2">
        <button
          className={cn(
            "flex items-center justify-center content-center w-fit px-2 h-[42pt] viajero-button-ghost",
            "border! border-[#bbb]! w-full"
          )}
          onClick={() => {
            formEditar.reset({
              id_guia: guia.id_guia,
              nro_resolucion: guia.numero_resolucion,
              nombre_y_apellido: guia.nombre_apellido_guia,
            });
            setEditar(true);
          }}
        >
          <IonIcon icon={pencil} />
          Editar
        </button>
        <button
          className={cn(
            "flex items-center justify-center content-center w-fit px-2 h-[42pt] viajero-button",
            "bg-red-400! hover:bg-red-400/90!"
          )}
          onClick={() => handleConfirmarEliminar(guia.id_guia)}
        >
          <IonIcon icon={trashBin} />
        </button>
      </div>
    </div>
  ) : (
    <Form {...formEditar}>
      <form
        onSubmit={formEditar.handleSubmit(handleGuardar)}
        className="grid grid-cols-12 gap-2"
      >
        <FormField
          control={formEditar.control}
          name="nro_resolucion"
          render={({ field }) => (
            <FormItem className="col-span-5 w-full">
              <FormControl>
                <Input placeholder="Número de resolución" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formEditar.control}
          name="nombre_y_apellido"
          render={({ field }) => (
            <FormItem className="col-span-5 w-full">
              <FormControl>
                <Input placeholder="Nombre completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 flex flex-row w-full gap-2">
          <button
            type="submit"
            className="w-full h-[42pt] viajero-button px-4 py-2 items-center"
          >
            Guardar
          </button>
          <button
            className={cn(
              "flex items-center justify-center content-center w-fit px-2 h-[42pt] viajero-button-ghost",
              "border! border-[#bbb]!"
            )}
            onClick={() => setEditar(false)}
          >
            <IonIcon icon={closeSharp} />
          </button>
        </div>
      </form>
    </Form>
  );
};

const crearGuiaSchema = z.object({
  nro_resolucion: z
    .string({ message: "El campo es requerido" })
    .min(3, "Mínimo 3 caracteres"),
  nombre_y_apellido: z
    .string({ message: "El campo es requerido" })
    .min(3, "Mínimo 3 caracteres"),
});

export default function GuiaForm() {
  const [agregarRow, setAgregarRow] = useState<boolean>(false);

  const {
    actualizar,
    guias,
    esConGuia,
    checkEsConGuia,
    crearGuia,
    modificarGuia,
    eliminarGuia,
  } = useActividad();
  const { modal, setOpen } = useModal();

  const formCrear = useForm<z.infer<typeof crearGuiaSchema>>({
    resolver: zodResolver(crearGuiaSchema),
    mode: "onSubmit",
  });

  const handleCrearGuia = (values: z.infer<typeof crearGuiaSchema>) => {
    crearGuia(values)
      .then(() => {
        setOpen(false);
        actualizar();
      })
      .catch((error) => {
        modal({
          variant: "danger",
          title: "Error",
          description: "No fue posible crear un nuevo guía. " + error,
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button-ghost px-4 py-2"
              >
                Aceptar
              </button>
            </>
          ),
        });
      })
      .finally(() => {
        setAgregarRow(false);
      });
  };

  const handleConfirmarEliminar = (idGuia: number) => {
    modal({
      variant: "danger",
      title: "Eliminar guía",
      description: "Esta acción es irreversible. ¿Estás seguro?",
      actions: (
        <div className="w-full flex flex-row justify-between">
          <button
            onClick={() => setOpen(false)}
            className="viajero-button-ghost px-4 py-2"
          >
            Cancelar
          </button>
          <button
            onClick={() => handleEliminar(idGuia)}
            className="viajero-button px-4 py-2 bg-red-400! hover:bg-red-400/90!"
          >
            Eliminar
          </button>
        </div>
      ),
    });
  };

  const handleEliminar = (idGuia: number) => {
    eliminarGuia(idGuia)
      .then(() => {
        modal({
          variant: "success",
          title: "Guía eliminado",
          description: "El guía fue eliminado exitosamente",
          actions: (
            <>
              <button
                onClick={() => {
                  actualizar();
                  setOpen(false);
                }}
                className="viajero-button px-4 py-2 bg-green-400! hover:bg-green-400/90!"
              >
                Aceptar
              </button>
            </>
          ),
        });
      })
      .catch(() => {
        modal({
          variant: "danger",
          title: "Error",
          description:
            "No se pudo eliminar el guía, intente nuevamente más tarde.",
          actions: (
            <>
              <button
                onClick={() => setOpen(false)}
                className="viajero-button-ghost px-4 py-2"
              >
                Aceptar
              </button>
            </>
          ),
        });
      });
  };

  return esConGuia ? (
    <div className="flex flex-col gap-2 w-full">
      <div className="p-4 border border-gray-200 bg-gray-50 rounded-md flex flex-row justify-between items-center">
        <div className="text-gray-600 text-2xl font-bold">Guías turísticos</div>
        <button
          disabled={!esConGuia || agregarRow}
          onClick={(e) => {
            e.preventDefault();
            formCrear.reset();
            setAgregarRow(true);
          }}
          className="viajero-button px-4 py-2 text-md text-nowrap items-center disabled:bg-gray-200! disabled:cursor-default! disabled:shadow-none!"
        >
          Agregar nuevo
        </button>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row w-full gap-2">
          {/* <Check
            className="h-[42pt] w-full"
            onChange={() => checkEsConGuia()}
            checked={esConGuia}
          >
            Con guía
          </Check> */}
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-5 p-4 border border-gray-200 bg-gray-50 rounded-md text-lg text-gray-600 font-bold">
              Número de resolución
            </div>
            <div className="col-span-5 p-4 border border-gray-200 bg-gray-50 rounded-md text-lg text-gray-600 font-bold">
              Nombre y apellido
            </div>
            <div className="col-span-2 p-4 border border-gray-200 bg-gray-50 rounded-md text-lg text-gray-600 font-bold">
              Acciones
            </div>
          </div>

          {agregarRow && (
            <Form {...formCrear}>
              <form
                onSubmit={formCrear.handleSubmit(handleCrearGuia)}
                className="grid grid-cols-12 gap-2"
              >
                <FormField
                  control={formCrear.control}
                  name="nro_resolucion"
                  render={({ field }) => (
                    <FormItem className="col-span-5 w-full">
                      <FormControl>
                        <Input placeholder="Número de resolución" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formCrear.control}
                  name="nombre_y_apellido"
                  render={({ field }) => (
                    <FormItem className="col-span-5 w-full">
                      <FormControl>
                        <Input placeholder="Nombre completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="col-span-2 flex flex-row w-full gap-2">
                  <button
                    type="submit"
                    className="w-full h-[42pt] viajero-button px-4 py-2 items-center"
                  >
                    Agregar
                  </button>
                  <button
                    className={cn(
                      "flex items-center justify-center content-center w-fit px-2 h-[42pt] viajero-button-ghost",
                      "border! border-[#bbb]!"
                    )}
                    onClick={() => setAgregarRow(false)}
                  >
                    <IonIcon icon={closeSharp} />
                  </button>
                </div>
              </form>
            </Form>
          )}

          {guias.map((guia: any) => (
            <GuiaRow
              key={guia.id_guia}
              guia={guia}
              handleConfirmarEliminar={handleConfirmarEliminar}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="p-4 w-full border border-gray-200 bg-gray-50 rounded-md mt-4">
      <div className="text-gray-600 flex flex-row items-center gap-2">
        <IonIcon className="text-2xl mr-2" icon={informationCircleOutline} />
        Para poder agregar guías turísticos es necesario seleccionar la opción
        <span className="font-bold italic">Es con guía</span> en la sección{" "}
        <span className="font-bold italic">Actividad{" > "}Datos básicos</span>
      </div>
    </div>
  );
}
