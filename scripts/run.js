const main = async () => {
    const signers = await hre.ethers.getSigners();
    //console.table(signers);
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
  
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", signers[0].address);
  
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    
    let waveTxn;
    for ( i = 0; i < signers.length; i++){
        waveTxn = await waveContract.connect(signers[i]).wave();
        await waveTxn.wait();
    }

    waveCount = await waveContract.getTotalWaves();
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();