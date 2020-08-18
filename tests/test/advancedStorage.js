const AdvancedStorage = artifacts.require("AdvancedStorage");

contract("AdvancedStorage", () => {
	it("Adds an item to the array", async () => {
		const advancedStorage = await AdvancedStorage.deployed();
		await advancedStorage.add(10);
		let result = await advancedStorage.ids(0);
		assert(result.toNumber() === 10);
	});

	it("Gets specified item from the array", async () => {
		const advancedStorage = await AdvancedStorage.deployed();
		await advancedStorage.add(20);
		let result = await advancedStorage.get(1);
		assert(result.toNumber() === 20);
	});
	it("Get the entire array", async () => {
		const advancedStorage = await AdvancedStorage.deployed();
		await advancedStorage.add(30);
		let rawIds = await advancedStorage.getAll();
		let ids = rawIds.map((id) => id.toNumber());
		assert.deepEqual(ids, [10, 20, 30]);
	});
	it("Returns the correct length of the array", async () => {
		const advancedStorage = await AdvancedStorage.deployed();
		let result = await advancedStorage.length();
		assert(result.toNumber() === 3);
	});
});
