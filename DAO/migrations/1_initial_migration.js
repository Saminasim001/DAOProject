const Nao = artifacts.require("NAO");
const Nao_G = artifacts.require("NAO_G");
const Nao_Swap = artifacts.require("Swap");
const Profit_Distributor = artifacts.require("Profit");
const swapOwner = "0x951D562ECe9A5717C66985939F6D319827367a56" // owner wallet here which will hold supply to let users swap both tokens
const treasuryWallet = "0x951D562ECe9A5717C66985939F6D319827367a56" // treasuery wallet here which will distribute profits

module.exports = async function (deployer) {
  await deployer.deploy(Nao);
  await deployer.deploy(Nao_G);
  await deployer.deploy(Nao_Swap , Nao.address , Nao_G.address , swapOwner);
  await deployer.deploy(Profit_Distributor, treasuryWallet, Nao.address);
};
