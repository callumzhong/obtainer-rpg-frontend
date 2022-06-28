import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().email('email 格式錯誤').required('必填'),
    password: yup.string().min(8, '至少 8 個字元').required('必填'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], '與密碼不一致')
      .required('必填'),
    account: yup.string().min(4, '至少 4 個字元').max(12, '最多限制12字元').required('必填'),
  })
  .required();

export default schema;
