import React, { useContext, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { userdate } from "../Context/Context.tsx";
import { Icon } from "@iconify/react";

const PlayerTable = ({ handleShowPlayer, playerDatas, playerDataList, setPlayerDatas }) => {
    console.log(playerDatas);
    const { pricingCost } = useContext(userdate);

    const handleDeletePlayer = (index: number) => {
        const updatedPlayerDatas = [...playerDatas];
        updatedPlayerDatas.splice(index, 1);
        setPlayerDatas(updatedPlayerDatas);
    };

    return (
        <div>
            <Table striped bordered hover responsive variant="light">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Facility name</th>
                        <th>Pricing rule name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(playerDatas) && playerDatas.map((player, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{player.FirstName}</td>
                                <td>{player.LastName}</td>
                                <td>{player.facility}</td>
                                <td>{player.pricingRule}</td>
                                <td>{pricingCost}</td>
                                <td>
                                    <div>
                                        <Button variant="warning" onClick={() => handleShowPlayer()}>
                                            <span><Icon icon="line-md:edit" /></span>
                                        </Button>
                                    </div>
                                    <div>
                                        <Button variant="danger" onClick={() => handleDeletePlayer(index)}>
                                            <span><Icon icon="mdi:bin" /></span>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    )
};
export default PlayerTable;
