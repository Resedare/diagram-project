import React, { useState, useEffect } from 'react';
import './HomeScreen.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Diagramm from './Diagramm';
import Resour from './Resour';
import { GanttChart } from 'smart-webcomponents-react/ganttchart';
import 'smart-webcomponents-react/source/styles/smart.default.css';

function Status(props) {
  const { onlineUsers, totalUsers, completedTasks, totalTasks, completedResources, totalResources } = props;

  return (
    <div className="status">
      <div className="status-item">
        <img src="/online-icon.png" alt="Online Icon" />
        <span>{onlineUsers}&#160;\&#160;{totalUsers}</span>
      </div>
      <div className="status-item">
        <img src="/tasks-icon.png" alt="Tasks Icon" />
        <span>{completedTasks}&#160;\&#160;{totalTasks}</span>
      </div>
      <div className="status-item">
        <img src="/resources-icon.png" alt="Resources Icon" />
        <span>{completedResources}&#160;\&#160;{totalResources}</span>
      </div>
    </div>
  );
}

function MainScreen() {
  const onlineUsers = 50;
  const totalUsers = 55;
  const completedTasks = 10;
  const totalTasks = 14;
  const completedResources = 340;
  const totalResources = 345;

  const [time, setTime] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const formattedDate = new Date().toLocaleDateString([], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    weekday: 'long'
  });

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

 

  return (
    <div className="home-screen">
      <div className="top-nav">
        <div className="user-profile" onClick={handleAvatarClick}>
          <img src="profile.png" alt="User Profile" />
          <span>John Doe</span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li><a href="#">Change User</a></li>
                <li><a href="#">About Me</a></li>
                <li><a href="#">Settings</a></li>
              </ul>
            </div>
          )}
        </div>
        <Link to="/">
          <button className="home-button">
            <img src="/home.png" alt="settings" />
          </button>
        </Link>
        <img className="logo" src="masiot-logo.png" alt="Company Logo" />
      </div>
      <div className="side-nav">
        <img src="notifications-small.png" className='notifications-icons' alt="notif-icon"/>
        <img src="mail-small.png" className='mail-icons' alt="mail-icon"/>
        <img src="referal-small.png" className='referal-icons' alt="referal-icon"/>
      </div>
          <div className="buttons">
            <Link to="/diagramm" className="order-button">
              <img src="/orders.png" alt="Orders" />
              <span>Orders</span>
            </Link>
            <Link to="/Resour" className="resource-button">
              <img src="/resources.png" alt="Resources" />
              <span>Resources</span>
            </Link>
            <button className="nomenclature-button">
              <img src="/nomenclature.png" alt="Nomenclature" />
              <span>Nomenclature</span>
            </button>
            <button className="report-button">
              <img src="/report.png" alt="Reports" />
              <span>Reports</span>
            </button>
            <button className="mail-button">
              <img src="/mail.png" alt="Mail" />
              <span>Mail</span>
            </button>
            <button className="journal-button">
              <img src="/journal.png" alt="Journal" />
              <span>Journal</span>
            </button>
            <button className="notification-button">
              <img src="/notifications.png" alt="Notifications" />
              <span>Notifications</span>
            </button>
          </div>
       <div className="real-time">
        <div className="time">{formattedTime}</div>
        <div className="date">{formattedDate}</div>
      </div>
      <div className="status-section">
        <h2>Status</h2>
        <Status
          onlineUsers={onlineUsers}
          totalUsers={totalUsers}
          completedTasks={completedTasks}
          totalTasks={totalTasks}
          completedResources={completedResources}
          totalResources={totalResources}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainScreen />} />
        <Route path="/diagramm" element={<Diagramm />} />
        <Route path="/resour" element={<Resour />} />
      </Routes>
    </Router>
  );
}
export default App;