
const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  // set the metadataURL for the NFTs
  const metadataURL = "ipfs://QmevBeiCv3TuPhT1d7GmWGXdbH3L8pbqKjE188rnDRqzyU/"

  // instantaite a contractFactory for the PawpawMemes contact
  const pawpawMemesContract = await ethers.getContractFactory("PawpawMemes");
  
  const deployedPawpawMemesContract = await pawpawMemesContract.deploy(metadataURL);

  await deployedPawpawMemesContract.deployed();


   // console the deploy address
  console.log("Pawpaw Memes Contract Address :", deployedPawpawMemesContract.address);

    // wait for the deployed contract address to be seen
    console.log('Sleeping.....');
    await sleep(30000);

    // verify the contract after deployment
    await hre.run('verify:verify', {
        address : deployedPawpawMemesContract.address,
        constructorArguments: [metadataURL],
    });
}
function sleep(ms){
    return new Promise((resolve)=> setTimeout(resolve,ms));
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// deployed Address : 0x9F2b05BE7Fa9d1eaAFEB65e151D1573Bd3a860DB

// pooolygonscan link: https://mumbai.polygonscan.com/address/0x9F2b05BE7Fa9d1eaAFEB65e151D1573Bd3a860DB#code