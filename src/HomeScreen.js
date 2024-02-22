import React, { useState, useEffect } from "react";

function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return currentTime;
}

function HomeScreen() {
  const currentTime = useCurrentTime();

  return (
    <div className="container">
      <div className="topnav">
        <button className="home-button" onClick={() => window.location.reload()}>
          <img src="/home.png" alt="Home" />
        </button>
      </div>
      <div className="content">
        <div className="top-slider">
          <div className="user-profile">
            <img src="/profile.png" alt="Profile" />
            <div className="user-info">
              <div className="user-name">John Doe</div>
              <div className="user-role">Administrator</div>
            </div>
          </div>
          <div className="buttons-container">
            <button className="order-button">
              <img src="/order.png" alt="Orders" />
              <span>Orders</span>
            </button>
            <button className="resource-button">
              <img src="/resource.png" alt="Resources" />
              <span>Resources</span>
            </button>
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
              <img src="/notification.png" alt="Notifications" />
              <span>Notifications</span>
            </button>
          </div>
        </div>
        <div className="gantt-chart-container">
          <div className="gantt-chart">
            <span>Orders</span>
          </div>
          <div className="real-time">
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
