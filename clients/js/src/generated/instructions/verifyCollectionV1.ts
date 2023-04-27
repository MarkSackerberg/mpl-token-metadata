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
import { findMasterEditionPda, findMetadataPda } from '../accounts';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type VerifyCollectionV1InstructionAccounts = {
  /** Creator to verify, collection update authority or delegate */
  authority?: Signer;
  /** Delegate record PDA */
  delegateRecord?: PublicKey;
  /** Metadata account */
  metadata: PublicKey;
  /** Mint of the Collection */
  collectionMint: PublicKey;
  /** Metadata Account of the Collection */
  collectionMetadata?: PublicKey;
  /** Master Edition Account of the Collection Token */
  collectionMasterEdition?: PublicKey;
  /** System program */
  systemProgram?: PublicKey;
  /** Instructions sysvar account */
  sysvarInstructions?: PublicKey;
};

// Data.
export type VerifyCollectionV1InstructionData = {
  discriminator: number;
  verifyCollectionV1Discriminator: number;
};

export type VerifyCollectionV1InstructionDataArgs = {};

export function getVerifyCollectionV1InstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  VerifyCollectionV1InstructionDataArgs,
  VerifyCollectionV1InstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    VerifyCollectionV1InstructionDataArgs,
    any,
    VerifyCollectionV1InstructionData
  >(
    s.struct<VerifyCollectionV1InstructionData>(
      [
        ['discriminator', s.u8()],
        ['verifyCollectionV1Discriminator', s.u8()],
      ],
      { description: 'VerifyCollectionV1InstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: 52,
      verifyCollectionV1Discriminator: 1,
    })
  ) as Serializer<
    VerifyCollectionV1InstructionDataArgs,
    VerifyCollectionV1InstructionData
  >;
}

// Instruction.
export function verifyCollectionV1(
  context: Pick<Context, 'serializer' | 'programs' | 'eddsa' | 'identity'>,
  input: VerifyCollectionV1InstructionAccounts
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
  addObjectProperty(
    resolvingAccounts,
    'authority',
    input.authority ?? context.identity
  );
  addObjectProperty(
    resolvingAccounts,
    'delegateRecord',
    input.delegateRecord ?? programId
  );
  addObjectProperty(
    resolvingAccounts,
    'collectionMetadata',
    input.collectionMetadata ??
      findMetadataPda(context, { mint: publicKey(input.collectionMint) })
  );
  addObjectProperty(
    resolvingAccounts,
    'collectionMasterEdition',
    input.collectionMasterEdition ??
      findMasterEditionPda(context, { mint: publicKey(input.collectionMint) })
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
    'sysvarInstructions',
    input.sysvarInstructions ??
      publicKey('Sysvar1nstructions1111111111111111111111111')
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };

  // Authority.
  signers.push(resolvedAccounts.authority);
  keys.push({
    pubkey: resolvedAccounts.authority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.authority, false),
  });

  // Delegate Record.
  keys.push({
    pubkey: resolvedAccounts.delegateRecord,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.delegateRecord, false),
  });

  // Metadata.
  keys.push({
    pubkey: resolvedAccounts.metadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.metadata, true),
  });

  // Collection Mint.
  keys.push({
    pubkey: resolvedAccounts.collectionMint,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.collectionMint, false),
  });

  // Collection Metadata.
  keys.push({
    pubkey: resolvedAccounts.collectionMetadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.collectionMetadata, true),
  });

  // Collection Master Edition.
  keys.push({
    pubkey: resolvedAccounts.collectionMasterEdition,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.collectionMasterEdition, false),
  });

  // System Program.
  keys.push({
    pubkey: resolvedAccounts.systemProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.systemProgram, false),
  });

  // Sysvar Instructions.
  keys.push({
    pubkey: resolvedAccounts.sysvarInstructions,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.sysvarInstructions, false),
  });

  // Data.
  const data = getVerifyCollectionV1InstructionDataSerializer(
    context
  ).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
