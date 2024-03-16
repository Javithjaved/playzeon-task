import { useState } from "react";
import Reservation from "../page/Reservation.tsx";
import OffcanvasComponents from "../components/OffcanvasComponents.tsx";
import { userdate } from "../Context/Context.tsx";
const MainCommonComponenst = ({ setIsNameDisclosureChecked }) => {
    const [playerShow, setPlayerShow] = useState(false);
    const [tableValuesShow, setTableValuesShow] = useState(false);
    const handleShowPlayer = () => {
        setPlayerShow(true);
    };
    const handleClosePlayer = () => {
        setPlayerShow(false);
    };
    const handleSubmitPlayerList = (values: any) => {
        setTableValuesShow(true)
        setPlayerDataList(values);
        setPlayerShow(true);
    }
    const handleNameDisclosure = (e) => {
        const isChecked = e.target.checked;
        setIsNameDisclosureChecked(isChecked);
        if (isChecked) {
            setPlayerDataList({
                ...playerDataList,
                FirstName: 'Name not disclosed',
                LastName: 'Name not disclosed',
                isNameDisclosureChecked: true,
                dis: 'Name not disclosed'
            });
        } else {
            setPlayerDataList({
                ...playerDataList,
                FirstName: '',
                LastName: '',
                isNameDisclosureChecked: false,
                dis: ''
            });
        }
    };
    console.log(userdate);
    const [playerData, setPlayerData] = useState({
        FirstName: "",
        LastName: "",
    })
    const [facilitylist, setFacilitylist] = useState()
    const [pricingRule, setPricingRule] = useState();
    const [pricingCost, setPricingCost] = useState();
    const [availablefacility, setAvailableFacility] = useState([]);
    const [playerAllData, setPlayerAllData] = useState({
        FirstName: '',
        LastName: '',
        Mobile: '',
        EmailAddress: '',
        facility: '',
        pricingRule: '',
        CostbyPricing: '',
    });
    const [playerDataList, setPlayerDataList] = useState({
        FirstName: '',
        LastName: '',
        facility: '',
        pricingRule: '',
        pricingCost: '',
        isNameDisclosureChecked: false,
        dis: ''
    })

    return (
        <div>
            <userdate.Provider value={{ playerData, setPlayerData, setFacilitylist, facilitylist, pricingRule, setPricingRule, pricingCost, setPricingCost, playerAllData, setPlayerAllData, playerDataList, setPlayerDataList }}>
                <Reservation tableValuesShow={tableValuesShow} handleNameDisclosure={handleNameDisclosure} handleShowPlayer={handleShowPlayer} availablefacility={availablefacility} setAvailableFacility={setAvailableFacility}/>
                <OffcanvasComponents handleClosePlayer={handleClosePlayer} handleShowPlayer={handleShowPlayer} playerShow={playerShow} handleSubmitPlayerList={handleSubmitPlayerList} handleNameDisclosure={handleNameDisclosure} />
            </userdate.Provider >
        </div >

    )
}
export default MainCommonComponenst;