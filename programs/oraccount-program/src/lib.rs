use anchor_lang::prelude::*;

declare_id!("BtrhqSTy1m3bZ687cZ1tPxNq2jNFhpEZXuJKaVimaFfN");

#[program]
pub mod oraccount_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn create_oracle_account(ctx: Context<CreateOracleAccount>, init_value: u64) -> Result<()> {
        ctx.accounts.oracle.authority = ctx.accounts.authority.key();
        ctx.accounts.oracle.value = init_value;
        ctx.accounts.oracle.last_updated = Clock::get()?.unix_timestamp;
        msg!("Creating new Oracle Account with init_value = {} & update_tieme = {} & Address = {}", ctx.accounts.oracle.value, ctx.accounts.oracle.last_updated, ctx.accounts.oracle.key());

        Ok(())
    }

    pub fn update_oracle_value(ctx: Context<UpdateOracleValue>, new_value: u64) -> Result<()> {
        let oracle = &mut ctx.accounts.oracle;
        oracle.value = new_value;
        oracle.last_updated = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct CreateOracleAccount<'info> {
    #[account(
        init, 
        space = 8 + OracleAccount::INIT_SPACE, 
        payer = authority, seeds = [b"oracle_account", authority.key().as_ref()],
        bump,
    )]
    pub oracle: Account<'info, OracleAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    /// Sistema de programa para transferencias (si se necesita)
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateOracleValue<'info> {
    #[account(mut, has_one = authority)]
    pub oracle: Account<'info, OracleAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    /// Sistema de programa para transferencias (si se necesita)
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct OracleAccount {
    pub authority: Pubkey,
    pub value: u64,
    pub last_updated: i64,
}
