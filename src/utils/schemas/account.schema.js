import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("O campo nome completo precisa ser preenchido."),
  username: yup.string().required("O campo nome de usuário precisa ser preenchido."),
  email: yup.string().email("Preencha um e-mail válido.").required("O campo e-mail precisa ser preenchido."),
}).required();

export default schema;