// import React, { FC, useCallback } from 'react';
// import { Button, Input, Label } from '@pages/signUp/styles';
// import Modal from '@components/Modal';
// import useInput from '@hooks/useInput';
// import axios from 'axios';
// import { useParams } from 'react-router';
// import { toast } from 'react-toastify';
// import useSWR from 'swr';
// import { IChannel, IUser } from '@typings/db';
// import fetcher from '@utils/fetcher';
// import { useQuery } from 'react-query';
//
// interface Props {
//   show: boolean;
//   onCloseModal: () => void;
//   setShowCreateChannelModal: (flag: boolean) => void;
// }
//
// const CreateChannelModal: FC<Props> = ({ show, onCloseModal, setShowCreateChannelModal }) => {
//   const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
//   const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
//
//   const {data: userData} = useQuery()
//   const { data: userData, mutate } = useSWR<IUser | false>('/api/users', fetcher, {
//     dedupingInterval: 100000,
//   });
//
//   const { data: channelData, mutate: mutateChannel } = useSWR<IChannel[]>(
//     userData ? `/api/workspaces/${workspace}/channels` : null,
//     fetcher,
//   );
//   const onCreateChannel = useCallback(
//     (e: any) => {
//       e.preventDefault();
//       axios
//         .post(`/api/workspaces/${workspace}/channels`, { name: newChannel }, { withCredentials: true })
//         .then(() => {
//           mutateChannel().then().catch();
//           setShowCreateChannelModal(false);
//           setNewChannel('');
//         })
//         .catch((err) => {
//           console.dir(err);
//           toast.error(err.response?.data, { position: 'bottom-center' });
//         });
//     },
//     [newChannel],
//   );
//
//   if (!show) return null;
//
//   return (
//     <Modal show={show} onCloseModal={onCloseModal}>
//       <form onSubmit={onCreateChannel}>
//         <Label id='channel-label'>
//           <span>채널</span>
//           <Input id='channel' name='channel' value={newChannel} onChange={onChangeNewChannel} />
//         </Label>
//         <Button type='submit'>생성하기</Button>
//       </form>
//     </Modal>
//   );
// };
//
// export default CreateChannelModal;
