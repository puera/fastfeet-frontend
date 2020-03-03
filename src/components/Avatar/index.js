import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Avatar({ size, url }) {
  return <Container src={url} alt="Avatar" size={size} />;
}

Avatar.propTypes = {
  size: PropTypes.number,
  url: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  size: 35,
};
