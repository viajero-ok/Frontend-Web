import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonRow,
  PopoverOptions,
  useIonPopover,
} from "@ionic/react";
import {
  addMonths,
  addWeeks,
  addYears,
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isSameYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { es } from "date-fns/locale";
import { chevronBack, chevronForward } from "ionicons/icons";
import { ReactNode, useEffect, useState } from "react";
import Reservas from "../../Views/NewAlojamiento/EnHabitaciones/Forms/AlojamientoForm/Reservas";
import { HookOverlayOptions } from "@ionic/react/dist/types/hooks/HookOverlayOptions";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

type TReserva = {
  fecha_desde: string;
  fecha_hasta: string;
  state: "ACTIVA" | "RESERVADA";
};
const reserva1: TReserva = {
  fecha_desde: "02-03-2025",
  fecha_hasta: "02-07-2025",
  state: "ACTIVA",
};
const reserva2: TReserva = {
  fecha_desde: "02-07-2025",
  fecha_hasta: "02-13-2025",
  state: "RESERVADA",
};
const reserva3: TReserva = {
  fecha_desde: "02-13-2025",
  fecha_hasta: "02-27-2025",
  state: "RESERVADA",
};
const MOCK_RESERVAS: TReserva[] = [reserva1, reserva2, reserva3];

const StartLane = (
  lane: number,
  present: (
    options?: Omit<PopoverOptions, "component" | "componentProps"> &
      HookOverlayOptions
  ) => void,
  state: "Pendiente de pago" | "Reservada"
) => (
  <div
    style={{
      height: "12pt",
      width: "82%",
      borderRadius: "8pt 0 0 8pt",
      backgroundColor: state == "Reservada" ? "#38C606" : "#F08408",
      position: "absolute",
      right: "-2pt",
      top: 20 + (lane % 2) * 24 + "pt",
      cursor: "pointer",
    }}
    onClick={(e: any) => {
      present({
        event: e,
        onDidDismiss: (e: CustomEvent) =>
          console.log(`Popover dismissed with role: ${e.detail.role}`),
      });
    }}
  ></div>
);

const CenterLane = (
  lane: number,
  present: (
    options?: Omit<PopoverOptions, "component" | "componentProps"> &
      HookOverlayOptions
  ) => void,
  state: "Pendiente de pago" | "Reservada"
) => (
  <div
    style={{
      height: "12pt",
      width: "104%",
      backgroundColor: state == "Reservada" ? "#38C606" : "#F08408",
      position: "absolute",
      left: "-2pt",
      top: 20 + (lane % 2) * 24 + "pt",
      cursor: "pointer",
    }}
    onClick={(e: any) => {
      console.log("OK");
      present({
        event: e,
        onDidDismiss: (e: CustomEvent) =>
          console.log(`Popover dismissed with role: ${e.detail.role}`),
      });
    }}
  ></div>
);

const EndLane = (
  lane: number,
  present: (
    options?: Omit<PopoverOptions, "component" | "componentProps"> &
      HookOverlayOptions
  ) => void,
  state: "Pendiente de pago" | "Reservada"
) => (
  <div
    style={{
      height: "12pt",
      width: "80%",
      borderRadius: "0 8pt 8pt 0",
      backgroundColor: state == "Reservada" ? "#38C606" : "#F08408",
      position: "absolute",
      left: 0,
      top: 20 + (lane % 2) * 24 + "pt",
      cursor: "pointer",
    }}
    onClick={(e: any) => {
      present({
        event: e,
        onDidDismiss: (e: CustomEvent) =>
          console.log(`Popover dismissed with role: ${e.detail.role}`),
      });
    }}
  ></div>
);

const drawLane = (
  reserva: {
    fecha_desde: Date;
    fecha_hasta: Date;
    state: "Pendiente de pago" | "Reservada";
  },
  day: Date,
  lane: number,
  present: (
    options?: Omit<PopoverOptions, "component" | "componentProps"> &
      HookOverlayOptions
  ) => void
): ReactNode => {
  if (day.getTime() == reserva.fecha_desde.getTime())
    return StartLane(lane, present, reserva.state);
  if (day.getTime() == reserva.fecha_hasta.getTime())
    return EndLane(lane, present, reserva.state);
  return CenterLane(lane, present, reserva.state);
};

const drawLanes = (
  day: Date,
  reservations: {
    fecha_desde: Date;
    fecha_hasta: Date;
    state: "Pendiente de pago" | "Reservada";
  }[],
  present: (
    options?: Omit<PopoverOptions, "component" | "componentProps"> &
      HookOverlayOptions
  ) => void
) => {
  const lanes: ReactNode[] = [];
  reservations.forEach((reservation: any, index: number) => {
    if (day >= reservation.fecha_desde && day <= reservation.fecha_hasta) {
      lanes.push(drawLane(reservation, day, index, present));
    }
  });
  return lanes;
};

const Popover = () => (
  <IonContent className="ion-padding">Hello World!</IonContent>
);

type TCalendarProps = {
  reservas: any[];
};
export default function Calendar(props: TCalendarProps) {
  const [present, dismiss] = useIonPopover(Popover, {
    onDismiss: (data: any, role: string) => dismiss(data, role),
  });

  const [viewType, setViewType] = useState<"calendar" | "list">("calendar");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view] = useState<"week" | "month" | "year">("month");
  const [selectedYear, setSelectedYear] = useState(format(new Date(), "yyyy"));
  const [openEventDialog, setOpenEventDialog] = useState<boolean>(false);

  const getDaysInWeek = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const end = endOfWeek(date, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  const getDaysInMonth = (date: Date) => {
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  const getMonthsByYear = (date: Date) => {
    const start = startOfYear(date);
    const end = endOfYear(date);
    return eachMonthOfInterval({ start, end });
  };

  const days =
    view == "month"
      ? getDaysInMonth(currentDate)
      : view == "week"
      ? getDaysInWeek(currentDate)
      : getMonthsByYear(currentDate);

  const lunes = days.filter((day: Date) => day.getDay() == 1);
  const martes = days.filter((day: Date) => day.getDay() == 2);

  const miercoles = days.filter((day: Date) => day.getDay() == 3);
  const jueves = days.filter((day: Date) => day.getDay() == 4);
  const viernes = days.filter((day: Date) => day.getDay() == 5);
  const sabados = days.filter((day: Date) => day.getDay() == 6);
  const domingos = days.filter((day: Date) => day.getDay() == 0);

  const navigateCalendar = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = changeCurrentDate(direction, prevDate);
      if (!isSameYear(newDate, selectedYear))
        setSelectedYear(format(newDate, "yyyy"));
      return newDate;
    });
  };

  const changeCurrentDate = (direction: "prev" | "next", prevDate: Date) => {
    if (view == "year") {
      return direction == "next"
        ? addYears(prevDate, 1)
        : addYears(prevDate, -1);
    } else if (view == "week") {
      return direction == "next"
        ? addWeeks(prevDate, 1)
        : addWeeks(prevDate, -1);
    } else {
      return direction == "next"
        ? addMonths(prevDate, 1)
        : addMonths(prevDate, -1);
    }
  };

  useEffect(() => {
    console.log("reservas filtradas: ", props.reservas);
  }, [props.reservas]);

  return (
    <IonCard style={{ display: "inline-block" }}>
      <IonCardHeader>
        <IonCardTitle style={{ display: "flex" }}>
          <IonGrid>
            <IonRow>
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "left",
                }}
              >
                <IonButton fill="clear" style={{ color: "#F08408" }}>
                  Ir al día actual
                </IonButton>
              </IonCol>
              <IonCol
                style={{
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                size="small"
              >
                <IonButton
                  fill="clear"
                  style={{ marginRight: "12pt" }}
                  onClick={() => navigateCalendar("prev")}
                >
                  <IonIcon
                    icon={chevronBack}
                    style={{ color: "#F08408", fontSize: "24pt" }}
                  />
                </IonButton>
                <h3
                  style={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    color: "#F08408",
                  }}
                >
                  {format(currentDate, "MMMM yyyy", {
                    locale: es,
                  })}
                </h3>
                <IonButton
                  fill="clear"
                  style={{ marginLeft: "12pt" }}
                  onClick={() => navigateCalendar("next")}
                >
                  <IonIcon
                    icon={chevronForward}
                    style={{ color: "#F08408", fontSize: "24pt" }}
                  />
                </IonButton>
              </IonCol>
              <IonCol>
                <IonRow
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "right",
                  }}
                >
                  <div
                    style={{
                      width: "25pt",
                      height: "10pt",
                      borderRadius: "8pt 8pt 8pt 8pt",
                      backgroundColor: "#38C606",
                    }}
                  ></div>
                  &nbsp;<span style={{ fontSize: "9pt" }}>Reservada</span>
                </IonRow>
                <IonRow
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "right",
                  }}
                >
                  <div
                    style={{
                      width: "25pt",
                      height: "10pt",
                      borderRadius: "8pt 8pt 8pt 8pt",
                      backgroundColor: "#F08408",
                    }}
                  ></div>
                  &nbsp;
                  <span style={{ fontSize: "9pt" }}>Pendiente de pago</span>
                </IonRow>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid style={{ width: "900pt" }}>
          <IonRow>
            {daysOfWeek.map((day: string, index: number) => (
              <IonCol
                key={day}
                style={{
                  width: "100pt",
                  borderBottom: "2pt solid lightgray",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {day}
              </IonCol>
            ))}
          </IonRow>
          {/* ----------------------------------------------------- */}
          <IonRow>
            <IonCol style={{ borderRight: "2pt solid lightgray", padding: 0 }}>
              {lunes.length > 0 &&
                lunes.map((day: Date, index: number) => (
                  <div
                    key={index}
                    style={{
                      height: "75pt",
                      borderBottom:
                        index < domingos.length - 1
                          ? "2pt solid lightgray"
                          : "",
                      backgroundColor:
                        (index == 0 && day.getDate() > 7) ||
                        (index == lunes.length - 1 && day.getDate() < 7)
                          ? "#fef3e6"
                          : "",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        padding: "4pt",
                        fontSize: "12pt",
                        position: "absolute",
                      }}
                    >
                      {day.getDate()}
                    </div>
                    {drawLanes(
                      day,
                      props.reservas.map((reserva: any) => ({
                        fecha_desde: new Date(
                          reserva.fecha_desde + "T00:00:00"
                        ),
                        fecha_hasta: new Date(
                          reserva.fecha_hasta + "T00:00:00"
                        ),
                        state: reserva.state,
                      })),
                      present
                    )}
                  </div>
                ))}
            </IonCol>
            <IonCol style={{ borderRight: "2pt solid lightgray", padding: 0 }}>
              {martes.length > 0 &&
                martes.map((day: Date, index: number) => (
                  <div
                    key={index}
                    style={{
                      height: "75pt",
                      borderBottom:
                        index < domingos.length - 1
                          ? "2pt solid lightgray"
                          : "",
                      backgroundColor:
                        (index == 0 && day.getDate() > 7) ||
                        (index == martes.length - 1 && day.getDate() < 7)
                          ? "#fef3e6"
                          : "",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        padding: "4pt",
                        fontSize: "12pt",
                        position: "absolute",
                      }}
                    >
                      {day.getDate()}
                    </div>
                    {drawLanes(
                      day,
                      props.reservas.map((reserva: any) => ({
                        fecha_desde: new Date(
                          reserva.fecha_desde + "T00:00:00"
                        ),
                        fecha_hasta: new Date(
                          reserva.fecha_hasta + "T00:00:00"
                        ),
                        state: reserva.state,
                      })),
                      present
                    )}
                  </div>
                ))}
            </IonCol>
            <IonCol style={{ borderRight: "2pt solid lightgray", padding: 0 }}>
              {miercoles.length > 0 &&
                miercoles.map((day: Date, index: number) => (
                  <div
                    key={index}
                    style={{
                      height: "75pt",
                      borderBottom:
                        index < domingos.length - 1
                          ? "2pt solid lightgray"
                          : "",
                      backgroundColor:
                        (index == 0 && day.getDate() > 7) ||
                        (index == miercoles.length - 1 && day.getDate() < 7)
                          ? "#fef3e6"
                          : "",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        padding: "4pt",
                        fontSize: "12pt",
                        position: "absolute",
                      }}
                    >
                      {day.getDate()}
                    </div>
                    {drawLanes(
                      day,
                      props.reservas.map((reserva: any) => ({
                        fecha_desde: new Date(
                          reserva.fecha_desde + "T00:00:00"
                        ),
                        fecha_hasta: new Date(
                          reserva.fecha_hasta + "T00:00:00"
                        ),
                        state: reserva.state,
                      })),
                      present
                    )}
                  </div>
                ))}
            </IonCol>
            <IonCol style={{ borderRight: "2pt solid lightgray", padding: 0 }}>
              {jueves.length > 0 &&
                jueves.map((day: Date, index: number) => (
                  <div
                    key={index}
                    style={{
                      height: "75pt",
                      borderBottom:
                        index < domingos.length - 1
                          ? "2pt solid lightgray"
                          : "",
                      backgroundColor:
                        (index == 0 && day.getDate() > 7) ||
                        (index == jueves.length - 1 && day.getDate() < 7)
                          ? "#fef3e6"
                          : "",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        padding: "4pt",
                        fontSize: "12pt",
                        position: "absolute",
                      }}
                    >
                      {day.getDate()}
                    </div>
                    {drawLanes(
                      day,
                      props.reservas.map((reserva: any) => ({
                        fecha_desde: new Date(
                          reserva.fecha_desde + "T00:00:00"
                        ),
                        fecha_hasta: new Date(
                          reserva.fecha_hasta + "T00:00:00"
                        ),
                        state: reserva.state,
                      })),
                      present
                    )}
                  </div>
                ))}
            </IonCol>
            <IonCol style={{ borderRight: "2pt solid lightgray", padding: 0 }}>
              {viernes.length > 0 &&
                viernes.map((day: Date, index: number) => (
                  <div
                    key={index}
                    style={{
                      height: "75pt",
                      borderBottom:
                        index < domingos.length - 1
                          ? "2pt solid lightgray"
                          : "",
                      backgroundColor:
                        (index == 0 && day.getDate() > 7) ||
                        (index == viernes.length - 1 && day.getDate() < 7)
                          ? "#fef3e6"
                          : "",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        padding: "4pt",
                        fontSize: "12pt",
                        position: "absolute",
                      }}
                    >
                      {day.getDate()}
                    </div>
                    {drawLanes(
                      day,
                      props.reservas.map((reserva: any) => ({
                        fecha_desde: new Date(
                          reserva.fecha_desde + "T00:00:00"
                        ),
                        fecha_hasta: new Date(
                          reserva.fecha_hasta + "T00:00:00"
                        ),
                        state: reserva.state,
                      })),
                      present
                    )}
                  </div>
                ))}
            </IonCol>
            <IonCol style={{ borderRight: "2pt solid lightgray", padding: 0 }}>
              {sabados.length > 0 &&
                sabados.map((day: Date, index: number) => (
                  <div
                    key={index}
                    style={{
                      height: "75pt",
                      borderBottom:
                        index < domingos.length - 1
                          ? "2pt solid lightgray"
                          : "",
                      backgroundColor:
                        (index == 0 && day.getDate() > 7) ||
                        (index == sabados.length - 1 && day.getDate() < 7)
                          ? "#fef3e6"
                          : "",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        padding: "4pt",
                        fontSize: "12pt",
                        position: "absolute",
                      }}
                    >
                      {day.getDate()}
                    </div>
                    {drawLanes(
                      day,
                      props.reservas.map((reserva: any) => ({
                        fecha_desde: new Date(
                          reserva.fecha_desde + "T00:00:00"
                        ),
                        fecha_hasta: new Date(
                          reserva.fecha_hasta + "T00:00:00"
                        ),
                        state: reserva.state,
                      })),
                      present
                    )}
                  </div>
                ))}
            </IonCol>
            <IonCol style={{ padding: 0 }}>
              {domingos.length > 0 &&
                domingos.map((day: Date, index: number) => (
                  <div
                    key={index}
                    style={{
                      height: "75pt",
                      borderBottom:
                        index < domingos.length - 1
                          ? "2pt solid lightgray"
                          : "",
                      backgroundColor:
                        (index == 0 && day.getDate() > 7) ||
                        (index == domingos.length - 1 && day.getDate() < 7)
                          ? "#fef3e6"
                          : "",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        padding: "4pt",
                        fontSize: "12pt",
                        position: "absolute",
                      }}
                    >
                      {day.getDate()}
                    </div>
                    {drawLanes(
                      day,
                      props.reservas.map((reserva: any) => ({
                        fecha_desde: new Date(
                          reserva.fecha_desde + "T00:00:00"
                        ),
                        fecha_hasta: new Date(
                          reserva.fecha_hasta + "T00:00:00"
                        ),
                        state: reserva.state,
                      })),
                      present
                    )}
                  </div>
                ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
}
