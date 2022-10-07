import * as yup from "yup";

const schema = yup.object({
  channel_name: yup.string().required("O campo canal precisa ser preenchido."),
  description: yup.string().required("O campo de descrição precisa ser preenchido."),
}).required();

export default schema;