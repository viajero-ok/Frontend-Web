import { ReactNode, createContext, useContext } from "react";
import { useProvideForm } from "./useForm";

export interface ISchema {
  [key: string]: any;
}

type UseFormProvider = {
  schema: ISchema;
  setValue: (key: string, value: string) => void;
};

const FormContext = createContext<UseFormProvider | undefined>(undefined);

export const FormProvider: React.FC<{
  children: ReactNode;
  schema: ISchema;
}> = (props: { children: ReactNode; schema: ISchema }) => {
  const context = useProvideForm({ schema: props.schema });
  console.log("schema form provider: ", props.schema);

  return (
    <FormContext.Provider value={context}>
      {props.children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  return useContext(FormContext);
};
