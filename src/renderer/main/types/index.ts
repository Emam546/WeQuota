/* eslint-disable @typescript-eslint/no-explicit-any */
// API Response Types

export interface UsageData {
  consumptionStartDate: string
  consumptionEndDate: string
  contentDownPercentage: number
  contentUpPercentage: number
  gamingPercentage: number
  othersPercentage: number
  socialPercentage: number
  streamingVideoPercentage: number
  webPercentage: number
  consumptionPercentage: number
}

export interface UsageResponse {
  header: {
    retCode: string
    validateResults: any[]
  }
  body: {
    lastCycle: UsageData
    last7Days: UsageData
  }
}

export interface FreeUnitBeanDetail {
  initialAmount: number
  currentAmount: number
  measureUnit: string
  effectiveTime: number
  expireTime: number
  expireTimeCz: number
  originType: string
  offeringName: string
  isGroup: boolean
  serviceNumber: string
  itemCode: string
  remainingDaysForRenewal: number
}

export interface QuotaData {
  tabId: string
  freeUnitType: string
  freeUnitTypeName: string
  tabName: string
  measureUnit: string
  offerName: string
  total: number
  used: number
  remain: number
  actualRemain: number
  effectiveTime: number
  expireTime: number
  groupOrder: string
  iconImage: string
  freeUnitTypeId: string
  originUnit: string
  havePoint: boolean
  freeUnitBeanDetailList: FreeUnitBeanDetail[]
}

export interface QuotaResponse {
  header: {
    retCode: string
    validateResults: any[]
  }
  body: QuotaData[]
}

export interface BalanceDetail {
  balanceInstanceId: string
  amount: string
  initialAmount: string
  effectiveTime: number
  expireTime: number
}

export interface BalanceInfo {
  balanceType: string
  balanceTypeName: string
  totalAmount: string
  depositFlag: string
  refundFlag: string
  currencyId: string
  balanceDetail: BalanceDetail[]
}

export interface CreditInfo {
  totalCreditAmount: string
  totalUsageAmount: string
  totalRemainAmount: string
  currencyId: string
}

export interface BalanceResponse {
  header: {
    retCode: string
    validateResults: any[]
  }
  body: {
    acctId: string
    balanceInfo: BalanceInfo[]
    creditInfo: CreditInfo[]
    outstandingInfo: any[]
  }
}

export interface IndividualInfo {
  firstName: string
  lastName: string
  gender: string
  birthday: number
}

export interface CertificationInfo {
  certficateId: string
  certType: string
  certId: string
}

export interface ContactPerson {
  contactPersonType: string
  officePhone: string
  priority: number
}

export interface AddressInfo {
  usageAddrId: string
  addrId: string
  addrClass: string
  addrType: string
  addr1: string
  addr3: string
  addr4: string
}

export interface CustomerResponse {
  header: {
    retCode: string
    validateResults: any[]
  }
  body: {
    custId: string
    custCode: string
    custType: string
    custClass: string
    individualInfo: IndividualInfo
    certificationInfo: CertificationInfo
    contactPersonList: ContactPerson[]
    addressInfoList: AddressInfo[]
    bankCards: any[]
  }
}

export interface DemoData {
  usage: UsageResponse
  quota: QuotaResponse
  balance: BalanceResponse
  customer: CustomerResponse
}
