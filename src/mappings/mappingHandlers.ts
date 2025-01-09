import { Account, Credit, Debit, Payment, Transfer, User, Manager, ContractUpgrade } from "../types";
import {
  StellarOperation,
  StellarEffect,
  SorobanEvent,
} from "@subql/types-stellar";
import {
  AccountCredited,
  AccountDebited,
} from "stellar-sdk/lib/horizon/types/effects";
import { Horizon } from "stellar-sdk";
import { Address, xdr } from "soroban-client";


// Interface auxiliar para lidar com o campo decoded
interface DecodedScVal extends xdr.ScVal {
  decoded?: any;
}

// Type guard para verificar se o ScVal tem a propriedade decoded
function hasDecoded(val: xdr.ScVal): val is DecodedScVal {
  return 'decoded' in val;
}

export async function handleOperation(
  op: StellarOperation<Horizon.HorizonApi.PaymentOperationResponse>
): Promise<void> {
  logger.info(`Indexing operation ${op.id}, type: ${op.type}`);

  if (!op.ledger) {
    throw new Error(`No ledger found for operation ${op.id}`);
  }

  if (!op.from || !op.to) {
    throw new Error(`Missing from or to address for operation ${op.id}`);
  }

  const fromAccount = await checkAndGetAccount(op.from, op.ledger.sequence);
  const toAccount = await checkAndGetAccount(op.to, op.ledger.sequence);

  const payment = Payment.create({
    id: op.id,
    fromId: fromAccount.id,
    toId: toAccount.id,
    txHash: op.transaction_hash,
    amount: op.amount,
  });

  fromAccount.lastSeenLedger = op.ledger.sequence;
  toAccount.lastSeenLedger = op.ledger.sequence;
  await Promise.all([fromAccount.save(), toAccount.save(), payment.save()]);
}

export async function handleCredit(
  effect: StellarEffect<AccountCredited>
): Promise<void> {
  logger.info(`Indexing effect ${effect.id}, type: ${effect.type}`);

  if (!effect.ledger) {
    throw new Error(`No ledger found for effect ${effect.id}`);
  }

  if (!effect.account) {
    throw new Error(`No account found for effect ${effect.id}`);
  }

  const account = await checkAndGetAccount(
    effect.account,
    effect.ledger.sequence
  );

  const credit = Credit.create({
    id: effect.id,
    accountId: account.id,
    amount: effect.amount,
  });

  account.lastSeenLedger = effect.ledger.sequence;
  await Promise.all([account.save(), credit.save()]);
}

export async function handleDebit(
  effect: StellarEffect<AccountDebited>
): Promise<void> {
  logger.info(`Indexing effect ${effect.id}, type: ${effect.type}`);

  if (!effect.ledger) {
    throw new Error(`No ledger found for effect ${effect.id}`);
  }

  if (!effect.account) {
    throw new Error(`No account found for effect ${effect.id}`);
  }

  const account = await checkAndGetAccount(
    effect.account,
    effect.ledger.sequence
  );

  const debit = Debit.create({
    id: effect.id,
    accountId: account.id,
    amount: effect.amount,
  });

  account.lastSeenLedger = effect.ledger.sequence;
  await Promise.all([account.save(), debit.save()]);
}

export async function handleEvent(event: SorobanEvent): Promise<void> {
  const topic = event.topic.toString();
  const timestamp = new Date(); // Usando timestamp atual como fallback

  // Extrair a ação do tópico (último componente)
  const topicParts = topic.split('.');
  const action = topicParts[topicParts.length - 1];

  if (topic.startsWith('user')) {
    // Converter ScVal para array e então para strings
    const valueArray = event.value.vec()?.map(v => v.str().toString()) || [];
    const [sender, user] = valueArray;
    
    if (action === "add") {
      const userRecord = User.create({
        id: user,
        active: true,
        addedAt: timestamp,
        addedBy: sender
      });
      await userRecord.save();
    } else if (action === "remove") {
      const userRecord = await User.get(user);
      if (userRecord) {
        userRecord.active = false;
        userRecord.removedAt = timestamp;
        await userRecord.save();
      }
    }
  }

  else if (topic.startsWith('manager')) {
    // Converter ScVal para array e então para strings
    const valueArray = event.value.vec()?.map(v => v.str().toString()) || [];
    const [sender, manager] = valueArray;
    
    if (action === "add") {
      const managerRecord = Manager.create({
        id: manager,
        active: true,
        addedAt: timestamp,
        addedBy: sender
      });
      await managerRecord.save();
    } else if (action === "remove") {
      const managerRecord = await Manager.get(manager);
      if (managerRecord) {
        managerRecord.active = false;
        managerRecord.removedAt = timestamp;
        await managerRecord.save();
      }
    }
  }

  else if (topic.startsWith('upgrade')) {
    const wasmHash = event.value.bytes().toString('hex');
    const upgrade = ContractUpgrade.create({
      id: `${event.id}-${timestamp.getTime()}`,
      timestamp: timestamp,
      newWasmHash: wasmHash
    });
    await upgrade.save();
  }
}

async function checkAndGetAccount(
  id: string,
  ledgerSequence: number
): Promise<Account> {
  let account = await Account.get(id.toLowerCase());
  if (!account) {
    // We couldn't find the account
    account = Account.create({
      id: id.toLowerCase(),
      firstSeenLedger: ledgerSequence,
    });
  }
  return account;
}

// scValToNative not works, temp solution
function decodeAddress(scVal: xdr.ScVal): string {
  try {
    return Address.account(scVal.address().accountId().ed25519()).toString();
  } catch (e) {
    try {
      return Address.contract(scVal.address().contractId()).toString();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Unable to decode address: ${errorMessage}`);
    }
  }
}