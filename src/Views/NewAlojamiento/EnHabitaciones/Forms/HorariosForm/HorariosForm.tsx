import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../../components/ui/Form/Field";
import { useAlojamientoEnHabitaciones } from "../../Provider/AlojamientoEnHabitacionesProvider";
import HorariosCheckInOut from "./HorariosCheckInOut";

export default function HorariosForm() {
  const { horariosForm } = useAlojamientoEnHabitaciones();
  const form = horariosForm;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col w-full">
        <HorariosCheckInOut />
      </div>
    </div>
  );
}
