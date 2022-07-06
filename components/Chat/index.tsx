import React, { FC } from 'react';
import { ChatWrapper } from '@components/Chat/styles';
import gravatar from 'gravatar';
import { IDM } from '@typings/db';
import dayjs from 'dayjs';
import regexifyString from 'regexify-string';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

interface Props {
  data: IDM;
}

const Chat: FC<Props> = ({ data }) => {
  const { workspace, name } = useParams();
  if (!data) return null;

  const user = data.Sender;

  // \d 숫자
  // +는 1개이상 ?는 0개나 1개, *은 0개이상
  // g는 모두찾기
  const result = regexifyString({
    input: data.content,
    pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
    decorator(match, index) {
      const arr = match.match(/@\[(.+?)]\((\d+?)\)/)!;
      if (arr) {
        return (
          <Link key={match + index} to={`/workspace/${workspace}/dm/${arr[2]}`}>
            @{arr[1]}
          </Link>
        );
      }
      return <br key={index} />;
    },
  });

  return (
    <ChatWrapper>
      <div className='chat-img'>
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className='chat-user'>
        <b>{user.nickname}</b>
        <span>{dayjs(data.createdAt).format('h:mm A')}</span>
      </div>
      <p>{result}</p>
    </ChatWrapper>
  );
};

export default Chat;
