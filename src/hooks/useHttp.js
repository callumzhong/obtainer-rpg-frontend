import { useCallback, useReducer } from 'react';

const initialState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case 'RESPONSE':
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not be reached!');
  }
};

const getToken = (format) => `${format} ${localStorage.getItem('AUTHORIZATION')}`;

/**
 * @returns
 */
const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), []);

  const sendRequest = useCallback(
    ({ url, method, useToken = false, body, reqExtra, reqIdentifier }) => {
      const headers = new Headers({ 'Content-Type': 'application/json' });

      if (useToken) {
        headers.append('Authorization', getToken('Bearer'));
      }

      dispatchHttp({ type: 'SEND', identifier: reqIdentifier });
      fetch(url, {
        method: method,
        body: body,
        headers,
      })
        .then(async (response) => {
          if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
          }
          return response.json();
        })
        .then((responseData) => {
          dispatchHttp({
            type: 'RESPONSE',
            responseData: responseData,
            extra: reqExtra,
          });
        })
        .catch((error) => {
          dispatchHttp({
            type: 'ERROR',
            errorMessage: error.message,
          });
        });
    },
    [],
  );

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
    reqExtra: httpState.extra,
    reqIdentifier: httpState.identifier,
    clear,
  };
};

export default useHttp;
