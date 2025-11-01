import { MessageSquare } from "lucide-react";
import { cn } from "../../../components/ui/Form/Field";

const Reserva = ({ selected }: { selected?: boolean }) => {
  return (
    <div
      className={cn(
        "relative border hover:border-black rounded-md w-full p-4 flex flex-col gap-1 cursor-pointer",
        selected
          ? "bg-[var(--color-viajero)]/5 border-[var(--color-viajero)]"
          : "bg-white border-[#bbb]"
      )}
    >
      <div className="text-gray-600 text-xs italic">22/10/2025</div>
      <div className="text-gray-600 font-bold w-full">La Posada del fede</div>
      <div className="text-gray-600 text-xs">
        Habitación matrimonial deluxe &bull; Habitación single econo (2)
      </div>
      <div className="absolute top-4 right-4 w-fit h-fit">
        <MessageSquare className="w-[24pt] h-[24pt] text-gray-600" />
        <span className="absolute -top-1 -right-1 rounded-full h-fit px-1 font-bold bg-red-400 text-white text-xs">
          3
        </span>
      </div>
    </div>
  );
};

export default function ItineraryMessagesView() {
  return (
    <div className="grid grid-cols-12 h-full w-full">
      <div className="flex flex-col col-span-4 p-4 gap-2 overflow-y-auto">
        <div className="w-full p-4 border border-[#bbb] rounded-md text-gray-600 font-bold bg-gray-50">
          Reservas vigentes
        </div>
        <Reserva selected />
        <Reserva />
        <Reserva />
        <div className="w-full p-4 border border-[#bbb] rounded-md text-gray-600 font-bold bg-gray-50">
          Reservas finalizadas
        </div>
        <Reserva />
        <Reserva />
        <Reserva />
        <Reserva />
      </div>
      <div className="col-span-8 grid grid-rows-12 flex-col gap-4 mx-8 pb-4 h-full">
        <div className="row-span-4 pt-4">
          <div className="flex flex-row items-center justify-center border border-[#bbb] bg-gray-50 rounded-md w-full h-full">
            acá iría un resumen de la reserva :)
          </div>
        </div>
        <div className="row-span-8 flex flex-col gap-4">
          <div className="border border-[#bbb] rounded-md p-4 h-full flex flex-col w-full justify-end">
            <div className="w-full flex flex-row justify-center">
              <div className="text-gray-600 italic p-4 bg-gray-50 shadow-sm rounded-sm">
                Reservaste del 25/10/25 al 30/10/25
              </div>
            </div>
            <div className="flex flex-row w-full justify-end">
              <div className="flex flex-col gap-1 items-end">
                <div className="text-xs text-gray-400 italic mr-2">
                  hace 3 minutos
                </div>
                <div className="bg-[var(--color-viajero)] w-fit h-fit p-4 rounded-t-lg rounded-l-lg text-gray-50 shadow-sm">
                  Buenos días... Necesito saber si aceptan mascotas
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full justify-start">
              <div className="bg-gray-50 w-fit h-fit p-4 rounded-b-lg rounded-r-lg text-gray-600 shadow-sm">
                No, no aceptamos. Salu2
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <textarea
              placeholder="Escribí tu consulta..."
              rows={1}
              className="w-full resize-none border border-[#bbb] hover:border-black text-gray-600 placeholder:text-[var(--color-viajero)]/60 rounded-md p-4 focus-visible:outline-[var(--color-viajero)] focus-visible:outline-2 -outline-offset-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  console.log("Mensaje enviado");
                }
              }}
            />
            <div className="viajero-button flex flex-row items-center justify-center px-8">
              Enviar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
