import React, { useCallback, useState } from 'react';
import { Button, Form, Header, Input, Label, LinkContainer, Error } from '@pages/signUp/styles';
import useInput from '@hooks/useInput';
import useInputs from '@hooks/useInputs';

const SignUp = () => {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [mismatchError, setMismatchError] = useState(false);

  const [inputs, onChangeHook] = useInputs({});

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
      console.log(inputs);
      if (!mismatchError) {
        console.log('성공');
      }
    },
    [email, nickname, inputs, password, passwordCheck, mismatchError],
  );

  return (
    <div id='container'>
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id='email-label'>
          <span>이메일 주소</span>
          <div>
            <Input type='email' id='email' name='email' value={inputs.email} onChange={onChangeHook} />
          </div>
        </Label>
        <Label id='nickname-label'>
          <span>닉네임</span>
          <div>
            <Input type='text' id='nickname' name='nickname' value={inputs.nickname} onChange={onChangeHook} />
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
        </Label>
        <Button type='submit'>회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        {/*<Link to="/login">로그인 하러가기</Link>*/}
      </LinkContainer>
    </div>
  );
};

export default SignUp;
