import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function Intraday (props) {
    const [searched, setSearched] = useState(false);
    const [openTrace, setOpenTrace] = useState({});
    const [highTrace, setHighTrace] = useState({});
    const [closeTrace, setCloseTrace] = useState({});
    const [lowTrace, setLowTrace] = useState({});
    const [width, setWidth] = useState(window.innerWidth);
    let obj =[];
    const widthView = Math.round(window.screen.width * 0.8);
    async function fetcher (ticker){
        var myHeaders = new Headers();
        var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=60min&apikey=CB13MCAS13KOVKNU`;
        var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
        let open =[];
        let high =[];
        let low = [];
        let close = [];
        let timeStamps = [];
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
            open.push(arrValues[0][1]);
            high.push(arrValues[1][1]);
            low.push(arrValues[2][1]);
            close.push(arrValues[3][1]);
            timeStamps.push(timeStamp);
                      
          }
          
          setOpenTrace({
            x: timeStamps,
            y: open,
            name: "open",
            type: 'scatter',
            mode: 'lines',
            line: {
              color: 'rgb(250, 1, 1)',
              width: 3
            }
          });
          setHighTrace({
            x: timeStamps,
            y: high,
            name: "high",
            type: 'scatter',
            mode: 'lines',
            line: {
              color: 'rgb(1, 255, 1)',
              width: 3
            }
          });
          setLowTrace({
            x: timeStamps,
            y: low,
            name: "low",
            type: 'scatter',
            mode: 'lines',
            line: {
              color: 'rgb(1, 1, 255)',
              width: 3
            }
          });
          setCloseTrace({
            x: timeStamps,
            y: close,
            name: "close",
            type: 'scatter',
            mode: 'lines',
            line: {
              color: 'rgb(2, 1, 1)',
              width: 3
            }
          });
          setSearched(true);
        })
        .catch(console.error);
    }
    useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth)
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    useEffect(() => {
      
        if(!searched){
            fetcher(props.ticker);
        }
    })



    return(
        <div>
            <h3>{props.ticker}</h3>
            <Plot
              data={[
                openTrace,
                lowTrace,
                highTrace,
                closeTrace
              ]}
              layout={ {width: width, height: 440, title: props.ticker} }
            />
        </div>
    );
}

export default Intraday;