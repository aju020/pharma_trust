// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PharmaTrust {
    address public Government;

    constructor() public {
        Government = msg.sender;
    }

    uint256 public medicineCount = 0;
    uint256 public rmsCount = 0;
    uint256 public  manCount = 0;
    uint256 public distCount = 0;
    uint256 public phCount = 0;

    enum STAGE {
        Init,
        RawMaterialSupply,
        Manufacture,
        Distribution,
        Retail,
        sold
    }

    struct medicine {
        uint256 id; 
        string name; 
        string expDate;
        string description; 
        uint256 RMSid; 
        uint256 MANid; 
        uint256 DISTid; 
        uint256 RETid; 
        STAGE stage;
    }
    mapping(uint256 => medicine) public medAvailable;

    function showStage(uint256 _medicineID)
        public
        view
        returns (string memory)
    {
        require(medicineCount > 0);
        if (medAvailable[_medicineID].stage == STAGE.Init)
            return "Medicine Ordered";
        else if (medAvailable[_medicineID].stage == STAGE.RawMaterialSupply)
            return "Raw Material Supply Stage";
        else if (medAvailable[_medicineID].stage == STAGE.Manufacture)
            return "Manufacturing Stage";
        else if (medAvailable[_medicineID].stage == STAGE.Distribution)
            return "Distribution Stage";
        else if (medAvailable[_medicineID].stage == STAGE.Retail)
            return "Retail Stage";
        else if (medAvailable[_medicineID].stage == STAGE.sold)
            return "Medicine Sold";
    }

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

    modifier onlyByGov() {
        require(msg.sender == Government);
        _;
    }

    function addRMS(address _address,string memory _name,string memory _place) public onlyByGov {
        rmsCount++;
        RMS[rmsCount] = rawMaterialSupplier(_address, rmsCount, _name, _place);
    }

    function addManufacturer(address _address,string memory _name,string memory _place) public onlyByGov {
        manCount++;
        MAN[manCount] = manufacturer(_address, manCount, _name, _place);
    }

    function addDistributor(address _address,string memory _name,string memory _place) public onlyByGov {
        distCount++;
        DIST[distCount] = distributor(_address, distCount, _name, _place);
    }

    function addRetailer(address _address,string memory _name,string memory _place) public onlyByGov {
        phCount++;
        RET[phCount] = retailer(_address, phCount, _name, _place);
    }

    //check RMS available in blockchain
    function findRMS(address _address) private view returns (uint256) {
        require(rmsCount > 0);
        for (uint256 i = 1; i <= rmsCount; i++) {
            if (RMS[i].addr == _address) return RMS[i].id;
        }
        return 0;
    }

    function findMAN(address _address) private view returns (uint256) {
        require(manCount > 0);
        for (uint256 i = 1; i <= manCount; i++) {
            if (MAN[i].addr == _address) return MAN[i].id;
        }
        return 0;
    }

    function findDIS(address _address) private view returns (uint256) {
        require(distCount > 0);
        for (uint256 i = 1; i <= distCount; i++) {
            if (DIST[i].addr == _address) return DIST[i].id;
        }
        return 0;
    }

    function findRET(address _address) private view returns (uint256) {
        require(phCount > 0);
        for (uint256 i = 1; i <= phCount; i++) {
            if (RET[i].addr == _address) return RET[i].id;
        }
        return 0;
    }

    //supply raw materials from RMS supplier to manufacturer
    function RMSsupply(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCount);
        uint256 _id = findRMS(msg.sender);
        require(_id > 0);
        require(medAvailable[_medicineID].stage == STAGE.Init); //checking
        medAvailable[_medicineID].RMSid = _id;
        medAvailable[_medicineID].stage = STAGE.RawMaterialSupply;
    }

    //manufacture medicine
    function Manufacturing(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCount);
        uint256 _id = findMAN(msg.sender);
        require(_id > 0);
        require(medAvailable[_medicineID].stage == STAGE.RawMaterialSupply);
        medAvailable[_medicineID].MANid = _id;
        medAvailable[_medicineID].stage = STAGE.Manufacture;
    }

    // supply medicines from Manufacturer to distributor
    function Distribute(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCount);
        uint256 _id = findDIS(msg.sender);
        require(_id > 0);
        require(medAvailable[_medicineID].stage == STAGE.Manufacture);
        medAvailable[_medicineID].DISTid = _id;
        medAvailable[_medicineID].stage = STAGE.Distribution;
    }

    //supply medicines from distributor to retailer
    function Retail(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCount);
        uint256 _id = findRET(msg.sender);
        require(_id > 0);
        require(medAvailable[_medicineID].stage == STAGE.Distribution);
        medAvailable[_medicineID].RETid = _id;
        medAvailable[_medicineID].stage = STAGE.Retail;
    }

    //sell medicines from retailer to consumer
    function sold(uint256 _medicineID) public {
        require(_medicineID > 0 && _medicineID <= medicineCount);
        uint256 _id = findRET(msg.sender);
        require(_id > 0);
        require(_id == medAvailable[_medicineID].RETid); 
        require(medAvailable[_medicineID].stage == STAGE.Retail);
        medAvailable[_medicineID].stage = STAGE.sold;
    }

     // add new medicines to the stock
    function addMedicine(string memory _name,string memory _expdate, string memory _description)
        public
        // onlyByGov()
    {
            require((rmsCount > 0) && (manCount > 0) && (distCount > 0) && (phCount > 0));
        medicineCount++;
        medAvailable[medicineCount] = medicine(
            medicineCount,
            _name,
            _expdate,
            _description,
            0,
            0,
            0,
            0,
            STAGE.Init
        );
    }


}