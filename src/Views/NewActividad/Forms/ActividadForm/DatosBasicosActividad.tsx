import { IonCol, IonItem, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import Field from "../../../../components/Field/Field";
import { useForm } from "../../../../hooks/UseForm/FormProvider";
import { Dispatch, SetStateAction, useState } from "react";
import { TBodyGuardarActividad } from "../../../../App/Actividades/Actividad";

type TDatosBasicosActividad = {
    categoria: any;
    subCategorias: any;
    dificultad: any;
    formDatosBasicos: TBodyGuardarActividad[];
    setFormDatosBasicos: Dispatch<SetStateAction<TBodyGuardarActividad[]>>;
};

export default function DatosBasicosActividad(props: TDatosBasicosActividad) {
    const form = useForm();
    return (
        props.categoria &&
        props.subCategorias &&
        props.dificultad && (
            <div
                style={{
                    padding: "10pt",
                    paddingBottom: "20pt",
                    marginBottom: "30pt",
                    marginLeft: "10%",
                    border: "2px solid #F08408",
                    borderRadius: "10pt",
                    width: "80%",
                }}
            >
                <IonRow
                    style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h3 style={{ fontWeight: "bold" }}>Datos básicos</h3>
                </IonRow>
                <IonRow
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        margin: "1pt",
                    }}>
                    <IonCol
                        style={{
                            margin: "10pt",
                        }}>
                        <Field
                            form={form}
                            name="nombre_actividad"
                            label="Nombre de la actividad"
                        />
                    </IonCol>
                    <IonCol
                        style={{
                            margin: "10pt",
                        }}
                    >
                        <Field
                            value={
                                form?.schema.id_sub_tipo_oferta
                            }
                            select
                            options={props.categoria.map(
                                (categorias: any) => ({
                                    id: categorias.id_sub_tipo_oferta,
                                    text: categorias.nombre_sub_tipo_oferta,
                                })
                            )}
                            form={form}
                            name="id_sub_tipo_oferta"
                            label="Categoría"
                        />
                    </IonCol>
                    <IonCol
                        style={{
                            margin: "10pt",
                        }}>
                        <IonRow style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            margin: "1pt",
                        }}>
                            <Field
                                value={
                                    form?.schema.id_sub_categoria
                                }
                                select
                                options={props.subCategorias.filter((subTipo: any) =>
                                    form?.schema.id_sub_tipo_oferta === subTipo.id_sub_tipo_oferta
                                ).map(
                                    (tipo: any) => ({
                                        id: tipo.id_sub_categoria,
                                        text: tipo.nombre_sub_categoria,
                                    })
                                )}
                                form={form}
                                name="id_sub_categoria"
                                label="Sub Categoría"
                            />

                            {/*     {props.tipoSubCategoria.filter((subTipo: any) => 
                                    props.formDatosBasicos.some((dato) => 
                                        dato.id_sub_tipo_oferta === subTipo.id_sub_tipo_oferta
                                    )
                                ).map(
                                    (tipo: any) => (
                                        <IonSelectOption
                                            key={tipo.id_sub_categoria}
                                            value={tipo.id_sub_categoria}
                                        >
                                            {tipo.nombre_sub_categoria}
                                        </IonSelectOption>
                                    )
                                )} */}
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol
                        style={{
                            margin: "10pt",
                        }}>
                        <Field
                            textarea
                            rows={4}
                            maxLength={200}
                            form={form}
                            name="descripcion_actividad"
                            label="Descripción de la actividad"
                        />
                    </IonCol>
                </IonRow>
                <IonRow style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    margin: "1pt",
                }}>
                    <IonCol
                        style={{
                            margin: "10pt",
                        }}>
                        <Field
                            form={form}
                            name="duracion_actividad"
                            label="Duración (horas)"
                        />
                    </IonCol>
                    <IonCol
                        style={{
                            margin: "10pt",
                        }}>
                        <Field
                            form={form}
                            name="distancia_actividad"
                            label="Distancia (km)"
                        />
                    </IonCol>
                    <IonCol
                        style={{
                            margin: "10pt",
                        }}>
                        <Field
                            value={
                                form?.schema.id_dificultad
                            }
                            select
                            options={props.dificultad.map(
                                (dificultad: any) => ({
                                    id: dificultad.id_dificultad,
                                    text: dificultad.dificultad,
                                })
                            )}
                            form={form}
                            name="id_dificultad"
                            label="Dificultad"
                        />
                    </IonCol>
                </IonRow>
                <IonRow
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        margin: "1pt",
                    }}>
                    <IonCol
                        style={{
                            margin: "10pt",
                        }}
                    >
                        <Field
                            textarea
                            rows={4}
                            maxLength={200}
                            form={form}
                            name="requisitos_actividad"
                            label="Requisitos y/o recomendaciones"
                        />
                    </IonCol>
                </IonRow>
            </div>
        )
    );
}

