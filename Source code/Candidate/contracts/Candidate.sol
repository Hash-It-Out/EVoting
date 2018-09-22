pragma solidity ^0.4.2;

contract Candidate{
    // Model a Candidate
    struct Candidate1 {
        uint id;
        string name;
        uint age;
        string voterId;
        uint aadhar;
        bool criminalRecord;
        bool itr;
    }

    // Store accounts that have voted
   // mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate

    mapping(address => bool) public addedCandidates;

    mapping(uint => Candidate1) public candidates;       //declaring it public gives us a getter function by default
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    /*event addedEvent (
        uint indexed _candidateid
    );*/

    function Candidate () public {
        addCandidate("Candidate 1", 26, "r5tctvuyg", 5464, true, true);
        addCandidate("Candidate 2", 28, "rdfgctvufdgdfgyg", 864185548, true, true);
    }

    function addCandidate (string _name, uint _age, string _voterId, uint _aadhar, bool _criminalRecord, bool _itr) public returns (bool){          //available only to contract, not other accounts
        require(_criminalRecord && _itr);
        candidatesCount ++;
        candidates[candidatesCount] = Candidate1(candidatesCount, _name, _age, _voterId, _aadhar, _criminalRecord, _itr);
        return true;
    }

    // function setStore(string _value) public {
    //     aadhar = _value;
    // }

    // function getAadhar() public view returns (string){
    //     return Candidate1.aadhar.toString();
    // }

    /*function isCandidate (uint _aadhar) public returns (bool) {      //solidity allows sending meta data, msg.sender gives the account from which the function call is sent
        // trigger voted event
        uint flag=1;
        uint temp2 = _aadhar;
        for(uint i=1;i<=candidatesCount;i++)
        {
            uint temp = candidates[i].aadhar;
            if(temp == temp2)
            {
                flag=0;
            }
        }
        if(flag==1)
        {
           return true;
        }
        else{
            return false;
        }*/

        /*function add (uint _candidateId) public {      //solidity allows sending meta data, msg.sender gives the account from which the function call is sent
        // require that they haven't voted before
        require(!candidates[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        candidates[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        addedEvent(_candidateId);
    }*/

    }
