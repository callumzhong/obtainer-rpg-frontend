import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCheckAuthApi from './useCheckAuthApi';

const { defaults } = require('autoprefixer');
const { useContext } = require('react');
const { useEffect } = require('react');
const { default: LoadContext } = require('store/loadContext');
const { useGetAllRoleApi } = require('./useRoleApi');
const useAuth = () => {
  const { checkAuthApi } = useCheckAuthApi();
  const { getAllRoleApi, data } = useGetAllRoleApi();
  const loadCtx = useContext(LoadContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || isDone) return;
    setIsLoading(true);
    checkAuthApi()
      .then((_) => {
        return getAllRoleApi();
      })
      .then((res) => {
        if (!res || res.length === 0) {
          loadCtx.setSwitchScene(false);
          navigate('/create-role');
          return;
        }
        setIsDone(true);
        setIsLoading(false);
      })
      .catch((err) => {
        navigate('/login');
        setIsDone(true);
        setIsLoading(false);
      });
  }, [getAllRoleApi, checkAuthApi, isDone, navigate, isLoading, loadCtx]);

  return { isDone, role: data };
};

export default useAuth;
