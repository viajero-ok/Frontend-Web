import { useState } from "react";

export const useProvideRegistroAlojamiento = (props: any) => {
  const [data, setData] = useState<any>();

  return {
    ...data,
  };
};
