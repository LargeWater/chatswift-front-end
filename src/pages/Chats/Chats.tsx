import Talk from "talkjs";
import { useEffect, useRef, useState } from "react";
import React from "react";
import styled from "@emotion/styled";

const ChatBox = styled.div({
  height: '888px',
})

const ChatComponent = () => {
  const chatboxEl = useRef(null);

  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: '1',
        name: 'Nick',
        email: 'nick@example.com',
        welcomeMessage: 'Hello!',
        role: 'admin',
      });

      const otherUser = new Talk.User({
        id: '2',
        name: 'Example',
        email: 'example@example.com',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const session = new Talk.Session({
        appId: 'tge1yidf',
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox();
      chatbox.select(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return (
  <ChatBox ref={chatboxEl} />
  );
}

export default ChatComponent;
