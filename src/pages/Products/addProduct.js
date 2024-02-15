import * as yup from "yup";

export default yup.object({
  title: yup
    .string()
    .min(5, "Title Should Be atleast 5 Characters")
    .required("Title Is Requered"),
  price: yup.object({
    new: yup
      .number()
      .typeError("Price have to be a number")
      .required("Price Is Requered"),
    old: yup.number().typeError("Price have to be a number"),
    discount: yup.number().typeError("Discount have to be a number"),
    shipping: yup.number().typeError("shipping Price have to be a number"),
  }),
  quantity: yup.number().typeError("Quantity have to be a number"),
  description: yup.string().required("Description Is Requered"),
  subCategory: yup.string().required("Sub Category Is Requered"),
  imgUrl: yup.string(),
  file: yup.mixed().nullable(),
  specifications: yup.object().required("Specifications are Requered"),
});
