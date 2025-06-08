import React, { useState } from 'react';
import Header from './Components/Header';
import Home from './Components/Home';
import Trending from './Components/Trending';
import Cart from './Components/Cart';
import Account from './Components/Account';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="p-4">
        {activeSection === 'home' && <Home />}
        {activeSection === 'trending' && <Trending />}
        {activeSection === 'cart' && <Cart />}
        {activeSection === 'account' && <Account />}
      </main>
    </>
  );
};

export default App;