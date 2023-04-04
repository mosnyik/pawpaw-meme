import Head from "next/head";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { claimed, isEngaged } from "../utils/NFTValidationUtils/claimedNFT";
import dynamic from "next/dynamic";

const LinkToWhal3s = dynamic(() => import('../utils/whal3s'), {
  ssr: false
});

export default function Home() {

  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const [step, setStep] = useState(-1);
  const [userEngaged, setUserEngaged] = useState(false);
  let stepp;
  let isEngagedd;

  const mint = async () => {
    try {
      console.log("PPM minted");
      const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);
      const tx = await nftContract.mint({
        value: utils.parseEther("0.01"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a PPM NFT!");
    } catch (err) {
      console.error(err);
    }
  };
  const connectWallet = async () => {
    try {
         await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
   const web3Provider = new providers.Web3Provider(provider);

   const { chainId } = await web3Provider.getNetwork();
   if (chainId !== 80001) {
     window.alert("Change the network to Mumbai");
     throw new Error("Change network to Mumbai");
   }

   if (needSigner) {
     const signer = web3Provider.getSigner();
     return signer;
   }
   return web3Provider;
 };

  useEffect(() => {
    if (!walletConnected) {
        web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
      // getAmounts();
    }
  }, [walletConnected]);

  useEffect (() => {
    
    setStep(claimed());
    setUserEngaged(isEngaged());

  }, [userEngaged]);

  
  const renderButton = () => {
  
    if (userEngaged || (step == 6)) {
      console.log("Broken");
      
    } else {
      console.log("Not broken");
      return (
      < LinkToWhal3s />
      );
    }
  };

  return (
    <Fragment>
    <Head>
      <title>Web3 Media Platform</title>
      <meta name="description" content="A web3 media platform for content creators and consumers" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-3xl leading-tight">
          Welcome to the Web3 Media Platform
        </h1>
        <p className="mt-6 py-3 text-xl md:text-2xl lg:text-3xl text-center max-w-3xl">
          A decentralized media platform for content creators and consumers
        </p>
        <p className="mt-6 py-3 text-xl md:text-2xl lg:text-3xl text-center max-w-3xl">
          You need a PPM NFT to be part of this community, mint one <button onClick={mint()}>here</button>
        </p>
        {!userEngaged && 
          <div  className='bold hover:underline mt-8 px-6 py-3 rounded-lg bg-blue-400 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>
            {renderButton()}
          </div>
          }  
          <div className='bold hover:underline mt-8 px-6 py-3 rounded-lg bg-blue-400 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>
                    <Link href = {'/gallery'}>
                    Check our Media
                    </Link>
                </div>
       
      </main>

      <footer className="flex justify-center items-center w-full h-16 border-t">
        <p className="text-sm text-gray-500">
          &copy; 2023 Web3 Media Platform. All rights reserved.
        </p>
      </footer>
    </div>
  </Fragment>

  )
}
