import CryptoJS  from "crypto-js"
import moment from 'moment'
import { sort_ASCII, join_params } from '@/utils/utils'
import Vue from 'vue'

const appSecrect = '57e0a1e0945dd1fcfff47c53afa73228'

export default function fetchTOP (options) {
  const globalOptions = {
    app_key: '25413606',
    sign_method: 'md5',
    format: 'json',
    v: '2.0',
    timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
  }
  const params = Object.assign(globalOptions, options);
  const concated = join_params(sort_ASCII(params));
  const forMD5 = `${appSecrect}${concated}${appSecrect}`
  const md5Data = CryptoJS.enc.Hex.stringify(CryptoJS.MD5(forMD5)).toUpperCase();
  return Vue.http({
    url: '/api',
    params: Object.assign(params, {
      sign: md5Data
    }),
    method: 'get'
  })
}