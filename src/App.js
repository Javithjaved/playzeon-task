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
import BookingDetails from './page/BookingDetails.tsx';
import { userdate } from "../src/Context/Context.tsx";
import PlayerTable from './components/PlayerTable.tsx';
import ErrorPage from './components/ErrorPage.jsx';
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
  })
  const titelName = "Edit";
  const addTitelName = "Add";
  const [playerShow, setPlayerShow] = useState(false);
  const handleShowPlayer = () => {
    setPlayerShow(true);
  };
  const handleClosePlayer = () => {
    setPlayerShow(false);
  };
  const [costPricingValues, setCostPricingValues] = useState();
  const [facilitylist, setFacilitylist] = useState()
  const [pricingRule, setPricingRule] = useState();
  const [pricingCost, setPricingCost] = useState();
  const [playerAllData, setPlayerAllData] = useState({
    FirstName: '',
    LastName: '',
    Mobile: '',
    EmailAddress: '',
    facility: '',
    pricingRule: '',
  });
  const [playerDataList, setPlayerDataList] = useState({
    FirstName: '',
    LastName: '',
    facility: '',
    pricingRule: '',
    pricingCost: '',
    isNameDisclosureChecked: false,
    dis: 'Name not disclosed'
  })
  const [playerDatas, setPlayerDatas] = useState([]);

  return (
    <>
      <userdate.Provider value={{ playerData, setPlayerData, setFacilitylist, facilitylist, pricingRule, setPricingRule, pricingCost, setPricingCost, playerAllData, setPlayerAllData, costPricingValues, setCostPricingValues }}>
        <Container fluid className='p-0 '>
          <BrowserRouter>
            {!shouldHideHeaderAndSidebar && <Header isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />}
            <Row>
              {!shouldHideHeaderAndSidebar && <Col xs={2} xxl={2} className='d-none d-lg-block d-md-block p-0'><SideBar active={active} setActive={setActive} /></Col>}
              <Col xxl={10}>
                <Routes>
                  <Route path="/" element={<LoginPage isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />} />
                  <Route path='/center' element={<PrivateRoutes isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}>
                    <CenterPage isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
                  </PrivateRoutes>} />
                  <Route path='/reservation' element={<PrivateRoutes isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}>
                    <Reservation data={data} playerData={playerData} setPlayerData={setPlayerData} setData={setData} bookingType={bookingType} setBookingType={setBookingType} showFrequency={showFrequency} setShowFrequency={setShowFrequency} timevalue={timevalue} setTimeValue={setTimeValue} settimeSet={settimeSet} timeset={timeset} showSelect={showSelect} setShowSelect={setShowSelect} isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} playerShow={playerShow} handleShowPlayer={handleShowPlayer} handleClosePlayer={handleClosePlayer} titelName={titelName} addTitelName={addTitelName} playerDatas={playerDatas} setPlayerDatas={setPlayerDatas} setPlayerDataList={setPlayerDataList} playerDataList={playerDataList} playerAllData={playerAllData} setPlayerAllData={setPlayerAllData} costPricingValues={costPricingValues} setCostPricingValues={setCostPricingValues} />
                  </PrivateRoutes>} />
                  <Route path='*' element={<ErrorPage />} />
                </Routes>
              </Col>
            </Row>
          </BrowserRouter>
        </Container>
      </userdate.Provider>
    </>
  );
}

export default App;
