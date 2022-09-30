import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
        <Fragment>
            <aside class="main-sidebar sidebar-dark-primary elevation-4">
                <a href="../../index3.html" class="brand-link">
                <span class="brand-text font-weight-light">Live Agent Admin</span>
                </a>

    <div class="sidebar">
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../../dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image" />
        </div>
        <div class="info">
          <a href="#" class="d-block">Super Admin</a>
        </div>
      </div>

      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item">
            <Link to="/" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>Dashboard</p>
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/user" class="nav-link">
              <i class="nav-icon fas fa-users"></i>
              <p>Users</p>
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/business" class="nav-link">
              <i class="nav-icon fas fa-building"></i>
              <p>Business</p>
            </Link>
          </li>

          <li class="nav-item">
            <Link to="/agent" class="nav-link">
              <i class="nav-icon fas fa-user"></i>
              <p>Agent</p>
            </Link>
          </li>
          </ul>
      </nav>
    </div>
  </aside>
        </Fragment>
  );
};


export default Sidebar;
