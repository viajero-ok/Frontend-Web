import { useEffect, useState } from "react";
import { ISchema } from "./FormProvider";

interface IUseProvideForm {
  schema: ISchema;
}
export const useProvideForm = (props: IUseProvideForm) => {
  const [schema, setSchema] = useState<any>();

  useEffect(() => {
    setSchema(
      Object.fromEntries([
        ...Object.entries(props.schema).map((entry: { [key: string]: any }) => [
          entry[0],
          "",
        ]),
      ])
    );
  }, []);

  const setValue = (key: string, value: string) => {
    console.log("llega pero no muestra key")
    if (!schema) return;
    console.log("key: ", key, value);
    setSchema((prev: any) => {
      const copy = { ...prev };
      copy[key] = value;
      return copy;
    });
  };

  return {
    schema,
    setValue,
  };
};
