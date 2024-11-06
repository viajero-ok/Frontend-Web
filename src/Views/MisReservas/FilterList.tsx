import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonTitle,
} from "@ionic/react";
import { useState } from "react";

export default function FilterList() {
  const [states, setStates] = useState<any[]>([{}, {}]);
  const [selectedStates, setSelectedStates] = useState<number[]>([]);

  return (
    <IonCard style={{ width: "300pt" }}>
      <IonCardHeader>
        <IonCardTitle style={{ fontWeight: "bold" }}>Filtros</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonTitle>Estados</IonTitle>

          {states.map((tipologia: any, index: number) => (
            <IonItem key={index}>
              <IonCheckbox labelPlacement="start">Estado {index}</IonCheckbox>
            </IonItem>
          ))}
        </IonList>
        <IonList>
          <IonTitle>Cliente</IonTitle>
          <IonItem>
            <IonSelect>
              <IonSelectOption>Romero Carranza Emiliano</IonSelectOption>
              <IonSelectOption>Federico Cañete</IonSelectOption>
              <IonSelectOption>Valentina Cudos Nóbile</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}
