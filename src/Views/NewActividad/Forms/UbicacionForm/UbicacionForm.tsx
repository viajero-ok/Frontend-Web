import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonGrid,
  IonRow,
  IonToggle,
  useIonRouter,
} from "@ionic/react";
import MapView from "../../../../components/MapView/MapView";
import Field from "../../../../components/Field/Field";
import { useEffect, useState } from "react";
import { LatLng, LeafletMouseEvent } from "leaflet";
import {
  TUbicacion,
  guardarUbicacion,
} from "../../../../App/Actividades/Ubicacion";
import { getUbicaciones } from "../../../../App/Ubicaciones/Ubicaciones";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/Form/Field";
import { Input } from "../../../../components/ui/Input/Input";
import { Check } from "../../../../components/ui/Check/Check";
import { Select, SelectOption } from "../../../../components/ui/Select/Select";

const formSchema = z.object({
  calle: z.string({ message: "El campo es requerido" }),
  sin_numero: z.boolean().optional(),
  numero: z.string({ message: "El campo es requerido" }),
  id_localidad: z.number({ message: "El campo es requerido" }),
  id_departamento: z.number({ message: "El campo es requerido" }),
  id_provincia: z.number({ message: "El campo es requerido" }),
  latitud: z.string({ message: "El campo es requerido" }),
  longitud: z.string({ message: "El campo es requerido" }),
  observaciones: z.string().optional(),
});

type TUbicacionForm = {
  idOferta: string;
  id_establecimiento: number;
};
export default function UbicacionForm(props: TUbicacionForm) {
  const [markerPos, setMarkerPos] = useState<LatLng>();
  const router = useIonRouter();

  const [ubicaciones, setUbicaciones] = useState<any[]>();
  const [provincias, setProvincias] = useState<any[]>();
  const [sinNumero, setSinNumero] = useState<boolean>(false);
  const [ubiEstablecimiento, setUbiEstablecimiento] = useState<boolean>(false);

  useEffect(() => {
    getUbicaciones()
      .then((response: any) => {
        const ubicaciones = response.data.ubicaciones;
        setUbicaciones(
          ubicaciones.provincias
            .filter((provincia: any) => provincia.id_provincia == 6)
            .map((provincia: any) => {
              return {
                id: provincia.id_provincia,
                text: provincia.provincia,
                departamentos: ubicaciones.departamentos
                  .filter(
                    (departamento: any) =>
                      departamento.id_provincia == provincia.id_provincia
                  )
                  .map((departamento: any) => {
                    return {
                      id: departamento.id_departamento,
                      text: departamento.departamento,
                      localidades: ubicaciones.localidades
                        .filter(
                          (localidad: any) =>
                            localidad.id_departamento ==
                            departamento.id_departamento
                        )
                        .map((localidad: any) => {
                          return {
                            id: localidad.id_localidad,
                            text: localidad.localidad,
                          };
                        }),
                    };
                  }),
              };
            })
        );
        console.log(ubicaciones.departamentos[0]);
        setProvincias(
          ubicaciones.provincias
            .filter((provincia: any) => provincia.id_provincia == 6)
            .map((provincia: any) => {
              return { id: provincia.id_provincia, text: provincia.provincia };
            })
        );
      })
      .catch((error: any) => {});
  }, []);

  const handleOnClick = (e: LeafletMouseEvent) => {
    setUbiEstablecimiento(false);
    setMarkerPos(e.latlng);
  };

  const handleRegistrarUbicacion = () => {
    // if (!form) return;
    // if (!form.schema) return;
    // const schema = form?.schema;
    // if (ubiEstablecimiento) {
    //   guardarUbicacion({
    //     id_oferta: props.idOferta,
    //     id_establecimiento: props.id_establecimiento,
    //     misma_ubicacion_establecimiento: ubiEstablecimiento,
    //     observaciones: schema.observaciones
    //   })
    // }
    // else {
    //   guardarUbicacion({
    //     id_oferta: props.idOferta,
    //     calle: schema.calle,
    //     sin_numero: sinNumero,
    //     numero: schema.numero,
    //     id_localidad: parseInt(schema.localidad),
    //     id_departamento: parseInt(schema.departamento),
    //     id_provincia: 6,
    //     latitud: markerPos ? markerPos.lat.toString() : "0.0",
    //     longitud: markerPos ? markerPos.lng.toString() : "0.0",
    //     observaciones: schema.observaciones,
    //   })
    //     .then((response: any) => {
    //       console.log(response);
    //     })
    //     .then((error: any) => { });
    // }
  };

  const handleCheckboxChange = (event: any) => {
    const isChecked = event.detail.checked;
    setSinNumero(isChecked);
  };

  /** REFACTOR */

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      sin_numero: false,
    },
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2 mt-4">
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
                    <Input placeholder="Calle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2">
              <Check className="h-[42pt]">Sin número</Check>
              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Número" {...field} />
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
                      <Select placeholder="Provincia" {...field}>
                        {[].map((provincia: any) => (
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
                      <Select placeholder="Provincia" {...field}>
                        {[].map((departamento: any) => (
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
                      <Select placeholder="Localidad" {...field}>
                        {[].map((localidad: any) => (
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
                    <Input placeholder="Observaciones" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Check
              className="h-[42pt]"
              checked={ubiEstablecimiento}
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
            <div className="flex flex-row justify-between">
              <button
                className="viajero-button-ghost px-4 py-2"
                onClick={() => router && router.push("/my-offers")}
              >
                Volver
              </button>
              <button
                className="viajero-button px-4 py-2"
                onClick={() => handleRegistrarUbicacion()}
              >
                Guardar
              </button>
            </div>
            {/* <IonRow
            style={{ marginBottom: "10pt", marginTop: "10pt" }}>
            <Field
              name="calle"
              label="Calle"
              form={form}
            />
          </IonRow>
          <IonRow style={{ alignItems: "center" }}>
            <IonCol size="auto">
              <Field
                name="numero"
                label="Número"
                form={form}
                disabled={ubiEstablecimiento}
              />
            </IonCol>
            <IonCol size="auto" style={{ paddingLeft: "10pt" }}>
              <IonCheckbox
                name="sin_numero"
                labelPlacement="end"
                onIonChange={handleCheckboxChange}
                disabled={ubiEstablecimiento}
              >
                Sin número
              </IonCheckbox>
            </IonCol>
          </IonRow>
          <IonRow
            style={{ marginBottom: "10pt", marginTop: "10pt" }}>
            <Field
              select
              options={provincias ?? []}
              name="provincia"
              label="Provincia"
              form={form}
              disabled={ubiEstablecimiento}
            />
          </IonRow>
          <IonRow
            style={{ marginBottom: "10pt", marginTop: "10pt" }}>
            <Field
              select
              options={
                ubicaciones && form?.schema.provincia != ""
                  ? ubicaciones
                    .filter(
                      (provincia: any) =>
                        provincia.id == form?.schema.provincia
                    )[0]
                    .departamentos.map((departamento: any) => {
                      return {
                        id: departamento.id,
                        text: departamento.text,
                      };
                    })
                  : []
              }
              name="departamento"
              label="Departamento"
              form={form}
              disabled={ubiEstablecimiento}
            />
          </IonRow>
          <IonRow
            style={{ marginBottom: "10pt", marginTop: "10pt" }}>
            <Field
              select
              options={
                ubicaciones &&
                  form?.schema.departamento &&
                  form?.schema.provincia != ""
                  ? ubicaciones
                    .filter(
                      (provincia: any) =>
                        provincia.id == form?.schema.provincia
                    )[0]
                    .departamentos.filter(
                      (departamento: any) =>
                        departamento.id == form?.schema.departamento
                    )[0]
                    .localidades.map((localidad: any) => {
                      return { id: localidad.id, text: localidad.text };
                    })
                  : []
              }
              name="localidad"
              label="Localidad"
              form={form}
              disabled={ubiEstablecimiento}
            />
          </IonRow>
          <IonRow
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "left",
              marginBottom: "10pt", marginTop: "10pt"
            }}
          >
            <Field
              textarea
              form={form}
              name="observaciones"
              label="Observaciones"
            />
          </IonRow> */}
          </div>
          <div className="flex flex-col gap-2">
            {/* <IonToggle
              name="ubiEstablecimiento"
              checked={ubiEstablecimiento}a
              onIonChange={(e) => setUbiEstablecimiento(e.target.checked)}
              style={{ margin: "10pt", paddingLeft: "40%" }}
            >
              Usar ubicación del establecimiento
            </IonToggle> */}

            <MapView
              //pos={ubiEstablecimiento ? { lat: -23, lgn: -53 } : undefined}
              search
              markerOnClick
              onClick={handleOnClick}
              className="border border-[#bbb] hover:border-black rounded-md w-full aspect-video"
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
