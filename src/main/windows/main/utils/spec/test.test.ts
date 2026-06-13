import axios from 'axios'

test('test nothing', async () => {
  const res = await axios.post(
    'https://my.te.eg/echannel/service/besapp/base/rest/busiservice/cbs/ar/queryBalance',
    { acctId: '11050094534' },
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.6',
        channelid: '702',
        'content-type': 'application/json',
        csrftoken: 'E0B7DC0648825194E9F9DB497A13A0A58487E72053C1C12F',
        delegatorsubsid: '',
        deviceid: '2106173d825f920a2f2040f1234dfa2e24bb9a74c0e1bf9776829bab4143a65f',
        iscoporate: 'false',
        ismobile: 'false',
        isselfcare: 'true',
        languagecode: 'en-US',
        reqbodysign:
          '86b6479f5b18429ceff3ce83bb92cbc5f7a52e129ff3ec3d55a750d9b07a528a4a3e70495e2a89ad2467a809dca616370f2a4589f4eda76bee97899987c2de49',
        reqheadersign:
          '94c5c2f602a92e4dbb89bd9c5d4eb44658377945bf1f0f08863d7666ad87cb3c845c0d4c044d75a98ac8076d377314a585b262f0f7e2d0ee9926b893e60848d7',
        'sec-ch-ua': '"Brave";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        systemtype: '',
        whitereqbodysign:
          '505553a08638f336878e2f9d2038fe973faedbd66e05440d1ec31a7327e6bc3538bbda432da5908d2bd145f661c0693aeb146f56acee6fbaed6e1d87c9af7737',
        whitereqheadersign:
          'b268d654f151d96a9a482c30d5ab3130379400c28f7bc741dc45a13173967be77fa9c9e4f1b702960bc77a52e5297c7951a8af298abde4e706da08ada74f2071',
        'x-client-time': '1781344616705',
        'x-init-time': '1778730791216',
        cookie:
          'dtCookie=v_4_srv_51_sn_0375A8396A41707A006A4C46CF619C86_perc_100000_ol_0_mul_1_app-3A6032d7aeebe38554_1; TS016876e8=01eb1995cf5072a2ec49319f507b413be3bdcef4db400293be50355021514d7723154b73b13c01298845ee986eb23aeb416bb0ed05; echannelweb_route=d99a5eb8065bed12cd7e45d8c8128f3d; echannelapp_route=67d1682cf6f7a231dd3576c7eca62461; TS01fa9144=010aa23b1d53760f384ede0ed09745ee4fa5e43b033e3fae10fecdc396e64a08001d6c063923fbe0fa1b93f4826a47e3f675b721a8399cf3b4634a631c066e802eafa437da39bcfe72c3caa7e4cd98e058fb58678c; indiv_login_token=3001895C2F32F9A9E62C5AE7512477F5F1C609C71E96ABDD; TS01bba117=010aa23b1de1bee35e465b17ad908265f5839312621beee353cbcde470602c9b2b8ef7300bdd149ab359ae0196e85aa2e7cce9c11631018a1086f24c02027c2cce4f59ee631af9893151deb6086ced75dec9b13a403961d54d296bd858bfd5972c1cd97698',
        Referer: 'https://my.te.eg/echannel/'
      }
    }
  )
  console.log(res.data)
})
//3001895C2F32F9A9E62C5AE7512477F5F1C609C71E96ABDD
//E0B7DC0648825194E9F9DB497A13A0A58487E72053C1C12F