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

  it("Creae Oracle Account", async () => {
    const initValue = new BN(Math.random())
    console.log("initValue: ", initValue);

    const [oraclePDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("oracle_account"), provider.wallet.publicKey.toBuffer()],
      program.programId)

    console.log("oraclePDA: ", oraclePDA);

    const tx = await program.methods.createOracleAccount(initValue).accounts({
      oracle: oraclePDA
    }).rpc()

    console.log("Your Init Account signature: ", tx);
  })
});
