import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import { useParams } from 'react-router';
import fetcher from '@utils/fetcher';
import gravatar from 'gravatar';
import { Container, Header } from '@pages/directMessage/styles';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import axios from 'axios';
import { IDM } from '@typings/db';
import useInput from '@hooks/useInput';

const DirectMessage = () => {
  const { workspace, name } = useParams();
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${name}`, fetcher);
  const { data: myData } = useSWR(`/api/users`, fetcher);
  const [chat, onChangeChat, setChat] = useInput('');
  const { data: chatData, mutate: mutateChat } = useSWR<IDM[]>(
    `/api/workspaces/${workspace}/dms/${name}/chats?perPage=20&page=1`,
    fetcher,
  );

  // const onSubmitForm = useCallback((e: React.FormEvent) => {}, []);
  const onSubmitForm = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (chat?.trim()) {
        axios
          .post(`/api/workspaces/${workspace}/dms/${name}/chats`, { content: chat })
          .then(() => {
            setChat('');
            mutateChat().then();
          })
          .catch(console.error);
      }
    },
    [chat],
  );

  if (!userData || !myData) {
    return null;
  }

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default DirectMessage;
