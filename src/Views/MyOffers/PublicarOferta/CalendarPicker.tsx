import { IonCol, IonDatetime, IonGrid, IonRow } from "@ionic/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type TCalendarPicker = {
  setFechas: Dispatch<
    SetStateAction<{ fecha_desde: string | null; fecha_hasta: string | null }>
  >;
  initial?: { fecha_desde: string; fecha_hasta: string } | null;
};
export default function CalendarPicker(props: TCalendarPicker) {
  const [from, setFrom] = useState<string>(
    props.initial?.fecha_desde ?? new Date().toISOString()
  );
  const [to, setTo] = useState<string | null>(
    props.initial?.fecha_hasta ?? null
  );

  useEffect(() => {
    props.setFechas({ fecha_desde: from, fecha_hasta: to });
  }, [from, to]);

  const getDaysInBetween = (startDate: Date, endDate: Date) => {
    const dates = [];
    let currentDate = new Date(startDate); // Create a new Date to avoid mutating the original

    while (currentDate < endDate) {
      // Push the current date (use new Date() to avoid reference issues)
      dates.push(new Date(currentDate).toISOString().split("T")[0]);
      // Increment current date by 1 day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };
  const [range, setRange] = useState<string[] | null>(
    props.initial
      ? getDaysInBetween(
          new Date(props.initial.fecha_desde),
          new Date(props.initial.fecha_hasta)
        )
      : null
  );

  const handleSetFrom = (value: string) => {
    setFrom(value);
    if (!to) return;
    setRange((_) => getDaysInBetween(new Date(value), new Date(to)));
  };

  const handleSetTo = (value: string) => {
    setTo(value);
    if (!from) return;
    setRange((_) => getDaysInBetween(new Date(from), new Date(value)));
  };

  return (
    <IonGrid style={{ width: "600pt" }}>
      <IonRow>
        <IonCol style={{ display: "flex", justifyContent: "right" }}>
          <IonDatetime
            preferWheel={false}
            presentation="date"
            max={to != null ? to : "01/01/99"}
            onIonChange={(e: any) => handleSetFrom(e.target.value)}
            highlightedDates={
              range != null
                ? range.map((value: string) => ({
                    date: value,
                    textColor: "white",
                    backgroundColor: "var(--color-orange-200)",
                  }))
                : []
            }
          />
        </IonCol>
        <IonCol>
          <IonDatetime
            preferWheel={false}
            presentation="date"
            min={from}
            onIonChange={(e: any) => handleSetTo(e.target.value)}
            highlightedDates={
              range != null
                ? range.map((value: string) => ({
                    date: value,
                    textColor: "white",
                    backgroundColor: "var(--color-orange-200)",
                  }))
                : []
            }
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
