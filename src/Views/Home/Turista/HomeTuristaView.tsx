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
import HomeTuristaForm from './HomeTuristaForm';
import ConsultaOfertasCard from '../../../components/ConsultaOfertas/ConsultaOfertasCard';

interface FormSchema {
  destino: string;
  comienzoViaje: string;
  finViaje: string;
  viajeros: string;
}

export default function HomeTuristaView() {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [destinoSeleccionado, setDestinoSeleccionado] = useState<string>('');

  const initialSchema: FormSchema = {
    destino: '',
    comienzoViaje: '',
    finViaje: '',
    viajeros: '',
  };

  const handleBuscar = () => {
    /* if (form?.schema?.destino) {
      setDestino(form.schema.destino);
      setBusquedaRealizada(true);
    } else {
      setOpenToast(true);
      setToastMessage('Por favor, ingrese un destino');
    } */
  };

  return (
    <>
      <FormProvider schema={initialSchema}>
        <HomeTuristaForm />
      </FormProvider>

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
    </>
  );
}
