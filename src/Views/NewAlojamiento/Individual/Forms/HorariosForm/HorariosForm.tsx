import { useAlojamientoIndividual } from "../../Provider/AlojamientoIndividualProvider";
import HorariosCheckInOut from "./HorariosCheckInOut";

export default function HorariosForm() {
  const { horariosForm } = useAlojamientoIndividual();
  const form = horariosForm;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col w-full">
        <HorariosCheckInOut />
      </div>
    </div>
  );
}
