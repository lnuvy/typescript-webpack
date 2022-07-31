import axios from 'axios';

interface loginParams {
  email: string | undefined;
  password: string | undefined;
}

export const loginAPI = ({ email, password }: loginParams) =>
  axios
    .post(
      '/api/users/login',
      { email, password },
      {
        withCredentials: true,
      },
    )
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error.response);
      console.log(error.response.data.statusCode);
      return error.response.status === 401 ? error.response.data : null;
    });

export const logoutAPI = () =>
  axios.post(`/api/users/logout`, null, { withCredentials: true }).then((res) => {
    if (res.data === 'ok') return true;
  });
