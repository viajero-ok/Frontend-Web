import { IonCol, IonItem, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import Field from "../../../../components/Field/Field";
import { useForm } from "../../../../hooks/UseForm/FormProvider";
import { useState } from "react";

type TDatosBasicosActividad = {
    categoria: any;
    tipoSubCategoria: any;
    dificultad: any;
};

export default function DatosBasicosActividad(props: TDatosBasicosActividad) {
    const form = useForm();
    const [tipoSubCategoria, setTipoSubCategoria] = useState<number>();
    const [categoria, setCategoria] = useState<number>();
    const [dificultad, setDificultad] = useState<number>();

    return (
        props.categoria && (
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
                <IonRow>
                    <IonCol
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <Field
                            form={form}
                            name="nombre_actividad"
                            label="Nombre de la actividad"
                        />
                    </IonCol>
                    <IonCol
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <IonSelect
                            label="Categoría"
                            onIonChange={(e) =>
                                setCategoria(
                                    e.target.value
                                )
                            }
                        >
                            {props.categoria.map(
                                (tipo: any) => (
                                    <IonSelectOption
                                        key={tipo.id_sub_tipo_oferta}
                                        value={
                                            tipo.id_sub_tipo_oferta
                                        }
                                    >
                                        {
                                            tipo.nombre_sub_tipo_oferta
                                        }
                                    </IonSelectOption>
                                )
                            )}
                        </IonSelect>
                    </IonCol>
                    <IonCol
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >

                        <div>
                            <IonRow>
                                <IonItem>
                                    <IonSelect
                                        label="Sub Categoría"
                                        onIonChange={(e) =>
                                            setTipoSubCategoria(
                                                e.target.value
                                            )
                                        }
                                    >
                                        {props.tipoSubCategoria.filter((subTipo: any) => subTipo.id_sub_tipo_oferta === categoria).map(
                                            (tipo: any) => (
                                                <IonSelectOption
                                                    key={tipo.id_sub_categoria}
                                                    value={
                                                        tipo.id_sub_categoria
                                                    }
                                                >
                                                    {
                                                        tipo.nombre_sub_categoria
                                                    }
                                                </IonSelectOption>
                                            )
                                        )}
                                    </IonSelect>
                                </IonItem>
                            </IonRow>
                        </div>
                    </IonCol>
                </IonRow>
                <IonRow
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                    }}
                >
                    <Field
                        textarea
                        form={form}
                        name="descripcion_actiidad"
                        label="Descripción de la actividad"
                    />
                </IonRow>
                <IonRow>
                    <IonCol
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <Field
                            form={form}
                            name="duracion_actividad"
                            label="Duración (horas)"
                        />
                    </IonCol>
                    <IonCol
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <Field
                            form={form}
                            name="distancia_actividad"
                            label="Distancia (km)"
                        />
                    </IonCol>
                    <IonCol
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <IonSelect
                            label="Dificultad"
                            onIonChange={(e) =>
                                setDificultad(
                                    e.target.value
                                )
                            }
                        >
                            {props.dificultad.map(
                                (tipo: any) => (
                                    <IonSelectOption
                                        key={tipo.id_dificultad}
                                        value={
                                            tipo.id_dificultad
                                        }
                                    >
                                        {
                                            tipo.dificultad
                                        }
                                    </IonSelectOption>
                                )
                            )}
                        </IonSelect>
                    </IonCol>
                </IonRow>
                <IonRow
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                    }}
                >
                    <Field
                        textarea
                        form={form}
                        name="requisitos_actividad"
                        label="Requisitos y/o recomendaciones"
                    />
                </IonRow>
            </div>
        )
    );
}

