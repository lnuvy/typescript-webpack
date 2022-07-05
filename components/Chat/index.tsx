import React, { FC } from 'react';
import { ChatWrapper } from '@components/Chat/styles';
import gravatar from 'gravatar';
import { IDM } from '@typings/db';
import dayjs from 'dayjs';

interface Props {
  data: IDM;
}

const Chat: FC<Props> = ({ data }) => {
  if (!data) return null;

  const user = data.Sender;

  return (
    <ChatWrapper>
      <div className='chat-img'>
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className='chat-user'>
        <b>{user.nickname}</b>
        <span>{dayjs(data.createdAt).format('h:mm A')}</span>
      </div>
      <p>{data.content}</p>
    </ChatWrapper>
  );
};

export default Chat;