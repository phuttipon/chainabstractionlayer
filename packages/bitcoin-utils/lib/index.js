import { base58, padHexStart } from '@liquality/crypto'
import { InvalidAddressError } from '@liquality/errors'
import networks from '@liquality/bitcoin-networks'

import { findKey } from 'lodash'
import BigNumber from 'bignumber.js'
import * as bitcoin from 'bitcoinjs-lib'
import * as classify from 'bitcoinjs-lib/src/classify'
import * as varuint from 'bip174/src/lib/converter/varint'
import coinselect from 'coinselect'
import coinselectAccumulative from 'coinselect/accumulative'

import { version } from '../package.json'

const AddressTypes = [
  'legacy', 'p2sh-segwit', 'bech32'
]

function calculateFee (numInputs, numOutputs, feePerByte) {
  return ((numInputs * 148) + (numOutputs * 34) + 10) * feePerByte
}

/**
 * Get compressed pubKey from pubKey.
 * @param {!string} pubKey - 65 byte string with prefix, x, y.
 * @return {string} Returns the compressed pubKey of uncompressed pubKey.
 */
function compressPubKey (pubKey) {
  const x = pubKey.substring(2, 66)
  const y = pubKey.substring(66, 130)
  const even = parseInt(y.substring(62, 64), 16) % 2 === 0
  const prefix = even ? '02' : '03'

  return prefix + x
}

/**
 * Get a network object from an address
 * @param {string} address The bitcoin address
 * @return {Network}
 */
function getAddressNetwork (address) {
  // TODO: can this be simplified using just bitcoinjs-lib??
  let networkKey
  // bech32
  networkKey = findKey(networks, network => address.startsWith(network.bech32))
  // base58
  if (!networkKey) {
    const prefix = base58.decode(address).toString('hex').substring(0, 2)
    networkKey = findKey(networks, network => {
      const pubKeyHashPrefix = padHexStart((network.pubKeyHash).toString(16), 1)
      const scriptHashPrefix = padHexStart((network.scriptHash).toString(16), 1)
      return [pubKeyHashPrefix, scriptHashPrefix].includes(prefix)
    })
  }
  return networks[networkKey]
}

function selectCoins (utxos, targets, feePerByte, fixedInputs = []) {
  let selectUtxos = utxos
  let inputs, outputs
  let fee = 0

  // Default coinselect won't accumulate some inputs
  // TODO: does coinselect need to be modified to ABSOLUTELY not skip an input?
  const coinselectStrat = fixedInputs.length ? coinselectAccumulative : coinselect
  if (fixedInputs.length) {
    selectUtxos = [ // Order fixed inputs to the start of the list so they are used
      ...fixedInputs,
      ...utxos.filter(utxo => !fixedInputs.find(input => input.vout === utxo.vout && input.txid === utxo.txid))
    ]
  }

  ({ inputs, outputs, fee } = coinselectStrat(selectUtxos, targets, Math.ceil(feePerByte)))

  return { inputs, outputs, fee }
}

const OUTPUT_TYPES_MAP = {
  [classify.types.P2WPKH]: 'witness_v0_keyhash',
  [classify.types.P2WSH]: 'witness_v0_scripthash'
}

function decodeRawTransaction (hex, network) {
  const bjsTx = bitcoin.Transaction.fromHex(hex)

  const vin = bjsTx.ins.map((input) => {
    return {
      txid: Buffer.from(input.hash).reverse().toString('hex'),
      vout: input.index,
      scriptSig: {
        asm: bitcoin.script.toASM(input.script),
        hex: input.script.toString('hex')
      },
      txinwitness: input.witness.map(w => w.toString('hex')),
      sequence: input.sequence
    }
  })

  const vout = bjsTx.outs.map((output, n) => {
    const type = classify.output(output.script)

    var vout = {
      value: output.value / 1e8,
      n,
      scriptPubKey: {
        asm: bitcoin.script.toASM(output.script),
        hex: output.script.toString('hex'),
        reqSigs: 1, // TODO: not sure how to derive this
        type: OUTPUT_TYPES_MAP[type] || type,
        addresses: []
      }
    }

    try {
      const address = bitcoin.address.fromOutputScript(output.script, network)
      vout.scriptPubKey.addresses.push(address)
    } catch (e) {}

    return vout
  })

  return {
    txid: bjsTx.getHash(false).reverse().toString('hex'),
    hash: bjsTx.getHash(true).reverse().toString('hex'),
    version: bjsTx.version,
    locktime: bjsTx.locktime,
    size: bjsTx.byteLength(),
    vsize: bjsTx.virtualSize(),
    weight: bjsTx.weight(),
    vin,
    vout,
    hex
  }
}

function normalizeTransactionObject (tx, fee, block) {
  const value = tx.vout.reduce((p, n) => p.plus(BigNumber(n.value).times(1e8)), BigNumber(0))
  const result = {
    hash: tx.txid,
    value: value.toNumber(),
    _raw: tx,
    confirmations: 0
  }

  if (fee) {
    const feePrice = Math.round(fee / tx.vsize)
    Object.assign(result, {
      fee,
      feePrice
    })
  }

  if (block) {
    Object.assign(result, {
      blockHash: block.hash,
      blockNumber: block.number,
      confirmations: tx.confirmations
    })
  }

  return result
}

// TODO: This is copy pasta because it's not exported from bitcoinjs-lib
// https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/csv.spec.ts#L477
function witnessStackToScriptWitness (witness) {
  let buffer = Buffer.allocUnsafe(0)

  function writeSlice (slice) {
    buffer = Buffer.concat([buffer, Buffer.from(slice)])
  }

  function writeVarInt (i) {
    const currentLen = buffer.length
    const varintLen = varuint.encodingLength(i)

    buffer = Buffer.concat([buffer, Buffer.allocUnsafe(varintLen)])
    varuint.encode(i, buffer, currentLen)
  }

  function writeVarSlice (slice) {
    writeVarInt(slice.length)
    writeSlice(slice)
  }

  function writeVector (vector) {
    writeVarInt(vector.length)
    vector.forEach(writeVarSlice)
  }

  writeVector(witness)

  return buffer
}

function getPubKeyHash (address, network) {
  const outputScript = bitcoin.address.toOutputScript(address, network)
  const type = classify.output(outputScript)
  if (![classify.types.P2PKH, classify.types.P2WPKH].includes(type)) {
    throw new Error(`Bitcoin swap doesn't support the address ${address} type of ${type}. Not possible to derive public key hash.`)
  }

  try {
    const bech32 = bitcoin.address.fromBech32(address)
    return bech32.data
  } catch (e) {
    const base58 = bitcoin.address.fromBase58Check(address)
    return base58.hash
  }
}

function validateAddress (address, network) {
  if (typeof address !== 'string') {
    throw new InvalidAddressError(`Invalid address: ${address}`)
  }

  let pubKeyHash
  try {
    pubKeyHash = getPubKeyHash(address, network)
  } catch (e) {
    throw new InvalidAddressError(`Invalid Address. Failed to parse: ${address}`)
  }

  if (!pubKeyHash) {
    throw new InvalidAddressError(`Invalid Address: ${address}`)
  }
}

export {
  calculateFee,
  compressPubKey,
  getAddressNetwork,
  selectCoins,
  decodeRawTransaction,
  normalizeTransactionObject,
  witnessStackToScriptWitness,
  AddressTypes,
  getPubKeyHash,
  validateAddress,
  version
}
