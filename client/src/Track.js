import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import PharmaTrustABI from "./artifacts/PharmaTrust.json"
import QrScanner from 'qr-scanner';
import QRCode from "react-qr-code";

function Track() {
    const [temp, setTemp] = useState("");
    const [result, setResult] = useState("");
    const [number, setNumber] = useState("0");

    const handleClick=() =>{
        setNumber(temp);
      }

      const readCode=(e)=>{
        const file = e.target.files[0];
            if (!file) {
                return;
            }
            QrScanner.scanImage(file, { returnDetailedScanResult: true })
                .then(result => console.log(result))
                .catch(e => console.log(e));
      }

      const download =param=>event=>{
        console.log(param);
        const svg = document.getElementById("QRCode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
    
          downloadLink.download = `${param}`;
          downloadLink.href = `${pngFile}`;
          downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
      }
    

    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [Data, setData] = useState();
    const [MED, setMED] = useState();
    const [MedStage, setMedStage] = useState();
    const [ID, setID] = useState();
    const [RMS, setRMS] = useState();
    const [MAN, setMAN] = useState();
    const [DIS, setDIS] = useState();
    const [RET, setRET] = useState();
    const [TrackTillSold, showTrackTillSold] = useState(false);
    const [TrackTillRetail, showTrackTillRetail] = useState(false);
    const [TrackTillDistribution, showTrackTillDistribution] = useState(false);
    const [TrackTillManufacture, showTrackTillManufacture] = useState(false);
    const [TrackTillRMS, showTrackTillRMS] = useState(false);
    const [TrackTillOrdered, showTrackTillOrdered] = useState(false);

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
        const networkData = PharmaTrustABI.networks[networkId];
        if (networkData) {
            const contract = new web3.eth.Contract(PharmaTrustABI.abi, networkData.address);
            setData(contract);
            var i;
            const medCtr = await contract.methods.medicineCount().call();
            const med = {};
            const medStage = [];
            for (i = 0; i < medCtr; i++) {
                med[i + 1] = await contract.methods.medAvailable(i + 1).call();
                medStage[i + 1] = await contract.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
            const rmsCtr = await contract.methods.rmsCount().call();
            const rms = {};
            for (i = 0; i < rmsCtr; i++) {
                rms[i + 1] = await contract.methods.RMS(i + 1).call();
            }
            setRMS(rms);
            const manCtr = await contract.methods.manCount().call();
            const man = {};
            for (i = 0; i < manCtr; i++) {
                man[i + 1] = await contract.methods.MAN(i + 1).call();
            }
            setMAN(man);
            const disCtr = await contract.methods.distCount().call();
            const dis = {};
            for (i = 0; i < disCtr; i++) {
                dis[i + 1] = await contract.methods.DIST(i + 1).call();
            }
            setDIS(dis);
            const retCtr = await contract.methods.phCount().call();
            const ret = {};
            for (i = 0; i < retCtr; i++) {
                ret[i + 1] = await contract.methods.RET(i + 1).call();
            }
            setRET(ret);
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
    if (TrackTillSold) {
        return (
            <div className="container-xl">
                <article className="col-4">
                    <h3 className='mt-3'><b><u>Medicine Details :</u></b></h3>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Expiry Date: </b>{MED[ID].expDate}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3 border m-2">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3 border m-2">
                        <h4><u>Manufactured by:</u></h4>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3 border m-2">
                        <h4><u>Distributed by:</u></h4>
                        <p><b>Distributor ID: </b>{DIS[MED[ID].DISTid].id}</p>
                        <p><b>Name:</b> {DIS[MED[ID].DISTid].name}</p>
                        <p><b>Place: </b>{DIS[MED[ID].DISTid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3 border m-2">
                        <h4><u>Retailed by:</u></h4>
                        <p><b>Retailer ID: </b>{RET[MED[ID].RETid].id}</p>
                        <p><b>Name:</b> {RET[MED[ID].RETid].name}</p>
                        <p><b>Place: </b>{RET[MED[ID].RETid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3 border m-2">
                        <h4><u>Sold</u></h4>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillSold(false);
                }} className="btn btn-outline-primary btn-sm">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    if (TrackTillRetail) {
        return (
            <div className="container-xl">
                <article className="col-4">
                    <h3 className='mt-3'><b><u>Medicine Details :</u></b></h3>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Expiry Date: </b>{MED[ID].expDate}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3 border m-2">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3 border m-2">
                        <h4><u>Manufactured by:</u></h4>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3 border m-2">
                        <h4><u>Distributed by:</u></h4>
                        <p><b>Distributor ID: </b>{DIS[MED[ID].DISTid].id}</p>
                        <p><b>Name:</b> {DIS[MED[ID].DISTid].name}</p>
                        <p><b>Place: </b>{DIS[MED[ID].DISTid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3 border m-2">
                        <h4><u>Retailed by:</u></h4>
                        <p><b>Retailer ID: </b>{RET[MED[ID].RETid].id}</p>
                        <p><b>Name:</b> {RET[MED[ID].RETid].name}</p>
                        <p><b>Place: </b>{RET[MED[ID].RETid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillRetail(false);
                }} className="btn btn-outline-primary btn-sm">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    if (TrackTillDistribution) {
        return (
            <div className="container-xl">
                <article className="col-4">
                    <h3 className='mt-3'><b><u>Medicine Details :</u></b></h3>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Expiry Date: </b>{MED[ID].expDate}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3 border m-2">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3 border m-2">
                        <h4><u>Manufactured by:</u></h4>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3 border m-2">
                        <h4><u>Distributed by:</u></h4>
                        <p><b>Distributor ID: </b>{DIS[MED[ID].DISTid].id}</p>
                        <p><b>Name:</b> {DIS[MED[ID].DISTid].name}</p>
                        <p><b>Place: </b>{DIS[MED[ID].DISTid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillDistribution(false);
                }} className="btn btn-outline-primary btn-sm">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    if (TrackTillManufacture) {
        return (
            <div className="container-xl">
                <article className="col-4">
                    <h3 className='mt-3'><b><u>Medicine Details :</u></b></h3>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Expiry Date: </b>{MED[ID].expDate}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3 border m-2">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3 border m-2">
                        <h4><u>Manufactured by:</u></h4>
                        <p><b>Manufacturer ID: </b>{MAN[MED[ID].MANid].id}</p>
                        <p><b>Name:</b> {MAN[MED[ID].MANid].name}</p>
                        <p><b>Place: </b>{MAN[MED[ID].MANid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillManufacture(false);
                }} className="btn btn-outline-primary btn-sm">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    if (TrackTillRMS) {
        return (
            <div className="container-xl">
                <article className="col-4">
                    <h3 className='mt-3'><b><u>Medicine Details :</u></b></h3>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Expiry Date: </b>{MED[ID].expDate}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3 border m-2">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillRMS(false);
                }} className="btn btn-outline-primary btn-sm">Track Another Item</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    if (TrackTillOrdered) {
        return (
            <div className="container-xl">
                <article className="col-4">
                    <h3 className='mt-3'><b><u>Medicine Details :</u></b></h3>
                    <span><b>Medicine ID: </b>{MED[ID].id}</span>
                    <br />
                    <span><b>Name:</b> {MED[ID].name}</span>
                    <br />
                    <span><b>Description: </b>{MED[ID].description}</span>
                    <br />
                    <span><b>Current stage: </b>{MedStage[ID]}</span>
                    <hr />
                    <br />
                    <h5>Medicine Not Yet Processed...</h5>
                    <button onClick={() => {
                        showTrackTillOrdered(false);
                    }} className="btn btn-outline-primary btn-sm">Track Another Item</button>
                    <span onClick={() => {
                        history.push('/')
                    }} className="btn btn-outline-danger btn-sm"> HOME</span>
                </article>
                {/* <section className="row">
                    
                    <article className="col-3 border m-2">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                </section> */}
            </div >
        )
    }
    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerSubmit = async (event) => {
        event.preventDefault();
        var ctr = await Data.methods.medicineCount().call();
        if (!((ID > 0) && (ID <= ctr)))
            alert("Invalid Medicine ID!!!");
        else {
            // eslint-disable-next-line
            if (MED[ID].stage == 5)
                showTrackTillSold(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 4)
                showTrackTillRetail(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 3)
                showTrackTillDistribution(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 2)
                showTrackTillManufacture(true);
            // eslint-disable-next-line
            else if (MED[ID].stage == 1)
                showTrackTillRMS(true);
            else
                showTrackTillOrdered(true);

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
            <br />
            <table className="table table-sm table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Medicine ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Expiary Date</th>
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
                                <td>{MED[key].expDate}</td>
                                <td>
                                    {
                                        MedStage[key]
                                    }
                                </td>
                                <td>
                                <QRCode
                                    size={100}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value={MED[key].id}
                                    viewBox={`0 0 256 256`}
                                    id='QRCode'
                                /> <button onClick={download(`${MED[key].id}`)}>Download</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <hr />
            <div className='d-flex justify-content-center align-items-center p-2'>
                {/* <h5><b>Track</b> the medicines-</h5> */}
            <h5>Enter Medicine ID to Track it</h5>
                <form onSubmit={handlerSubmit}>
                    <input className="form-control-sm ml-2" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                    <button className="btn btn-outline-primary btn-sm" onSubmit={handlerSubmit}>Track</button>
                    <input type="file"  onChange={(e)=>readCode(e)}/>
                </form>
            </div>
            <hr />

        </div>
    )
}

export default Track
