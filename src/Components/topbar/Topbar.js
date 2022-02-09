import React from 'react';
import './Topbar.css';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { Badge } from 'react-bootstrap';
const Topbar = () => {
  return (
    <div>
      <div className='topbar'>
        <div className='topbar-wrapper'>
          <div className='top-left'>
            <span className='logo'>Sales And Inventory System</span>
          </div>
          <div className='top-right d-flex justify-content-center align-items-center'>
            <div className='topbar-iconContainer'>
              <div className='top-iconBadge'>
                <Badge bg='danger'>3</Badge>
              </div>
              <NotificationsNone />
            </div>
            <div className='topbar-iconContainer'>
              <div className='top-iconBadge'>
                <Badge bg='danger'>3</Badge>
              </div>
              <Language />
            </div>
            <div className='topbar-iconContainer'>
              <div className='top-iconBadge'>
                <Badge bg='danger'>3</Badge>
              </div>
              <Settings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
