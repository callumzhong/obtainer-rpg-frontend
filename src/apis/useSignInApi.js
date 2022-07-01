import useHttp from 'hooks/useHttp';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useGetAllRoleApi } from './useRoleApi';

const schema = yup
  .object({
    account: yup
      .string()
      .min(4, '至少 4 個字元')
      .max(12, '最多限制12字元')
      .required('必填'),
    password: yup.string().min(8, '至少 8 個字元').required('必填'),
  })
  .required();

const useSignInApi = () => {
  const { isLoading, error, sendRequest } = useHttp();
  const { getAllRoleApi } = useGetAllRoleApi();

  const navigate = useNavigate();
  const signInApi = async (body) => {
    sendRequest({
      url: `${process.env.REACT_APP_API_SERVER}/api/user/sign_in`,
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((res) => {
        localStorage.setItem('authorization', res.token);
        return getAllRoleApi();
      })
      .then((res) => {
        if (Array.isArray(res) && res.length === 0) {
          navigate('/create-role');
          return;
        }
        navigate('/');
      })
      .catch((err) => {});
  };

  return {
    isLoading,
    error,
    signInApi,
  };
};

export { schema };
export default useSignInApi;
