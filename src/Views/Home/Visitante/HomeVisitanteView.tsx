import React, { useState } from 'react';
import {
  IonButton,
  IonList,
  IonTitle,
  IonToast,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonImg,
} from '@ionic/react';
import { alertCircleOutline } from 'ionicons/icons';
import Field from '../../../components/Field/Field';
import { useForm, FormProvider } from '../../../hooks/UseForm/FormProvider';
import { Validator as v } from '../../../hooks/UseForm/Validator/Validator';
import HomeVisitanteForm from './HomeVisitanteForm';
import ConsultaOfertasCard from '../../../components/ConsultaOfertas/ConsultaOfertasCard';

interface FormSchema {
  destino: string;
  comienzoViaje: string;
  finViaje: string;
  viajeros: string;
}

export default function HomeVisitanteView() {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const initialSchema: FormSchema = {
    destino: '',
    comienzoViaje: '',
    finViaje: '',
    viajeros: '',
  };

  const handleBuscar = (form: { schema: FormSchema }) => {
    if (!form) return;
    // Aquí iría la lógica para procesar la búsqueda
    console.log('Formulario enviado:', form.schema);
    setToastMessage('Búsqueda realizada con éxito');
    setOpenToast(true);
  };

  return (
    <IonContent fullscreen style={{ overflowY: 'hidden' }}>
      <IonCard
        style={{
          backgroundColor: "rgba(255, 255, 255, 1)",
          left: "25%",
          padding: "20pt",
          width: "50%"
        }}
      >
        <FormProvider schema={initialSchema}>
          <HomeVisitanteForm />
        </FormProvider>
      </IonCard>
      

      <ConsultaOfertasCard />
      
      <IonToast
        isOpen={openToast}
        message={toastMessage}
        duration={5000}
        icon={alertCircleOutline}
        onDidDismiss={() => {
          setOpenToast(false);
          setToastMessage('');
        }}
      />
    </IonContent>
  );
}
