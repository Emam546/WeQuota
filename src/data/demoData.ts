import { DemoData } from '../types'

export const demoData: DemoData = {
  usage: {
    header: {
      retCode: '0',
      validateResults: []
    },
    body: {
      lastCycle: {
        consumptionStartDate: '2026-05-24',
        consumptionEndDate: '2026-06-11',
        contentDownPercentage: 4.64,
        contentUpPercentage: 0.18,
        gamingPercentage: 0.31,
        othersPercentage: 0.81,
        socialPercentage: 64.26,
        streamingVideoPercentage: 15.18,
        webPercentage: 14.63,
        consumptionPercentage: 100
      },
      last7Days: {
        consumptionStartDate: '2026-06-05',
        consumptionEndDate: '2026-06-11',
        contentDownPercentage: 5.28,
        contentUpPercentage: 0.17,
        gamingPercentage: 0.24,
        othersPercentage: 0.74,
        socialPercentage: 68.76,
        streamingVideoPercentage: 9.32,
        webPercentage: 15.48,
        consumptionPercentage: 100
      }
    }
  },
  quota: {
    header: {
      retCode: '0',
      validateResults: []
    },
    body: [
      {
        tabId: '7',
        freeUnitType: 'ADSL_USAGE_PREPAID',
        freeUnitTypeName: 'Home Internet',
        tabName: 'Home Internet',
        measureUnit: '1109',
        offerName: 'Super 1 speed (300 GB)',
        total: 300.0,
        used: 208.33,
        remain: 91.67,
        actualRemain: 91.67,
        effectiveTime: 1779634758000,
        expireTime: 1782162000000,
        groupOrder: '6',
        iconImage: 'home',
        freeUnitTypeId: 'C_TED_Primary_Fixed_Data',
        originUnit: '1106',
        havePoint: false,
        freeUnitBeanDetailList: [
          {
            initialAmount: 300.0,
            currentAmount: 91.67,
            measureUnit: '1109',
            effectiveTime: 1779634758000,
            expireTime: 1782162000000,
            expireTimeCz: 1782151200000,
            originType: 'Main Quota',
            offeringName: 'Super 1 speed (300 GB)',
            isGroup: false,
            serviceNumber: 'FBB473862133',
            itemCode: 'C_TED_Primary_Fixed_Data',
            remainingDaysForRenewal: 10
          }
        ]
      }
    ]
  },
  balance: {
    header: {
      retCode: '0',
      validateResults: []
    },
    body: {
      acctId: '11050094534',
      balanceInfo: [
        {
          balanceType: 'C_MAIN_ACCOUNT',
          balanceTypeName: 'PPS_MainAccount',
          totalAmount: '86030',
          depositFlag: 'N',
          refundFlag: '1',
          currencyId: '1046',
          balanceDetail: [
            {
              balanceInstanceId: '703000000016467594',
              amount: '86030',
              initialAmount: '0',
              effectiveTime: 1662030776000,
              expireTime: 2114380800000
            }
          ]
        }
      ],
      creditInfo: [
        {
          totalCreditAmount: '0',
          totalUsageAmount: '0',
          totalRemainAmount: '0',
          currencyId: '1046'
        }
      ],
      outstandingInfo: []
    }
  },
  customer: {
    header: {
      retCode: '0',
      validateResults: []
    },
    body: {
      custId: '11035589192',
      custCode: '11022134206',
      custType: '1',
      custClass: '1',
      individualInfo: {
        firstName: 'امام',
        lastName: 'فؤاد محمد عاشور',
        gender: '1',
        birthday: 128988000000
      },
      certificationInfo: {
        certficateId: '11018190123',
        certType: '1',
        certId: '2740******2939'
      },
      contactPersonList: [
        {
          contactPersonType: '5',
          officePhone: '1016385480',
          priority: 0
        }
      ],
      addressInfoList: [
        {
          usageAddrId: '11043383789',
          addrId: '11043383789',
          addrClass: 'U',
          addrType: '6010506003',
          addr1: '20171221095715',
          addr3: '2017122109571502',
          addr4: 'الرياض الشقف'
        }
      ],
      bankCards: []
    }
  }
}
