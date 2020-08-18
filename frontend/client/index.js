import Web3 from "web3";
import AdvancedStorage from "../build/contracts/AdvancedStorage.json";

const web3;
const advancedStorage

// initialize web3 instance
const initWeb3 = () => {}

// initialize smart contract instance
const initContract = () => {}

// initialize app
const initApp = () => {}

// load DOM

document.addEventListener("DOMContentLoaded", () => {
    // initialize the instance of Web3
    initWeb3().then((_web3) => {
        web3 = _web3;
        // initialize the smart contract 
        advancedStorage = initContract();
        // initialize app
        initApp();

        catch (e) { console.log(e.message); }
    })
})