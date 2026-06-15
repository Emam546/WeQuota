import axios from 'axios'
import { ApiResponse } from '..'
interface G<T> {
  body: T
  utoken: string
  token: string
}

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
        Cookie: `indiv_login_token=${info.utoken};`,
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.6',
        channelid: '702',
        'content-type': 'application/json',
        csrftoken: info.token,
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
