import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Card from "../../components/ui/Card/Card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/Form/Field";
import { Input } from "../../components/ui/Input/Input";

const formSchema = z.object({
  username: z
    .string({ message: "El campo es requerido." })
    .max(10, "Máximo 10 caracteres"),
  //   password: z.string({ message: "El campo es requerido." }),
});

export default function PruebaFormView() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange"
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("VALUES")
    console.log(values);
  }

  return (
    <>
      <h1>Hello, World!</h1>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Button type="submit">Submit</Button> */}
          </form>
        </Form>
      </Card>
    </>
  );
}
