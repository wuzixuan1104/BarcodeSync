/**
 *
 * Header
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import HeaderLink from './HeaderLink';
import { WrapperSyle, MenuStyle } from './HeaderStyle';

function Header() {
  return (
    <WrapperSyle>
      <MenuStyle>
        <HeaderLink to="/">Shari 讀物出貨系統</HeaderLink>
      </MenuStyle>
    </WrapperSyle>
  );
}

Header.propTypes = {};

export default Header;
