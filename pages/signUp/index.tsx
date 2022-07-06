import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Header, Input, Label, LinkContainer, Error, Success } from '@pages/signUp/styles';
import useInputs from '@hooks/useInputs';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const SignUp = () => {
  const { data, error, mutate } = useSWR('/api/users', fetcher, {
    dedupingInterval: 100000,
  });
  const navigate = useNavigate();
  const [inputs, onChangeHook] = useInputs({});
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState(false);

  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!mismatchError && inputs.nickname) {
        console.log('성공');

        // 비동기요청에서 setState 를 하는경우, 미리 초기화를 해주는것이 좋다.
        setSignUpError('');
        setSignUpSuccess(false);
        axios
          .post('/api/users', {
            email: inputs.email,
            nickname: inputs.nickname,
            password,
          })
          .then((res: AxiosResponse) => {
            console.log(res);
            setSignUpSuccess(true);
          })
          // 여기 타입 못찾겠음.. Error | AxiosError 아님
          .catch((err: any) => {
            console.log(err.response);
            setSignUpError(err.response.data);
          });
      }
    },
    [inputs, password, passwordCheck, mismatchError],
  );

  if (data) {
    navigate('/workspace/sleact/channel/일반');
  }

  return (
    <div id='container'>
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id='email-label'>
          <span>이메일 주소</span>
          <div>
            <Input type='email' id='email' name='email' value={inputs.email || ''} onChange={onChangeHook} />
          </div>
        </Label>
        <Label id='nickname-label'>
          <span>닉네임</span>
          <div>
            <Input type='text' id='nickname' name='nickname' value={inputs.nickname || ''} onChange={onChangeHook} />
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
            <Input type='password' id='password-check' name='password-check' value={passwordCheck} onChange={onChangePasswordCheck} />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입 되었습니다! 로그인 해주세요.</Success>}
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
