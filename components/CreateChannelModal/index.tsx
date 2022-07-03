import React, { FC, useCallback } from 'react'
import { Button, Input, Label } from '@pages/signUp/styles'
import Modal from '@components/Modal'
import useInput from '@hooks/useInput'
import axios from 'axios';
import { useParams } from 'react-router';

interface Props {
  show: boolean;
  onCloseModal: () => void;
}

const CreateChannelModal: FC<Props> = ({show, onCloseModal }) => {
  const [newChannel, onChangeNewChannel] = useInput('')
  const {workspace, channel} = useParams<{ workspace: string, channel: string}>();

  const onCreateChannel = useCallback(() => {
     axios.post(`/api/workspaces/${workspace}/channel`, {name: newChannel}, {withCredentials: true})
  }, [newChannel]);

  if(!show) return null;

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
    <form onSubmit={onCreateChannel}>
      <Label id='channel-label'>
        <span>채널</span>
        <Input id='channel' name='channel' value={newChannel} onChange={onChangeNewChannel} />
      </Label>
      <Button type='submit'>생성하기</Button>
    </form>
    </Modal>
  )
}

export default CreateChannelModal
