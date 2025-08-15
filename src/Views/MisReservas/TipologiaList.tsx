import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonList,
} from "@ionic/react";
import { Dispatch, SetStateAction, useState } from "react";

type TTipologiaListProps = {
  detalles: any[];
  setSelected: Dispatch<SetStateAction<string | null>>;
};
export default function TipologiaList(props: TTipologiaListProps) {
  const [selectedTipologia, setSelectedTipologia] = useState<number | null>(
    null
  );

  const handleSelect = (id: string) => {
    console.log("id: ", id);
    props.setSelected(id);
  };

  return (
    <IonCard style={{ width: "200pt" }}>
      <IonCardHeader>
        <IonCardTitle style={{ fontWeight: "bold" }}>Tipologías</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {props.detalles.map((detalle: any, index: number) => (
            <IonItem
              key={index}
              button
              style={{
                fontWeight: index == selectedTipologia ? "bold" : "normal",
                color: index == selectedTipologia ? "#F08408" : "black",
              }}
              onClick={() => handleSelect(detalle.id_tipo_detalle)}
            >
              {detalle.nombre_tipo_detalle}
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}
