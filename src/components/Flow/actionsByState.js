/*
 * This object describes what to render for a request given its state:
 *
 * 'SOME_STATE': {
 *   cards: <array of names of components exported from the cardsByRequest directory>
 *   primaryAction: <name of component exported from the primaryActions directory>
 *   moreActions: <array of names of components exported from the moreActions directory>
 *   secondHeadline: <array of names of components exported from the secondHeadlines directory>
 *   excludeFromMore: <array of moreActions to only display in the dropdown>
 * }
*/
export default {
  'RES_NEW_AWAIT_PULL_SLIP': {
    cards: ['Bibliographic', 'RequesterSupplier'],
    primaryAction: 'PrintPullSlip',
    moreActions: ['SupplierMarkPullSlipPrinted', 'CannotSupply', 'SendChatMessage'],
  },
  'RES_AWAIT_PICKING': {
    cards: ['Bibliographic', 'RequesterSupplier'],
    primaryAction: 'SupplierCheckInToReshare',
    moreActions: ['PrintPullSlip', 'CannotSupply'],
  },
  'RES_CHECKED_IN_TO_RESHARE': {
    cards: ['Bibliographic', 'RequesterSupplier'],
    primaryAction: 'SupplierMarkShipped',
    moreActions: ['SupplierMarkShippedWithoutScan', 'PrintPullSlip', 'CannotSupply'],
  },
  'REQ_EXPECTS_TO_SUPPLY': {
    cards: ['Bibliographic', 'RequesterSupplier'],
    primaryAction: '',
    moreActions: ['SendChatMessage'],
  },
  'RES_IDLE': {
    cards: ['Bibliographic', 'RequesterSupplier'],
    primaryAction: '',
    moreActions: ['SendChatMessage'],
  },
};