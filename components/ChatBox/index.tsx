// import React, { ChangeEvent, FC, useCallback, useEffect, useRef } from 'react';
// import { ChatArea, EachMention, Form, MentionsTextarea, SendButton, Toolbox } from '@components/ChatBox/styles';
// import autosize from 'autosize';
// import { Mention, SuggestionDataItem } from 'react-mentions';
// import useSWR from 'swr';
// import { IUser } from '@typings/db';
// import fetcher from '@utils/fetcher';
// import { useParams } from 'react-router';
// import gravatar from 'gravatar';
// import { useQuery } from 'react-query';
// import { useUser } from '@queries/hooks';
//
// interface Props {
//   chat: string | any;
//   onSubmitForm: (e: React.FormEvent) => void;
//   onChangeChat: (e: any) => void;
//   placeholder?: string;
// }
//
// const ChatBox: FC<Props> = ({ chat, onSubmitForm, onChangeChat, placeholder }) => {
//   const { workspace, name } = useParams();
//
//   const { data: userData } = useUser()
//   console.log(userData);
//   // const {
//   //   data: userData,
//   //   error,
//   //   mutate,
//   // } = useSWR<IUser | false>('/api/users', fetcher, {
//   //   dedupingInterval: 100000,
//   // });
//
//   const {data: memberData} = useQuery()
//   const { data: memberData } = useQuery<IUser[]>(
//     ['workspace', workspace, 'member'],
//     () => fetcher({ queryKey: `/api/workspaces/${workspace}/members` }),
//     {
//       enabled: !!userData,
//     },
//   );
//
//   const textareaRef = useRef(null);
//   useEffect(() => {
//     if (textareaRef.current) {
//       autosize(textareaRef.current);
//     }
//   }, []);
//
//   const onKeyDownChat = useCallback(
//     (e: any) => {
//       console.log(e.key);
//       if (e.key === 'Enter') {
//         if (!e.shiftKey) {
//           e.preventDefault();
//           onSubmitForm(e);
//         }
//       }
//     },
//     [onSubmitForm],
//   );
//
//   const renderSuggestion = useCallback(
//     (
//       suggestion: SuggestionDataItem,
//       search: string,
//       highlightedDisplay: React.ReactNode,
//       index: number,
//       focus: boolean,
//     ): React.ReactNode => {
//       if (!memberData) return;
//       return (
//         <EachMention focus={focus}>
//           <img
//             src={gravatar.url(memberData[index].email, { s: '20px', d: 'retro' })}
//             alt={memberData[index].nickname}
//           />
//           <span>{highlightedDisplay}</span>
//         </EachMention>
//       );
//     },
//     [memberData],
//   );
//
//   return (
//     <ChatArea>
//       <Form onSubmit={onSubmitForm}>
//         <MentionsTextarea
//           id='editor-chat'
//           value={chat}
//           onChange={onChangeChat}
//           onKeyDown={onKeyDownChat}
//           placeholder={placeholder}
//           ref={textareaRef}
//           allowSuggestionsAboveCursor
//         >
//           <Mention
//             appendSpaceOnAdd
//             trigger='@'
//             data={memberData?.map((v) => ({ id: v.id, display: v.nickname })) || []}
//             renderSuggestion={renderSuggestion}
//           />
//         </MentionsTextarea>
//
//         <Toolbox>
//           <SendButton
//             className={
//               'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send' +
//               (chat?.trim() ? '' : ' c-texty_input__button--disabled')
//             }
//             data-qa='texty_send_button'
//             aria-label='Send message'
//             data-sk='tooltip_parent'
//             type='submit'
//             disabled={!chat?.trim()}
//           >
//             <i className='c-icon c-icon--paperplane-filled' aria-hidden='true' />
//             전송
//           </SendButton>
//         </Toolbox>
//       </Form>
//     </ChatArea>
//   );
// };
//
// export default ChatBox;
