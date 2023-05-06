import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/PharmaTrust.json"
import { Box, Tab, Tabs, Typography } from '@mui/material';

function Supply() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState();
    const [MedStage, setMedStage] = useState();
    const [ID, setID] = useState();
    const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };


    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };
    const loadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);
            var i;
            const medCtr = await supplychain.methods.medicineCount().call();
            const med = {};
            const medStage = [];
            for (i = 0; i < medCtr; i++) {
                med[i] = await supplychain.methods.medAvailable(i + 1).call();
                medStage[i] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
            setloader(false);
        }
        else {
            window.alert('The smart contract is not deployed to current network')
        }
    }
    if (loader) {
        return (
            <div>
                <h1 className="wait">Loading...</h1>
            </div>
        )

    }
    const redirect_to_home = () => {
        history.push('/')
    }

    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const handlerSubmitRMSsupply = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.RMSsupply(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitManufacturing = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Manufacturing(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitDistribute = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Distribute(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitRetail = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Retail(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitSold = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.sold(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    
    return (
        <div>
            <div className='d-flex justify-content-between align-items-center m-3'>
                <div>
                    <h1 onClick={redirect_to_home} className=""><button className='btn btn-outline-primary btn-lg'>PharmaTrust </button> </h1>
                </div>
                <div>
                    <span><b>Current Account Address:</b> {currentaccount}</span>
                </div>
            </div>

            <table className="table table-sm ">
                <thead>
                    <tr>
                        <th scope="col">Medicine ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Processing Stage</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(MED).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{MED[key].id}</td>
                                <td>{MED[key].name}</td>
                                <td>{MED[key].description}</td>
                                <td>
                                    {
                                        MedStage[key]
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="box-wrapper">
                <div className="box">
                    <h1>Update Status</h1>
                    <Box>
                    <Box>
                        <Tabs value={tabIndex} onChange={handleTabChange}>
                        <Tab label="Raw-Material Supplier" />
                        <Tab label="Manufacturer" />
                        <Tab label="Distributor" />
                        <Tab label="Retailer" />
                        </Tabs>
                    </Box>
                    <Box sx={{ padding: 2 }}>
                        {tabIndex === 0 && (
                        <Box>
                            <h4>Enter the MEDICINE ID of the medicine for which the raw materials is to be supplied</h4>
                            <b>Note: (Only a registered Raw Material Supplier can perform this step)</b>
                            <form onSubmit={handlerSubmitRMSsupply}>
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <input className="form-control-sm mt-3" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                                    <button className="btn btn-outline-success btn-sm mt-3" onSubmit={handlerSubmitRMSsupply}>Supply</button>
                                </div>
                            </form>
                        </Box>
                        )}
                        {tabIndex === 1 && (
                        <Box>
                            <h4>Enter the MEDICINE ID of the medicine of which the manufacturing is done</h4>
                            <b>Note: (Only a registered Manufacturer can perform this step)</b>
                                <form onSubmit={handlerSubmitManufacturing}>
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <input className="form-control-sm mt-3" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                                        <button className="btn btn-outline-success btn-sm mt-3" onSubmit={handlerSubmitManufacturing}>Manufacture</button>
                                    </div>
                                </form>
                        </Box>
                        )}
                        {tabIndex === 2 && (
                        <Box>
                            <h4>Enter the MEDICINE ID of the medicine of which the distribution is to be done after manufacturing</h4>
                            <b>Note: (Only a registered Distributor can perform this step)</b>
                                <form onSubmit={handlerSubmitDistribute}>
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <input className="form-control-sm mt-3" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                                        <button className="btn btn-outline-success btn-sm mt-3" onSubmit={handlerSubmitDistribute}>Distribute</button>
                                    </div>
                                </form>
                        </Box>
                        )}
                        {tabIndex === 3 && (
                        <Box>
                            <h4>Enter the MEDICINE ID of the medicine which is kept for sale</h4>
                            <b>Note: (Only a registered Retailer can perform this step)</b>
                                <form onSubmit={handlerSubmitRetail}>
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                    <input className="form-control-sm mt-3" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                                    <button className="btn btn-outline-success btn-sm mt-3" onSubmit={handlerSubmitRetail}>Retail</button>
                                </div>

                                <h4>Enter the MEDICINE ID of the medicine which is sold</h4>
                            <b>Note: (Only a registered Retailer can perform this step)</b>
                                </form>
                                <form onSubmit={handlerSubmitSold}>
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <input className="form-control-sm mt-3" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                                        <button className="btn btn-outline-success btn-sm mt-3" onSubmit={handlerSubmitSold}>Sold</button>
                                    </div>
                                </form>
                        </Box>
                        )}
                    </Box>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Supply
