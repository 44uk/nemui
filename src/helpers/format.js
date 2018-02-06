import nem from 'nem-sdk'
import moment from 'moment'

moment.locale(window.navigator.userLanguage || window.navigator.language)

function levyTypeToName (value) {
  return value === 1 ? 'Constant fee'
    : value === 2 ? 'Percentage based' : `Undefined ${value}`
}

function mosaicIdToFqn (value) {
  return `${value['namespaceId']}:${value['name']}`
}

function nemValue (value) {
  const tmp = nem.utils.format.nemValue(value)
  return `${tmp[0].replace(/ /g, ',')}.${tmp[1]}`
}

function txTypeToName (value) {
  return nem.utils.format.txTypeToName(value)
}

function modeToName (value) {
  return value === 1 ? 'Activate' : 'Deactivate'
}

function supplyTypeToName (value) {
  return value === 1 ? 'Add' : 'Remove'
}

function modificationTypeToName (value) {
  return value === 1 ? 'Add' : 'Remove'
}

function publicKeyToAddress (publicKey, network) {
  let id = null
  if (network === 'mijin') {
    id = 96
  } else if (network === 'mainnet') {
    id = 104
  } else {
    id = -104
  }
  return nem.model.address.toAddress(publicKey, id)
}

function sanitizeAddress (address = '') {
  return address.replace(/-/g, '').toUpperCase()
}

function splitAddressByHyphen (address = '') {
  return address.replace(/([A-Z2-7]{6})(?=([A-Z2-7]{4,6})+)/g, '$1-').toUpperCase()
}

function rebuildMosaicProps (properties) {
  return properties.reduce((obj, el) => {
    switch (el.name) {
      case 'divisibility':
      case 'initialSupply':
        obj[el.name] = Number(el.value)
        break
      case 'supplyMutable':
      case 'transferable':
        obj[el.name] = el.value === 'true'
        break
      default:
        obj[el.name] = el.value
    }
    return obj
  }, {})
}

function nemtime2iso8601 (nemtime) {
  return moment(1427587585000 + nemtime * 1000).format('lll')
}

function versionToNetworkName (version) {
  switch (version & 0xfffffffc) {
    case 1744830464:
      return 'MAINNET'
    case -1744830464:
      return 'TESTNET'
    case 1610612736:
      return 'MIJIN'
    default:
      return 'undefined'
  }
}

const MAINNET_EXPLORER = 'http://chain.nem.ninja'
const TESTNET_EXPLORER = 'http://bob.nem.ninja:8765'
const MIJIN_EXPLORER = 'http://mijin.example.com'

function explorerBlockUrl (height, network) {
  switch (network) {
    case 'testnet':
      return `${TESTNET_EXPLORER}/#/block/${height}`
    case 'mainnet':
      return `${MAINNET_EXPLORER}/#/block/${height}`
    case 'mijin':
      return `${MIJIN_EXPLORER}/#/block/${height}`
  }
}

function explorerHashUrl (hash, type, network) {
}

function explorerNamespaceUrl (namespace, network) {
  switch (network) {
    case 'testnet':
      return `${TESTNET_EXPLORER}/#/browse/${namespace}`
    case 'mainnet':
      return `${MAINNET_EXPLORER}/#/browse/${namespace}`
    case 'mijin':
      return `${MIJIN_EXPLORER}/#/browse/${namespace}`
  }
}

function explorerMosaicUrl (fqn, network) {
  switch (network) {
    case 'testnet':
      return `${TESTNET_EXPLORER}/#/browse/${fqn}`
    case 'mainnet':
      return `${MAINNET_EXPLORER}/#/browse/${fqn}`
    case 'mijin':
      return `${MIJIN_EXPLORER}/#/browse/${fqn}`
  }
}

function explorerAccountUrl (address, network) {
  switch (network) {
    case 'testnet':
      return `${TESTNET_EXPLORER}/#/account/${address}`
    case 'mainnet':
      return `${MAINNET_EXPLORER}/#/account/${address}`
    case 'mijin':
      return `${MIJIN_EXPLORER}/#/account/${address}`
  }
}

export {
  levyTypeToName,
  supplyTypeToName,
  mosaicIdToFqn,
  modeToName,
  nemValue,
  txTypeToName,
  modificationTypeToName,
  publicKeyToAddress,
  explorerBlockUrl,
  explorerHashUrl,
  explorerNamespaceUrl,
  explorerMosaicUrl,
  explorerAccountUrl,
  versionToNetworkName,
  nemtime2iso8601,
  rebuildMosaicProps,
  sanitizeAddress,
  splitAddressByHyphen
}
