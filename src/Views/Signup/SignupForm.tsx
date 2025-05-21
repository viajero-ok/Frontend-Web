import { zodResolver } from "@hookform/resolvers/zod";
import { IonImg, useIonRouter } from "@ionic/react";
import { z } from "zod";
import {
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/Form/Field";
import { Input } from "../../components/ui/Input/Input";
import { useForm } from "react-hook-form";
import { registrarCuenta } from "../../App/Auth/Cuenta";
import { useState } from "react";

const formSchema = z.object({
  email: z.string({ message: "Campo requerido" }),
  password: z.string({ message: "Campo requerido" }),
  repeatPassword: z.string({ message: "Campo requerido" }),
});

type TProps = {
  setIdUsuario: React.Dispatch<React.SetStateAction<string>>;
};
export default function SignupForm(props: TProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useIonRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const handleCrearCuenta = () => {
    if (!form) return;
    setLoading(true);
    registrarCuenta({
      mail: form.getValues().email,
      contraseña: form.getValues().password,
    })
      .then((response: any) => {
        props.setIdUsuario(response.data.id_usuario);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleCrearCuenta();
  }

  return (
    <div className="w-full p-4">
      <div className="flex flex-col justify-start ">
        <div className="flex flex-row gap-2 mb-4">
          <IonImg src="/icon.png" style={{ width: "16pt" }} />
          <div className="text-[var(--color-viajero)] font-bold text-md">
            VIAJERO
          </div>
        </div>
        <div className="text-gray-600 text-3xl font-bold mb-4">
          El viaje empieza acá
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Correo electrónico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Contraseña" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    disableShowPassword
                    placeholder="Repetir contraseña"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" className={cn("viajero-button w-full py-3")}>
            Registrarme
          </button>
          <div className="text-sm text-gray-600 mt-2 w-full justify-center flex flex-row gap-1">
            Ya estás registrado?{" "}
            <span
              className="font-bold cursor-pointer hover:underline"
              onClick={() => router.push("login")}
            >
              Iniciá sesión
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
}
