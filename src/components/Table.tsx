import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { userdate } from '../Context/Context.tsx';
import React from 'react';
import { array } from 'yup';
const ReservationTable = ({ playerAllData, costPricingValues, playerDatas }) => {
    console.log(costPricingValues);
    const { pricingCost } = useContext(userdate);
    return (
        <>
            <Table striped bordered hover variant="light" responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Facilty</th>
                        <th>Pricing Rule</th>
                        <th>Per hour</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{playerAllData.FirstName}</td>
                        <td>{playerAllData.facility}</td>
                        <td>{playerAllData.pricingRule}</td>
                        <td className='fw-bold '>$ {pricingCost}</td>
                    </tr>
                    {Array.isArray(playerDatas)  && playerDatas.map((player,index)=>{
                        return(
                            <tr>
                                <td>{player.FirstName}</td>
                                <td>{player.facility}</td>
                                <td>{player.pricingRule}</td>
                                <td className='fw-bold'> $ {pricingCost}</td>
                            </tr>
                        )
                    })

                    }
                    <tr>
                        {/* {Array.isArray(playerDatas) && playerDatas.map((player, index) => {
                            return (
                                <tr >
                                    <td>{player.FirstName}</td>
                                    <td>{player.facility}</td>
                                    <td>{player.pricingRule}</td>
                                    <td>{pricingCost}</td>
                                </tr>
                            );
                        })} */}
                    </tr>
                    <tr>
                        <td colSpan={3}>Total priceing</td>
                        <td><Button variant='dark' className='p-1'> $ {costPricingValues}</Button></td>
                    </tr>
                </tbody>
            </Table>

        </>
    )
}
export default ReservationTable;
