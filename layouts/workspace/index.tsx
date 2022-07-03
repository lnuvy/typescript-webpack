import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Link, useNavigate } from 'react-router-dom';
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
import LogIn from '@pages/login';
import { IChannel, IUser } from '@typings/db';
import { Button, Input, Label } from '@pages/signUp/styles';
import useInputs from '@hooks/useInputs';
import Modal from '@components/Modal';
import { toast } from 'react-toastify';
import { Routes, Route, useParams } from 'react-router';
import CreateChannelModal from '@components/CreateChannelModal';
import InviteChannelModal from '@components/InviteChannelModal';
import InviteWorkspaceModal from '@components/InviteWorkspaceModal';

const Channel = loadable(() => import('@pages/channel'));
const DirectMessage = loadable(() => import('@pages/directMessage'));

const Workspace: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { workspace, name } = useParams();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [inputs, onChangeHook, setInputs] = useInputs({});
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);

  const {
    data: userData,
    error,
    mutate,
  } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher, {
    dedupingInterval: 100000,
  });

  const { data: channelData } = useSWR<IChannel[]>(
    userData ? `http://localhost:3095/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  const onLogout = useCallback(() => {
    axios.post('http://localhost:3095/api/users/logout', null, { withCredentials: true }).then((res) => {
      console.log(res);
      mutate(false);
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

  const onCreateWorkspace = useCallback(
    (e: React.FormEvent) => {
      const { workspace, url } = inputs;
      e.preventDefault();
      if (!workspace || !workspace.trim()) return;
      if (!url || !url.trim()) return;

      axios
        .post('http://localhost:3095/api/workspaces', { workspace, url }, { withCredentials: true })
        .then(() => {
          mutate();
          setShowCreateWorkspaceModal(false);
          setInputs({});
        })
        .catch((err) => {
          console.dir(err);
          console.log(err.response.data);
          toast.error(err.response?.data, { position: 'bottom-center' });
        });
    },
    [inputs],
  );

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
  }, []);

  const toggleWorkspaceModal = useCallback(() => setShowWorkspaceModal((prev) => !prev), []);

  const onClickInviteWorkspace = useCallback(() => {}, []);

  // 리렌더링때마다 콘솔찍히지않으면서 userData 만 보기
  const logFunction = useCallback(() => {
    console.log(userData);
    console.log(channelData);
  }, [userData, channelData]);

  if (!userData) {
    // return <LogIn />;
    navigate('/login');
    return <></>;
  }
  logFunction();

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onCloseUserProfile}>
            <ProfileImg src={gravatar.url(userData.email, { s: '28px', d: 'retro' })} alt={userData.email} />
            <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseUserProfile}>
              <ProfileModal>
                <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname} />
                <div>
                  <span id='profile-name'>{userData.nickname}</span>
                  <span id='profile-active'>Active</span>
                </div>
              </ProfileModal>
              <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
            </Menu>
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {userData.Workspaces.map((ws) => {
            return (
              <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
              </Link>
            );
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>
          <MenuScroll>
            <Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{ top: 95, left: 80 }}>
              <WorkspaceModal>
                <h2>Slack</h2>
                <button onClick={onClickAddChannel}>채널 만들기</button>
                <button onClick={onLogout}>로그아웃</button>
              </WorkspaceModal>
            </Menu>
            {channelData?.map((v) => (
              <div key={v.id}>{v.name}</div>
            ))}
          </MenuScroll>
        </Channels>
        <Chats>
          <Routes>
            <Route path='/channel/:name' element={<Channel />} />
            <Route path='/dm/:name' element={<DirectMessage />} />
          </Routes>
        </Chats>
      </WorkspaceWrapper>
      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id='workspace-label'>
            <span>워크스페이스 이름</span>
            <Input id='workspace' name='workspace' value={inputs.workspace || ''} onChange={onChangeHook} />
          </Label>
          <Label id='workspace-url-label'>
            <span>워크스페이스 url</span>
            <Input id='url' name='url' value={inputs.url || ''} onChange={onChangeHook} />
          </Label>
          <Button type='submit'>생성하기</Button>
        </form>
      </Modal>
      <CreateChannelModal
        setShowCreateChannelModal={setShowCreateChannelModal}
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
      />
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
    </div>
  );
};

export default Workspace;
