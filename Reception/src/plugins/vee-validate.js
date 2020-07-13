import { extend } from "vee-validate"
import {
  required,
  alpha,
  numeric,
  alpha_spaces,
  alpha_num
} from "vee-validate/dist/rules"

extend("required", {
  ...required,
  message: "This field is required"
})

extend("alpha", {
  ...alpha,
  message: "This field must only contain alphabetic characters"
})

extend("alpha_spaces", {
  ...alpha_spaces,
  message: "This field must only contain alphabetic and space characters"
})

extend("numeric", {
  ...numeric,
  message: "This field must only contain numeric values"
})

extend("alpha_num", {
  ...alpha_num,
  message: "This field must only contain alpha-numeric values"
})
