/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React Imports
import { useState, useRef, useEffect } from 'react';

// Apollo Imports
import { useMutation } from '@apollo/client';

// CSS Frameworks & Animation Imports
import styled from 'styled-components';

// React Context Store Imports
import { useStore } from 'store';

// React Hook Imports
import useNotifications from 'hooks/useNotifications';

// Constant Imports
import { NotificationType } from 'constants/NotificationType';

// GraphQL Imports
import { GET_AUTH_USER, GET_USER } from 'graphql/user';
import { GET_POST, GET_POSTS, GET_FOLLOWED_POSTS } from 'graphql/post';
import { CREATE_COMMENT } from 'graphql/comment';

// React Component Imports
import { Textarea, Button } from './Form';

// Type Declarations
interface ICreateCommentProps {
  post: any;
  focus: any;
}

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

/**
 * Creates a comment for a post
 */
const CreateComment = ({ post, focus }: ICreateCommentProps) => {
  const [{ auth }] = useStore();
  const notification = useNotifications();
  const [comment, setComment] = useState('');
  const buttonEl = useRef<HTMLButtonElement>(null);
  const TextareaEl = useRef<HTMLTextAreaElement>(null);
  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    refetchQueries: [
      { query: GET_FOLLOWED_POSTS, variables: { userId: auth.user.id } },
      { query: GET_USER, variables: { username: auth.user.username } },
      { query: GET_AUTH_USER },
      { query: GET_POSTS, variables: { authUserId: auth.user.id } },
      { query: GET_POST, variables: { id: post.id } },
    ],
  });

  useEffect(() => {
    focus && TextareaEl.current !== null && TextareaEl.current.focus();
  }, [focus]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await createComment({
      variables: { input: { comment, author: auth.user.id, postId: post.id } },
    });
    setComment('');

    // Create notification on comment
    if (auth.user.id !== post.author.id) {
      notification.create({
        user: post.author,
        postId: post.id,
        notificationType: NotificationType.COMMENT,
        notificationTypeId: data.createComment.id,
      });
    }
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      buttonEl.current !== null && buttonEl.current.click();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="Add a comment..."
        onKeyDown={onEnterPress}
        ref={TextareaEl}
      />

      <Button
        type="submit"
        color={comment ? 'primary.main' : 'grey[500]'}
        weight="bold"
        text
        ref={buttonEl}
        disabled={!comment || loading}
      >
        Post
      </Button>
    </Form>
  );
};

export default CreateComment;
