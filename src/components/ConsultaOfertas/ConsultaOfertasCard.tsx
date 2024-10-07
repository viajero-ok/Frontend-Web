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
    imagen: string;
}

export default function ConsultaOfertasCard() {
    const [ofertas, setOfertas] = useState<Oferta[]>([]);
    const [selectedSegment, setSelectedSegment] = useState<'alojamientos' | 'actividades' | 'eventos'>('alojamientos');

    useEffect(() => {
        // Aquí deberías hacer la llamada a tu API para obtener las ofertas
        // Por ahora, usaremos datos de ejemplo
        const ofertasEjemplo: Oferta[] = [
            { id: 1, titulo: "Cabañas de la Colina", descripcion: "Habitación doble", precio: 100, fecha: "2023-05-01", tipo: 'alojamiento', imagen:"public/images/cabaña1.png"},
            { id: 4, titulo: "Böden Hotel & Spa", descripcion: "Música en vivo", precio: 30, fecha: "2023-05-03", tipo: 'alojamiento', imagen:"public/images/hotel.jpg"},
            /* { id: 2, titulo: "Reserva Natural Pozo Verde", descripcion: "Recorrido guiado", precio: 50, fecha: "2023-05-02", tipo: 'actividad' },
            { id: 5, titulo: "Concierto en la playa", descripcion: "Música en vivo", precio: 30, fecha: "2023-05-03", tipo: 'actividad' },
            { id: 3, titulo: "Concierto en la playa", descripcion: "Música en vivo", precio: 30, fecha: "2023-05-03", tipo: 'evento' },
            { id: 6, titulo: "Concierto en la playa", descripcion: "Música en vivo", precio: 30, fecha: "2023-05-03", tipo: 'evento' }, */

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
        <IonCol size="12" sizeMd="20" sizeLg="8" style={{ margin: 'auto' }}>
            <>
                <IonCardHeader>
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
                <IonCardContent style={{ flex: 1, width: '50%', left: '25%' }}>
                    {filteredOfertas.map((oferta) => (
                        <OfertaCard key={oferta.id} oferta={oferta} />
                    ))}
                </IonCardContent>
            </>
        </IonCol>
    );
}

function OfertaCard({ oferta }: { oferta: Oferta }) {
    return (
        <IonCard style={{ margin: '0 0 16px 0' }}>
            <IonRow>
                <IonCol size="5" style={{ padding: '0' }}>
                    <IonImg 
                         src={oferta.imagen} 
                         alt={oferta.titulo} 
                         style={{ height: '200px', objectFit: 'cover' }}
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
                        <IonButton expand="block" style={{ "--background": "white", "--color": "#f08408" }}>
                            Ver detalles
                        </IonButton>
                    </IonCardContent>
                </IonCol>
            </IonRow>
        </IonCard>
    );
}
