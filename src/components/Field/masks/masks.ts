import { useMaskito } from "@maskito/react";

export const CUIT_MASK = {
  options: {
    mask: [
      ...Array(1).fill(/2/),
      ...Array(1).fill(/(3|7|0)/),
      "-",
      ...Array(8).fill(/\d/),
      "-",
      ...Array(1).fill(/[1-9]/),
    ],
  },
};

export const DNI_MASK = {
  options: {
    mask: [
      ...Array(2).fill(/\d/),
      ...Array(3).fill(/\d/),
      ...Array(3).fill(/\d/),
    ],
  },
};
