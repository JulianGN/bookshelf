import styled, { keyframes } from 'styled-components';

import './style.css'

import logo from '../../imgs/logo.svg';

function Header() {
  return(
      <header>
        <div className="clock-base">
          <SecondLine></SecondLine>
          <MinuteLine></MinuteLine>
          <HourLine></HourLine>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    )
}

const d = new Date();
const nowSeconds = d.getSeconds() * 6 - 90;
const nowMinutes = d.getMinutes() * 6 - 90;
const nowHour = d.getHours()*30 - 90;

const rotateSeg = keyframes`
  from {
    transform: rotate(${nowSeconds }deg);
  }
  to {
    transform: rotate(${nowSeconds + 360}deg);
  }
`;

const rotateMin = keyframes`
  from {
    transform: rotate(${nowMinutes}deg);
  }
  to {
    transform: rotate(${nowMinutes + 360}deg);
  }
`;

const rotateHour = keyframes`
  from {
    transform: rotate(${nowHour}deg);
  }
  to {
    transform: rotate(${nowHour + 360}deg);
  }
`;


const SecondLine = styled.div`
  background-color: #9b6dbf;
  height: 1px;
  margin-left: -1px;
  width: 36%;
  animation: ${rotateSeg} 60s linear infinite;
`;

const MinuteLine = styled.div`
  background-color: #9b6dbf;
  height: 4px;
  margin-left: -1px;
  width: 34%;
  animation: ${rotateMin} 3600s linear infinite;
`;

const HourLine = styled.div`
  background-color: #633585;
  height: 6px;
  margin-left: -3px;
  width: 20%;
  animation: ${rotateHour} 43200s linear infinite;
`;

export default Header;  