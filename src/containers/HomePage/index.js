/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import Book from 'containers/Book';
import BarcodePage from 'containers/BarcodePage';
import { Wrapper } from './style';

export default function HomePage() {
  return (
    <Wrapper>
      <Book />
      <BarcodePage />
    </Wrapper>
  );
}
