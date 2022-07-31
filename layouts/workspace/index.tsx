import React, { FC, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher } from '../../queries/fetcher';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Styles';
import {
  AddButton,
  Channels,
  Chats,
  Header,
  LogOutButton,
  MenuScroll,
  ProfileImg,
  ProfileModal,
  RightMenu,
  WorkspaceButton,
  WorkspaceModal,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from '@layouts/workspace/Styles';
import gravatar from 'gravatar';
import loadable from '@loadable/component';
import Menu from '@components/Menu';
import { IChannel, IUser } from '@typings/db';
import { Button, Input, Label } from '@pages/signUp/styles';
import useInputs from '@hooks/useInputs';
import Modal from '@components/Modal';
import { toast } from 'react-toastify';
import { Routes, Route, useParams } from 'react-router';
// import CreateChannelModal from '@components/CreateChannelModal';
// import InviteChannelModal from '@components/InviteChannelModal';
// import InviteWorkspaceModal from '@components/InviteWorkspaceModal';
// import DMList from '@components/DMList';
// import ChannelList from '@components/ChannelList';
import useSocket from '@hooks/useSocket';
import { useQuery, useQueryClient } from 'react-query';
import { logoutAPI } from '@pages/login/api';
import { useUser } from '@queries/hooks';

const Channel = loadable(() => import('@pages/channel'));
const DirectMessage = loadable(() => import('@pages/directMessage'));

const Workspace: FC = () => {
  const { workspace, name } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [inputs, onChangeHook, setInputs] = useInputs({});
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);

  const { data } = useUser();

  const [socket, disconnect] = useSocket(workspace);
  //
  // useEffect(() => {
  //   if (channelData && userData && socket) {
  //     console.log(socket);
  //     socket.emit('login', { id: userData.id, channels: channelData.map((v) => v.id) });
  //   }
  // }, [socket, channelData, userData]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [workspace, disconnect]);

  const onLogout = useCallback(() => {
    logoutAPI().then(() => {
      queryClient.setQueryData('/api/users', () => null);
    });
  }, []);

  const onCloseUserProfile = useCallback((e: any) => {
    e.stopPropagation();
    console.log('click');
    setShowUserMenu((prev) => !prev);
  }, []);

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  }, []);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
    setShowInviteChannelModal(false);
  }, []);

  const toggleWorkspaceModal = useCallback(() => setShowWorkspaceModal((prev) => !prev), []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  }, []);

  if (!data) {
    // navigate('/login');
    return <Navigate to='/login' />;
  }

  return (
    <div>
      dfdf
      <button onClick={onLogout}>로그아웃</button>
      {/*<Header>*/}
      {/*  <RightMenu>*/}
      {/*    <span onClick={onCloseUserProfile}>*/}
      {/*      <ProfileImg src={gravatar.url(userData.email, { s: '28px', d: 'retro' })} alt={userData.email} />*/}
      {/*      <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseUserProfile}>*/}
      {/*        <ProfileModal>*/}
      {/*          <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname} />*/}
      {/*          <div>*/}
      {/*            <span id='profile-name'>{userData.nickname}</span>*/}
      {/*            <span id='profile-active'>Active</span>*/}
      {/*          </div>*/}
      {/*        </ProfileModal>*/}
      {/*        <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>*/}
      {/*      </Menu>*/}
      {/*    </span>*/}
      {/*  </RightMenu>*/}
      {/*</Header>*/}
      {/*<WorkspaceWrapper>*/}
      {/*  <Workspaces>*/}
      {/*    {userData.Workspaces?.map((ws) => {*/}
      {/*      return (*/}
      {/*        <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>*/}
      {/*          <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>*/}
      {/*        </Link>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*    <AddButton onClick={onClickCreateWorkspace}>+</AddButton>*/}
      {/*  </Workspaces>*/}
      {/*  <Channels>*/}
      {/*    <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>*/}
      {/*    <MenuScroll>*/}
      {/*      <Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{ top: 95, left: 80 }}>*/}
      {/*        <WorkspaceModal>*/}
      {/*          <h2>Slack</h2>*/}
      {/*          <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>*/}
      {/*          <button onClick={onClickAddChannel}>채널 만들기</button>*/}
      {/*          <button onClick={onLogout}>로그아웃</button>*/}
      {/*        </WorkspaceModal>*/}
      {/*      </Menu>*/}
      {/*      <ChannelList />*/}
      {/*      <DMList userData={userData} />*/}
      {/*    </MenuScroll>*/}
      {/*  </Channels>*/}
      {/*  <Chats>*/}
      {/*    <Routes>*/}
      {/*      <Route path='/channel/:name' element={<Channel />} />*/}
      {/*      <Route path='/dm/:name' element={<DirectMessage />} />*/}
      {/*    </Routes>*/}
      {/*  </Chats>*/}
      {/*</WorkspaceWrapper>*/}
      {/*/!* 모달 시작 *!/*/}
      {/*<Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>*/}
      {/*  <form onSubmit={onCreateWorkspace}>*/}
      {/*    <Label id='workspace-label'>*/}
      {/*      <span>워크스페이스 이름</span>*/}
      {/*      <Input id='workspace' name='workspace' value={inputs.workspace || ''} onChange={onChangeHook} />*/}
      {/*    </Label>*/}
      {/*    <Label id='workspace-url-label'>*/}
      {/*      <span>워크스페이스 url</span>*/}
      {/*      <Input id='url' name='url' value={inputs.url || ''} onChange={onChangeHook} />*/}
      {/*    </Label>*/}
      {/*    <Button type='submit'>생성하기</Button>*/}
      {/*  </form>*/}
      {/*</Modal>*/}
      {/*<CreateChannelModal*/}
      {/*  setShowCreateChannelModal={setShowCreateChannelModal}*/}
      {/*  show={showCreateChannelModal}*/}
      {/*  onCloseModal={onCloseModal}*/}
      {/*/>*/}
      {/*<InviteWorkspaceModal*/}
      {/*  show={showInviteWorkspaceModal}*/}
      {/*  onCloseModal={onCloseModal}*/}
      {/*  setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}*/}
      {/*/>*/}
      {/*<InviteChannelModal*/}
      {/*  show={showInviteChannelModal}*/}
      {/*  onCloseModal={onCloseModal}*/}
      {/*  setShowInviteChannelModal={setShowInviteChannelModal}*/}
      {/*/>*/}
    </div>
  );
};

export default Workspace;
