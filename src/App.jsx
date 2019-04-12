import React, { Component } from 'react';
import Routes from './components/Routes.jsx';
import TopNavigation from './components/topNavigation';
import SideNavigation from './components/sideNavigation.jsx';
import Footer from './components/Footer';
import './index.css';

class App extends Component {
  
  render() {
    return (
        <div className="flexible-content">
          <TopNavigation />
          <SideNavigation />
          <main id="content" className="p-5">
            <Routes />
          </main>
          <Footer />
        </div>
    );
  }
}

export default App;