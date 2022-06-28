import React, { FC, useCallback } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useNavigate } from 'react-router-dom';

const Workspace: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate();
  const { data, error, mutate } = useSWR('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 100000,
  });

  const onLogout = useCallback(() => {
    axios.post('http://localhost:3095/api/users/logout', null, { withCredentials: true }).then((res) => {
      console.log(res);
      mutate(false);
    });
  }, []);

  if (!data) {
    navigate('/login');
  }
  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
