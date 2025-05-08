import { zodResolver } from "@hookform/resolvers/zod";
import { useIonRouter } from "@ionic/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form/Field";
import { Input } from "../../components/ui/Input/Input";

const formSchema = z.object({
  email: z.string({ message: "Campo requerido" }),
  password: z.string({ message: "Campo requerido" }),
});

export default function LoginForm() {
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [ToastMessage, setToastMessage] = useState<string>("");

  const router = useIonRouter();

  // const handleIniciarSesion = () => {
  //   if (!form) return;
  //   if (!router) return;
  //   if (!auth) return;
  //   // Acá se tiene ejecutar la validación del schema
  //   iniciarSesion({
  //     mail: form.schema.email,
  //     contraseña: form.schema.password,
  //   })
  //     .then((response: any) => {
  //       auth.login();
  //       router.push("/");
  //     })
  //     .catch((error: any) => {
  //       setToastMessage(error.response.data.message);
  //       setOpenToast(true);
  //     });
  // };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("VALUES");
    console.log(values);
  }

  return (
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
                <Input placeholder="Contraseña" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className={cn("viajero-button w-full py-3")}>
          Ingresar
        </button>
      </form>
    </Form>
  );
}
