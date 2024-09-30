import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonIcon,
  IonInput,
  IonItem,
  IonRow,
} from "@ionic/react";
import Field from "../../../../../components/Field/Field";
import { useForm } from "../../../../../hooks/UseForm/FormProvider";
import { add, trash } from "ionicons/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { useMaskito } from "@maskito/react";
import { maskitoTimeOptionsGenerator } from "@maskito/kit";

type TRowData = {
  id_horario: number;
  check_in: {
    hora_check_in: string;
    minuto_check_in: string;
  };
  check_out: {
    hora_check_out: string;
    minuto_check_out: string;
  };
  aplica_todos_los_dias: boolean;
  dias_semana: {
    aplica_lunes: boolean;
    aplica_martes: boolean;
    aplica_miercoles: boolean;
    aplica_jueves: boolean;
    aplica_viernes: boolean;
    aplica_sabado: boolean;
    aplica_domingo: boolean;
  };
};

type TCheckInCheckOutRow = {
  setRows: Dispatch<SetStateAction<any[]>>;
  id: number;
};
export default function CheckInCheckOutRow(props: TCheckInCheckOutRow) {
  const [data, setData] = useState<TRowData>({
    id_horario: props.id,
    check_in: {
      hora_check_in: "",
      minuto_check_in: "",
    },
    check_out: {
      hora_check_out: "",
      minuto_check_out: "",
    },
    aplica_todos_los_dias: false,
    dias_semana: {
      aplica_lunes: false,
      aplica_martes: false,
      aplica_miercoles: false,
      aplica_jueves: false,
      aplica_viernes: false,
      aplica_sabado: false,
      aplica_domingo: false,
    },
  });

  const handleEliminar = () => {
    props.setRows((prev: any[]) => [
      ...prev.filter((row: any, index: number) => index != props.id),
    ]);
  };

  const checkInMask = useMaskito({
    options: maskitoTimeOptionsGenerator({
      mode: "HH:MM",
      step: 1,
    }),
  });
  const checkOutMask = useMaskito({
    options: maskitoTimeOptionsGenerator({
      mode: "HH:MM",
      step: 1,
    }),
  });

  return (
    <IonRow
      style={{
        border: "2pt solid #F08408",
        borderRadius: "8pt",
        padding: "6pt",
        marginLeft: "31pt",
        marginRight: "31pt",
        marginBottom: "31pt",
      }}
    >
      <IonCol
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IonRow style={{}}>
          <IonCol>
            <IonItem>
              <IonInput
                style={{ textAlign: "center" }}
                placeholder="Check-In"
                ref={async (cardRef) => {
                  if (cardRef) {
                    const input = await cardRef.getInputElement();
                    checkInMask(input);
                  }
                }}
              />
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonInput
                style={{ textAlign: "center" }}
                placeholder="Check-Out"
                ref={async (cardRef) => {
                  if (cardRef) {
                    const input = await cardRef.getInputElement();
                    checkOutMask(input);
                  }
                }}
              />
            </IonItem>
          </IonCol>
        </IonRow>
      </IonCol>
      <IonCol style={{}}>
        <IonRow
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonCheckbox>Aplica todo los días</IonCheckbox>
        </IonRow>
        <IonRow
          style={{
            paddingTop: "13pt",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
              L
            </IonCheckbox>
            <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
              M
            </IonCheckbox>
            <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
              M
            </IonCheckbox>
            <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
              J
            </IonCheckbox>
            <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
              V
            </IonCheckbox>
            <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
              S
            </IonCheckbox>
            <IonCheckbox labelPlacement="stacked" style={{ margin: "3pt" }}>
              D
            </IonCheckbox>
          </div>
        </IonRow>
      </IonCol>
      <IonCol
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IonRow
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonButton color="danger" onClick={() => handleEliminar()}>
            <IonIcon icon={trash} />
          </IonButton>
        </IonRow>
      </IonCol>
    </IonRow>
  );
}
