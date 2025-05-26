import { zodResolver } from "@hookform/resolvers/zod";
import { IonIcon, IonToast, useIonRouter } from "@ionic/react";
import { returnDownBack } from "ionicons/icons";
import { LeafletMouseEvent } from "leaflet";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  actualizarEstablecimiento,
  eliminarEstablecimiento,
  obtenerDatosRegistradosEstablecimiento,
  registrarEstablecimiento,
} from "../../../App/Establecimientos/Establecimientos";
import { EstablecimientoModel } from "../../../App/Establecimientos/Establecimientos.Models";
import { getUbicaciones } from "../../../App/Ubicaciones/Ubicaciones";
import MapView from "../../../components/MapView/MapView";
import { Check } from "../../../components/ui/Check/Check";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/Form/Field";
import { Input } from "../../../components/ui/Input/Input";
import { Select, SelectOption } from "../../../components/ui/Select/Select";
import { useModal } from "../../../components/ui/Modal/Modal";

type ProvinciaModel = { id_provincia: number; provincia: string };
type DepartamentoModel = {
  id_departamento: number;
  id_provincia: number;
  departamento: string;
};
type LocalidadModel = {
  id_localidad: number;
  id_provincia: number;
  id_departamento: number;
  localidad: string;
};

function getDepartamentosFor(
  id_provincia: number | undefined,
  departamentos: DepartamentoModel[]
): DepartamentoModel[] {
  if (!id_provincia) return [];
  return departamentos.filter(
    (departamento: DepartamentoModel) =>
      departamento.id_provincia == id_provincia
  );
}

function getLocalidadesFor(
  id_departamento: number | undefined,
  localidades: LocalidadModel[]
): LocalidadModel[] {
  if (!id_departamento) return [];
  return localidades.filter(
    (localidad: LocalidadModel) => localidad.id_departamento == id_departamento
  );
}

type TNewPlaceForm = {
  idEstablecimiento: number;
};

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
  latitud: z.string({ message: "El campo es requerido" }),
  longitud: z.string({ message: "El campo es requerido" }),
});

export default function NewPlaceForm(props: TNewPlaceForm) {
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any[]>();

  const [pos, setPos] = useState<{ lat: number; lng: number } | null>();
  const [provincias, setProvincias] = useState<ProvinciaModel[]>([]);
  const [departamentos, setDepartamentos] = useState<DepartamentoModel[]>([]);
  const [localidades, setLocalidades] = useState<LocalidadModel[]>([]);
  const [esSinNumero, setEsSinNumero] = useState<boolean>(false);

  const router = useIonRouter();
  const { modal, setOpen } = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: { sin_numero: false },
  });

  useEffect(() => {
    getUbicaciones()
      .then((response: any) => {
        const ubicaciones = response.data.ubicaciones;

        setProvincias(ubicaciones.provincias);
        setDepartamentos(ubicaciones.departamentos);
        setLocalidades(ubicaciones.localidades);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    if (!props.idEstablecimiento) return;
    obtenerDatosRegistradosEstablecimiento(props.idEstablecimiento).then(
      (response: EstablecimientoModel) => {
        form.reset({ ...response, sin_numero: response.sin_numero.value });
        const lat = Number(response.latitud);
        const lng = Number(response.longitud);
        if (lat && lng) setPos({ lat: lat, lng: lng });
        else setPos(null);
      }
    );
  }, []);

  const handleOnClick = (e: LeafletMouseEvent) => {
    form.setValue("latitud", e.latlng.lat.toString());
    form.setValue("longitud", e.latlng.lng.toString());
  };

  const onRegistrar = (values: z.infer<typeof formSchema>) => {
    registrarEstablecimiento(values)
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
        setErrorMessage(error.response.data.message);
        setShowToast(true);
      });
  };

  const onGuardar = (values: z.infer<typeof formSchema>) => {
    actualizarEstablecimiento({
      ...values,
      id_establecimiento: Number(props.idEstablecimiento),
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
        setErrorMessage(error.response.data.message);
        setShowToast(true);
      });
  };

  const onEliminar = () => {
    eliminarEstablecimiento(props.idEstablecimiento)
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
        setErrorMessage(error.response.data.message);
        setShowToast(true);
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

  const formWatch = form.watch();
  useEffect(() => {
    setEsSinNumero(formWatch.sin_numero);
    form.setValue("numero", formWatch.sin_numero ? "S/N" : undefined);
  }, [formWatch.sin_numero]);

  return (
    <div className="ml-8 mt-8 pb-12">
      <div className="text-3xl font-bold text-gray-600">
        Completá los datos de tu establecimiento
      </div>
      <div className="grid grid-cols-2 mt-4">
        <div className="flex flex-col justify-between">
          <div className="text-xl font-bold text-gray-600">Datos generales</div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                props.idEstablecimiento ? onGuardar : onRegistrar
              )}
              className="flex flex-col mr-2 mt-4 h-full justify-between"
            >
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
                        <Check className="h-[42pt]" {...field}>Es sin número</Check>
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
                          {getDepartamentosFor(
                            form.getValues().id_provincia,
                            departamentos as DepartamentoModel[]
                          ).map((departamento: any) => (
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
                          {getLocalidadesFor(
                            form.getValues().id_departamento,
                            localidades as LocalidadModel[]
                          ).map((localidad: any) => (
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
              {props.idEstablecimiento ? (
                <BotoneraEdit
                  onConfirm={onAskConfirmEliminar}
                  onCancelar={() => router.push("/my-places")}
                />
              ) : (
                <BotoneraRegister onCancelar={() => router.goBack()} />
              )}
            </form>
          </Form>
        </div>
        <div className="pr-8 pl-2">
          <div className="text-xl font-bold text-gray-600">
            Ubicá en el mapa tu establecimiento turístico
          </div>
          {(pos != undefined || !props.idEstablecimiento) && (
            <MapView
              initZoom={
                form.getValues().latitud && form.getValues().longitud ? 20 : 13
              }
              initPos={
                form.getValues().latitud && form.getValues().longitud
                  ? {
                      lat: Number(form.getValues().latitud),
                      lng: Number(form.getValues().longitud),
                    }
                  : undefined
              }
              setMarker={
                form.getValues().latitud && form.getValues().longitud
                  ? {
                      lat: Number(form.getValues().latitud),
                      lng: Number(form.getValues().longitud),
                    }
                  : null
              }
              search
              markerOnClick
              onClick={handleOnClick}
              style={{ marginTop: "10pt", height: "350pt", aspect: "square" }}
            />
          )}
        </div>
      </div>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={errorMessage?.[1]}
        duration={5000}
        color="danger"
        style={{
          fontSize: "12pt",
        }}
      />
    </div>
  );
}
