import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonRow,
    IonTitle,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    useIonRouter,
    IonText,
} from "@ionic/react";
import { useState, useEffect } from "react";
import DefaultLoggedLayout from "../Layouts/DefaultLoggedLayout";

export default function ResultadoReservaView() {
    const [status, setStatus] = useState<boolean>(false);
    const router = useIonRouter();

    useEffect(() => {

    }, []);

    return (
        <DefaultLoggedLayout>
            <IonContent>
                <IonGrid
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                        marginTop: "31pt",
                    }}
                >
                    <IonRow>
                        <IonCol>
                            <IonRow>
                                <IonTitle style={{ fontSize: "20pt", fontWeight: "bolder", textAlign: "center", marginBottom: "13pt" }}>
                                    Resultado reserva
                                </IonTitle>
                            </IonRow>

                        </IonCol>
                    </IonRow>
                    <IonRow>
                        {status ? (
                            <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                padding: "50pt",
                                margin: "0 50pt",
                                width: "100%",
                                flexGrow: 1,
                                border: "1pt solid #F08408",
                                justifyContent: "center",
                            }}>
                                <IonText>
                                    <strong>¡Tu reserva fue confirmada! </strong>
                                    Tu pago se realizó con éxito, serás redirigido automáticamente para visualizar tus reservas.
                                    ¡Buen viaje!
                                </IonText>     
                            </div>
                        ) : (
                            <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                padding: "50pt",
                                margin: "0 50pt",
                                width: "100%",
                                flexGrow: 1,
                                border: "1pt solid #F08408",
                                justifyContent: "center",
                            }}>
                                <IonText>
                                    <strong>No pudimos completar tu reserva. </strong>
                                    Hubo un error en tu pago, serás redirigido automáticamente al home de viajero.
                                </IonText>     
                            </div>
                        )}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </DefaultLoggedLayout>
    );
}
