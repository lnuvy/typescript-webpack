import React, { useCallback, useRef, useState } from 'react';
import useSWR  from 'swr';
import { useParams } from 'react-router';
import fetcher from '@utils/fetcher';
import gravatar from 'gravatar';
import { Container, Header } from '@pages/directMessage/styles';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import axios from 'axios';
import { IDM } from '@typings/db';
import useInput from '@hooks/useInput';
import makeSections from '@utils/makeSections';
import Scrollbars from 'react-custom-scrollbars-2';

const DirectMessage = () => {
  const { workspace, name } = useParams();
  const scrollbarRef = useRef<Scrollbars>(null);

  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${name}`, fetcher);
  const { data: myData } = useSWR(`/api/users`, fetcher);
  const [chat, onChangeChat, setChat] = useInput('');
  const { data: chatData, mutate: mutateChat } = useSWR<IDM[]>(
    `/api/workspaces/${workspace}/dms/${name}/chats?perPage=20&page=1`,
    fetcher,
  );

  // console.log(chatData);

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

  if (!userData || !myData || !chatData) {
    return null;
  }

  const chatSections = makeSections(chatData ? [...chatData].reverse() : []);

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>
      </Header>
      <ChatList chatSections={chatSections} ref={scrollbarRef} />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default DirectMessage;
