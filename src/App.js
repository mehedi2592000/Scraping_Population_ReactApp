import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

import{VictoryPie} from "victory-pie";

// const myData=[
//   {x:"PHP", y:10},
//   {x:"PHP2", y:700},
//   {x:"PHP3", y:200},
// ];


const App = () => {
    const [data, setData] = useState([]);


    
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7051/api/Population/api/Population/GetPaginationData');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    const colums=[
      {
        name:"Id",
        selector:row=>row.id,
        
      },
      {
        name:"Country",
        selector:row=>row.country,
         sortable: true
      },
      {
        name:"Population",
        selector:row=>row.population,
         sortable: true
      },
      {
        name:"Percentage",
        selector:row=>row.percentage,
         sortable: true
      },
      {
        name:"Date",
        selector:row=>row.date,
         sortable: true
      },
      {
        name:"Source",
        selector:row=>row.source,
         sortable: true
      }
    ]

    
    
    const myData = data.map((dataItem) => {
      return { x: dataItem.country, y: dataItem.id };
    });

  return (
    
    <div className="container mt-5">
      <h1 className='text-center m-5'>Scraping Population Data List</h1>
      <DataTable
      // title="Scraping Population Data "
      columns={colums}
      data={data}
      pagination
      highlightOnHover
      />
      
      <h1 className='text-center m-5'>Scraping Population Data Chart</h1>
      <VictoryPie 
      data={myData}
      colorScale={["blue","yellow","red","green"]}
      radius={50}/>
      

    

    </div>

    
  );
};

export default App;
