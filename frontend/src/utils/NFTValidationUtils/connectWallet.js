import React, {useState} from 'react';
import styles from "../../styles/Home.module.css";

const ConnectWallet = ({utility}) => {
    const [loading, setLoading] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const connectWallet = () => {
        console.log("Conecting Wallet...");
        setLoading(true)
        utility.connectWallet()
            .catch((e) => {
                console.log(e.message);
            })
            .finally(() => {
            setLoading(false)
            setWalletConnected(true)
        })
    }
   
    return (
        
        <div className={styles.button}>   
        <button
            isLoading={loading}
            className=""
            onClick={() => {
                connectWallet()
            }}>Connect Wallet </button> 
        </div>
    );
};

export default ConnectWallet;