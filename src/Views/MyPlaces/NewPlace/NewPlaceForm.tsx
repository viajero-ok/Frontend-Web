import { zodResolver } from "@hookform/resolvers/zod";
import { IonIcon, useIonRouter } from "@ionic/react";
import { returnDownBack } from "ionicons/icons";
import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDomicilioSelection } from "../../../components/Domicilio/useDomicilioSelection";
import MapView from "../../../components/MapView/MapView";
import {
  MapViewProvider,
  useMapView,
} from "../../../components/MapView/useMapView";
import { Check } from "../../../components/ui/Check/Check";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/Form/Field";
import { Input } from "../../../components/ui/Input/Input";
import { useModal } from "../../../components/ui/Modal/Modal";
import { Select, SelectOption } from "../../../components/ui/Select/Select";
import { useEstablecimiento } from "./EstablecimientoProvider";
import { getUbicaciones } from "../../../App/Ubicaciones/Ubicaciones";

const BotoneraRegister = ({ onCancelar }: { onCancelar: () => void }) => {
  return (
    <div className="flex flex-row gap-2">
      <button
        className="viajero-button-ghost py-2 px-4 mt-4 w-fit"
        onClick={onCancelar}
      >
        Cancelar
      </button>
      <button className="viajero-button py-2 mt-4 w-full" type="submit">
        REGISTRAR
      </button>
    </div>
  );
};

const BotoneraEdit = ({
  onConfirm,
  onCancelar,
}: {
  onConfirm: () => void;
  onCancelar: () => void;
}) => {
  return (
    <div className="flex flex-row justify-between">
      <button
        onClick={(e) => {
          e.preventDefault();
          onConfirm();
        }}
        className="rounded-md py-2 px-4 w-fit bg-red-400 text-white cursor-pointer hover:bg-red-400/90 hover:shadow-md"
      >
        Eliminar
      </button>
      <div className="flex flex-row gap-2">
        <button
          className="viajero-button-ghost py-2 px-4 w-fit flex-row gap-2 items-center"
          onClick={(e) => {
            e.preventDefault();
            onCancelar();
          }}
        >
          <IonIcon icon={returnDownBack} />
          Volver
        </button>
        <button className="viajero-button py-2 px-4 w-fit" type="submit">
          Guardar
        </button>
      </div>
    </div>
  );
};

const formSchema = z.object({
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
  sin_numero: z.boolean({ message: "El campo es requerido" }),
  numero: z.string().optional(),
  id_localidad: z.number({ message: "El campo es requerido" }),
  id_departamento: z.number({ message: "El campo es requerido" }),
  id_provincia: z.number({ message: "El campo es requerido" }),
  ubicacion: z.object(
    {
      latitud: z.number(),
      longitud: z.number(),
    },
    {
      message: "La ubicación es requerida.",
    }
  ),
});

export default function NewPlaceForm() {
  const [esSinNumero, setEsSinNumero] = useState<boolean>(false);
  const [ubicaciones, setUbicaciones] = useState<{
    provincias: any[];
    departamentos: any[];
    localidades: any[];
  }>({ provincias: [], departamentos: [], localidades: [] });

  const {
    idEstablecimiento,
    datosRegistradosEstablecimiento,
    registrarEstablecimiento,
    actualizarEstablecimiento,
    eliminarEstablecimiento,
    actualizar,
  } = useEstablecimiento();
  const router = useIonRouter();
  const { modal, setOpen } = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: { sin_numero: false },
  });
  const formWatch = form.watch();
  const { provincias, departamentos, localidades } = useDomicilioSelection({
    ubicaciones,
    provinciaSelection: formWatch.id_provincia,
    departamentoSelection: formWatch.id_departamento,
    localidadSelection: formWatch.id_localidad,
  });
  const mapView = useMapView({ search: true, markerOnClick: true });

  useEffect(() => {
    getUbicaciones().then((response) => {
      setUbicaciones(response.data.ubicaciones);
    });
  }, []);

  const onRegistrar = (values: z.infer<typeof formSchema>) => {
    registrarEstablecimiento({
      ...values,
      latitud: values.ubicacion.latitud.toString(),
      longitud: values.ubicacion.longitud.toString(),
    })
      .then((response: any) => {
        modal({
          variant: "success",
          title: "¡Establecimiento creado!",
          description: "Tu establecimiento se ha registrado con éxito",
          canDismiss: false,
          actions: (
            <>
              <button
                className="viajero-button bg-green-400! hover:bg-green-400/90! px-4 py-2"
                onClick={() => {
                  router.push(
                    `/my-places/edit/${response.data.id_establecimiento}`
                  );
                  setOpen(false);
                }}
              >
                Aceptar
              </button>
            </>
          ),
        });
      })
      .catch((error: any) => {
        // setErrorMessage(error.response.data.message);
        // setShowToast(true);
      });
  };

  const onGuardar = (values: z.infer<typeof formSchema>) => {
    actualizarEstablecimiento({
      ...values,
      id_establecimiento: Number(idEstablecimiento),
      latitud: values.ubicacion.latitud.toString(),
      longitud: values.ubicacion.longitud.toString(),
    })
      .then(() => {
        modal({
          variant: "success",
          title: "¡Cambios guardados!",
          description: "Tus cambios se guardaron correctamente.",
          actions: (
            <>
              <button
                className="viajero-button-ghost hover:bg-white/40! flex-row items-center gap-2 py-2 px-4"
                onClick={() => {
                  router.push("/my-places");
                  setOpen(false);
                }}
              >
                <IonIcon icon={returnDownBack} /> Mis Establecimientos
              </button>
              <button
                className="viajero-button bg-green-400! hover:bg-green-400/90! px-4 py-2"
                onClick={() => {
                  actualizar();
                  setOpen(false);
                }}
              >
                Aceptar
              </button>
            </>
          ),
        });
      })
      .catch((error: any) => {
        // setErrorMessage(error.response.data.message);
        // setShowToast(true);
      });
  };

  const onEliminar = () => {
    if (!idEstablecimiento) return;
    eliminarEstablecimiento(idEstablecimiento)
      .then(() => {
        modal({
          variant: "success",
          title: "¡Establecimiento eliminado!",
          description: "El establecimiento ha sido correctamente eliminado.",
          canDismiss: false,
          actions: (
            <>
              <button
                className="viajero-button bg-green-400! hover:bg-green-400/90! px-4 py-2"
                onClick={() => {
                  router.push("/my-places");
                  setOpen(false);
                }}
              >
                Aceptar
              </button>
            </>
          ),
        });
      })
      .catch((error: any) => {
        // setErrorMessage(error.response.data.message);
        // setShowToast(true);
      });
  };

  const onAskConfirmEliminar = () => {
    modal({
      variant: "danger",
      title: "Eliminar establecimiento",
      description: "¿Estás seguro? Esta acción es irreversible",
      actions: (
        <>
          <button
            className="viajero-button-ghost hover:bg-white/40! flex-row items-center gap-2 py-2 px-4"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="viajero-button bg-red-400! hover:bg-red-400/90! px-4 py-2"
            onClick={() => {
              onEliminar();
              setOpen(false);
            }}
          >
            Eliminar
          </button>
        </>
      ),
    });
  };

  useEffect(() => {
    if (!datosRegistradosEstablecimiento) return;
    form.reset({
      ...datosRegistradosEstablecimiento,
      sin_numero: datosRegistradosEstablecimiento.sin_numero.value,
      ubicacion: {
        latitud: parseFloat(datosRegistradosEstablecimiento.latitud),
        longitud: parseFloat(datosRegistradosEstablecimiento.longitud),
      },
    });
    if (!mapView) return;
    mapView.newMarker(
      new LatLng(
        parseFloat(datosRegistradosEstablecimiento.latitud),
        parseFloat(datosRegistradosEstablecimiento.longitud)
      )
    );
  }, [datosRegistradosEstablecimiento]);

  useEffect(() => {
    if (mapView.markerList.length == 0) return;
    form.setValue("ubicacion", {
      latitud: mapView.markerList[0].pos.lat,
      longitud: mapView.markerList[0].pos.lng,
    });
  }, [mapView.markerList]);

  useEffect(() => {
    setEsSinNumero(formWatch.sin_numero);
    form.setValue("numero", formWatch.sin_numero ? "S/N" : undefined);
  }, [formWatch.sin_numero]);

  return (
    <div className="mx-8 mt-4">
      <div className="text-2xl font-bold text-gray-600 bg-gray-50 border border-gray-200 p-4 rounded-md w-full">
        Completá los datos de tu establecimiento
      </div>

      <div className="flex flex-col justify-between mt-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              idEstablecimiento ? onGuardar : onRegistrar
            )}
            className="flex flex-col h-full justify-between"
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <div className="text-xl font-bold text-gray-600 bg-gray-50 border border-gray-200 p-4 rounded-md w-full">
                  Datos generales
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numero_habilitacion"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Número de habilitacion"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Descripción" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Teléfono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mail"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="calle"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Calle" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sin_numero"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Check className="h-[42pt]" {...field}>
                            Es sin número
                          </Check>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numero"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={esSinNumero}
                            placeholder="Número"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="id_provincia"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select placeholder="Provincia" {...field}>
                            {provincias.map((provincia: any) => (
                              <SelectOption
                                key={provincia.id_provincia}
                                value={provincia.id_provincia}
                              >
                                {provincia.provincia}
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
                    name="id_departamento"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select placeholder="Departamento" {...field}>
                            {departamentos.map((departamento: any) => (
                              <SelectOption
                                key={departamento.id_departamento}
                                value={departamento.id_departamento}
                              >
                                {departamento.departamento}
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
                    name="id_localidad"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select placeholder="Localidad" {...field}>
                            {localidades.map((localidad: any) => (
                              <SelectOption
                                key={localidad.id_localidad}
                                value={localidad.id_localidad}
                              >
                                {localidad.localidad}
                              </SelectOption>
                            ))}
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-xl font-bold text-gray-600 bg-gray-50 border border-gray-200 p-4 rounded-md w-full">
                  Ubicación
                </div>
                <FormField
                  control={form.control}
                  name="ubicacion"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <MapViewProvider {...mapView}>
                        <MapView
                          //onClick={handleOnClick}
                          className="border border-[#bbb] hover:border-black rounded-md w-full aspect-video"
                        />
                      </MapViewProvider>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="p-2 border border-gray-200 bg-gray-50 rounded-md w-full">
                  {idEstablecimiento ? (
                    <BotoneraEdit
                      onConfirm={onAskConfirmEliminar}
                      onCancelar={() => router.push("/my-places")}
                    />
                  ) : (
                    <BotoneraRegister onCancelar={() => router.goBack()} />
                  )}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
