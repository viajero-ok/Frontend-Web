export class BooleanValueObject {
  value: boolean;
  constructor(stringValue: "0" | "1") {
    this.value = stringValue == "1";
  }
}
