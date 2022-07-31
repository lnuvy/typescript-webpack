import useInput from '@hooks/useInput';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './styles';
import { Link, Navigate } from 'react-router-dom';
import { useUser } from '@queries/hooks';

const SignUp = () => {
  const { isLoading, isSuccess, status, isError, data, error } = useUser();

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck, setPassword],
  );

  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password, setPasswordCheck],
  );

  const mutation = useMutation<IUser, AxiosError, { email: string; password: string; nickname: string }>(
    'user',
    (data) => axios.post('/api/users', data).then((response) => response.data),
    {
      onMutate() {
        setSignUpError('');
        setSignUpSuccess(false);
      },
      onSuccess() {
        setSignUpSuccess(true);
      },
      onError(error: any) {
        setSignUpError(error.response?.data);
      },
    },
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!mismatchError && nickname) {
        mutation.mutate({ email, nickname, password });
      }
    },
    [email, nickname, password, mismatchError, mutation],
  );

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (data) {
    return <Navigate to='/workspace/sleact/channel/일반' />;
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
        <Label id='nickname-label'>
          <span>닉네임</span>
          <div>
            <Input type='text' id='nickname' name='nickname' value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id='password-label'>
          <span>비밀번호</span>
          <div>
            <Input type='password' id='password' name='password' value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id='password-check-label'>
          <span>비밀번호 확인</span>
          <div>
            <Input
              type='password'
              id='password-check'
              name='password-check'
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type='submit'>회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to='/login'>로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
