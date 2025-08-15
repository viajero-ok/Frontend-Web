import { useIonRouter } from "@ionic/react";
import { useEffect, useState } from "react";
import { getDatosDeRegistro } from "../../../../App/Auth/Registro";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "../../../../components/ui/DatePicker/DatePicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/Form/Field";
import { Input } from "../../../../components/ui/Input/Input";
import { Select, SelectOption } from "../../../../components/ui/Select/Select";
import { registrarPrestador } from "../../../../App/Auth/Prestador";

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

const formSchema = z.object({
  nombre: z
    .string({ message: "El campo es requerido" })
    .min(1, "Mínimo 1 caracter")
    .max(100, "Máximo 100 caracteres"),
  apellido: z
    .string({ message: "El campo es requerido" })
    .min(1, "Mínimo 1 caracter")
    .max(100, "Máximo 100 caracteres"),
  nro_documento_identidad: z
    .string({ message: "El campo es requerido" })
    .min(7, "Mínimo 7 dígitos")
    .max(8, "Máximo 8 dígitos")
    .regex(/^[0-9]+$/, "Solo dígitos"),
  id_tipo_documento: z.number({ message: "El campo es requerido" }),
  telefono: z
    .string({ message: "El campo es requerido" })
    .regex(/^[0-9]+$/, "Solo dígitos")
    .length(11, "Debe tener 11 dígitos"),
  id_localidad: z.number({ message: "El campo es requerido" }),
  id_departamento: z.number({ message: "El campo es requerido" }),
  id_provincia: z.number({ message: "El campo es requerido" }),
  cuit: z
    .string({ message: "El campo es requerido" })
    .regex(/^[0-9]{2}-[0-9]{8}-[0-9]$/, "Solo dígitos separados por guiones")
    .length(13, "Debe tener 13 digitos separados por guiones"),
  razon_social: z
    .string({ message: "El campo es requerido" })
    .min(3, "Minimo 3 caracteres")
    .max(100, "Máximo 100 caracteres"),
  fecha_nacimiento: z.string({ message: "El campo es requerido" }),
});

export default function SignupPrestadorForm(props: any) {
  // const [idiomas, setIdiomas] = useState<any[]>();
  // const [generos, setGeneros] = useState<any[]>();
  const [tiposDocumento, setTiposDocumento] = useState<any[]>([]);
  // const [pais, setPaises] = useState<any[]>();
  const [provincias, setProvincias] = useState<any[]>([]);
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [localidades, setLocalidades] = useState<any[]>([]);

  const router = useIonRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    getDatosDeRegistro().then((response: any) => {
      const datosRegistro = response.data.datos_registro;

      console.log(datosRegistro.ubicaciones);

      setProvincias(datosRegistro.ubicaciones.provincias);
      setDepartamentos(datosRegistro.ubicaciones.departamentos);
      setLocalidades(datosRegistro.ubicaciones.localidades);

      setTiposDocumento(datosRegistro.tipos_documento);
    });
  }, []);

  const handleRegistrarme = (values: any) => {
    console.log("llega 1");
    if (!form) return;
    if (!router) return;
    console.log("llega 2");
    registrarPrestador(values).then((response: any) => {
      router.push("/home");
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("llega");
    registrarPrestador(values).then((response: any) => {
      router.push("/home");
    });
  }

  const formWatch = form.watch();

  useEffect(() => {
    form.resetField("id_departamento");
    form.resetField("id_localidad");
  }, [formWatch.id_provincia]);
  useEffect(() => form.resetField("id_localidad"), [formWatch.id_departamento]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col px-4"
      >
        <div className="grid grid-cols-3 gap-2 mt-4">
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
            name="apellido"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Apellido" {...field} />
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
                  <Select placeholder="Tipo de documento" {...field}>
                    {tiposDocumento.map((tipoDocumento: any) => (
                      <SelectOption
                        key={tipoDocumento.id_tipo_documento_identidad}
                        value={tipoDocumento.id_tipo_documento_identidad}
                      >
                        {tipoDocumento.tipo_documento_identidad}
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
            name="nro_documento_identidad"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Número de documento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cuit"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="CUIT" {...field} />
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
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="telefono" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="razon_social"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Razón social" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fecha_nacimiento"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker placeholder="Fecha de nacimiento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <button type="submit" className="viajero-button py-2 mt-4 w-full">
          Registrarme
        </button>
      </form>
    </Form>
  );
}
