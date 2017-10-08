import Mock from 'mockjs'

const bookListData = {
  url: 'http://apis.juhe.cn/goodbook/catalog?key=d89ed133151c0011a104f4082fd2ad40',
  data: {
    'result|17': [{
      'id|+1': 242,
      'catalog': '@ctitle(2, 4)'
    }]
  }
}

const bookDetailsData = {
  url: 'http://apis.juhe.cn/goodbook/query?key=d89ed133151c0011a104f4082fd2ad40',
  data: {
    'result': {
      'data|10': [{
        'title': '@ctitle(5, 15)',
        'catalog|1-5': '@region ',
        'tags|5-10': '@cword(3-8) ',
        'sub1': '@ctitle(5, 15)',
        'sub2': '@cparagraph()',
        'img': 'http://apis.juhe.cn/goodbook/img/379cdafe13f92d62e99388182a6d08ec.jpg',
        'reading': '@natural(1, 10000)人阅读',
        'online': '京东商城:http://book.jd.com/10483893.html 当当网:http://product.dangdang.com/product.aspx?product_id=21020821 苏宁易购:http://www.suning.com/emall/prd_10052_22001_-7_1006212_.html ',
        'bytime': '2013年4月28日'
      }],
      'pn': 0,
      'rn|1-30': 10
    }
  }
}

function mockListData (list) {
  Mock.mock(list.url, list.data)
}

function mockDetailData (list) {
  const initUrl = list.url
  let id = 242
  let pn = 0
  let rn = 10
  let url = initUrl + '&catalog_id=' + id + '&pn=' + pn + '&rn=' + rn
  for (let i = 0; i < 17; i++) {
    Mock.mock(url, list.data)
    for (let j = 0; j < 30; j++) {
      Mock.mock(url, list.data)
      pn += 10
      // 重置参数
      url = initUrl + '&catalog_id=' + id + '&pn=' + pn + '&rn=' + rn
    }
    // 重置参数
    id++
    pn = 0
    url = initUrl + '&catalog_id=' + id + '&pn=' + pn + '&rn=' + rn
  }
}
mockListData(bookListData)
mockDetailData(bookDetailsData)
