import React, { FC, useCallback, useEffect, useState } from 'react';
import { IDM, IUser, IUserWithOnline } from '@typings/db';
import { useParams } from 'react-router';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { CollapseButton } from '@components/DMList/styles';
import { NavLink } from 'react-router-dom';

interface Props {
  userData?: IUser;
}

const DMList: FC<Props> = ({ userData }) => {
  const { workspace } = useParams();
  const { data: memberData } = useSWR<IUserWithOnline[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  const [channelCollapse, setChannelCollapse] = useState(false);
  const [countList, setCountList] = useState<{ [key: string]: number }>({});
  const [onlineList, setOnlineList] = useState<number[]>([]);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  const resetCount = useCallback((id: string) => {
    setCountList((list) => {
      return {
        ...list,
        [id]: 0,
      };
    });
  }, []);

  const onMessage = (data: IDM) => {
    console.log('dm 수신', data);
    setCountList((list) => {
      return {
        ...list,
        [data.SenderId]: list[data.SenderId] ? list[data.SenderId] + 1 : 1,
      };
    });
  };

  useEffect(() => {
    console.log('workspace 변경!', workspace);
    setOnlineList([]);
    setCountList({});
  }, [workspace]);

  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className='c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline'
            data-qa='channel-section-collapse'
            aria-hidden='true'
          />
        </CollapseButton>
        <span>Direct Messages</span>
      </h2>
      <div>
        {!channelCollapse &&
          memberData?.map((member) => {
            const isOnline = onlineList.includes(member.id);
            return (
              // navLink 를 Link 로 바꾸고 activeClassName을 className 으로 변경
              <NavLink
                key={member.id}
                className={({ isActive }) => (isActive ? 'selected' : undefined)}
                to={`/workspace/${workspace}/dm/${member.id}`}
              >
                <i
                  className={`c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence ${
                    isOnline ? 'c-presence--active c-icon--presence-online' : 'c-icon--presence-offline'
                  }`}
                  aria-hidden='true'
                  data-qa='presence_indicator'
                  data-qa-presence-self='false'
                  data-qa-presence-active='false'
                  data-qa-presence-dnd='false'
                />
                <span>{member.nickname}</span>
                {member.id === userData?.id && <span> (나)</span>}
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default DMList;