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
} from "@ionic/react";
import { useState, useEffect } from "react";
import DefaultLoggedLayout from "../Layouts/DefaultLoggedLayout";
import OfertaCard from "../../components/OfertaCard/OfertaCard";
import { obtenerOfertasGuardadas, obtenerOfertasReservadas } from "../../App/Ofertas/Ofertas";

export default function ItineraryView() {
    const [activeTab, setActiveTab] = useState<'reservados' | 'guardados'>('guardados');
    const [guardados, setGuardados] = useState<any[]>([]);
    const [reservados, setReservados] = useState<any[]>([]);
    const router = useIonRouter();

    useEffect(() => {
        obtenerOfertasGuardadas()
            .then((response: any) => {
                if (response.data.ofertas_guardadas.length > 0) {
                    setGuardados(response.data.ofertas_guardadas);
                }
            })
            .catch((error) => {
                console.error("Error al obtener ofertas guardadas:", error);
            });

        obtenerOfertasReservadas()
            .then((response: any) => {
                if (response.data.ofertas_reservadas.length > 0) {
                    setReservados(response.data.ofertas_reservadas);
                    console.log(response.data.ofertas_reservadas);
                }
            })
            .catch((error) => {
                console.error("Error al obtener ofertas reservadas:", error);
            });
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
                                    Mi Itinerario
                                </IonTitle>
                            </IonRow>
                            <IonRow>
                                <IonSegment
                                    value={activeTab}
                                    onIonChange={e => setActiveTab(e.detail.value as 'reservados' | 'guardados')}>
                                    <IonSegmentButton style={{
                                        "--color-checked": "#F08408",
                                        "--border-color-checked": "#F08408",
                                    }} value="reservados">
                                        <IonLabel>Reservados</IonLabel>
                                    </IonSegmentButton>
                                    <IonSegmentButton style={{
                                        "--color-checked": "#53992B",
                                        "--border-color-checked": "#53992B",
                                    }} value="guardados">
                                        <IonLabel>Guardados</IonLabel>
                                    </IonSegmentButton>
                                </IonSegment>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonRow
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            padding: "13pt",
                            margin: "3pt",
                            width: "100%",
                            flexGrow: 1,
                        }}
                    >
                        <IonCol
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "13pt",
                                margin: "31pt",
                                flexGrow: 1,
                                alignItems: "center",
                                alignContent: "center",
                                justifyContent: "center",
                            }}
                        >
                            {activeTab === 'guardados' ? (
                                guardados.map((oferta: any) => (
                                    <IonRow key={oferta.id} style={{ width: "100%" }}>
                                        <OfertaCard
                                            nombre={oferta.nombre_oferta}
                                            descripcion={oferta.descripcion_oferta}
                                            id={oferta.id}
                                            setOfertas={setGuardados}
                                        />
                                    </IonRow>
                                ))
                            ) : (
                                reservados.map((oferta: any) => (
                                    <IonRow key={oferta.id} style={{ width: "100%" }}>
                                        <OfertaCard
                                            nombre={oferta.nombre_oferta}
                                            descripcion={oferta.descripcion_oferta}
                                            id={oferta.id_reserva}
                                            setOfertas={setReservados}
                                        />
                                    </IonRow>
                                ))
                            )}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </DefaultLoggedLayout>
    );
}
