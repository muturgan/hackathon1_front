import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GalleryPage from './pages/GalleryPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={GalleryPage} />
        {/* <Route path='/dashboard' component={GalleryPage} />
        <Route path='/profile' component={GalleryPage} />
        <Route path='/maps' component={GalleryPage} /> */}
        {/* <Route path='/404' component={NotFoundPage} /> */}
        <Route path='*' component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
