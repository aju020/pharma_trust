// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PharmaTrust {
    address public Government;

    constructor() public {
        Government = msg.sender;
    }

    uint256 public medicinecount = 0;
    uint256 public rmscount = 0;
    uint256 public  mancount = 0;
    uint256 public distcount = 0;
    uint256 public phcount = 0;

    struct medicine {
        uint256 id; 
        string name; 
        string expDate;
        string description; 
        uint256 RMSid; 
        uint256 MANid; 
        uint256 DISTid; 
        uint256 RETid; 
    }
    mapping(uint256 => medicine) public medAvailable;

    struct rawMaterialSupplier {
        address addr;
        uint256 id; 
        string name; 
        string place; 
    }
    mapping(uint256 => rawMaterialSupplier) public RMS;

    struct manufacturer {
        address addr;
        uint256 id; 
        string name; 
        string place; 
    }
    mapping(uint256 => manufacturer) public MAN;

    struct distributor {
        address addr;
        uint256 id;
        string name;
        string place; 
    }
    mapping(uint256 => distributor) public DIST;

    struct retailer {
        address addr;
        uint256 id; 
        string name; 
        string place; 
    }
    mapping(uint256 => retailer) public RET;

    function addRMS(address _address,string memory _name,string memory _place) public {
        rmscount++;
        RMS[rmscount] = rawMaterialSupplier(_address, rmscount, _name, _place);
    }

    function addManufacturer(address _address,string memory _name,string memory _place) public {
        mancount++;
        MAN[mancount] = manufacturer(_address, mancount, _name, _place);
    }

    function addDistributor(address _address,string memory _name,string memory _place) public {
        distcount++;
        DIST[distcount] = distributor(_address, distcount, _name, _place);
    }

    function addRetailer(address _address,string memory _name,string memory _place) public {
        phcount++;
        RET[phcount] = retailer(_address, phcount, _name, _place);
    }

}