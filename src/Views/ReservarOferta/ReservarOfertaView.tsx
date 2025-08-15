import { zodResolver } from "@hookform/resolvers/zod";
import { IonIcon, useIonRouter } from "@ionic/react";
import { location } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { z } from "zod";
import {
  obtenerDatosReservaOferta,
  obtenerResumenOferta,
} from "../../App/Ofertas/Ofertas";
import { reservarOferta } from "../../App/Reservas/Reservas";
import { Check } from "../../components/ui/Check/Check";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/Form/Field";
import { Input } from "../../components/ui/Input/Input";
import { Select, SelectOption } from "../../components/ui/Select/Select";

const formSchema = z.object({
  nombre: z.string(),
  apellido: z.string(),
  id_tipo_documento: z.number(),
  nro_documento: z.string(),
  telefono: z.string(),
  email: z.string(),
  id_pais: z.number(),
});

export default function ReservarOfertaView() {
  const [oferta, setOferta] = useState<any | null>(null);
  const [datosUsuario, setDatosUsuario] = useState<any>();
  const [tiposDocumento, setTiposDocumento] = useState<any>();
  const [paises, setPaises] = useState<any>();
  const [reservaOtro, setReservaOtro] = useState<boolean>(false);

  const params: any = useParams();
  const router = useIonRouter();

  useEffect(() => {
    obtenerDatosReservaOferta()
      .then((response: any) => {
        // form.reset({
        //   nombre: response.data.datosUsuario.nombre,
        //   apellido: response.data.datosUsuario.apellido,
        //   id_tipo_documento: response.data.datosUsuario.id_tipo_documento,
        //   nro_documento: response.data.datosUsuario.nro_documento,
        //   telefono: response.data.datosUsuario.telefono,
        //   email: response.data.datosUsuario.email,
        //   id_pais: response.data.datosUsuario.id_pais,
        // });
        setDatosUsuario(response.data.datosUsuario);
        setTiposDocumento(response.data.tiposDocumento);
        setPaises(response.data.paises);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!params.id) return;
    if (!params.id_detalle) return;
    if (!params.fecha_desde) return;
    if (!params.fecha_hasta) return;
    if (!params.cantidad_personas) return;
    obtenerResumenOferta({
      id_oferta: params.id,
      id_detalle: params.id_detalle,
      fecha_desde: params.fecha_desde,
      fecha_hasta: params.fecha_hasta,
      cantidad_personas: params.cantidad_personas,
    })
      .then((response: any) => {
        setOferta(response.data);
      })
      .catch(() => {});
  }, []);

  const handleReservar = () => {
    reservarOferta({
      id_oferta: params.id,
      mail_contacto: "romerocarranzaemiliano@gmail.com",
      telefono_contacto: "3534286821",
      fecha_desde: params.fecha_desde,
      fecha_hasta: params.fecha_hasta,
      detalles: [
        {
          id_tipo_detalle: params.id_detalle,
          cantidad: 1,
        },
      ],
    })
      .then((response: any) => {
        router.push(`/pago/${response.data.id_reserva}`);
      })
      .catch(() => {});
  };

  const getDateWithFormat = (date: Date) => {
    const weekday = date
      .toLocaleDateString("es-ES", { weekday: "short" })
      .replace(/\./g, "");
    const day = date.getDate();
    const month = date
      .toLocaleDateString("es-ES", { month: "short" })
      .replace(/\./g, "");
    const year = date.getFullYear();

    const finalStr = `${weekday}, ${day} de ${month} de ${year}`;

    return finalStr;
  };

  const getCheckInOutForDate = (date: Date, horarios: any[]) => {
    if (!horarios) return [];

    const keys = {
      lun: "aplica_lunes",
      mar: "aplica_martes",
      mie: "aplica_miercoles",
      jue: "aplica_jueves",
      vie: "aplica_viernes",
      sab: "aplica_sabado",
      dom: "aplica_domingo",
    };

    const weekday = date
      .toLocaleDateString("es-ES", { weekday: "short" })
      .replace(/\./g, "") as keyof typeof keys;

    const result = horarios.filter(
      (horario: any) => horario[keys[weekday]] == 1
    );

    return result;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!datosUsuario) return;
    form.reset({
      nombre: datosUsuario.nombre,
      apellido: datosUsuario.apellido,
      id_tipo_documento: datosUsuario.id_tipo_documento,
      nro_documento: datosUsuario.nro_documento,
      telefono: datosUsuario.telefono,
      email: datosUsuario.email,
      id_pais: datosUsuario.id_pais,
    });
  }, [datosUsuario]);

  return (
    <div className="flex flex-col gap-4 mt-4 mx-8 pb-12">
      <div className="w-full p-4 text-2xl text-gray-600 font-bold border border-gray-200 bg-gray-50 rounded-md">
        Reservar alojamiento
      </div>
      <div className="grid grid-cols-10">
        <div className="col-span-4">
          <div
            className="w-full aspect-video bg-center bg-cover rounded-t-md"
            style={{ backgroundImage: "url(/public/images/cabin1.jpg)" }}
          />
          <div className="w-full border-x border-b rounded-b-md border-gray-200 flex flex-col gap-2 p-4">
            <div className="text-gray-600 font-bold">
              {oferta?.datos_basicos_oferta.nombre}
            </div>
            {/* <div className="text-gray-600 text-sm">{oferta?.datos_basicos_detalle.tipo_detalle}</div> */}
            <div className="flex flex-row gap-1 items-center">
              <IonIcon
                className="text-xl text-[var(--color-viajero)]"
                icon={location}
              />
              <span className="text-sm text-gray-600">
                {oferta?.domicilio.numero} {oferta?.domicilio.nombre_calle}
                {", "}
                {oferta?.domicilio.localidad}
                {", "}Córdoba
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-md mt-4">
            <div className="text-gray-600 font-bold">Datos de la reserva</div>
            <div className="text-sm text-gray-600">
              {oferta?.datos_basicos_detalle.tipo_detalle} para{" "}
              {oferta?.resumen_pago.cantidad_personas} personas durante{" "}
              {oferta?.resumen_pago.noches_estadia} noches
            </div>
            <div className="border-b border-gray-200 w-full" />
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-1 text-gray-600 border-r border-gray-200">
                <div className="text-sm">Entrada</div>
                <div className="font-bold">
                  {getDateWithFormat(new Date(params.fecha_desde))}
                </div>
                <div className="text-sm flex flex-col gap-1">
                  {getCheckInOutForDate(
                    new Date(params.fecha_desde),
                    oferta?.horarios_check_in_out
                  ).map((horario: any) => (
                    <span>
                      {horario.check_in_hora}:{horario.check_in_minuto}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1 text-gray-600 pl-4">
                <div className="text-sm">Salida</div>
                <div className="font-bold">
                  {getDateWithFormat(new Date(params.fecha_hasta))}
                </div>
                <div className="text-sm flex flex-col gap-1">
                  {getCheckInOutForDate(
                    new Date(params.fecha_hasta),
                    oferta?.horarios_check_in_out
                  ).map((horario: any) => (
                    <span>
                      {horario.check_out_hora}:{horario.check_out_minuto}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 py-4 border border-gray-200 rounded-md mt-4">
            <div className="text-gray-600 font-bold mx-4">
              Desglose del precio
            </div>
            <div className="flex flex-row justify-between text-sm text-gray-600 mx-4">
              <div>Tarifa</div>
              <div>
                ${" "}
                {oferta &&
                  `${oferta.tarifas[0].monto_tarifa}`.replace(".", ",")}
              </div>
            </div>
            <div className="w-full bg-[var(--color-viajero)]/10 flex flex-col text-gray-600 py-4 mt-2">
              <div className="flex flex-row justify-between mx-4">
                <div className="font-bold text-xl">
                  {oferta?.resumen_pago.pago_anticipado > 0
                    ? "Pago anticipado"
                    : "Pago total"}
                </div>
                <div className="font-bold text-xl">
                  ${" "}
                  {oferta &&
                    `${oferta.resumen_pago.precio_total}`.replace(".", ",")}
                </div>
              </div>
              <div className="flex flex-row justify-between mx-4 text-sm text-gray-600">
                <div className="">
                  Saldo restante (a pagar en el establecimiento)
                </div>
                <div>$ {oferta?.resumen_pago.pago_anticipado}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <div className="border border-gray-200 flex flex-col gap-2 rounded-md ml-4 p-4">
            <div className="text-xl text-gray-600 font-bold">
              Datos de quien reserva
            </div>
            <Form {...form}>
              <form className="flex flex-col gap-2">
                <Check
                  className="h-[42pt]"
                  onChange={(v: boolean) => {
                    setReservaOtro(v);
                    if (!datosUsuario) return;
                    form.reset({
                      nombre: datosUsuario.nombre,
                      apellido: datosUsuario.apellido,
                      id_tipo_documento: datosUsuario.id_tipo_documento,
                      nro_documento: datosUsuario.nro_documento,
                      telefono: datosUsuario.telefono,
                      email: datosUsuario.email,
                      id_pais: datosUsuario.id_pais,
                    });
                  }}
                >
                  Reserva otra persona distinta al usuario
                </Check>
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={!reservaOtro}
                          placeholder="Nombre"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apellido"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={!reservaOtro}
                          placeholder="apellido"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="id_tipo_documento"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          disabled={!reservaOtro}
                          placeholder="Tipo de documento"
                          {...field}
                        >
                          {tiposDocumento &&
                            tiposDocumento.map((tipoDocumento: any) => (
                              <SelectOption
                                key={tipoDocumento.id_tipo_documento}
                                value={tipoDocumento.id_tipo_documento}
                              >
                                {tipoDocumento.tipo_documento}
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
                  name="nro_documento"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={!reservaOtro}
                          placeholder="Número de documento"
                          {...field}
                        />
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
                        <Input
                          disabled={!reservaOtro}
                          placeholder="Teléfono"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={!reservaOtro}
                          placeholder="Correo electrónico"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="id_pais"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          disabled={!reservaOtro}
                          placeholder="País"
                          {...field}
                        >
                          {paises &&
                            paises.map((pais: any) => (
                              <SelectOption
                                key={pais.id_pais}
                                value={pais.id_pais}
                              >
                                {pais.pais}
                              </SelectOption>
                            ))}
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button className="viajero-button px-4 py-2">
                  Continuar con el pago
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
