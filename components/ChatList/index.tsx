// import React, { FC, forwardRef, useCallback, useRef } from 'react';
// import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
// import { IDM } from '@typings/db';
// import Chat from '@components/Chat';
// import { Scrollbars } from 'react-custom-scrollbars-2';
//
// interface Props {
//   chatSections: { [key: string]: IDM[] };
// }
//
// const ChatList = forwardRef<Scrollbars, Props>(({ chatSections }, ref) => {
//   const onScroll = useCallback((values: any) => {
//     if (values.scrollTop === 0) {
//       console.log('가장위');
//     }
//   }, []);
//
//   return (
//     <ChatZone>
//       <Scrollbars autoHide ref={ref} onScrollFrame={onScroll}>
//         {Object.entries(chatSections).map(([date, chats]) => {
//           return (
//             <Section className={`section-${date}`} key={date}>
//               <StickyHeader>
//                 <button>{date}</button>
//               </StickyHeader>
//               {chats.map((chat) => {
//                 return <Chat key={chat.id} data={chat} />;
//               })}
//             </Section>
//           );
//         })}
//       </Scrollbars>
//     </ChatZone>
//   );
// });
//
// export default ChatList;
