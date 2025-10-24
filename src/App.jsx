import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const App = () => {
  return (
    <div className="bg-purple-400 min-h-screen flex items-center justify-center">
      <div className="border-4 border-white rounded-xl flex overflow-hidden  min-h-[500px]">
        <Sidebar />
        <div className="w-full">
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default App;
