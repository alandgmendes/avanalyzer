import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function Intraday (props) {
    const [searched, setSearched] = useState(false);
    const [dataFetched, setDataFetched] = useState({});
    const [tickerItems, setTickerItems] = useState([]);
    let tickerItens = [];
    let obj =[];
    async function fetcher (ticker){
        var myHeaders = new Headers();
        var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo';
        var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
        await fetch(url,myInit)
        .then(response => response.json())
        .then(data => {
          obj = Object.entries(data);
          let timeSeries = obj[1];
          let pointsArray = Object.entries(timeSeries[1]);
          for(let i = 0; i < pointsArray.length; i++){
            let innerArr = Object.entries(pointsArray[i]);
            let timeStamp = innerArr[0][1];
            let arrValues = Object.entries(innerArr[1][1]);
            let lineItem = <li key={timeStamp}>
                <span>{timeStamp}</span><span>{arrValues[0][0]}</span><span>{arrValues[0][1]}</span><span>{arrValues[1][0]}</span>
                <span>{arrValues[1][1]}</span><span>{arrValues[2][0]}</span>
                <span>{arrValues[2][1]}</span><span>{arrValues[3][0]}</span>
                <span>{arrValues[3][1]}</span>
            </li>;
            tickerItens.push(lineItem);            
          }
          setTickerItems(tickerItens);
          setSearched(true);
        })
        .catch(console.error);
    }
    useEffect(() => {
        console.log(searched)
        if(!searched){
            fetcher(props.ticker);
        }
    })


    return(
        <div>   
            
            {tickerItems}         
            <Plot
                data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                },
                {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                ]}
                layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
            />
        </div>
    );
}

export default Intraday;