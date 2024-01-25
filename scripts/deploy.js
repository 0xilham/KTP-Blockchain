async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const CallContract = await ethers.getContractFactory("Ktp"); // ubah menjadi nama kontrak
  const Contract = await CallContract.deploy();
  await Contract.waitForDeployment();
  console.log(`Deployed contract to: ${Contract.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });