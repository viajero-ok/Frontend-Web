// ---
type TvalidationParams = {
  errorStack: string[];
  errorMessage?: string;
};

export const Validator = () => {
  let errorStack: string[] = [];
  let pipeline: Function[] = [];

  return {
    failTest(errorMessage?: string) {
      pipeline.push((value: string) => {
        errorStack.push(errorMessage ?? "ERROR: Fail test");
      });
      return this;
    },
    passTest(errorMessage?: string) {
      pipeline.push((value: string) => {
        return;
      });
      return this;
    },
    isHelloWorld(errorMessage?: string) {
      pipeline.push((value: string) => {
        if (value == "Hello, World!") return;
        errorStack.push(errorMessage ?? "ERROR: Must be 'Hello, World!'");
      });
      return this;
    },
    required(errorMessage?: string) {
      pipeline.push((value: string) => {
        if (value.length > 0) return;
        errorStack.push(errorMessage ?? "ERROR: The field is required");
      });
      return this;
    },
    isEmail(errorMessage?: string) {
      pipeline.push((value: string) => {
        if (
          value.length > 0 &&
          /^([\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7})$|^$/.test(value)
        )
          return;
        errorStack.push(errorMessage ?? "ERROR: Must be a valid email");
      });
      return this;
    },
    validate(value: string) {
      errorStack = [];
      pipeline.forEach((func) => func(value));
      return errorStack;
    },
    isValid(value: string) {
      return this.validate(value);
    },
  };
};
