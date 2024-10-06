import React, { useState, useEffect } from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonGrid,
    IonRow,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonImg,
} from "@ionic/react";

interface Oferta {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    fecha: string;
    tipo: 'alojamiento' | 'actividad' | 'evento';
}

export default function ConsultaOfertasCard() {
    const [ofertas, setOfertas] = useState<Oferta[]>([]);
    const [selectedSegment, setSelectedSegment] = useState<'alojamientos' | 'actividades' | 'eventos'>('alojamientos');

    useEffect(() => {
        // Aquí deberías hacer la llamada a tu API para obtener las ofertas
        // Por ahora, usaremos datos de ejemplo
        const ofertasEjemplo: Oferta[] = [
            { id: 1, titulo: "Hotel Ejemplo", descripcion: "Habitación doble", precio: 100, fecha: "2023-05-01", tipo: 'alojamiento' },
            { id: 2, titulo: "Tour por la ciudad", descripcion: "Recorrido guiado", precio: 50, fecha: "2023-05-02", tipo: 'actividad' },
            { id: 3, titulo: "Concierto en la playa", descripcion: "Música en vivo", precio: 30, fecha: "2023-05-03", tipo: 'evento' },
            { id: 4, titulo: "Concierto en la playa", descripcion: "Música en vivo", precio: 30, fecha: "2023-05-03", tipo: 'alojamiento' },
            { id: 5, titulo: "Concierto en la playa", descripcion: "Música en vivo", precio: 30, fecha: "2023-05-03", tipo: 'actividad' },
            { id: 6, titulo: "Concierto en la playa", descripcion: "Música en vivo", precio: 30, fecha: "2023-05-03", tipo: 'evento' },

        ];
        setOfertas(ofertasEjemplo);
    }, []);

    const filteredOfertas = ofertas.filter(oferta => {
        if (selectedSegment === 'alojamientos') return oferta.tipo === 'alojamiento';
        if (selectedSegment === 'actividades') return oferta.tipo === 'actividad';
        if (selectedSegment === 'eventos') return oferta.tipo === 'evento';
        return false;
    });

    return (
        <IonCol size="12" sizeMd="10" sizeLg="8" style={{ margin: 'auto',  overflowY: 'hidden' }}>
            <IonCard style={{ height: '100%', display: 'flex', flexDirection: 'column', margin: '16px' }}>
                <IonCardHeader style={{overflowY:'hidden'}}>
                    <IonSegment 
                        value={selectedSegment} 
                        onIonChange={e => setSelectedSegment(e.detail.value as any)}
                    >
                        <IonSegmentButton value="alojamientos" style={{"--color-checked": "#F08408"}}>
                            <IonLabel>Alojamientos</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="actividades" style={{"--color-checked": "#F08408"}}>
                            <IonLabel>Actividades</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="eventos" style={{"--color-checked": "#F08408"}}>
                            <IonLabel>Eventos</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonCardHeader>
                <IonCardContent style={{ flex: 1, overflowY: 'auto' }}>
                    {filteredOfertas.map((oferta) => (
                        <OfertaCard key={oferta.id} oferta={oferta} />
                    ))}
                </IonCardContent>
            </IonCard>
        </IonCol>
    );
}

function OfertaCard({ oferta }: { oferta: Oferta }) {
    return (
        <IonCard style={{ margin: '0 0 16px 0' }}>
            <IonRow>
                <IonCol size="5" style={{ padding: '0' }}>
                    <IonImg 
                        src="https://ionicframework.com/docs/img/demos/card-media.png" 
                        alt={oferta.titulo} 
                        style={{ height: '100%', objectFit: 'cover' }}
                    />
                </IonCol>
                <IonCol size="7">
                    <IonCardHeader>
                        <IonCardTitle>{oferta.titulo}</IonCardTitle>
                        <IonCardSubtitle>{oferta.fecha}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p>{oferta.descripcion}</p>
                        <p>Precio: ${oferta.precio}</p>
                        <IonButton expand="block" style={{ "--background": "#F08408", "--color": "white" }}>
                            Ver detalles
                        </IonButton>
                    </IonCardContent>
                </IonCol>
            </IonRow>
        </IonCard>
    );
}
