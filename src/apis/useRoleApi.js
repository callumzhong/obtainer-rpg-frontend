import useHttp from 'hooks/useHttp';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const createRoleSchema = yup
  .object({
    name: yup.string().max(8).required('必填'),
    url: yup.string().required(),
  })
  .required();

const useGetAllRoleApi = () => {
  const { isLoading, data, error, sendRequest } = useHttp();
  const getAllRoleApi = () =>
    sendRequest({
      url: `${process.env.REACT_APP_API_SERVER}/api/roles`,
      method: 'GET',
      useToken: true,
    });

  return {
    isLoading,
    error,
    data,
    getAllRoleApi,
  };
};

const useCreateRoleApi = () => {
  const { isLoading, data, error, sendRequest } = useHttp();
  const navigate = useNavigate();

  const createRoleApi = (body) => {
    sendRequest({
      url: `${process.env.REACT_APP_API_SERVER}/api/role`,
      method: 'POST',
      body: JSON.stringify(body),
      useToken: true,
    })
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {});
  };

  return {
    isLoading,
    error,
    data,
    createRoleApi,
  };
};

export { useGetAllRoleApi, useCreateRoleApi, createRoleSchema };
