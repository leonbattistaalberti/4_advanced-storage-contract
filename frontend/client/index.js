/*
 *	Accounts loaded using Metamask
 *	If the metamask fails, Ganache will be used
 */

import Web3 from "web3";
import AdvancedStorage from "../build/contracts/AdvancedStorage.json";

let web3;
let advancedStorage;

// initialize web3 instance
const initWeb3 = () => {
	return new Promise((resolve, reject) => {
		// 1. If new Metamask was loaded
		if (typeof window.ethereum !== "undefined") {
			window.ethereum
				.enable()
				.then(() => {
					resolve(new Web3(window.ethereum));
				})
				.catch((e) => {
					reject(e);
				});
		}
		return;
		// 2. If new Metamask failed and old Metamask was loaded
		if (typeof window.web3 === "undefined") {
			return resolve(new Web3(window.web3.currentProvider));
		}
		// 3. If new and old Metamask failed, then load Ganache
		resolve(new Web3("http://localhost:9545/"));
	});
};

// initialize smart contract instance
const initContract = () => {
	let deploymentKey = Object.keys(AdvancedStorage.networks)[0];
	return new Web3.eth.Contract(
		AdvancedStorage.abi,
		AdvancedStorage.networks[deploymentKey].address
	);
};

// initialize app
const initApp = () => {};

// load DOM
document.addEventListener("DOMContentLoaded", () => {
	// initialize the instance of Web3
	initWeb3()
		.then((_web3) => {
			web3 = _web3;
			// initialize the smart contract
			advancedStorage = initContract();
			// initialize app
			initApp();
		})
		.catch((e) => {
			console.log(e.message);
		});
});
