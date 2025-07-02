import { zodResolver } from "@hookform/resolvers/zod";
import { useIonRouter } from "@ionic/react";
import { LatLng, LeafletMouseEvent } from "leaflet";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getUbicaciones } from "../../../../App/Ubicaciones/Ubicaciones";
import MapView from "../../../../components/MapView/MapView";
import { Check } from "../../../../components/ui/Check/Check";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/Form/Field";
import { Input } from "../../../../components/ui/Input/Input";
import { Select, SelectOption } from "../../../../components/ui/Select/Select";
import {
  MapViewProvider,
  useMapView,
} from "../../../../components/MapView/useMapView";
import { useActividad } from "../../Provider/ActividadProvider";
import { useDomicilioSelection } from "../../../../components/Domicilio/useDomicilioSelection";
import { useToast } from "../../../../components/ui/Toast/Toast";

const formSchema = z.object({
  calle: z.string({ message: "El campo es requerido" }),
  sin_numero: z.boolean().optional(),
  numero: z.string({ message: "El campo es requerido" }),
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
  observaciones: z.string().optional(),
});

type TUbicacionForm = {
  idOferta: string;
  id_establecimiento: number;
};
export default function UbicacionForm(props: TUbicacionForm) {
  const [markerPos, setMarkerPos] = useState<LatLng>();
  const router = useIonRouter();
  const [ubiEstablecimiento, setUbiEstablecimiento] = useState<boolean>(false);

  const handleOnClick = (e: LeafletMouseEvent) => {
    setUbiEstablecimiento(false);
    setMarkerPos(e.latlng);
    form.setValue("ubicacion", {
      latitud: e.latlng.lat,
      longitud: e.latlng.lng,
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      sin_numero: false,
    },
  });
  const formWatch = form.watch();

  const {
    idOferta,
    ubicacionesDomicilio,
    ubicacionEstablecimiento,
    guardarUbicacion,
    actualizarUbicacion,
    datosRegistradosUbicacion,
  } = useActividad();

  const { provincias, departamentos, localidades } = useDomicilioSelection({
    provinciaSelection: formWatch.id_provincia,
    departamentoSelection: formWatch.id_departamento,
    localidadSelection: formWatch.id_localidad,
  });

  const { toast } = useToast();
  const mapView = useMapView({ search: true, markerOnClick: true });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    guardarUbicacion({
      id_oferta: idOferta,
      calle: values.calle,
      sin_numero: values.sin_numero ?? false,
      numero: values.numero,
      id_localidad: values.id_localidad,
      id_departamento: values.id_departamento,
      id_provincia: values.id_provincia,
      latitud: values.ubicacion.latitud.toString(),
      longitud: values.ubicacion.longitud.toString(),
      observaciones: values.observaciones ?? "",
    })
      .then(() => {
        toast({
          variant: "success",
          title: "Datos de ubicación guardados",
        });
        actualizarUbicacion();
      })
      .catch(() => {});
  };

  const onSubmitWithoutData = () => {
    guardarUbicacion({
      id_oferta: idOferta,
      misma_ubicacion_establecimiento: true,
    })
      .then(() => {
        toast({
          variant: "success",
          title: "Dato de ubicación guardados",
        });
        actualizarUbicacion();
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (!ubiEstablecimiento) {
      form.resetField("ubicacion");
      return;
    }
    if (!ubicacionEstablecimiento) return;
    form.clearErrors();
    mapView.relocateMarker(ubicacionEstablecimiento);
    form.setValue("ubicacion", {
      latitud: ubicacionEstablecimiento.lat,
      longitud: ubicacionEstablecimiento.lng,
    });
  }, [ubiEstablecimiento]);

  useEffect(() => {
    if (!datosRegistradosUbicacion) return;
    form.reset({
      calle: datosRegistradosUbicacion.nombre_calle,
      numero: datosRegistradosUbicacion.numero,
      id_provincia: datosRegistradosUbicacion.id_provincia,
      id_departamento: datosRegistradosUbicacion.id_departamento,
      id_localidad: datosRegistradosUbicacion.id_localidad,
      ubicacion: {
        latitud: datosRegistradosUbicacion.latitud,
        longitud: datosRegistradosUbicacion.longitud,
      },
      sin_numero: datosRegistradosUbicacion.sin_numero == "1" ? true : false,
      observaciones: datosRegistradosUbicacion.observacion,
    });

    if (
      !datosRegistradosUbicacion.latitud ||
      !datosRegistradosUbicacion.longitud
    )
      return;
    mapView.relocateMarker(
      new LatLng(
        parseFloat(datosRegistradosUbicacion.latitud),
        parseFloat(datosRegistradosUbicacion.longitud)
      )
    );
  }, [datosRegistradosUbicacion]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="p-4 w-full rounded-md border border-gray-200 bg-gray-50 text-2xl text-gray-600 font-bold">
          Datos de la ubicación
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="calle"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      disabled={ubiEstablecimiento}
                      placeholder="Calle"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2">
              <Check disabled={ubiEstablecimiento} className="h-[42pt]">
                Sin número
              </Check>
              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        disabled={ubiEstablecimiento}
                        placeholder="Número"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-2">
              <FormField
                control={form.control}
                name="id_provincia"
                render={({ field }) => (
                  <FormItem className="break-inside-avoid-column w-full">
                    <FormControl>
                      <Select
                        disabled={ubiEstablecimiento}
                        placeholder="Provincia"
                        {...field}
                      >
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
                  <FormItem className="break-inside-avoid-column w-full">
                    <FormControl>
                      <Select
                        disabled={ubiEstablecimiento}
                        placeholder="Departamento"
                        {...field}
                      >
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
                  <FormItem className="break-inside-avoid-column w-full">
                    <FormControl>
                      <Select
                        disabled={ubiEstablecimiento}
                        placeholder="Localidad"
                        {...field}
                      >
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
            <FormField
              control={form.control}
              name="observaciones"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      disabled={ubiEstablecimiento}
                      placeholder="Observaciones"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {ubicacionEstablecimiento != null && (
              <Check
                disabled={!ubicacionEstablecimiento}
                className="h-[42pt]"
                checked={ubicacionEstablecimiento != null && ubiEstablecimiento}
                onChange={(v: boolean) => {
                  if (v) {
                    console.log("set marker");
                    setMarkerPos(new LatLng(23, -53));
                  }
                  setUbiEstablecimiento(v);
                }}
              >
                Usar ubicación del establecimiento
              </Check>
            )}
            <div className="flex flex-row justify-between">
              <button
                className="viajero-button-ghost px-4 py-2"
                onClick={() => router && router.push("/my-offers")}
              >
                Volver
              </button>
              <button
                type={ubiEstablecimiento ? "button" : "submit"}
                onClick={() => ubiEstablecimiento && onSubmitWithoutData()}
                className="viajero-button px-4 py-2"
              >
                Guardar
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="ubicacion"
              render={({ field }) => (
                <FormItem className="w-full">
                  <MapViewProvider {...mapView}>
                    <MapView
                      onClick={handleOnClick}
                      className="border border-[#bbb] hover:border-black rounded-md w-full aspect-video"
                    />
                  </MapViewProvider>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
