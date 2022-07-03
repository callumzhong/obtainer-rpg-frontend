import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthTokenApi from '../apis/useAuthTokenApi';

const { useContext } = require('react');
const { useEffect } = require('react');
const { default: LoadContext } = require('store/loadContext');
const { useGetAllRoleApi } = require('../apis/useRoleApi');

const useAuthRoute = () => {
  const { authTokenApi } = useAuthTokenApi();
  const { getAllRoleApi, data } = useGetAllRoleApi();
  const { isSwitchScene, setSwitchScene } = useContext(LoadContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading || isSwitchScene) return;
    setSwitchScene(true);
    authTokenApi()
      .then((_) => {
        return getAllRoleApi();
      })
      .then((res) => {
        if (!res || res.length === 0) {
          navigate('/create-role');
        }
      })
      .catch((err) => {
        navigate('/login');
      })
      .finally(() => {
        setIsLoading(false);
        setSwitchScene(false);
      });
  }, [
    getAllRoleApi,
    authTokenApi,
    isLoading,
    navigate,
    setSwitchScene,
    isSwitchScene,
  ]);

  return { isLoading, hero: data ? data[0] : null };
};

export default useAuthRoute;
