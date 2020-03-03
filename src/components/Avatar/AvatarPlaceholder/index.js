import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function AvatarPlaceholder({ children, size, fontSize, color }) {
  return (
    <Container size={size} fontSize={fontSize} color={color}>
      {children}
    </Container>
  );
}

AvatarPlaceholder.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  fontSize: PropTypes.number,
  children: PropTypes.string.isRequired,
};

AvatarPlaceholder.defaultProps = {
  color: '#333',
  size: 35,
  fontSize: 16,
};
