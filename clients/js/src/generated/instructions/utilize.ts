/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { findMetadataPda } from '../accounts';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type UtilizeInstructionAccounts = {
  /** Metadata account */
  metadata?: PublicKey;
  /** Token Account Of NFT */
  tokenAccount: PublicKey;
  /** Mint of the Metadata */
  mint: PublicKey;
  /** A Use Authority / Can be the current Owner of the NFT */
  useAuthority: Signer;
  /** Owner */
  owner: PublicKey;
  /** Token program */
  tokenProgram?: PublicKey;
  /** Associated Token program */
  ataProgram?: PublicKey;
  /** System program */
  systemProgram?: PublicKey;
  /** Rent info */
  rent?: PublicKey;
  /** Use Authority Record PDA If present the program Assumes a delegated use authority */
  useAuthorityRecord?: PublicKey;
  /** Program As Signer (Burner) */
  burner?: PublicKey;
};

// Data.
export type UtilizeInstructionData = {
  discriminator: number;
  numberOfUses: bigint;
};

export type UtilizeInstructionDataArgs = { numberOfUses: number | bigint };

export function getUtilizeInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<UtilizeInstructionDataArgs, UtilizeInstructionData> {
  const s = context.serializer;
  return mapSerializer<UtilizeInstructionDataArgs, any, UtilizeInstructionData>(
    s.struct<UtilizeInstructionData>(
      [
        ['discriminator', s.u8()],
        ['numberOfUses', s.u64()],
      ],
      { description: 'UtilizeInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 19 })
  ) as Serializer<UtilizeInstructionDataArgs, UtilizeInstructionData>;
}

// Args.
export type UtilizeInstructionArgs = UtilizeInstructionDataArgs;

// Instruction.
export function utilize(
  context: Pick<Context, 'serializer' | 'programs' | 'eddsa'>,
  input: UtilizeInstructionAccounts & UtilizeInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'mplTokenMetadata',
      'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  const resolvingArgs = {};
  addObjectProperty(
    resolvingAccounts,
    'metadata',
    input.metadata ?? findMetadataPda(context, { mint: publicKey(input.mint) })
  );
  addObjectProperty(
    resolvingAccounts,
    'tokenProgram',
    input.tokenProgram ?? {
      ...context.programs.getPublicKey(
        'splToken',
        'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
      ),
      isWritable: false,
    }
  );
  addObjectProperty(
    resolvingAccounts,
    'ataProgram',
    input.ataProgram ?? {
      ...context.programs.getPublicKey(
        'splAssociatedToken',
        'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
      ),
      isWritable: false,
    }
  );
  addObjectProperty(
    resolvingAccounts,
    'systemProgram',
    input.systemProgram ?? {
      ...context.programs.getPublicKey(
        'splSystem',
        '11111111111111111111111111111111'
      ),
      isWritable: false,
    }
  );
  addObjectProperty(
    resolvingAccounts,
    'rent',
    input.rent ?? publicKey('SysvarRent111111111111111111111111111111111')
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Metadata.
  keys.push({
    pubkey: resolvedAccounts.metadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.metadata, true),
  });

  // Token Account.
  keys.push({
    pubkey: resolvedAccounts.tokenAccount,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.tokenAccount, true),
  });

  // Mint.
  keys.push({
    pubkey: resolvedAccounts.mint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.mint, true),
  });

  // Use Authority.
  signers.push(resolvedAccounts.useAuthority);
  keys.push({
    pubkey: resolvedAccounts.useAuthority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.useAuthority, true),
  });

  // Owner.
  keys.push({
    pubkey: resolvedAccounts.owner,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.owner, false),
  });

  // Token Program.
  keys.push({
    pubkey: resolvedAccounts.tokenProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.tokenProgram, false),
  });

  // Ata Program.
  keys.push({
    pubkey: resolvedAccounts.ataProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.ataProgram, false),
  });

  // System Program.
  keys.push({
    pubkey: resolvedAccounts.systemProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.systemProgram, false),
  });

  // Rent.
  keys.push({
    pubkey: resolvedAccounts.rent,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.rent, false),
  });

  // Use Authority Record (optional).
  if (resolvedAccounts.useAuthorityRecord) {
    keys.push({
      pubkey: resolvedAccounts.useAuthorityRecord,
      isSigner: false,
      isWritable: isWritable(resolvedAccounts.useAuthorityRecord, true),
    });
  }

  // Burner (optional).
  if (resolvedAccounts.burner) {
    keys.push({
      pubkey: resolvedAccounts.burner,
      isSigner: false,
      isWritable: isWritable(resolvedAccounts.burner, false),
    });
  }

  // Data.
  const data =
    getUtilizeInstructionDataSerializer(context).serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
