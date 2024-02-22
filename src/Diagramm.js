import React, { useEffect, useState, useMemo } from 'react';
import { GanttChart } from 'smart-webcomponents-react/ganttchart';
import 'smart-webcomponents-react/source/styles/smart.default.css';
import './Diagramm.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const CollapsibleTable = ({ data }) => {
  const [open, setOpen] = useState({});
  const [sortedData, setSortedData] = useState([...data]);
  const [sortKey, setSortKey] = useState(null);
  const [sortAscending, setSortAscending] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleOpen = (i) => {
    setOpen((open) => ({
      ...open,
      [i]: !open[i]
    }));
  };

  const SortArrows = ({ sortKey, currentKey, sortAscending }) => (
    <div className='arrow-container'>
      <div className={`arrow up ${currentKey === sortKey && !sortAscending ? 'hidden' : ''}`} />
      <div className={`arrow down ${currentKey === sortKey && sortAscending ? 'hidden' : ''}`} />
    </div>
  );


  const sortData = (key) => {
    setSortKey(key);
    setSortAscending((sortAscending) => sortKey === key ? !sortAscending : sortAscending);
  }

  useEffect(() => {
    const sorted = [...sortedData].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return sortAscending ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return sortAscending ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sorted);
  }, [sortKey, sortAscending, data]);

  useEffect(() => {
    setSortedData([...data]);
  }, [data]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          position: "absolute", right: 180, top: 123,
          width: "200px",
          height: "30px",
          padding: "5px 10px 5px 30px",
          border: "1px solid #ccc",
          borderRadius: "15px",
          background: "#f1f1f1 url(/search-icon.png) no-repeat 5px center",
          backgroundSize: "20px 20px",
        }}
      />
      <table style={{ width: "100%", border: "1px solid #ddd", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}></th>
            <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>Tasks</th>
            <th onClick={() => sortData('deviation')} style={{ cursor: 'pointer', padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
              deviation
              <SortArrows sortKey='deviation' currentKey={sortKey} sortAscending={sortAscending} />
            </th>
            <th onClick={() => sortData('priority')} style={{ cursor: 'pointer', padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
              priority
              <SortArrows sortKey='priority' currentKey={sortKey} sortAscending={sortAscending} />
            </th>
            <th onClick={() => sortData('percent')} style={{ cursor: 'pointer', padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
              percent
              <SortArrows sortKey='percent' currentKey={sortKey} sortAscending={sortAscending} />
            </th>
            <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>planDate</th>
            <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>actualDate</th>
            <th onClick={() => sortData('quantity')} style={{ cursor: 'pointer', padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
              quantity
              <SortArrows sortKey='quantity' currentKey={sortKey} sortAscending={sortAscending} />
            </th>
            <th onClick={() => sortData('unitPrice')} style={{ cursor: 'pointer', padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
              unitPrice
              <SortArrows sortKey='unitPrice' currentKey={sortKey} sortAscending={sortAscending} />
            </th>
            <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}>dce</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.filter(row => row.label.toLowerCase().includes(searchTerm.toLowerCase())).map((row, i) => (
            <React.Fragment key={i}>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>
                  <button onClick={(e) => { e.stopPropagation(); toggleOpen(i); }}
                    style={{ backgroundColor: 'blue', color: 'white' }}>
                    {open[i] ? '-' : '+'}
                  </button>
                </td>
                <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{row.label}</td>
                <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{row.deviation}</td>
                <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{row.priority}</td>
                <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{row.percent}</td>
                <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{row.planDate}</td>
                <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{row.actualDate}</td>
                <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{row.quantity}</td>
                <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{row.unitPrice}</td>
                <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{row.dce}</td>
              </tr>
              {row.tasks && open[i] && row.tasks.map((subRow, j) => (
                <React.Fragment key={`${i}-${j}`}>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "12px", paddingLeft: '20px', textAlign: "left", borderRight: "1px solid #ddd" }}>
                      <button onClick={(e) => { e.stopPropagation(); toggleOpen(`${i}-${j}`); }}
                        style={{ backgroundColor: 'blue', color: 'white' }}>
                        {open[`${i}-${j}`] ? '-' : '+'}
                      </button>
                    </td>
                    <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subRow.label}</td>
                    <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subRow.deviation}</td>
                    <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subRow.priority}</td>
                    <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subRow.percent}</td>
                    <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subRow.planDate}</td>
                    <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subRow.actualDate}</td>
                    <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subRow.quantity}</td>
                    <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subRow.unitPrice}</td>
                    <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subRow.dce}</td>
                  </tr>
                  {subRow.tasks && open[`${i}-${j}`] && subRow.tasks.map((subSubRow, k) => (
                    <React.Fragment key={`${i}-${j}-${k}`}>
                      <tr style={{ borderBottom: "1px solid #ddd" }}>
                        <td style={{ padding: "12px", paddingLeft: '40px', textAlign: "left", borderRight: "1px solid #ddd" }}>
                          <button style={{ visibility: "hidden" }}>-</button> {/* invisible button to align the text */}
                        </td>
                        <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subSubRow.label}</td>
                        <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subSubRow.deviation}</td>
                        <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subSubRow.priority}</td>
                        <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subSubRow.percent}</td>
                        <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subSubRow.planDate}</td>
                        <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subSubRow.actualDate}</td>
                        <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subSubRow.quantity}</td>
                        <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subSubRow.unitPrice}</td>
                        <td style={{ padding: "12px", textAlign: "left", borderRight: "1px solid #ddd" }}>{subSubRow.dce}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Diagram() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState('gantta');
  const [searchTerm, setSearchTerm] = useState("");
  const [ganttView, setGanttView] = useState('year');  // new state variable for the Gantt chart view

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  // handle increase time
  const increaseTime = () => {
    setGanttView(prevView => {
      switch (prevView) {
        case 'hour':
          return 'day';
        case 'day':
          return 'week';
        case 'week':
          return 'month';
        case 'month':
          return 'year';
        default:
          return prevView;
      }
    });
  }

  // handle decrease time
  const decreaseTime = () => {
    setGanttView(prevView => {
      switch (prevView) {
        case 'year':
          return 'month';
        case 'month':
          return 'week';
        case 'week':
          return 'day';
        case 'day':
          return 'hour';
        default:
          return prevView;
      }
    });
  }

  const ganttaData = [
    {
      label: '00-260(44)',
      taskStatus: 'greensquare.svg',
      dateStart: '2020-06-25',
      dateEnd: '2021-04-28',
      nomenclature: "РК-231.45.33.77_Шестерня",
      product: "Редуктор_РК-231",
      quantity: "2",
      laborIntensity: "4",
      customer: "ООО_Антей",
      productivity: "0",
      cost: "5400",
      priority: "1",
      planDate: "2023-04-15",
      actualDate: "2023-04-18",
      purchase: "0",
      blank: "Круг_стальной_ГОСТ_380-2005_СтЗсп",
      deviation: "3",
      unitPrice: "4000",
      percent: "50",
      dce: "РТ65.233.25",
      dragProject: true,
      expanded: true,
      type: 'order',
      tasks: [
        {
          label: '020 Токарная',
          taskStatus: 'greensquare.svg',
          dateStart: '2020-09-10',
          dateEnd: '2021-08-10',
          dragProject: true,
          Number: "020",
          Name: "Токарная",
          CodeOperation: "4110",
          laborIntensity: "2",
          gild: "2",
          technicalprocess: "223.2332.42",
          cost: "2100",
          quantity: "3",
          planDate: "16.12.2022",
          actualDate: "16.12.2022",
          purchase: "0",
          outfit: "Н3000423",
          deviation: "2",
          priority: "1",
          unitPrice: "4000",
          percent: "50",
          dce: "РТ65.233.25",
          expanded: true,
          type: 'operation',
          tasks: [
            {
              label: 'Pegas 380',
              taskStatus: 'greensquare.svg',
              description: "Фрезерный универсальный станок 5 осей ЧПУ",
              dateStart: '2020-09-10',
              dateEnd: '2021-08-10',
              dragProject: true,
              typical: "Оборудование ЧПУ",
              gild: "3",
              system: "none",
              nowstatus: "Техобслуживание",
              uin: "3T3555",
              deviation: "3",
              priority: "1",
              quantity: "2",
              unitPrice: "4000",
              percent: "50",
              planDate: "2023-03-11",
              actualDate: "2023-04-15",
              dce: "РТ65.233.25",
              expanded: true,
              type: 'resources'
            },
            {
              label: 'Слесарь',
              taskStatus: 'greensquare.svg',
              dateStart: '2020-09-10',
              dateEnd: '2021-08-10',
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
              quantity: "2",
              unitPrice: "4000",
              percent: "50",
              planDate: "2023-03-11",
              actualDate: "2023-04-15",
              dce: "РТ65.233.25",
              dragProject: true,
              expanded: true,
              type: 'resources'
            }
          ]
        }
      ],
    },
    {
      label: '02-450(34)',
      taskStatus: 'yellowsquare.svg',
      dateStart: '2020-04-25',
      dateEnd: '2021-02-15',
      nomenclature: "РК-231.45.33.77_Шестерня",
      product: "Редуктор_РК-231",
      quantity: "2",
      laborIntensity: "4",
      customer: "ООО_Антей",
      productivity: "0",
      cost: "5400",
      priority: "2",
      planDate: "2023-03-11",
      actualDate: "2023-04-15",
      purchase: "0",
      blank: "Круг_стальной_ГОСТ_380-2005_СтЗсп",
      deviation: "5",
      unitPrice: "5000",
      percent: "50",
      dce: "КТ15.263.27",
      dragProject: true,
      expanded: true,
      type: 'order',
      tasks: [
        {
          label: '020 Токарная',
          taskStatus: 'yellowsquare.svg',
          dateStart: '2020-09-10',
          dateEnd: '2021-08-10',
          dragProject: true,
          Number: "020",
          Name: "Токарная",
          CodeOperation: "4110",
          laborIntensity: "2",
          gild: "2",
          technicalprocess: "223.2332.42",
          cost: "2100",
          quantity: "3",
          planDate: "16.12.2022",
          actualDate: "16.12.2022",
          purchase: "0",
          outfit: "Н3000423",
          deviation: "3",
          priority: "1",
          unitPrice: "4000",
          percent: "50",
          dce: "РТ65.233.25",
          expanded: true,
          type: 'operation',
          tasks: [
            {
              label: 'Слесарь',
              taskStatus: 'yellowsquare.svg',
              dateStart: '2020-09-10',
              dateEnd: '2021-08-10',
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
              quantity: "2",
              unitPrice: "4000",
              percent: "50",
              planDate: "2023-03-11",
              actualDate: "2023-04-15",
              dce: "РТ65.233.25",
              dragProject: true,
              expanded: true,
              type: 'resources'
            }
          ]
        }
      ]
    }
  ];

  const [filteredData, setFilteredData] = useState(ganttaData);

  useEffect(() => {
    const newFilteredData = ganttaData
      .map(order => ({
        ...order,
        tasks: order.tasks.filter(operation => {
          const isMatch = operation.label.toLowerCase().includes(searchTerm.toLowerCase());
          console.log("Task label:", operation.label, "Search Term:", searchTerm, "Is Match:", isMatch);
          return isMatch;
        })
      }))
      .filter(order => {
        const isOrderMatch = order.label.toLowerCase().includes(searchTerm.toLowerCase());
        console.log("Order label:", order.label, "Search Term:", searchTerm, "Is Match:", isOrderMatch);
        return isOrderMatch || order.tasks.length > 0;
      });

    console.log("New Filtered Data:", newFilteredData);
    setFilteredData(newFilteredData);
  }, [searchTerm]);





  const handleButtonClick = (chart) => {
    setSelectedChart(chart);
  };

  const treeSize = 400;
  const durationUnit = 'hour';

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
        <img src="notifications-small.png" className='notifications-icons' alt="notif-icon" />
        <img src="mail-small.png" className='mail-icons' alt="mail-icon" />
        <img src="referal-small.png" className='referal-icons' alt="referal-icon" />
      </div>
      <div className="links">
        <button className="link1" onClick={() => handleButtonClick('gantta')}>
          <span>Gantta</span>
        </button>
        &nbsp;|&nbsp;
        <button className="link2" onClick={() => handleButtonClick('table')}>
          <span>Table</span>
        </button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            position: "absolute", right: 180, top: 103,
            marginTop: "20px",
            width: "200px",
            height: "30px",
            padding: "5px 10px 5px 30px",
            border: "1px solid #ccc",
            borderRadius: "15px",
            background: "#f1f1f1 url(/search-icon.png) no-repeat 5px center",
            backgroundSize: "20px 20px",
          }}
        />
      </div>
      <button onClick={increaseTime}>Increase Time</button>
      <button onClick={decreaseTime}>Decrease Time</button>
      {selectedChart === 'gantta' && (
        <GanttChart
          dataSource={filteredData}
          taskColumns={[
            {
              label: 'Tasks',
              value: 'label',
              size: '40%',
            },
            {
              label: 'Task Status',
              value: 'taskStatus',
              size: '30%',
              formatFunction: (taskStatus) => {
                return `<img src="${taskStatus}" alt="Task Status" style="width: 20px; height: 20px;">`;
              }
            },
            {
              label: 'Duration (hours)',
              value: 'duration',
              formatFunction: (date) => parseInt(date),
            },
            {
              label: 'Tasks',
              value: 'nomenclature',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'product',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'quantity',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'laborIntensity',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'customer',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'productivity',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'cost',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'priority',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'planDate',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'actualDate',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'purchase',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'blank',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'Number',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'Name',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'CodeOperation',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'gild',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'technicalprocess',
              hidden: true,
            },
            {
              label: 'Tasks',
              value: 'outfit',
              hidden: true,
            },
            {
              label: 'Отклонение',
              value: 'deviation',
            },
          ]}
          treeSize={treeSize}
          durationUnit="hour"
          id="gantta-gantt"
          view={ganttView}  // use the state variable here
          className="gantt-chart"
          popupWindowTabs={['general']}
        />
      )}


      {selectedChart === 'table' && <CollapsibleTable data={filteredData} />}
    </div>
  );
}

export default Diagram;