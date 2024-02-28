import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { userdate } from '../Context/Context.tsx';
import React from 'react';
const ReservationTable = () => {
    const { playerData, facilitylist, pricingRule, pricingCost } = useContext(userdate);
    return (
        <>
            <Table striped bordered hover variant="light">
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
                        <td>{playerData.FirstName}</td>
                        <td>{facilitylist}</td>
                        <td>{pricingRule}</td>
                        <td className='fw-bold '>$ {pricingCost}</td>
                    </tr>

                    <tr>
                        <td colSpan={3}>Total priceing</td>
                        <td><Button variant='dark' className='p-1'> $ 150</Button></td>
                    </tr>

                </tbody>

            </Table>
        </>
    )
}
export default ReservationTable;
