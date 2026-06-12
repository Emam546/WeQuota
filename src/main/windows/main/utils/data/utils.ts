import axios from 'axios'
import { ApiResponse } from '..'
interface G<T> {
  body: T
  token: string
}
fetch('https://my.te.eg/echannel/service/besapp/base/rest/busiservice/cbs/ar/queryBalance', {
  headers: {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.6',
    channelid: '702',
    'content-type': 'application/json',
    csrftoken: '32F65F30B4580CDE56E8AED0C35F49AFD5D47356604E88C5',
    delegatorsubsid: '',
    deviceid: '2106173d825f920a2f2040f1234dfa2e24bb9a74c0e1bf9776829bab4143a65f',
    iscoporate: 'false',
    ismobile: 'false',
    isselfcare: 'true',
    languagecode: 'en-US',
    reqbodysign:
      '2b6e6bafdf5481538d4205c2e028c1a6adef18a179dda2613fb9c0a139680726afdcaf94f8c3ef2b3fbb7e0bda3f4c1918cb2e9b4aed07d1bf24b5adb351ab28',
    reqheadersign:
      '01a46581666f190959af29d20ad51dcbeab4c832b5cf5b498c9d3a8e46039f22ab2d7d232d7f343e6746a2ddf30ddbfca1d9fd36149cdfa64a54f06773ef6131',
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
      'b4093cc6b4b341474474d4fcf6a77052834b3742098e5c0bc5c6326d87b25951dea7bceee4462123085353004a94c21b067eae9c9a88e3bb7a80ef8589d11919',
    'x-client-time': '1781301884384',
    'x-init-time': '1778730791216',
    cookie:
      'dtCookie=v_4_srv_51_sn_0375A8396A41707A006A4C46CF619C86_perc_100000_ol_0_mul_1_app-3A6032d7aeebe38554_1; TS016876e8=01eb1995cf0f4e89c68d2336e33a5f1a8a27235a13d0a8f6c3d55efd30de74a1aed486847cbb0219ee882f483742a4a535b4602358; echannelweb_route=d99a5eb8065bed12cd7e45d8c8128f3d; echannelapp_route=4fffb7ff727fd7f514815ed4e4b83095; TS01fa9144=010aa23b1d17f9310e6ac3215325cadb25a585cbfe4aebaeb4968978c61deefef50df35df90c675e444d636d2b9402effaa28acc20cd63ae440a64bcb8fbaa2df7b692caf7e3d827aba0c9bf4744fd19eac6419d5a; indiv_login_token=B0992BC1D11B03CAC7DECCFFB015AF137FFBFB2990C1D0E5; TS01bba117=010aa23b1d663012426ae6214c003eef9161dba6bc1beee353cbcde470602c9b2b8ef7300bdd149ab359ae0196e85aa2e7cce9c11631018a1086f24c02027c2cce4f59ee631af9893151deb6086ced75dec9b13a4044f5dde6629f4eca5437530f47faea0a',
    Referer: 'https://my.te.eg/echannel/'
  },
  body: '{"acctId":"11050094534"}',
  method: 'POST'
})
export default async function makePostRequest<T, Data = unknown>(
  url: string,
  info: G<Data>
): Promise<ApiResponse<T>> {
  const data = await axios.post<ApiResponse<T>>(
    url,
    {
      ...info.body
    },
    {
      headers: {
        Cookie: `indiv_login_token=${info.token};`,
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.6',
        channelid: '702',
        'content-type': 'application/json',
        csrftoken: '1A53A74C26496BF1C4424AE4FA1E4EE09EECAC33BAF035F2',
        delegatorsubsid: '',
        deviceid: '2106173d825f920a2f2040f1234dfa2e24bb9a74c0e1bf9776829bab4143a65f',
        iscoporate: 'false',
        ismobile: 'false',
        isselfcare: 'true',
        languagecode: 'en-US',
        reqbodysign:
          '6a6d8ebf39942dcf7d898e068334f2fb99e036eac9363db02d3285648c8ef20c0f147eae487c6dc26ec1e5d3cad504e5adf09e68f42709801e4036251df47d3f',
        reqheadersign:
          '39f4a1d01a25bd3877176d62d3cbb2156914bc8f54a7fcb55448dd091b139a7ff5dcfced162bddba035bb115f0418337293d9c58eaba7bf56a23bc62e1e48075',
        'sec-ch-ua': '"Brave";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        systemtype: '',
        whitereqbodysign:
          '2f35f7bb4b07c0623690fd6a2d8c71991dc48878dbe8bb7de1d758aa858d8ed6e801754a747b5e01d9cc2c1665f2e4686d25f9cfcdd1256911c95306fef4eeab',
        whitereqheadersign:
          '40c223200a0193818f99b17c45d5b8c8dbaa9f22e2bc6cda4ee31a0f5ce0bdabf8b641c8ef164203f2fcd944c586871173444c83de914aa2b53de8e39865a3e0',
        'x-client-time': '1781282009527',
        'x-init-time': '1778730791216',
        Referer: 'https://my.te.eg/echannel/'
      }
    }
  )

  return data.data
}
