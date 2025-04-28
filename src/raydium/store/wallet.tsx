import { PublicKey, AccountInfo, ParsedAccountData } from '@solana/web3.js'
import { NATIVE_SOL } from '../utils/tokens'
import { TOKEN_PROGRAM_ID } from '../utils/ids'
import { TokenAmount } from '../utils/safe-math'
import { findAssociatedTokenAddress } from '../utils/web3'

export const getTokenAccounts = async (conn: any, wallet: any) => {
  return conn.getParsedTokenAccountsByOwner(
    wallet.publicKey,
    {
      programId: TOKEN_PROGRAM_ID
    },
    'confirmed'
  )
    .then(async (parsedTokenAccounts: any) => {
      const tokenAccounts: any = {}
      const auxiliaryTokenAccounts: Array<{ pubkey: PublicKey; account: AccountInfo<ParsedAccountData> }> = []

      for (const tokenAccountInfo of parsedTokenAccounts.value) {
        const tokenAccountPubkey = tokenAccountInfo.pubkey
        const tokenAccountAddress = tokenAccountPubkey.toBase58()
        const parsedInfo = tokenAccountInfo.account.data.parsed.info
        const mintAddress = parsedInfo.mint
        const balance = new TokenAmount(parsedInfo.tokenAmount.amount, parsedInfo.tokenAmount.decimals)

        const ata = await findAssociatedTokenAddress(wallet.publicKey, new PublicKey(mintAddress))

        if (ata.equals(tokenAccountPubkey)) {
          tokenAccounts[mintAddress] = {
            tokenAccountAddress,
            balance
          }
        } else if (parsedInfo.tokenAmount.uiAmount > 0) {
          auxiliaryTokenAccounts.push(tokenAccountInfo)
        }
      }

      const solBalance = await conn.getBalance(wallet.publicKey, 'confirmed')
      tokenAccounts[NATIVE_SOL.mintAddress] = {
        tokenAccountAddress: wallet.publicKey.toBase58(),
        balance: new TokenAmount(solBalance, NATIVE_SOL.decimals)
      }
      console.log(`tokenAccounts`, tokenAccounts)
      return tokenAccounts
    })
    .catch(() => {
      return {}
    })
}
