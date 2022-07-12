import useInput from '@hooks/useInput';
import { Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/signUp/styles';
import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@queries/hooks';
import { loginAPI } from '@pages/login/api';
import { useQueryClient } from 'react-query';
import { log } from 'util';

const LogIn = () => {
  const queryClient = useQueryClient();
  const { data, isFetching, error } = useUser();

  const navigate = useNavigate();
  const [logInError, setLogInError] = useState(null);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setLogInError(null);

      loginAPI(email, password)
        .then(() => {
          queryClient.refetchQueries('/api/users').then();
        })
        .catch((message) => {
          setLogInError(message);
        });
    },
    [email, password],
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }
  // console.log(error, userData);
  // if (!error && userData) {
  //   console.log('로그인됨', userData);
  //   return <Redirect to="/workspace/sleact/channel/일반" />;
  // }

  if (data) {
    navigate('workspace/sleact/channel/일반');
  }

  return (
    <div id='container'>
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id='email-label'>
          <span>이메일 주소</span>
          <div>
            <Input type='email' id='email' name='email' value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id='password-label'>
          <span>비밀번호</span>
          <div>
            <Input type='password' id='password' name='password' value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>{logInError}</Error>}
        </Label>
        <Button type='submit'>로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to='/signup'>회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
