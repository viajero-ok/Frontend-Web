import { IonButton, IonCol, IonList, IonRow, useIonRouter } from "@ionic/react";
import Field from "../../../../components/Field/Field";
import { useForm } from "../../../../hooks/UseForm/FormProvider";
import { Validator as v } from "../../../../hooks/UseForm/Validator/Validator";
import { useEffect, useState } from "react";
import { getDatosDeRegistro } from "../../../../App/Auth/Registro";
import { registrarTurista } from "../../../../App/Auth/Turista";

export default function SignupTuristaForm(props: any) {
  const [idiomas, setIdiomas] = useState<any[]>();
  const [generos, setGeneros] = useState<any[]>();
  const [tiposDocumento, setTiposDocumento] = useState<any[]>();
  const [ubicaciones, setUbicaciones] = useState<any[]>();
  const [provincias, setProvincias] = useState<any[]>();
  const [paises, setPaises] = useState<any[]>();

  const form = useForm();
  const router = useIonRouter();

  useEffect(() => {
    getDatosDeRegistro("turista").then((response: any) => {
      const datosRegistro = response.data.datos_registro;

      setPaises(
        datosRegistro.ubicaciones.paises.map((pais: any) => {
          return { id: pais.id_pais, text: pais.pais };
        })
      );

      setUbicaciones(
        datosRegistro.ubicaciones.provincias.map((provincia: any) => {
          return {
            id: provincia.id_provincia,
            text: provincia.provincia,
            departamentos: datosRegistro.ubicaciones.departamentos
              .filter(
                (departamento: any) =>
                  departamento.id_provincia == provincia.id_provincia
              )
              .map((departamento: any) => {
                return {
                  id: departamento.id_departamento,
                  text: departamento.departamento,
                  localidades: datosRegistro.ubicaciones.localidades
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

      setProvincias(
        datosRegistro.ubicaciones.provincias.map((provincia: any) => {
          return { id: provincia.id_provincia, text: provincia.provincia };
        })
      );

      setIdiomas(
        datosRegistro.idiomas.map((idioma: any) => {
          return { id: idioma.id_idioma, text: idioma.idioma };
        })
      );
      setGeneros(
        datosRegistro.generos.map((genero: any) => {
          return { id: genero.id_genero, text: genero.genero };
        })
      );

      // setPaises(paises);

      // const tiposDocumento = datosRegistro.tipos_documento.map(
      //   (tipoDocumento: any) => tipoDocumento.tipo_documento_identidad
      // );
      setTiposDocumento(datosRegistro.tipos_documento);
    });
  }, []);

  const handleRegistrarme = () => {
    if (!form) return;
    registrarTurista({
      nombre: form.schema.nombre,
      apellido: form.schema.apellido,
      nro_documento_identidad: form.schema.numeroDeDocumento,
      id_tipo_documento: form.schema.tipoDeDocumento,
      telefono: form.schema.telefono,
      id_localidad: form.schema.localidad,
      id_departamento: form.schema.departamento,
      id_provincia: form.schema.provincia,
      id_pais: form.schema.pais,
      id_idioma: form.schema.idioma,
      id_genero: form.schema.genero,
      fecha_nacimiento: form.schema.fechaDeNacimiento,
    });
  };

  return (
    form && (
      <IonList
        style={{
          marginTop: "13pt",
        }}
      >
        <Field
          name="nombre"
          label="Nombre"
          required
          value={form?.schema?.nombre}
          form={form}
          valid={v().required("El campo es requerido")}
        />
        <Field
          name="apellido"
          label="Apellido"
          required
          value={form?.schema?.apellido}
          form={form}
        />
        <Field
          select
          options={
            tiposDocumento
              ? tiposDocumento.map((tipoDocumento: any) => {
                  return {
                    id: tipoDocumento.id_tipo_documento_identidad,
                    text: tipoDocumento.tipo_documento_identidad,
                  };
                })
              : []
          }
          name="tipoDeDocumento"
          label="Tipo de documento"
          required
          value={form?.schema?.tipoDeDocumento}
          form={form}
        />
        <Field
          name="numeroDeDocumento"
          label="Número de documento"
          required
          value={form?.schema?.numeroDeDocumento}
          form={form}
        />
        <Field
          select
          options={paises ?? []}
          name="pais"
          label="Pais"
          required
          value={form?.schema?.pais}
          form={form}
        />
        <Field
          select
          options={provincias ?? []}
          name="provincia"
          label="Provincia"
          required
          value={form?.schema?.provincia}
          form={form}
          disabled={form?.schema?.pais != 1}
        />
        <Field
          select
          options={
            ubicaciones && form.schema.provincia != ""
              ? ubicaciones
                  .filter(
                    (provincia: any) => provincia.id == form.schema.provincia
                  )[0]
                  .departamentos.map((departamento: any) => {
                    return { id: departamento.id, text: departamento.text };
                  })
              : []
          }
          name="departamento"
          label="Departamento"
          required
          value={form?.schema?.departamento}
          form={form}
          disabled={form?.schema?.pais != 1}
        />
        <Field
          select
          options={
            ubicaciones &&
            form.schema.departamento &&
            form.schema.provincia != ""
              ? ubicaciones
                  .filter(
                    (provincia: any) => provincia.id == form.schema.provincia
                  )[0]
                  .departamentos.filter(
                    (departamento: any) =>
                      departamento.id == form.schema.departamento
                  )[0]
                  .localidades.map((localidad: any) => {
                    return { id: localidad.id, text: localidad.text };
                  })
              : []
          }
          name="localidad"
          label="Localidad"
          required
          value={form?.schema?.localidad}
          form={form}
        />
        <Field
          name="telefono"
          label="Teléfono"
          required
          value={form?.schema?.telefono}
          form={form}
        />
        <Field
          select
          options={idiomas ?? []}
          name="idioma"
          label="Idioma"
          required
          value={form?.schema?.idioma}
          form={form}
        />
        <Field
          select
          options={generos ?? []}
          name="genero"
          label="Género"
          required
          value={form?.schema?.genero}
          form={form}
        />
        <Field
          date
          name="fechaDeNacimiento"
          label="FechaDeNacimiento"
          required
          value={form?.schema?.fechaDeNacimiento}
          form={form}
        />
        <IonRow>
          <IonCol
            style={{
              display: "flex",
              justifyContent: "left",
              margin: "13pt",
            }}
          >
            <IonButton color="light" onClick={() => router.goBack()}>
              Volver
            </IonButton>
          </IonCol>
          <IonCol
            style={{
              display: "flex",
              justifyContent: "right",
              margin: "13pt",
            }}
          >
            <IonButton onClick={() => handleRegistrarme()} style={{}}>
              Registrarme
            </IonButton>
          </IonCol>
        </IonRow>
      </IonList>
    )
  );
}
