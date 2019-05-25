pragma solidity ^0.5.2;
pragma experimental ABIEncoderV2;

import "zos-lib/contracts/Initializable.sol";
//import "openzeppelin-eth/contracts/token/ERC721/StandaloneERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";

contract KittyGram is Initializable {

    ERC721Full public erc721;
    uint256 public totalMemories;

    struct KittyMemory {
        address user;
        uint time;
        string memoryData;
    }

    mapping(address => mapping(uint256 => KittyMemory[])) public contractToAsset;
    mapping(address => mapping(uint256 => uint256)) public contractToAssetPointer;
    mapping(uint256 => KittyMemory) public gramID;


    event newMemoryAdded(address user, address NFTcontract, uint contractNFTID, uint time, uint thisgramID);

    function initialize() public initializer {
        erc721 = new ERC721Full("KittyGram","KG");
    }

    function addMemory(address _nftContract, uint256 _tokenId, string memory _data) public {
        KittyMemory memory thisMemory;
        thisMemory.user = msg.sender;
        thisMemory.time = now;
        thisMemory.memoryData = _data;

        contractToAssetPointer[_nftContract][_tokenId] = contractToAssetPointer[_nftContract][_tokenId]+1;
        contractToAsset[_nftContract][_tokenId].push(thisMemory);
        gramID[totalMemories] = thisMemory;
       
       //mint token

        emit newMemoryAdded(msg.sender, _nftContract, _tokenId, now, totalMemories);
         totalMemories = totalMemories+1;
    }

    function getMemoryByGram(uint256 _gramId) public returns(KittyMemory memory){

        return gramID[_gramId];
    }
}
