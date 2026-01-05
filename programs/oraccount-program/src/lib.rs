use anchor_lang::prelude::*;

declare_id!("3sRBoe64qXyvxbNVHv6oqsyoGY3NLuLh6rDPPd5DD7MD");

#[program]
pub mod oraccount_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
