import { useState } from 'react';
import Table from 'react-bootstrap/Table';
const ReservationTable = ({playerData}) => {  
    return (
        <>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Faclitiy name</th>
                        <th>Pricing Rule name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
export default ReservationTable;
