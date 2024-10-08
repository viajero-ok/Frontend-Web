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
    ubicacion: string;
    descripcion: string;
    precio: number;
    fecha: string;
    tipo: 'alojamiento' | 'actividad' | 'evento';
    imagen: string;
}

interface ConsultaOfertasCardProps {
    destino: string;
  }

export default function ConsultaOfertasCard({ destino }: ConsultaOfertasCardProps) {
    const [ofertas, setOfertas] = useState<Oferta[]>([]);
    const [selectedSegment, setSelectedSegment] = useState<'alojamientos' | 'actividades' | 'eventos'>('alojamientos');

    useEffect(() => {
        const ofertasEjemplo: Oferta[] = [
            { id: 1, titulo: "Cabañas de la Colina", ubicacion: "Córdoba", descripcion: "La colina ofrece un máximo contacto con la naturaleza, ubicado al pie de las Sierras, sobre la Ruta frente camino de acceso principal a la Villa. Ubicado a 10 cuadras de la plaza principal.", precio: 50000, fecha: "2023-05-01", tipo: 'alojamiento', imagen: "public/images/cabaña.jpg" },
            { id: 2, titulo: "Böden Hotel & Spa", ubicacion: "Villa General Belgrano", descripcion: "Böden Hotel & Spa by AKEN Soul nos brinda una experiencia que nos conecta con un sereno", precio: 80000, fecha: "2023-05-03", tipo: 'alojamiento', imagen: "public/images/hotel.jpg" },
            { id: 3, titulo: "Reserva Natural Pozo Verde", ubicacion: "Jesus Maria", descripcion: "Recorrido guiado por la Reserva Natural Pozo Verde, conociendo la flora y fauna de la zona.", precio: 5000, fecha: "2023-05-02", tipo: 'actividad', imagen: "public/images/pozoverde.jpg" },
            { id: 4, titulo: "Trekking Cerro de la Virgen", ubicacion: "Villa General Belgrano", descripcion: "Trekking de dificultad baja por el cerro de la virgen, conociendo paisajes únicos.", precio: 3000, fecha: "2023-05-03", tipo: 'actividad', imagen: "public/images/trekking.jpg" },
        ];
        setOfertas(ofertasEjemplo);
    }, []);

    const ofertasFiltradas = ofertas.filter(oferta => {
        const ubicacionCoincide = oferta.ubicacion.toLowerCase().includes(destino.toLowerCase());
        if (selectedSegment === 'alojamientos') return oferta.tipo === 'alojamiento' && ubicacionCoincide;
        if (selectedSegment === 'actividades') return oferta.tipo === 'actividad' && ubicacionCoincide;
        if (selectedSegment === 'eventos') return oferta.tipo === 'evento' && ubicacionCoincide;
        return ubicacionCoincide;
    });
    return (
        <IonCol size="12" sizeMd="20" sizeLg="15">
            <>
                <IonCardHeader>
                    <IonSegment
                        value={selectedSegment}
                        onIonChange={e => setSelectedSegment(e.detail.value as any)}
                    >
                        <IonSegmentButton value="alojamientos" style={{ "--color-checked": "#F08408" }}>
                            <IonLabel>Alojamientos</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="actividades" style={{ "--color-checked": "#F08408" }}>
                            <IonLabel>Actividades</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="eventos" style={{ "--color-checked": "#F08408" }}>
                            <IonLabel>Eventos</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </IonCardHeader>
                <IonCardContent style={{ flex: 1, width: '50%', left: '25%' }}>
                    {ofertasFiltradas.map((oferta) => (
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
                        style={{ height: '200px', objectFit: 'cover', margin: '10px' }}
                    />
                </IonCol>
                <IonCol size="7">
                    <IonCardHeader>
                        <IonCardTitle style={{ color: 'black', fontWeight: 'bold' }}>{oferta.titulo}</IonCardTitle>
                        <IonCardSubtitle style={{ fontSize: '18px', color: 'black' }}>{oferta.ubicacion}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <p style={{ marginBottom: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{oferta.descripcion}</p>
                        <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#F08408' }}>desde: ${oferta.precio}/noche</p>
                        <IonButton expand="full" style={{ "--background": "white", "--color": "#f08408"}}>
                            Ver
                        </IonButton>
                    </IonCardContent>
                </IonCol>
            </IonRow>
        </IonCard>
    );
}
