import React, { useState } from 'react';
import { IonButton, IonList, IonTitle, IonToast } from '@ionic/react';
import { alertCircleOutline, colorFill } from 'ionicons/icons';
import Field from '../../../components/Field/Field';
import { useForm } from '../../../hooks/UseForm/FormProvider';
import { Validator as v } from '../../../hooks/UseForm/Validator/Validator';
import ConsultaOfertasCard from '../../../components/ConsultaOfertas/ConsultaOfertasCard';

export default function HomeTuristaForm() {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [destino, setDestino] = useState<string>('');
  const [busquedaRealizada, setBusquedaRealizada] = useState<boolean>(false);

  const handleBuscar = () => {
    if (form?.schema?.destino) {
      setDestino(form.schema.destino);
      setBusquedaRealizada(true);
    } else {
      setOpenToast(true);
      setToastMessage('Por favor, ingrese un destino');
    }
  };

  const form = useForm();

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <IonList style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '0pt',
        marginTop: '0pt',
        width: '50%',
        left: '50%',        
        paddingRight: '12pt',
      }}>
        <Field
          name="destino"
          label="Destino"
          value={form?.schema?.destino}
          form={form}
          valid={v().required('El destino es obligatorio')}
        />
        <Field
          name="comienzoViaje"
          label="Comienzo del viaje"
          value={form?.schema?.comienzoViaje}
          form={form}
        />
        <Field
          name="finViaje"
          label="Fin del viaje"
          value={form?.schema?.finViaje}
          form={form}
        />
        <Field
          name="viajeros"
          label="Viajeros"
          value={form?.schema?.viajeros}
          form={form}
        />
      </IonList>
      <IonButton 
        expand="block"
        style={{"--background": "#F08408",
          paddingLeft: '12pt',
          paddingRight: '12pt'
        }}
        onClick={handleBuscar}
      >
        Buscar
      </IonButton>
      {busquedaRealizada && <p>Destino seleccionado: {destino}</p>}
      <ConsultaOfertasCard destino={destino} />
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
    </div>
  );
}