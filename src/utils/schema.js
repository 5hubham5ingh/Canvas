import * as Yup from "yup";

export const logInValidationSchema = Yup.object().shape({
  key: Yup.string("Huh? I don't understand.").required(
    "Opps! Key is required."
  ),
  accountName: Yup.string("Huh? I don't understand.").required(
    "Opps! Account's name is required."
  ),
});
