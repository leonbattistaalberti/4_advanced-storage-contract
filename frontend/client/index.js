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
		// 1. If new Metamask was loaded in the browser
		if (typeof window.ethereum !== "undefined") {
			window.ethereum
				.enable() // returns a promise of array of user accounts
				.then(() => {
					resolve(new Web3(window.ethereum));
				})
				.catch((e) => {
					reject(e);
				});
			return;
		}

		// 2. If new Metamask failed and old Metamask was loaded
		if (typeof window.web3 !== "undefined") {
			return resolve(new Web3(window.web3.currentProvider));
		}
		// 3. If new and old Metamask failed, then load Ganache
		resolve(new Web3("http://localhost:9545/"));
	});
};

// initialize smart contract instance
const initContract = () => {
	let deploymentKey = Object.keys(AdvancedStorage.networks)[0];
	let contractAddress = AdvancedStorage.networks[deploymentKey].address;
	let contractAbi = AdvancedStorage.abi;
	// initite smart contract instance
	return new web3.eth.Contract(contractAbi, contractAddress);
};

// initialize app
const initApp = () => {
	// 1. load accounts
	let accounts = [];
	// get DOM elements
	let $addData = document.getElementById("addData");
	let $data = document.getElementById("data");

	/**
	 * web3.eth.accounts
	 * Promise returns Array
	 *
	 */

	web3.eth
		.getAccounts()
		.then((_accounts) => {
			accounts = _accounts;
			// get all accounts
			return advancedStorage.methods.getAll().call();
		})
		// 2. display the data on the screen
		.then((result) => ($data.innerHTML = result.join(", ")));

	// 3. add data to ids array
	$addData.addEventListener("submit", (evt) => {
		evt.preventDefault();
		console.log(evt.target);
		let data = evt.target.elements[0].value;
		advancedStorage.methods
			.add(data)
			.send({ from: accounts[0] })
			.then(() => {
				return advancedStorage.methods.getAll().call();
			})
			.then((result) => ($data.innerHTML = result.join(", ")));
	});
};

// load DOM
document.addEventListener("DOMContentLoaded", () => {
	// initialize an instance of Web3
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
