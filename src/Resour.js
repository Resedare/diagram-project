import React, { useState, useEffect, useRef } from 'react';
import { GanttChart } from 'smart-webcomponents-react/ganttchart';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import './Diagramm.css';
import './Resour.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Resour() {
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleAvatarClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
    }

  const ganttChart = useRef();
  const view = 'day';
  const treeSize = '25%';
  const durationUnit = 'hour';


  const dataSource = [
	{
		id: 'Betty',
		label: 'Design',
		dateStart: '2021-01-15T7:30:00',
		dateEnd: '2021-01-15T16:30:00',
		class: 'front-end',
		job: 'Designer',
		progress: 60,
          Surname: 'Смотраков',
          Name: 'Алексей',
          SecSurname: 'Владимирович',
          Profession: 'Слесарь',
          rank: '4',
          gild: '12',
          UIN: 'P567723',
          Current_status: 'Алексей',
          deviation: "3",
          priority: "1",
          quantity:"2",
          unitPrice: "4000",
          percent: "50",
          planDate:"2023-03-11",
          actualDate:"2023-04-15",
          dce: "РТ65.233.25",
		    segments: [{
			label: 'Structure',
			dateStart: '2021-01-15T7:45:00',
			dateEnd: '2021-01-15T10:30:00',
		},
		{
			label: 'Pages',
			dateStart: '2021-01-15T11:00:00',
			dateEnd: '2021-01-15T13:30:00',
      Number:"020",
        Name:"Токарная",
        CodeOperation:"4110",
        laborIntensity:"2",
        gild:"2",
        technicalprocess:"223.2332.42",
        cost:"2100",
        quantity:"3",
        planDate:"16.12.2022",
        actualDate:"16.12.2022",
        purchase:"0",
        outfit:"Н3000423",
        type: 'operation'
		},
		{
			label: 'Downloads',
			dateStart: '2021-01-15T14:15:00',
			dateEnd: '2021-01-15T16:30:00',
      Number:"040",
        Name:"Фрезерная",
        CodeOperation:"4110",
        laborIntensity:"2",
        gild:"2",
        technicalprocess:"223.2332.42",
        cost:"2100",
        quantity:"3",
        planDate:"16.12.2022",
        actualDate:"16.12.2022",
        purchase:"0",
        outfit:"Н3000423",
        type: 'operation'
		}
		]
	},
	{
		id: 'William',
		label: 'Project Development',
		dateStart: '2021-01-15T12:30:00',
		dateEnd: '2021-01-15T20:30:00',
		class: 'back-end',
		progress: 25,
		job: 'Developer',
		segments: [{
			label: 'Code Basics',
			dateStart: '2021-01-15T12:30:00',
			duration: 2.5
		},
		{
			label: 'Code Advanced',
			dateStart: '2021-01-15T16:30:00',
			duration: 4
		},
		]
	},
	{
		id: 'Emma',
		label: 'Additional Design',
		dateStart: '2021-01-15T9:30:00',
		dateEnd: '2021-01-15T18:00:00',
		class: 'front-end',
		progress: 50,
		job: 'Designer',
		segments: [{
			label: 'Payment Methods',
			dateStart: '2021-01-15T09:30:00',
			dateEnd: '2021-01-15T12:30:00'
		},
		{
			label: 'Feel and Appeal',
			dateStart: '2021-01-15T13:00:00',
			dateEnd: '2021-01-15T015:00:00',
		},
		{
			label: 'Extras',
			dateStart: '2021-01-15T15:30:00',
			dateEnd: '2021-01-15T16:30:00'
		},
		{
			label: 'Support',
			dateStart: '2021-01-15T16:45:00',
			dateEnd: '2021-01-15T18:00:00'
		}]
	}
  ];

  useEffect(() => {
    
  }, []);


    return (
      <div className="diagramm-home-screen">
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
      <GanttChart 
          ref={ganttChart}
          id="ganttChart"
          view={view}
          taskColumns={[
            {
              label: 'Employee',
		          value: 'id'
	          },
	          {
              label: 'Job Name',
              value: 'job',
              hidden: 'true'
            },
            {
              label: 'Цех',
              value: 'gild'
            },
            {
              label: 'УИН',
              value: 'UIN'
            },
          ]
        }
          treeSize={treeSize}
          durationUnit={durationUnit}
          dataSource={dataSource}
          popupWindowTabs={['general','segments','custom']}
          popupWindowCustomizationFunction={(target, type, item) => {
            if (type === 'task') {
              // Check if the segmentsContainer already exists
              let segmentsContainer = target.querySelector('.segments-container');
          
              // If it doesn't exist, create it
              if (!segmentsContainer) {
                segmentsContainer = document.createElement('div');
                segmentsContainer.className = 'segments-container';
                target.appendChild(segmentsContainer);
              }
          
              // Clear the segmentsContainer's content
              segmentsContainer.innerHTML = '';
          
              // Loop through all the segments of the task
              item.segments.forEach(segment => {
                // Create a container for the segment
                let segmentContainer = document.createElement('div');
          
                // Add the segment label to the container
                segmentContainer.innerHTML = `<h2>${segment.label}</h2>`;
          
                // Loop through all the properties of the segment
                for (let key in segment) {
                  // Skip the 'label' property since we've already added it
                  if (key !== 'label') {
                    // Create a paragraph element for the property
                    let p = document.createElement('p');
                    p.textContent = `${key}: ${segment[key]}`;
          
                    // Add the paragraph element to the segment container
                    segmentContainer.appendChild(p);
                  }
                }
          
                // Add the segment container to the segments container
                segmentsContainer.appendChild(segmentContainer);
              });
            }
          }}
          
          
          
          
          
          style={{marginTop: '80px', width: '96%'}}
        >
        </GanttChart>
      </div>
    );
  }
  
  export default Resour;