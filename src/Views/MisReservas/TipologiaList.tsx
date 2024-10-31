import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonList,
} from "@ionic/react";
import { useState } from "react";

export default function TipologiaList() {
  const [tipologias, setTipologias] = useState<any[]>([{}, {}]);
  const [selectedTipologia, setSelectedTipologia] = useState<number | null>(
    null
  );

  const handleSelect = (id: number) => {
    setSelectedTipologia(id);
  };

  return (
    <IonCard style={{ width: "300pt" }}>
      <IonCardHeader>
        <IonCardTitle style={{ fontWeight: "bold" }}>Tipologías</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {tipologias.map((tipologia: any, index: number) => (
            <IonItem
              key={index}
              button
              style={{
                fontWeight: index == selectedTipologia ? "bold" : "normal",
                color: index == selectedTipologia ? "#F08408" : "black",
              }}
              onClick={() => handleSelect(index)}
            >
              Cama doble premium {index}
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}
