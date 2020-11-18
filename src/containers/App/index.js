/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from 'components/Header';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { setDefaultClient, Client } from 'micro-graphql-react';

import { Wrapper } from './style';
import GlobalStyle from '../../global-styles';

export default function App() {
  const client = new Client({
    endpoint: 'https://mylibrary.io/graphql-public',
    fetchOptions: { mode: 'cors' },
  });

  setDefaultClient(client);

  const basepath =
    process.env.NODE_ENV !== 'production' ? '/' : '/barcodeSync';

  return (
    <div>
      <Helmet titleTemplate="%s - JKOP web" defaultTitle="JKOP web Boilerplate">
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <Wrapper>
        <Switch basename={basepath}>
          <Route component={HomePage} />
        </Switch>
      </Wrapper>
      <GlobalStyle />
    </div>
  );
}
