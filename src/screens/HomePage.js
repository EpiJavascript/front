import React, { } from 'react';
import { } from 'react-redux';
import ServersSidebar from '../components/ServersSidebar';

function HomePage() {
  return (
    <div id="home" className="h-screen w-screen flex bg-indigo-200">
      <ServersSidebar />
      <div>
        <h1>
          Salut toi !
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
