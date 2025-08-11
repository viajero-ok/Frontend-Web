import { IonButton, IonCol, IonList, IonRow, useIonRouter } from "@ionic/react";
import Field from "../../../../components/Field/Field";
import { Validator as v } from "../../../../hooks/UseForm/Validator/Validator";
import { useEffect, useState } from "react";
import { getDatosDeRegistro } from "../../../../App/Auth/Registro";
import { registrarTurista } from "../../../../App/Auth/Turista";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/Form/Field";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../../../components/ui/Input/Input";
import { Select, SelectOption } from "../../../../components/ui/Select/Select";
import { DatePicker } from "../../../../components/ui/DatePicker/DatePicker";
import { useModal } from "../../../../components/ui/Modal/Modal";
import { useToast } from "../../../../components/ui/Toast/Toast";

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
  id_idioma: z.number({ message: "El campo es requerido" }),
  id_genero: z.number({ message: "El campo es requerido" }),
  fecha_nacimiento: z.string({ message: "El campo es requerido" }),
});

export default function SignupTuristaForm(props: any) {
  const [idiomas, setIdiomas] = useState<any[]>([]);
  const [generos, setGeneros] = useState<any[]>([]);
  const [tiposDocumento, setTiposDocumento] = useState<any[]>([]);

  const [provincias, setProvincias] = useState<any[]>([]);
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [localidades, setLocalidades] = useState<any[]>([]);

  const router = useIonRouter();
  const { modal, setOpen } = useModal();
  const { toast } = useToast();

  useEffect(() => {
    getDatosDeRegistro("turista").then((response: any) => {
      const datosRegistro = response.data.datos_registro;

      setProvincias(datosRegistro.ubicaciones.provincias);
      setDepartamentos(datosRegistro.ubicaciones.departamentos);
      setLocalidades(datosRegistro.ubicaciones.localidades);

      setTiposDocumento(datosRegistro.tipos_documento);
      setIdiomas(datosRegistro.idiomas);
      setGeneros(datosRegistro.generos);
    });
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!form) return;
    if (!router) return;
    registrarTurista(values)
      .then((response: any) => {
        modal({
          variant: "success",
          title: "Registro completado",
          description:
            "El registro como turista ha sido completado exitosamente.",
          actions: (
            <>
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/");
                }}
                className="viajero-button px-4 py-2 bg-green-400! hover:bg-green-400/90!"
              >
                Continuar
              </button>
            </>
          ),
          canDismiss: false,
        });
      })
      .catch(() => {
        toast({
          variant: "danger",
          title:
            "Error al intentar realizar el registro del turista. Intente nuevamente",
        });
      });
  }

  // const handleRegistrarme = () => {
  //   if (!form) return;
  //   if (!router) return;
  //   registrarTurista({
  //     nombre: form.schema.nombre,
  //     apellido: form.schema.apellido,
  //     nro_documento_identidad: form.schema.numeroDeDocumento,
  //     id_tipo_documento: form.schema.tipoDeDocumento,
  //     telefono: form.schema.telefono,
  //     id_localidad: form.schema.localidad,
  //     id_departamento: form.schema.departamento,
  //     id_provincia: form.schema.provincia,
  //     id_pais: form.schema.pais,
  //     id_idioma: form.schema.idioma,
  //     id_genero: form.schema.genero,
  //     fecha_nacimiento: form.schema.fechaDeNacimiento,
  //   }).then((response: any) => {
  //     router.push("/home");
  //   });
  // };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });
  const formWatch = form.watch();

  useEffect(() => {
    form.resetField("id_departamento");
    form.resetField("id_localidad");
  }, [formWatch.id_provincia]);
  useEffect(() => form.resetField("id_localidad"), [formWatch.id_departamento]);

  return (
    <div className="flex flex-col gap-2">
      <div className="border border-gray-200 bg-gray-50 text-2xl text-gray-600 font-bold p-4 rounded-md">
        Registrarme como turista
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-2 p-4 mb-12 border border-gray-200 rounded-md"
          onSubmit={form.handleSubmit(onSubmit)}
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
              name="id_idioma"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select placeholder="Idioma" {...field}>
                      {idiomas &&
                        idiomas.map((idioma: any) => (
                          <SelectOption
                            key={idioma.id_idioma}
                            value={idioma.id_idioma}
                          >
                            {idioma.idioma}
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
              name="id_genero"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select placeholder="Género" {...field}>
                      {generos &&
                        generos.map((genero: any) => (
                          <SelectOption
                            key={genero.id_genero}
                            value={genero.id_genero}
                          >
                            {genero.genero}
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
              name="fecha_nacimiento"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <DatePicker placeholder="Fecha de nacimiento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <button type="submit" className="viajero-button py-2 mt-2 w-full">
            Registrarme
          </button>
        </form>
      </Form>
    </div>
  );

  // return (
  //   form && (
  //     <IonList
  //       style={{
  //         marginTop: "13pt",
  //       }}
  //     >
  //       <Field
  //         name="nombre"
  //         label="Nombre"
  //         required
  //         value={form?.schema?.nombre}
  //         form={form}
  //         valid={v().required("El campo es requerido")}
  //       />
  //       <Field
  //         name="apellido"
  //         label="Apellido"
  //         required
  //         value={form?.schema?.apellido}
  //         form={form}
  //       />
  //       <Field
  //         select
  //         options={
  //           tiposDocumento
  //             ? tiposDocumento.map((tipoDocumento: any) => {
  //                 return {
  //                   id: tipoDocumento.id_tipo_documento_identidad,
  //                   text: tipoDocumento.tipo_documento_identidad,
  //                 };
  //               })
  //             : []
  //         }
  //         name="tipoDeDocumento"
  //         label="Tipo de documento"
  //         required
  //         value={form?.schema?.tipoDeDocumento}
  //         form={form}
  //       />
  //       <Field
  //         name="numeroDeDocumento"
  //         label="Número de documento"
  //         required
  //         value={form?.schema?.numeroDeDocumento}
  //         form={form}
  //       />
  //       <Field
  //         select
  //         options={paises ?? []}
  //         name="pais"
  //         label="Pais"
  //         required
  //         value={form?.schema?.pais}
  //         form={form}
  //       />
  //       <Field
  //         select
  //         options={provincias ?? []}
  //         name="provincia"
  //         label="Provincia"
  //         required
  //         value={form?.schema?.provincia}
  //         form={form}
  //         disabled={form?.schema?.pais != 1}
  //       />
  //       <Field
  //         select
  //         options={
  //           ubicaciones && form.schema.provincia != ""
  //             ? ubicaciones
  //                 .filter(
  //                   (provincia: any) => provincia.id == form.schema.provincia
  //                 )[0]
  //                 .departamentos.map((departamento: any) => {
  //                   return { id: departamento.id, text: departamento.text };
  //                 })
  //             : []
  //         }
  //         name="departamento"
  //         label="Departamento"
  //         required
  //         value={form?.schema?.departamento}
  //         form={form}
  //         disabled={form?.schema?.pais != 1}
  //       />
  //       <Field
  //         select
  //         options={
  //           ubicaciones &&
  //           form.schema.departamento &&
  //           form.schema.provincia != ""
  //             ? ubicaciones
  //                 .filter(
  //                   (provincia: any) => provincia.id == form.schema.provincia
  //                 )[0]
  //                 .departamentos.filter(
  //                   (departamento: any) =>
  //                     departamento.id == form.schema.departamento
  //                 )[0]
  //                 .localidades.map((localidad: any) => {
  //                   return { id: localidad.id, text: localidad.text };
  //                 })
  //             : []
  //         }
  //         name="localidad"
  //         label="Localidad"
  //         required
  //         value={form?.schema?.localidad}
  //         form={form}
  //       />
  //       <Field
  //         name="telefono"
  //         label="Teléfono"
  //         required
  //         value={form?.schema?.telefono}
  //         form={form}
  //       />
  //       <Field
  //         select
  //         options={idiomas ?? []}
  //         name="idioma"
  //         label="Idioma"
  //         required
  //         value={form?.schema?.idioma}
  //         form={form}
  //       />
  //       <Field
  //         select
  //         options={generos ?? []}
  //         name="genero"
  //         label="Género"
  //         required
  //         value={form?.schema?.genero}
  //         form={form}
  //       />
  //       <Field
  //         date
  //         name="fechaDeNacimiento"
  //         label="FechaDeNacimiento"
  //         required
  //         value={form?.schema?.fechaDeNacimiento}
  //         form={form}
  //       />
  //       <IonRow>
  //         <IonCol
  //           style={{
  //             display: "flex",
  //             justifyContent: "left",
  //             margin: "13pt",
  //           }}
  //         >
  //           <IonButton style={{
  //             "--background": "white",
  //             "--color": "#F08408", }} onClick={() => router.goBack()}>
  //             Volver
  //           </IonButton>
  //         </IonCol>
  //         <IonCol
  //           style={{
  //             display: "flex",
  //             justifyContent: "right",
  //             margin: "13pt",
  //           }}
  //         >
  //           <IonButton onClick={() => handleRegistrarme()} style={{
  //             "--background": "#F08408",
  //             "--color": "white",}}>
  //             Registrarme
  //           </IonButton>
  //         </IonCol>
  //       </IonRow>
  //     </IonList>
  //   )
  // );
}
