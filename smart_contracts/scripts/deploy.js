const main = async () => {
  const FileSharing = await hre.ethers.getContractFactory("FileSharing");
  const filesharing = await FileSharing.deploy();
  await filesharing.deployed();
  console.log("File Sharing deployed to: ", filesharing.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

runMain();
