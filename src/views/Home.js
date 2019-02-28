import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h2>Facial Recognition Authenticator</h2>
        {/* <li>
          <Link to="/photo">Photo Input</Link>
        </li> */}
      
          <Link to="/authenticator">WebCam</Link>
        
      </div>
    );
  }
}