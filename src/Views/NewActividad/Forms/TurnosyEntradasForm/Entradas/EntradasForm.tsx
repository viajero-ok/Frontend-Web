import {
    IonButton,
    IonCheckbox,
    IonCol,
    IonIcon,
    IonRow,
    IonTitle,
    useIonRouter,
} from "@ionic/react";
import Field from "../../../../../components/Field/Field";
import { add } from "ionicons/icons";
import { useForm } from "../../../../../hooks/UseForm/FormProvider";
import { Dispatch, SetStateAction, useState } from "react";
import Check from "../../../../../components/Check/Check";
import EntradasRow from "./EntradasRow";
import {
    guardarEntrada,
    TEntrada
} from "../../../../../App/Actividades/TurnosyHorarios";

type TEntradas = {
    idOferta: string;
    handleAgregar: () => void;
};
export default function EntradasForm(props: TEntradas) {
    const form = useForm();
    const [entradas, setEntradas] = useState<TEntrada[]>([]);
    const router = useIonRouter();


    const handleAgregarEntrada = () => {
        console.log("llama");
        guardarEntrada(props.idOferta).then((response: any) => {
            console.log("id: ", response.data.id_entrada);
            setEntradas((prev: TEntrada[]) => [
                ...prev,
                {
                    entradas:
                    {
                        id_entrada: response.data.id_entrada,
                        nombre: "",
                        descripcion: "",
                    },
                },
            ]);
        });
    };



    return (
        <div
            style={{
                padding: "10pt",
                paddingBottom: "20pt",
                marginBottom: "30pt",
                width: "80%",
                marginLeft: "10%",
                border: "2px solid #F08408",
                borderRadius: "10pt",
            }}
        >
            <IonRow
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <IonTitle
                    style={{
                        borderBottom: "2pt solid #F08408",
                        marginBottom: "31pt",
                        padding: "2pt",
                    }}
                >
                    Entradas
                </IonTitle>
            </IonRow>
            <IonRow
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "13pt",
                }}
            >
                {entradas.length > 0 &&
                    entradas.map((entrada: any, index: number) => (
                        <EntradasRow
                            key={index}
                            id={entrada.entradas.id_entrada}
                            setRows={setEntradas}
                        />
                    ))}
                {entradas.length == 0 && (
                    <IonButton
                        style={{ "--background": "#F08408" }}
                        onClick={() => handleAgregarEntrada()}
                    >
                        <IonIcon icon={add} />
                        &nbsp;AGREGAR UNA ENTRADA
                    </IonButton>
                )}
                {entradas.length > 0 && (
                    <IonButton
                        style={{ "--background": "#F08408" }}
                        onClick={() =>
                            setEntradas((prev: any[]) => [
                                ...prev,
                                {},
                            ])
                        }
                    >
                        <IonIcon icon={add} />
                        &nbsp;AGREGAR OTRA
                    </IonButton>
                )}
            </IonRow>
        </div>
    );
}

