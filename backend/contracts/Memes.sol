// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract PawpawMemes is ERC721Enumerable, Ownable {
    using Strings for uint256;

    // the base URI that concatinates with
    // tokenId to product the token URI
    string _baseTokenURI;

    // sets the price of the NFT
    uint256 public _price = 0.001 ether;

    // used to pause the contract incase of any abnormality
    bool public _paused;

    // max amount of tokens in the collection
    uint256 public maxTokenIds = 5;

    // Number of tokens minted so far
    uint256 public tokenIds;

    // check and run only when contract is not paused
    modifier onlyWhenNotPaused() {
        require(!_paused, "Contract currently paused");
        _;
    }

    // constructor called at the deployment of the contract
    constructor(string memory baseURI) ERC721("PawpawMemes", "PPM") {
        _baseTokenURI = baseURI;
    }

    function mint() public payable onlyWhenNotPaused {
        // check if the caller is on the buyer_at_ico list
        // require();
        //  check that the number of tokes created remains as we wanted
        require(
            tokenIds < maxTokenIds,
            "Exceeded the max amount of Pawpaw Meme NFTs"
        );
        // check if the price is paid in full
        require(msg.value >= _price, "Invalid amount paid for the NFT");
        // increament the tokenId
        tokenIds += 1;
        _safeMint(msg.sender, tokenIds);
    }

    // set the tokenURI
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    // set tokenURI
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        // check if the token with the given URI exissts
        require(
            _exists(tokenId),
            "ERC721Metadat: URI querry for nonexistent token"
        );

        // set the tokenURI to the value fro the _basseURI function from above
        string memory baseURI = _baseURI();
        // now check if the token URI exists, concatinante it with the tokenId and add .json at the end,
        // otherwise, return an empty string
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
                : "";
    }

    // function to pause the contract
    function setPaused(bool val) public onlyOwner {
        _paused = val;
    }

    // funtion to withdraw the proceeds in the contract
    function withdraw() public onlyOwner {
        // get the address of the person calling
        address _owner = owner();

        // set the amount in the contract
        uint256 amount = address(this).balance;
        // send the amount
        (bool sent, ) = _owner.call{value: amount}("");
        // check if the transsfer was successfull
        require(sent, "Transaction failed");
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
