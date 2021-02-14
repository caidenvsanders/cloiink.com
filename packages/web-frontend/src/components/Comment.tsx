/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React Imports
import { generatePath } from 'react-router-dom';

// Apollo Imports
import { useMutation } from '@apollo/client';

// CSS Frameworks & Animation Imports
import styled from 'styled-components';

// React Hook Imports
import useNotifications from 'hooks/useNotifications';

// React Context Store Imports
import { useStore } from 'store';

// React Component Imports
import { CloseIcon } from './icons';
import { A } from './Text';
import { Spacing } from './Layout';
import Avatar from './Avatar';

// GraphQL Imports
import { GET_AUTH_USER, GET_USER } from 'graphql/user';
import { DELETE_COMMENT } from 'graphql/comment';
import { GET_POST, GET_POSTS, GET_FOLLOWED_POSTS } from 'graphql/post';

// Miscellaneous Imports
import * as Routes from 'routes';

// Type Declarations
interface ICommentProps {
  comment: any;
  postId: any;
  postAuthor: any;
}

// CSS Components
const DeleteButton = styled.button`
  cursor: pointer;
  display: none;
  background-color: transparent;
  border: 0;
  outline: 0;
  position: absolute;
  right: 0.4375rem;
  top: 0.375rem;
`;

const Root = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${(p) => p.theme.spacing.xxs} 0;
  font-size: ${(p) => p.theme.font.size.xxs};

  &:hover ${DeleteButton} {
    display: block;
  }
`;

const UserName = styled.div`
  color: ${(p) => p.theme.colors.primary.main};
  font-weight: ${(p) => p.theme.font.weight.bold};
`;

const CommentSection = styled.div`
  position: relative;
  word-wrap: break-word;
  overflow: hidden;
  padding: 0 ${(p) => p.theme.spacing.lg} ${(p) => p.theme.spacing.xxs}
    ${(p) => p.theme.spacing.xs};
  background-color: ${(p) => p.theme.colors.grey[100]};
  border-radius: ${(p) => p.theme.radius.lg};
  margin-left: ${(p) => p.theme.spacing.xxs};
  color: ${(p) => p.theme.colors.text.main};
`;

/**
 * Renders comments UI
 */
const Comment = ({ comment, postId, postAuthor }: ICommentProps) => {
  const [{ auth }] = useStore();
  const notification = useNotifications();
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [
      { query: GET_FOLLOWED_POSTS, variables: { userId: auth.user.id } },
      { query: GET_USER, variables: { username: comment.author.username } },
      { query: GET_AUTH_USER },
      { query: GET_POSTS, variables: { authUserId: auth.user.id } },
      { query: GET_POST, variables: { id: postId } },
    ],
  });

  const handleDeleteComment = async () => {
    await deleteComment({ variables: { input: { id: comment.id } } });

    // Delete notification after comment deletion
    if (auth.user.id !== postAuthor.id) {
      const isNotified = postAuthor.notifications.find(
        (n: any) => n.comment && n.comment.id === comment.id,
      );
      notification.remove({
        notificationId: isNotified.id,
      });
    }
  };

  return (
    <Root>
      <A
        to={generatePath(Routes.USERPROFILE, {
          username: comment.author.username,
        })}
      >
        <Avatar image={comment.author.image} />
      </A>

      <CommentSection>
        {comment.author.id === auth.user.id && (
          <DeleteButton onClick={handleDeleteComment}>
            <CloseIcon width="0.625rem" />
          </DeleteButton>
        )}

        <Spacing top="xxs" />

        <Spacing inline right="xxs">
          <A
            to={generatePath(Routes.USERPROFILE, {
              username: comment.author.username,
            })}
          >
            <UserName>{comment.author.fullName}</UserName>
          </A>

          {comment.comment}
        </Spacing>
      </CommentSection>
    </Root>
  );
};

export default Comment;
