  /*
 * I've never had a test file before,
 * this is most likely not how you're
 * supposed to do it, but it works.
 */

let p = require('../../.secrets/password.json')
let Client = require('../src/index.js')
let client = new Client()
let client2 = new Client({login: true, account:{name:"southern mesopotamia"}})
async function test(){
  // console.log(await client.getNations())
  // console.log(await client.getNewNations())
  // console.log(await client.getNewNations(5))
  // await client.getNation("southern mesopotamia")
  // console.log(await client.getNation("southern mesopotamia"))
  // console.log(await client.getNation("southern mesopotamia", ['animal']))
  // console.log(await client.getNation("southern mesopotamia", ['animal', 'religion']))
  // console.log(await client.getNation("southern mesopotamia", ['deaths']))
  // console.log(await client.getNation("southern mesopotamia", ['tgcanrecruit']))
  // console.log(await client.getNation("southern mesopotamia", ['census']))
  // await client.getNation("southern mesopotamia", ['census'])
  // console.log(await client.getNation("southern mesopotamia", [{scale:['22', '44'], mode:['score', 'rank', 'prank']}]))
  // console.log(await client.getNation("southern mesopotamia", [{scale:['22', '44'], mode:[{from:"1", to:new Date().getTime()}]}])) // using from/to will retun only score regardless.
  // client.addTelegram('xxxxx', 'xxxxx', 'xxxxxx', true)
  // console.log(await client.getRegion("The Milkiest Way"))
  // console.log((await client.getRegion("The Milkiest Way", ['delegate'])).DELEGATE)
  // console.log((await client.getRegion("The Milkiest Way", ['census'])).CENSUS)
  // console.log((await client.getRegion("The Milkiest Way", [{type: 'census', scale:['22', '44'], mode:['score', 'rank']}])).CENSUS)
  // console.log((await client.getRegion("The Milkiest Way", [{type: 'census', scale:['22', '44'], mode:[{from:"1", to:new Date().getTime()}]}])).CENSUS) 
  // console.log((await client.getRegion("The Milkiest Way", ['messages'])).MESSAGES)
  // console.log((await client.getRegion("The Milkiest Way", [{type: 'messages', limit: 1}])).MESSAGES)
  // console.log(Client.parseAuthorities((await client.getRegion("The Milkiest Way")).DELEGATEAUTH))
  // console.log(Client.parseAuthorities(['World Assembly', 'Executive', 'Communications']))
  // console.log((await client.getWorld([{type:'banner', banner:['c1', 'p9', 't12']}])))
  // console.log((await client.getWorld(['census'])))
  // console.log((await client.getWorld([{type: 'census', scale:['22', '44']}])))
  // console.log((await client.getWorld(['censusid'])))
  // console.log((await client.getWorld(['censusdesc'])))
  // console.log((await client.getWorld([{type:'censusdesc', scale:['22']}])))
  // console.log((await client.getWorld([{type:'censusdesc', scale:['44']}])))
  // console.log((await client.getWorld([{type:'dispatch', dispatchid:'1'}])))
  // console.log((await client.getWorld(['dispatchlist'])))
  // console.log((await client.getWorld([{type:'dispatchlist', dispatchauthor:'Southern Mesopotamia'}])))
  // console.log((await client.getWorld([{type:'dispatchlist', dispatchauthor:'Southern Mesopotamia', dispatchcategory:'Factbook'}])))
  // console.log((await client.getWorld([{type:'dispatchlist', dispatchauthor:'Southern Mesopotamia', dispatchcategory:'Factbook:Overview'}])))
  // console.log((await client.getWorld([{type:'dispatchlist', dispatchauthor:'Southern Mesopotamia', dispatchcategory:'Factbook:Overview', dispatchsort:'best'}])))
  // console.log((await client.getWorld([{type:'faction', id:'1'}])))
  // console.log((await client.getWorld(['factions'])))
  // console.log((await client.getWorld(['featuredregion'])))
  // console.log((await client.getWorld(['happenings'])))
  // console.log((await client.getWorld([{type:'happenings', view:{nation:["Southern Mesopotamia"]}}])))
  // console.log((await client.getWorld([{type:'happenings', view:{nation:["Southern Mesopotamia", "Raxacoricofallapitorius"]}}])))
  // console.log((await client.getWorld([{type:'happenings', view:{region:["The Milkiest Way"]}}])))
  // console.log((await client.getWorld([{type:'happenings', view:{region:["The Milkiest Way", "Testlandia"]}}])))
  // console.log((await client.getWorld([{type:'happenings', filter:["law"]}])))
  // console.log((await client.getWorld([{type:'happenings', filter:["law", "rmb"]}])))
  // console.log((await client.getWorld(['lasteventid'])))
  // console.log((await client.getWorld(['numnations'])))
  // console.log((await client.getWorld([{type:'poll', pollid:'1'}])))
  // console.log((await client.getWorld(['regions'])))
  // console.log((await client.getWorld([{type:'regionsbytag', tags:['socialist', '-minuscule']}])))
  // console.log((await client.getWorld(['tgqueue'])))
  // console.log((await client.getWorldAssembly(['2', 'numnations'])))
  // console.log((await client.getWorldAssembly(['numnations'])))
  // console.log((await client.getWorldAssembly(['numdelegates'])))
  // console.log((await client.getWorldAssembly(['delegates'])))
  // console.log((await client.getWorldAssembly(['members'])))
  // console.log((await client.getWorldAssembly(['happenings'])))
  console.log((await client.getWorldAssembly(['proposals'])))
  client2.on('ready', async () =>{
    // console.log((await client2.getDossier()).DOSSIER)
    // console.log((await client2.getDossier(1)).DOSSIER)
    // console.log((await client2.getIssues()).ISSUES)
    // console.log((await client2.getIssueSummary()).ISSUESUMMARY)
    // console.log((await client2.getNextIssue())) 
    // console.log((await client2.getNextIssueTime()))
    // console.log((await client2.getNotices()).NOTICES)
    // console.log((await client2.getNotices(new Date().getTime() - (1000 * 60 * 60 * 72))).NOTICES)
    // console.log((await client2.pingNation()))
    // console.log((await client2.getRegionDossier()).RDOSSIER)
    // console.log((await client2.getRegionDossier(1)).RDOSSIER)
    // console.log(await client2.getUnread())
    
  })
}
client.on('debug', console.log)
client.on('error', console.error)
client2.on('debug', console.log)
client2.on('error', console.error)
test()