import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
} from "@ionic/react";
import { Dispatch, SetStateAction } from "react";
import Check from "../../components/Check/Check";

type TFilterListProps = {
  estados: any[];
  clientes: any[];
  setSelectedEstados: Dispatch<SetStateAction<string[]>>;
};
export default function FilterList(props: TFilterListProps) {
  const handleEstadoChange = (k: string, v: boolean) => {
    if (!v) {
      props.setSelectedEstados((prev: string[]) => [
        ...prev.filter((estado: string) => estado != k),
      ]);
      return;
    }
    props.setSelectedEstados((prev: string[]) => {
      if (prev.includes(k)) return [...prev];
      return [...prev, k];
    });
  };

  return (
    <IonCard style={{ width: "200pt" }}>
      <IonCardHeader>
        <IonCardTitle style={{ fontWeight: "bold" }}>Filtros</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonTitle>Estados</IonTitle>

          {props.estados.map((estado: any, index: number) => (
            <IonItem key={estado.id_estado}>
              <IonCheckbox
                labelPlacement="start"
                onIonChange={(e) =>
                  handleEstadoChange(estado.nombre_estado, e.target.checked)
                }
              >
                {estado.nombre_estado}
              </IonCheckbox>
            </IonItem>
          ))}
        </IonList>
        <IonList>
          <IonTitle>Cliente</IonTitle>
          <IonItem>
            <IonSelect disabled>
              {props.clientes.map((cliente: any) => (
                <IonSelectOption
                  key={cliente.id_turista}
                  value={cliente.id_turista}
                >
                  {cliente.nombre_turista + " " + cliente.apellido_turista}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}
