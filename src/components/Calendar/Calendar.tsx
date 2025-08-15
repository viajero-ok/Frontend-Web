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
import { cn } from "../ui/Form/Field";

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
    <div className="flex flex-col w-full p-4 border border-gray-200 rounded-md">
      <div className="flex flex-row w-full justify-between">
        <button className="viajero-button-ghost px-4 py-2 flex items-center text-xs">
          Ir al día actual
        </button>

        <div className="flex flex-row gap-2 items-center">
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
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <div className="w-[25pt] h-[8pt] bg-green-500 rounded-xl" />
            &nbsp;
            <span className="text-xs italic text-gray-600">Reservada</span>
          </div>
          <div className="flex flex-row items-center">
            <div className="w-[25pt] h-[8pt] bg-[var(--color-viajero)] rounded-xl" />
            &nbsp;
            <span className="text-xs italic text-gray-600">
              Pendiente de pago
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex flex-col">
          <div className="flex flex-row">
            {daysOfWeek.map((day: string, index: number) => (
              <div
                key={day}
                className="w-1/7 pb-2 border-b border-gray-200 text-center font-bold text-gray-600 text-xs"
              >
                {day}
              </div>
            ))}
          </div>
          {/* ----------------------------------------------------- */}
          <div className="flex flex-row">
            <div className="w-1/7">
              {lunes.length > 0 &&
                lunes.map((day: Date, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      "h-[75pt] relative",
                      index < lunes.length ? "border-b border-gray-200" : "",
                      (index == 0 && day.getDate() > 7) ||
                        (index == lunes.length - 1 && day.getDate() < 7)
                        ? "bg-gray-50"
                        : ""
                    )}
                  >
                    <div className="p-2 text-xs text-gray-600 absolute">
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
            </div>
            <div className="w-1/7">
              {martes.length > 0 &&
                martes.map((day: Date, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      "h-[75pt] relative",
                      index < martes.length ? "border-b border-gray-200" : "",
                      (index == 0 && day.getDate() > 7) ||
                        (index == martes.length - 1 && day.getDate() < 7)
                        ? "bg-gray-50"
                        : ""
                    )}
                  >
                    <div className="p-2 text-xs text-gray-600 absolute">
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
            </div>
            <div className="w-1/7">
              {miercoles.length > 0 &&
                miercoles.map((day: Date, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      "h-[75pt] relative",
                      index < miercoles.length ? "border-b border-gray-200" : "",
                      (index == 0 && day.getDate() > 7) ||
                        (index == miercoles.length - 1 && day.getDate() < 7)
                        ? "bg-gray-50"
                        : ""
                    )}
                  >
                    <div className="p-2 text-xs text-gray-600 absolute">
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
            </div>
            <div className="w-1/7">
              {jueves.length > 0 &&
                jueves.map((day: Date, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      "h-[75pt] relative",
                      index < jueves.length ? "border-b border-gray-200" : "",
                      (index == 0 && day.getDate() > 7) ||
                        (index == jueves.length - 1 && day.getDate() < 7)
                        ? "bg-gray-50"
                        : ""
                    )}
                  >
                    <div className="p-2 text-xs text-gray-600 absolute">
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
            </div>
            <div className="w-1/7">
              {viernes.length > 0 &&
                viernes.map((day: Date, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      "h-[75pt] relative",
                      index < viernes.length ? "border-b border-gray-200" : "",
                      (index == 0 && day.getDate() > 7) ||
                        (index == viernes.length - 1 && day.getDate() < 7)
                        ? "bg-gray-50"
                        : ""
                    )}
                  >
                    <div className="p-2 text-xs text-gray-600 absolute">
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
            </div>
            <div className="w-1/7">
              {sabados.length > 0 &&
                sabados.map((day: Date, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      "h-[75pt] relative",
                      index < sabados.length ? "border-b border-gray-200" : "",
                      (index == 0 && day.getDate() > 7) ||
                        (index == sabados.length - 1 && day.getDate() < 7)
                        ? "bg-gray-50"
                        : ""
                    )}
                  >
                    <div className="p-2 text-xs text-gray-600 absolute">
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
            </div>
            <div className="w-1/7">
              {domingos.length > 0 &&
                domingos.map((day: Date, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      "h-[75pt] relative",
                      index < domingos.length ? "border-b border-gray-200" : "",
                      (index == 0 && day.getDate() > 7) ||
                        (index == domingos.length - 1 && day.getDate() < 7)
                        ? "bg-gray-50"
                        : ""
                    )}
                  >
                    <div className="p-2 text-xs text-gray-600 absolute">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
