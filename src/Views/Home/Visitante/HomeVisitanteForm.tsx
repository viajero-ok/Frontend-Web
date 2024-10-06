import React, { useState } from 'react';
import { IonButton, IonList, IonTitle, IonToast } from '@ionic/react';
import { alertCircleOutline, colorFill } from 'ionicons/icons';
import Field from '../../../components/Field/Field';
import { useForm } from '../../../hooks/UseForm/FormProvider';
import { Validator as v } from '../../../hooks/UseForm/Validator/Validator';

export default function HomeVisitanteForm() {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const form = useForm();

  return (
    <>
      <IonList style={{
        display: 'flex',
        flexDirection: 'column',
        margin: '13pt',
        marginTop: '0',
        marginLeft: '34pt',
        marginRight: '34pt',
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
          display: 'flex',
          flexDirection: 'column',
          margin: '13pt',
          marginLeft: '89pt',
          marginRight: '89pt',
          paddingLeft: '12pt',
          paddingRight: '12pt'
        }}
      >
        Buscar
      </IonButton>
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