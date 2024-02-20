import './asset/css/App.css';
import 'bootstrap/dist/css/bootstrap.css'
import LoginPage from '../src/page/LoginPage.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CenterPage from './page/CenterPage.tsx';
import Header from './components/Header.tsx';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from './components/SideBar.tsx';
import Reservation from './page/Reservation.tsx';
import PrivateRoutes from './components/PrivateRoutes.tsx';
import ReservationTable from '../src/components/Table.tsx';
function App() {
  const routesWithoutHeaderAndSidebar = ['/'];
  const shouldHideHeaderAndSidebar = routesWithoutHeaderAndSidebar.includes(window.location.pathname);
  const [active, setActive] = useState();
  const [data, setData] = useState([]);
  const [bookingType, setBookingType] = useState("");
  const [showFrequency, setShowFrequency] = useState(Boolean);
  const [timevalue, setTimeValue] = useState("");
  const [timeset, settimeSet] = useState("");
  const [showSelect, setShowSelect] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(localStorage.getItem("IsSigedIn Status") === "true");
  useEffect(() => {
    localStorage.setItem("IsSigedIn Status", isSignedIn);
  }, [isSignedIn]); 
  const [playerData, setPlayerData] = useState({
    FirstName: "",
    LastName: "",
    Mobile: "",
    EmailAddress: "",
})
  return (
    <>
      <Container fluid className='p-0'>
        <BrowserRouter>
        {!shouldHideHeaderAndSidebar && <Header isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />}
          <Row>
            {!shouldHideHeaderAndSidebar && <Col xs={2} className='d-none d-lg-block d-md-block p-0'><SideBar active={active} setActive={setActive} /></Col>}
            <Col >
              <Routes>
                <Route path="/" element={<LoginPage isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}/>} />
                <Route path='/center' element={<PrivateRoutes isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}><CenterPage isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}/></PrivateRoutes>} />
                <Route path='/reservation' element={<PrivateRoutes isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}><Reservation data={data} playerData={playerData} setPlayerData={setPlayerData} setData={setData} bookingType={bookingType} setBookingType={setBookingType} showFrequency={showFrequency} setShowFrequency={setShowFrequency} timevalue={timevalue}  setTimeValue={setTimeValue}  settimeSet={settimeSet} timeset={timeset} showSelect={showSelect} setShowSelect={setShowSelect} isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} /></PrivateRoutes>}/>
                <Route path='/table' element={<PrivateRoutes isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}><ReservationTable playerData={playerData} setPlayerData={setPlayerData} /></PrivateRoutes>}></Route>
              </Routes>     
            </Col>
          </Row>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
