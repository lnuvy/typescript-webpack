import React, { FC, memo, useMemo } from 'react';
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

// 흐어 공부는 언제하지
const Chat: FC<Props> = ({ data }) => {
  const { workspace, name } = useParams();
  if (!data) return null;

  const user = data.Sender;

  const result = useMemo(
    () =>
      // reg 정규식은 성능이 좋은편이 아님
      regexifyString({
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
      }),
    [data.content],
  );

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

export default memo(Chat);
