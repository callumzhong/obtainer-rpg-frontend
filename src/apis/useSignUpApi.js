import useHttp from 'hooks/useHttp';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useGetAllRoleApi } from './useRoleApi';

const schema = yup
  .object({
    email: yup.string().email('email 格式錯誤').required('必填'),
    password: yup.string().min(8, '至少 8 個字元').required('必填'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], '與密碼不一致')
      .required('必填'),
    account: yup
      .string()
      .min(4, '至少 4 個字元')
      .max(12, '最多限制12字元')
      .required('必填'),
  })
  .required();

const useSignUpApi = () => {
  const { isLoading, data, error, sendRequest } = useHttp();
  const {
    data: roleData,
    error: roleError,
    getAllRoleApi,
  } = useGetAllRoleApi();
  const navigate = useNavigate();
  const signUpApi = (body) => {
    sendRequest({
      url: `${process.env.REACT_APP_API_SERVER}/api/user/sign_up`,
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res) return;
        localStorage.setItem('authorization', res.token);
        navigate('/create-role');
      })
      .catch((err) => {});
  };

  return {
    data,
    isLoading,
    error,
    signUpApi,
  };
};

export { schema };
export default useSignUpApi;
