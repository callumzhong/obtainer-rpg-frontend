import useHttp from 'hooks/useHttp';

const useAuthTokenApi = () => {
  const { isLoading, data, error, sendRequest } = useHttp();
  const authTokenApi = () =>
    sendRequest({
      url: `${process.env.REACT_APP_API_SERVER}/api/user/check_auth`,
      method: 'GET',
      useToken: true,
    });

  return {
    isLoading,
    error,
    data,
    authTokenApi,
  };
};

export default useAuthTokenApi;
