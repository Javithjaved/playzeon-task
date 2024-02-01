import './asset/css/App.css';
import 'bootstrap/dist/css/bootstrap.css'
import LoginPage from '../src/page/LoginPage.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import CenterPage from './page/CenterPage.tsx';
import Header from './components/Header.tsx';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from './components/SideBar.tsx';
import Reservation from './page/Reservation.tsx';

function App() {
  const routesWithoutHeaderAndSidebar = ['/'];
  const shouldHideHeaderAndSidebar = routesWithoutHeaderAndSidebar.includes(window.location.pathname);
  const [active, setActive] = useState();
  const [data, setData] = useState([]);
  const [bookingType, setBookingType] = useState("");
  const [showFrequency, setShowFrequency] = useState(true );
  const [timevalue, setTimeValue] = useState("");
  const [timeset, settimeSet] = useState("");
  return (
    <>
      <Container fluid className='p-0'>
        {!shouldHideHeaderAndSidebar && <Header />}
        <BrowserRouter>
          <Row>
            {!shouldHideHeaderAndSidebar && <Col xs={2} className='d-none d-lg-block d-md-block'><SideBar active={active} setActive={setActive} /></Col>}
            <Col xs={10}>
              <Routes>
                <Route path="/" element={<LoginPage />}></Route>
                <Route path='/center' element={<CenterPage />}></Route>
                <Route path='/reservation' element={<Reservation data={data}
                  setData={setData}
                  bookingType={bookingType}
                  setBookingType={setBookingType}
                  showFrequency={showFrequency}
                  setShowFrequency={setShowFrequency}
                  timevalue={timevalue}
                  setTimeValue={setTimeValue} 
                  settimeSet={settimeSet}
                  timeset={timeset} />}></Route>
              </Routes>
            </Col>
          </Row>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
