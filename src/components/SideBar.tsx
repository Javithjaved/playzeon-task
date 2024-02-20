import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
const SideBar: React.FC = ({active,setActive}) => {
    return (
        <>
            <div className=" list-group">
             <Link to={"/center"} className="text-decoration-none d-flex"> <p className={`${active === "center" ? " text-danger   rounded-3  bg-light mt-1 mb-0" : " text-decoration-none   list-group-item-action home  p-3 mb-0 mt-1 mb-0 "}  list-group-item-action   p-3`} onClick={() => {setActive("center") }} ><Icon className="fs-3" icon="ic:round-home" />  <span >Home</span> <span className="float-end">&#10095;</span></p></Link>
             {/* <Link to={"/reservation"} className="text-decoration-none d-flex"> <p className={`${active === "reservation" ? " text-danger rounded-3  bg-light mt-1 mb-0" : " text-decoration-none   list-group-item-action home  p-3 mb-0 mt-1 mb-0 "}  list-group-item-action   p-3`} onClick={() => {setActive("reservation") }} > <Icon icon="fluent-mdl2:reservation-orders" /> <span >Reservation</span> <span className="unicode float-end">&#10095;</span></p></Link> */}
            </div>
        </> 
    )
}
export default SideBar;                                 