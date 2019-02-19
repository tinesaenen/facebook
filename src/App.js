import React, { Component } from 'react';
import logo from './logo.svg';
import Feed from './Feed';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <img src={logo} className="header__logo" alt="logo" height="40" />
        </header>
        <main>
          <Feed types={['notification']} />
          <Feed types={['post', 'news']} />
          <Feed types={['ad']} />
        </main>
      </div>
    );
  }
}
