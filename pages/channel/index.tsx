import React, { useCallback } from 'react';
import Index from '@layouts/workspace';
import { Container, Header } from '@pages/channel/Styles';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import ChatList from '@components/ChatList';

const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitForm = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setChat('');
  }, []);

  return (
    <Container>
      <Header>채널!</Header>
      {/*<ChatList />*/}
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
