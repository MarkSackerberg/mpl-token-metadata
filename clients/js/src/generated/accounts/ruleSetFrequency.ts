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
  PublicKey,
  RpcAccount,
  Serializer,
  assertAccountExists,
  deserializeAccount,
} from '@lorisleiva/js-core';
import { TokenAuthRulesKey, getTokenAuthRulesKeySerializer } from '../types';

export type RuleSetFrequency = Account<RuleSetFrequencyAccountData>;

export type RuleSetFrequencyAccountData = {
  key: TokenAuthRulesKey;
  lastUpdate: bigint;
  period: bigint;
};

export type RuleSetFrequencyAccountArgs = {
  key: TokenAuthRulesKey;
  lastUpdate: number | bigint;
  period: number | bigint;
};

export async function fetchRuleSetFrequency(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<RuleSetFrequency> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  assertAccountExists(maybeAccount, 'RuleSetFrequency');
  return deserializeRuleSetFrequency(context, maybeAccount);
}

export async function safeFetchRuleSetFrequency(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<RuleSetFrequency | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  return maybeAccount.exists
    ? deserializeRuleSetFrequency(context, maybeAccount)
    : null;
}

export function deserializeRuleSetFrequency(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): RuleSetFrequency {
  return deserializeAccount(
    rawAccount,
    getRuleSetFrequencyAccountDataSerializer(context)
  );
}

export function getRuleSetFrequencyAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<RuleSetFrequencyAccountArgs, RuleSetFrequencyAccountData> {
  const s = context.serializer;
  return s.struct<RuleSetFrequencyAccountData>(
    [
      ['key', getTokenAuthRulesKeySerializer(context)],
      ['lastUpdate', s.i64],
      ['period', s.i64],
    ],
    'RuleSetFrequency'
  ) as Serializer<RuleSetFrequencyAccountArgs, RuleSetFrequencyAccountData>;
}

export function getRuleSetFrequencySize(_context = {}): number {
  return 17;
}
