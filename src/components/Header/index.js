import './style.css'

import logo from '../../imgs/logo.svg';

function Header() {
    return(
      <header>
        <div className="clock-base">
          <div className="second-line"></div>
          <div className="minute-line"></div>
          <div className="hour-line"></div>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    )
}

export default Header;  