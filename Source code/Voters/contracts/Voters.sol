pragma solidity ^0.4.20;

contract Voters {
    // Model a Candidate
    struct Voter1{
        string name;
        uint age;
        string gender;
        string ipfsProfile;
        string ipfsAge;
        string ipfsAdress; 
        }

    string ipfsProfile;
    string ipfsAge;
    string ipfsAdress; 
    uint public voterCount; 
    mapping(uint => Voter1) public voters;
    constructor() public{
        addVoter("c",3,"d","a","f","g");
    }

    function addVoter(string _name,uint _age,string _gender,string _ipfsAddress,string _ipfsAge,string _ipfsProfile) public{
        voterCount++;
        voters[voterCount]=Voter1(_name,_age,_gender,_ipfsAddress,_ipfsAge,_ipfsProfile);
        
    }
        


}
