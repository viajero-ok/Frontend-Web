import { IonButton, IonList, useIonRouter } from "@ionic/react";
import { useMaskito } from "@maskito/react";
import { useEffect, useState } from "react";
import { registrarPrestador } from "../../../../App/Auth/Prestador";
import { getDatosDeRegistro } from "../../../../App/Auth/Registro";
import Field from "../../../../components/Field/Field";
import { CUIT_MASK, DNI_MASK } from "../../../../components/Field/masks/masks";
import { useForm } from "../../../../hooks/UseForm/FormProvider";
import { Validator as v } from "../../../../hooks/UseForm/Validator/Validator";

export default function SignupPrestadorForm(props: any) {
  // const [idiomas, setIdiomas] = useState<any[]>();
  // const [generos, setGeneros] = useState<any[]>();
  const [tiposDocumento, setTiposDocumento] = useState<any[]>();
  const [ubicaciones, setUbicaciones] = useState<any[]>();
  // const [pais, setPaises] = useState<any[]>();
  const [provincias, setProvincias] = useState<any[]>();
  const [departamentos, setDepartamentos] = useState<any[]>();
  const [localidades, setLocalidades] = useState<any[]>();
  const form = useForm();
  const router = useIonRouter();

  useEffect(() => {
    getDatosDeRegistro().then((response: any) => {
      const datosRegistro = response.data.datos_registro;

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
      // setPaises(paises);

      // const tiposDocumento = datosRegistro.tipos_documento.map(
      //   (tipoDocumento: any) => tipoDocumento.tipo_documento_identidad
      // );
      setTiposDocumento(datosRegistro.tipos_documento);
    });
  }, []);

  const handleRegistrarme = () => {
    if (!form) return;
    if (!router) return;
    registrarPrestador({
      nombre: form.schema.nombre,
      apellido: form.schema.apellido,
      nro_documento_identidad: form.schema.numeroDeDocumento,
      id_tipo_documento: form.schema.tipoDeDocumento,
      telefono: form.schema.telefono,
      id_localidad: form.schema.localidad,
      id_departamento: form.schema.departamento,
      id_provincia: form.schema.provincia,
      cuit: form.schema.CUIT,
      razon_social: form.schema.razonSocial,
      sitio_web: form.schema.sitioWeb,
      fecha_nacimiento: form.schema.fechaDeNacimiento,
    }).then((response: any) => {
      router.push("/login");
    });
  };

  return (
    form && (
      <IonList
        style={{
          width: "50%",
          marginLeft: "50%",
          transform: "translateX(-50%)",
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
          mask={useMaskito(DNI_MASK)}
        />
        <Field
          name="CUIT"
          label="CUIT"
          required
          value={form?.schema?.CUIT}
          form={form}
          mask={useMaskito(CUIT_MASK)}
        />
        <Field
          select
          options={provincias ?? []}
          name="provincia"
          label="Provincia"
          required
          value={form?.schema?.provincia}
          form={form}
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
          name="razonSocial"
          label="Razón Social"
          required
          value={form?.schema?.razonSocial}
          form={form}
        />
        <Field
          name="sitioWeb"
          label="Sitio Web"
          required
          value={form?.schema?.sitioWeb}
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
        <IonButton
          onClick={() => handleRegistrarme()}
          style={{ marginTop: "13pt" }}
        >
          Registrarme
        </IonButton>
      </IonList>
    )
  );
}
