/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  Option,
  PublicKey,
  RpcAccount,
  Serializer,
  assertAccountExists,
  deserializeAccount,
} from '@lorisleiva/js-core';
import { TokenMetadataKey, getTokenMetadataKeySerializer } from '../types';

export type MasterEdition = Account<MasterEditionAccountData>;

export type MasterEditionAccountData = {
  key: TokenMetadataKey;
  supply: bigint;
  maxSupply: Option<bigint>;
};

export type MasterEditionAccountArgs = {
  key: TokenMetadataKey;
  supply: number | bigint;
  maxSupply: Option<number | bigint>;
};

export async function fetchMasterEdition(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<MasterEdition> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  assertAccountExists(maybeAccount, 'MasterEdition');
  return deserializeMasterEdition(context, maybeAccount);
}

export async function safeFetchMasterEdition(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<MasterEdition | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  return maybeAccount.exists
    ? deserializeMasterEdition(context, maybeAccount)
    : null;
}

export function deserializeMasterEdition(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): MasterEdition {
  return deserializeAccount(
    rawAccount,
    getMasterEditionAccountDataSerializer(context)
  );
}

export function getMasterEditionAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<MasterEditionAccountArgs, MasterEditionAccountData> {
  const s = context.serializer;
  return s.struct<MasterEditionAccountData>(
    [
      ['key', getTokenMetadataKeySerializer(context)],
      ['supply', s.u64],
      ['maxSupply', s.option(s.u64)],
    ],
    'MasterEdition'
  ) as Serializer<MasterEditionAccountArgs, MasterEditionAccountData>;
}

export function getMasterEditionSize(
  context: Pick<Context, 'serializer'>
): number | null {
  return getMasterEditionAccountDataSerializer(context).fixedSize;
}
