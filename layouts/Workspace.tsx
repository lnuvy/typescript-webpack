import React, { FC, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const queryClient = useQueryClient();

// @ts-ignore
const Workspace: FC = ({ children }) => {
  const { data, error, isLoading } = useQuery('userInfo', () => {
    axios.get('http://localhost:3095/api/users').then(({ data }) => {
      console.log(data);
    });
  });

  const onLogout = useCallback(() => {
    axios.post('http://localhost:3095/api/users/logout', null, { withCredentials: true }).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
