import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { OraccountProgram } from "../target/types/oraccount_program";
import { BN } from "bn.js";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";

describe("oraccount-program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);

  const program = anchor.workspace.oraccountProgram as Program<OraccountProgram>;

  // it("Creae Oracle Account", async () => {
  //   const initValue = new BN(Math.random() * 100)
  //   console.log("initValue: ", initValue);

  //   const [oraclePDA] = anchor.web3.PublicKey.findProgramAddressSync(
  //     [Buffer.from("oracle_account"), provider.wallet.publicKey.toBuffer()],
  //     program.programId)

  //   console.log("oraclePDA: ", oraclePDA);

  //   const tx = await program.methods.createOracleAccount(initValue).accounts({
  //     oracle: oraclePDA
  //   }).rpc()

  //   console.log("Your Init Account signature: ", tx);
  // })



  it("Update Oracle Account", async () => {
    const newValue = new BN(Math.random() * 100)
    console.log("newValue: ", newValue);

    const [oraclePDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("oracle_account"), provider.wallet.publicKey.toBuffer()],
      program.programId)

    console.log("oraclePDA Address: ", oraclePDA);
    let oracleAccount = await program.account.oracleAccount.fetch(oraclePDA);
    console.log("oracleAccount value Before: ", oracleAccount.value.toNumber());

    const tx = await program.methods.updateOracleValue(newValue).accounts({
      oracle: oraclePDA
    }).rpc()

    console.log("Your Update Account signature: ", tx);

    oracleAccount = await program.account.oracleAccount.fetch(oraclePDA);
    console.log("oracleAccount value After: ", oracleAccount.value.toNumber());
  })
});
