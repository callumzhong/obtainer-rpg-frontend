import useHttp from 'hooks/useHttp';

const useCheckAuthApi = () => {
  const { isLoading, data, error, sendRequest } = useHttp();
  const checkAuthApi = () =>
    sendRequest({
      url: `${process.env.REACT_APP_API_SERVER}/api/user/check_auth`,
      method: 'GET',
      useToken: true,
    });

  return {
    isLoading,
    error,
    data,
    checkAuthApi,
  };
};

export default useCheckAuthApi;
