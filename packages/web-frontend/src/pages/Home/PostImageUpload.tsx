/**
 * Copyright (c) Caiden Sanders and his affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// CSS Frameworks & Animation Imports
import styled from 'styled-components';

// React Component Imports
import { Spacing } from 'components/Layout';
import { UploadImageIcon } from 'components/icons';

// Type Declarations
interface IPostImageUploadProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5625rem 0.875rem;
  cursor: pointer;
  transition: background-color 0.1s;
  font-weight: ${(p) => p.theme.font.weight.bold};
  border-radius: ${(p) => p.theme.radius.lg};
  background-color: ${(p) => p.theme.colors.grey[100]};
  font-weight: ${(p) => p.theme.font.size.xxs};

  &:hover {
    background-color: ${(p) => p.theme.colors.grey[300]};
  }
`;

/**
 * Component for uploading post image
 */
const PostImageUpload = ({ handleChange, label }: IPostImageUploadProps) => (
  <>
    <Input
      name="image"
      onChange={handleChange}
      type="file"
      id="post-image"
      accept="image/x.png,image/jpeg"
    />

    <Label htmlFor="post-image">
      <UploadImageIcon />

      {label && <Spacing left="xs">{label}</Spacing>}
    </Label>
  </>
);

export default PostImageUpload;
