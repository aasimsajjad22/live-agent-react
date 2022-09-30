import React, { Fragment } from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Alert from './Alert';

const MainLayout = () => {

  return (
    <Fragment>
        <Navbar />
        <Sidebar />
        <Alert />        
    </Fragment>
    
  );
};


export default MainLayout;
