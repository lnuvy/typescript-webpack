import React, { FC, useCallback, useState } from 'react';
import { IChannel, IUser } from '@typings/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router';
import { CollapseButton } from '@components/DMList/styles';
import { NavLink } from 'react-router-dom';
import { useQuery } from 'react-query';

const ChannelList: FC = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [countList, setCountList] = useState<{ [key: string]: number }>({});


  const {data: userData} = useQuery('/api', fetcher, {})
  const { data: userData } = useSWR<IUser>('/api/users', fetcher, { dedupingInterval: 2000 });
  const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

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
        <span>Channels</span>
      </h2>
      <div>
        {!channelCollapse &&
          channelData?.map((channel) => {
            // console.log('channelList 속성 하나', channel);
            return (
              <NavLink
                key={channel.name}
                className={({ isActive }) => (isActive ? 'selected' : undefined)}
                to={`/workspace/${workspace}/channel/${channel.name}`}
              >
                <span># {channel.name}</span>
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default ChannelList;
