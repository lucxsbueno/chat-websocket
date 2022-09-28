import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("O campo nome completo precisa ser preenchido."),
  email: yup.string().email("Preencha um e-mail válido.").required("O campo e-mail precisa ser preenchido."),
  pass: yup.string().min(4, "Minímo 4 caracteres.").max(16, "Máximo 16 caracteres.").required("A senha é necessária.")
}).required();

export default schema;