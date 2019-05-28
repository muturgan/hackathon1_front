import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GalleryPage from './pages/GalleryPageWrapper';
import InfoPage from './pages/InfoPage';
import NotFoundPage from './pages/NotFoundPage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={GalleryPage} />
        <Route path='/info' component={InfoPage} />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
