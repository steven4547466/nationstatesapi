/** Typedefs
 * 
 * @typedef {Object} AccountDetails
 * @param {String} [password] The password of the account (nation)
 * @param {Nation} [name] The name of the account (nation)
 * 
 * @typedef {Object} ClientOptions
 * @param {boolean} [login = false] Whether or not to login to a user account (required for use of private shards)
 * @param {AccountDetails} [account] The account details to login (required when logging in)
 * 
 * The status of a member in the World Assembly, must be one of:
 * * WA Delegate
 * * WA Member
 * * Non-member
 * @typedef {String} UNStatus
 * 
 * The status of a nation's civil rights, must be one of:
 * * Outlawed
 * * Unheard Of
 * * Rare
 * * Few
 * * Some
 * * Below Average
 * * Average
 * * Good
 * * Very Good
 * * Excellent
 * * Superb
 * * World Benchmark
 * * Excessive
 * * Frightening
 * * Widely Abused
 * @typedef {String} NationCivilFreedomsStrings
 * 
 * The status of a nation's civil rights, must be one of:
 * * Imploded
 * * Basket Case
 * * Fragile
 * * Weak
 * * Struggling
 * * Developing
 * * Reasonable
 * * Fair
 * * Good
 * * Strong
 * * Very Strong
 * * Thriving
 * * Powerhouse
 * * All Consuming
 * * Frightening
 * @typedef {String} NationEconomicFreedomsStrings
 * 
 * The status of a nation's civil rights, must be one of:
 * * Outlawed
 * * Unheard Of
 * * Rare
 * * Few
 * * Some
 * * Below Average
 * * Average
 * * Good
 * * Very Good
 * * Excellent
 * * Superb
 * * World Benchmark
 * * Excessive
 * * Widely Abused
 * * Corrupted
 * @typedef {String} NationPoliticalFreedomsStrings
 * 
 * @typedef {Object} NationFreedoms
 * @param {NationCivilFreedomsStrings} CIVILRIGHTS
 * @param {NationEconomicFreedomsStrings} ECONOMY
 * @param {NationPoliticalFreedomsStrings} POLITICALFREEDOM
 * 
 * @typedef {Object} NationGovernmentAllocations
 * @param {String} ADMINISTRATION The percent of allocated funds to administration
 * @param {String} DEFENCE The percent of allocated funds to defence
 * @param {String} EDUCATION The percent of allocated funds to education
 * @param {String} ENVIRONMENT The percent of allocated funds to environmental beauty
 * @param {String} HEALTHCARE The percent of allocated funds to health care
 * @param {String} COMMERCE The percent of allocated funds to commerce
 * @param {String} INTERNATIONALAID The percent of allocated funds to international aid
 * @param {String} LAWANDORDER The percent of allocated funds to law and order
 * @param {String} PUBLICTRANSPORT The percent of allocated funds to public transportation
 * @param {String} SOCIALEQUALITY The percent of allocated funds to social equality
 * @param {String} SPIRITUALITY The percent of allocated funds to spirituality
 * @param {String} WELFARE The percent of allocated funds to welfare
 * 
 * @typedef {Object} FreedomScores
 * @param {String} CIVILRIGHTS The nation's civil rights raw score
 * @param {String} ECONOMY: The nation's economic raw score
 * @param {String} POLITICALFREEDOM: The nation's political freedom raw score
 * 
 * @typedef {Object<String, String>} NationCauseOfDeaths
 * 
 * @typedef {Object} NationObject
 * @param {String} NAME The name of the nation
 * @param {String} TYPE The type of the nation
 * @param {String} FULLNAME The full name of the nation
 * @param {String} MOTTO The motto of the nation
 * @param {String} CATEGORY The category of the nation
 * @param {UNStatus} UNSTATUS The status of this nation in the World Assembly
 * @param {NationFreedoms} FREEDOM The nation's freedom statuses
 * @param {Region} REGION The region this nation belongs to
 * @param {String} POPULATION The population of the nation
 * @param {String} TAX The tax rate of the nation
 * @param {String} ANIMAL The national animal of the nation
 * @param {String} CURRENCY The currency of the nation
 * @param {String} DEMONYM The first demonym of the nation
 * @param {String} DEMONYM2 The second demonym of the nation
 * @param {String} DEMONYM2PLURAM The plural form of the demonym
 * @param {String} FLAG A url to the flag of the nation
 * @param {String} MAJORINDUSTRY The major industry of the nation
 * @param {String} GOVTPRIORITY The priority of the governmet of the nation
 * @param {NationGovernmentAllocations} GOVT The allocation of funds of the nation
 * @param {String} FOUNDED A string that states how long ago the nation was founded, ex "2 years, 157 days ago"
 * @param {String} FIRSTLOGIN The timestamp of the nation's first login
 * @param {String} LASTLOGIN The timestamp of the nation's last login
 * @param {String} LASTACTIVITY A string that states how long ago the nation took an action, ex "5 days ago"
 * @param {FreedomScores} FREEDOMSCORES The freedom scores of the nation
 * @param {String} PUBLICSECTOR The public sector score (This is undocumented in the NS API)
 * @param {NationCauseOfDeaths} DEATHS The causes of death in the nation
 * @param {String} LEADER The leader of the nation
 * @param {String} CAPITAL The capital of the nation
 * @param {String} RELIGION The religion of the nation
 * @param {String} FACTBOOKS The number of factbooks the nation has
 * @param {String} DISPATCHES The number of dispatches the nation has
 * @param {String} DBID (This is undocumented in the NS API)
 * 
 * @typedef {Object} RegionObject
 * @param {Region} NAME The name of the region
 * @param {FactbookEntry[]} FACTBOOK The factbooks of the region
 * @param {String} NUMNATIONS The number of nations in the region
 * @param {Nation[]} NATIONS The nations in the region
 * @param {Nation} DELEGATE The delegate of the region
 * @param {String} DELEGATEVOTES The weight of the delegate's votes in the world assembly
 * @param {String} DELEGATEAUTH The delegate authority
 * @param {Nation} FOUNDER The founder of the region
 * @param {String} FOUNDERAUTH The founder authority
 * @param {Officer[]} OFFICERS The officers of the region
 * @param {String} POWER The power of the region, ex "Low"
 * @param {String} FLAG A URL to the flag of the region
 * @param {Region[]} EMBASSIES The embassies of the region
 * @param {String} LASTUPDATE The last update to the region as a timestamp
 */

const https = require('https')
const EventEmitter = require('events')
let Telegram = null
const convert = require('xml-js').xml2js
const enmap = require('enmap')
const library = require('./library.js')
const authorities = {
  X: "Executive",
  W: "World Assembly",
  A: "Appearance",
  B: "Border Control",
  C: "Communications",
  E: "Embassies",
  P: "Polls"
}

class Client extends EventEmitter{
  /**
   * Creates a new nsapi.js client
   * @param {ClientOptions} [ClientOptions] Options for the Client
   */
  constructor(options = {}){
    super()
    this.setConstants()
    if(!options.login) options.login = false
    this.options = options
    let {
      login
    } = options
    this.loginb = login
    if(options.account){
      var account = options.account
    }
    if(login){
      this.db = new enmap({
        name:"autoLogin",
        autoFetch:true,
        fetchAll:true
      })
      this.loggedIn = false
      this.db.defer.then(async () => {
        this.autoLogin = await this.db.get('key') || undefined
        this.pin = await this.db.get('pin') || undefined
        if(!account) throw new Error("You must provide account info when you login.")
        if(!account.password && !this.autoLogin) throw new Error("Missing password and no auto login. You may remove your password from your account object after you login once. (Must be reused if you change your password.)")
        if(!account.name) throw new Error("Missing nation name.")
        account.name = account.name.toLowerCase().split(" ").join("_")
        this.account = account
        await this.login(account)
      })
    }
  }

  /**
   * Set the Client options
   * @param {ClientOptions} ClientOptions Options for the Client
   */
  set options(options){
    this.opts = options
  }

  /**
   * Set the account details
   * @param {AccountDetails} account The account
   */
  set account(account){
    this.acc = account
  }

  /**
   * Set a telegram
   * @param {Telegam} tg A telegram, must be from the telegram class
   */
  set telegrams(tg){
    if(!this.tgs) this.tgs = []
    this.tgs.push(tg)
  }

  /**
   * Sets the user's pin
   * @param {number} pin The pin returned from the X-Pin header
   */
  set pin(pin){
    let f = async () => {
      this.userPin = pin
      await this.db.set('pin', pin)
    }
    f()
  }

  /**
   * Sets the auto login
   * @param {String} key The auto login string returned by the X-Autologin header
   */
  set autoLogin(key){
    let f = async () => {
      this.aLogin = key
      await this.db.set('key', key)
      }
    f()
  }

  /**
   * Logged in?
   * @param {boolean} b True for logged in false if otherwise
   */
  set loggedIn(b){
    this.logged = b
  }

  /**
   * Get the client options
   * @returns {Object}
   */
  get options(){
    return this.opts
  }

  /**
   * Get the account details
   * @returns {AccountDetails}
   */
  get account(){
    return this.acc
  }

  /**
   * Get all the telegrams
   * @returns {(Array|null)}
   */
  get telegrams(){
    return this.tgs || null
  }

  /**
   * Gets the user's pin
   * @returns {number}
   */
  get pin(){
    return this.userPin
  }

  /**
   * Gets the auto login
   * @returns {String}
   */
  get autoLogin(){
    return this.aLogin
  }

  /**
   * Logged in?
   * @returns {boolean}
   */
  get loggedIn(){
    return this.logged
  }

  // Telegram API Start

   /**
   * Creates a new telegram
   * @param {String} cKey The client key of the telegram
   * @param {String} tgID The telegram's ID
   * @param {String} sKey The telegram's secret key
   * @param {TelegramOptions} [opts = {}] The options
   */
  addTelegram(cKey, tgID, sKey, opts){
    if(!Telegram){
      Telegram = require('./telegrams.js')
    }
    this.telegrams = new Telegram(cKey, tgID, sKey, opts, this)
  }

  /**
   * Removes a telegram
   * @param {String} tgID The telegram's ID
   */
  removeTelegram(tgID){
    let telegrams = this.telegrams
    if(!telegrams) return
    let index = 0
    for(let i = 0; i < telegrams.length; i++){
      if(telegrams[i].tgID == tgID){ 
        telegrams[i].destroy()
        index = i
        break
      }
    }
    this.tgs.splice(index, 1)
  }

  // Telegram API End

  //Nation API Start

  /**
   * Get information on a nation
   * @param {Nation} nation The nation name
   * @param {Array} [opts = []] What to include (default mostly everything). Can include one or several of these: admirable, animal, animaltrait, banner, banners, capital, category, census (can be configured, see docs for more info), crime, currency, customleader, customcapital, customreligion, dbid, deaths, demonym, demonym2, demonym2plural, dispatches, dispatchlist, endorsements, factbooks, factbooklist, firstlogin, flag, founded, foundedtime, freedom, fullname, gavote, gdp, govt, govtdesc, govtpriority, happenings, income, industrydesc, influence, lastactivity, lastlogin, leader, legislation, majorindustry, motto, name, notable, policies, poorest, population, publicsector, rcensus, region, religion, richest, scvote, sectors, sensibilities, tax, tgcanrecruit, tgcancampaign, type, wa, wabadges, wcensus, zombie
   * @returns {Promise<Object<String, NationObject>>} 
   */
  getNation(nation, opts = []){
    return new Promise(async (resolve, reject) => {
      if(!nation){ 
        return reject("No nation provided")
      }
      nation = nation.toLowerCase().split(" ").join("_")
      for(let i = 0; i < opts.length; i++){
        if(typeof opts[i] == "object"){
          opts[i] = `census${Object.keys(opts[i]).length > 0 ? library.flattenCensus(opts[i]) : ''}`
          break
        }
      }
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?nation=${nation}${opts.length > 0 ? `&q=${opts.join("+")}` : ''}`,
        headers: {
          'User-Agent': this.USERAGENT
        },
        method: 'GET'
      }
  
      let data = ''
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting nation, status code: ${res.statusCode}`)
        if(res.statusCode == 404) return reject("Not found")
        res.on('data', (d) => {
          data += d
        })
  
        res.on('end', async () => {
          let obj = {NATION:{}}
          let o = await convert(data).elements[0].elements
          for(let i = 0; i < o.length; i++){
            if(!o[i].elements) continue
            obj.NATION[o[i].name] = o[i].elements.length == 1 && o[i].name != "CENSUS" ? (o[i].elements[0].text ? o[i].elements[0].text : o[i].elements[0].cdata) : (o[i].name != "DEATHS" && o[i].name != "CENSUS") ? library.flattenResponse(o[i].elements) : o[i].name != "CENSUS" ? library.getDeathData(o[i].elements) : library.getCensusData(o[i].elements)
          }
          resolve(obj)
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        reject(e)
      })
      req.end()
    })
  }

  /**
   * Get your dossier (must be logged in)
   * @param {number} [from = undefined]
   * @returns {Promise<Object>}
   */
  async getDossier(from = undefined){
    if(!this.loginb) throw new Error("You must be logged in to do this")
    await this.db.defer
    let account = this.account
    return new Promise(async (resolve, reject) => {
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?nation=${account.name}&q=dossier${from ? `;from=${from}` : ``}`,
        headers: {
          'User-Agent': this.USERAGENT,
          'X-Password': account.password || "",
          'X-AutoLogin': this.autoLogin || 0,
          'X-Pin': this.pin || 0
        },
        method: 'GET'
      }
      let data = ''
      await library.wait(650)
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting dossier, status code: ${res.statusCode}`)
        if(res.statusCode == 403){ 
          this.emit(this.events.ERROR, `Pin, Password and Auto login declined. Please provide a new password to login.`)
          return reject("Failed to login")
        }
        if(res.statusCode == 404) return reject("Not found")
        if(res.statusCode == 200) this.setPinAndAutoLogin(res.headers)
        res.on('data', (d) => {
          data += d
        })

        res.on('end', async () => {
          let obj = {}
          let o = await convert(data).elements[0].elements
          obj[o[0].name] = library.flattenDossier(o[0].elements)
          resolve(obj)
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  /**
   * Get your issues (must be logged in)
   * @returns {Promise<Issue[]>}
   */
  async getIssues(){
    if(!this.loginb) throw new Error("You must be logged in to do this")
    await this.db.defer
    let account = this.account
    return new Promise(async (resolve, reject) => {
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?nation=${account.name}&q=issues`,
        headers: {
          'User-Agent': this.USERAGENT,
          'X-Password': account.password || "",
          'X-AutoLogin': this.autoLogin || 0,
          'X-Pin': this.pin || 0
        },
        method: 'GET'
      }
        
      let data = ''
      await library.wait(650)
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting issues, status code: ${res.statusCode}`)
        if(res.statusCode == 403){ 
          this.emit(this.events.ERROR, `Pin, Password and Auto login declined. Please provide a new password to login.`)
          return reject("Failed to login")
        }
        if(res.statusCode == 404) return reject("Not found")
        if(res.statusCode == 200) this.setPinAndAutoLogin(res.headers)
        res.on('data', (d) => {
          data += d
        })

        res.on('end', async () => {
          let obj = {}
          let o = await convert(data).elements[0].elements
          obj[o[0].name] = library.flattenIssues(o[0].elements)
          resolve(obj)
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  /**
   * Get your issue summary (must be logged in)
   * @returns {Promise<Object>}
   */
  async getIssueSummary(){
    if(!this.loginb) throw new Error("You must be logged in to do this")
    await this.db.defer
    let account = this.account
    return new Promise(async (resolve, reject) => {
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?nation=${account.name}&q=issuesummary`,
        headers: {
          'User-Agent': this.USERAGENT,
          'X-Password': account.password || "",
          'X-AutoLogin': this.autoLogin || 0,
          'X-Pin': this.pin || 0
        },
        method: 'GET'
      }
        
      let data = ''
      await library.wait(650)
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting issue summary, status code: ${res.statusCode}`)
        if(res.statusCode == 403){ 
          this.emit(this.events.ERROR, `Pin, Password and Auto login declined. Please provide a new password to login.`)
          return reject("Failed to login")
        }
        if(res.statusCode == 404) return reject("Not found")
        if(res.statusCode == 200) this.setPinAndAutoLogin(res.headers)
        res.on('data', (d) => {
          data += d
        })

        res.on('end', async () => {
          let obj = {}
          let o = await convert(data).elements[0].elements
          obj[o[0].name] = library.flattenIssueSummary(o[0].elements)
          resolve(obj)
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  /**
   * Get your next issue time as a string (must be logged in)
   * @returns {Promise<String>}
   */
  async getNextIssue(){
    if(!this.loginb) throw new Error("You must be logged in to do this")
    await this.db.defer
    let account = this.account
    return new Promise(async (resolve, reject) => {
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?nation=${account.name}&q=nextissue`,
        headers: {
          'User-Agent': this.USERAGENT,
          'X-Password': account.password || "",
          'X-AutoLogin': this.autoLogin || 0,
          'X-Pin': this.pin || 0
        },
        method: 'GET'
      }
        
      let data = ''
      await library.wait(650)
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting next issue time, status code: ${res.statusCode}`)
        if(res.statusCode == 403){ 
          this.emit(this.events.ERROR, `Pin, Password and Auto login declined. Please provide a new password to login.`)
          return reject("Failed to login")
        }
        if(res.statusCode == 404) return reject("Not found")
        if(res.statusCode == 200) this.setPinAndAutoLogin(res.headers)
        res.on('data', (d) => {
          data += d
        })

        res.on('end', async () => {
          let o = await convert(data).elements[0].elements
          resolve(o[0].elements[0].text)
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  /**
   * Get your next issue time as an integer (must be logged in)
   * @returns {Promise<number>}
   */
  async getNextIssueTime(){
    if(!this.loginb) throw new Error("You must be logged in to do this")
    await this.db.defer
    let account = this.account
    return new Promise(async (resolve, reject) => {
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?nation=${account.name}&q=nextissuetime`,
        headers: {
          'User-Agent': this.USERAGENT,
          'X-Password': account.password || "",
          'X-AutoLogin': this.autoLogin || 0,
          'X-Pin': this.pin || 0
        },
        method: 'GET'
      }
        
      let data = ''
      await library.wait(650)
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting next issue time, status code: ${res.statusCode}`)
        if(res.statusCode == 403){ 
          this.emit(this.events.ERROR, `Pin, Password and Auto login declined. Please provide a new password to login.`)
          return reject("Failed to login")
        }
        if(res.statusCode == 404) return reject("Not found")
        if(res.statusCode == 200) this.setPinAndAutoLogin(res.headers)
        res.on('data', (d) => {
          data += d
        })

        res.on('end', async () => {
          let o = await convert(data).elements[0].elements
          resolve(parseInt(o[0].elements[0].text))
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }
  
  /**
   * Get your notices (must be logged in)
   * @param {Number} [from = undefined]
   * @returns {Promise<Object<String, Notice[]>>}
   */
  async getNotices(from = undefined){
    if(!this.loginb) throw new Error("You must be logged in to do this")
    await this.db.defer
    let account = this.account
    return new Promise(async (resolve, reject) => {
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?nation=${account.name}&q=notices${from ? `;from=${from}` : ``}`,
        headers: {
          'User-Agent': this.USERAGENT,
          'X-Password': account.password || "",
          'X-AutoLogin': this.autoLogin || 0,
          'X-Pin': this.pin || 0
        },
        method: 'GET'
      }
      let data = ''
      await library.wait(650)
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting notices, status code: ${res.statusCode}`)
        if(res.statusCode == 403){ 
          this.emit(this.events.ERROR, `Pin, Password and Auto login declined. Please provide a new password to login.`)
          return reject("Failed to login")
        }
        if(res.statusCode == 404) return reject("Not found")
        if(res.statusCode == 200) this.setPinAndAutoLogin(res.headers)
        res.on('data', (d) => {
          data += d
        })

        res.on('end', async () => {
          let obj = {}
          let o = await convert(data).elements[0].elements
          if(!o[0].elements) return reject("No notices.")
          obj[o[0].name] = library.flattenNotices(o[0].elements)
          resolve(obj)
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  /**
   * Ping your nation (must be logged in)
   * @returns {Promise<Boolean>}
   */
  async pingNation(){
    if(!this.loginb) throw new Error("You must be logged in to do this")
    await this.db.defer
    let account = this.account
    return new Promise(async (resolve, reject) => {
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?nation=${account.name}&q=ping`,
        headers: {
          'User-Agent': this.USERAGENT,
          'X-Password': account.password || "",
          'X-AutoLogin': this.autoLogin || 0,
          'X-Pin': this.pin || 0
        },
        method: 'GET'
      }
      await library.wait(650)
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Pinging nation, status code: ${res.statusCode}`)
        if(res.statusCode == 403){ 
          this.emit(this.events.ERROR, `Pin, Password and Auto login declined. Please provide a new password to login.`)
          resolve(false)
        }
        if(res.statusCode == 404) return reject("Not found")
        if(res.statusCode == 200){
          this.setPinAndAutoLogin(res.headers)
          resolve(true)
        }
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  /**
   * Get your region dossier (must be logged in)
   * @param {number} [from = undefined]
   * @returns {Promise<Object>}
   */
  async getRegionDossier(from = undefined){
    if(!this.loginb) throw new Error("You must be logged in to do this")
    await this.db.defer
    let account = this.account
    
    return new Promise(async (resolve, reject) => {
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?nation=${account.name}&q=rdossier${from ? `;from=${from}` : ``}`,
        headers: {
          'User-Agent': this.USERAGENT,
          'X-Password': account.password || "",
          'X-AutoLogin': this.autoLogin || 0,
          'X-Pin': this.pin || 0
        },
        method: 'GET'
      }
      let data = ''
      await library.wait(650)
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting rdossier, status code: ${res.statusCode}`)
        if(res.statusCode == 403){ 
          this.emit(this.events.ERROR, `Pin, Password and Auto login declined. Please provide a new password to login.`)
          return reject("Failed to login")
        }
        if(res.statusCode == 404) return reject("Not found")
        if(res.statusCode == 200) this.setPinAndAutoLogin(res.headers)
        res.on('data', (d) => {
          data += d
        })

        res.on('end', async () => {
          let obj = {}
          let o = await convert(data).elements[0].elements
          obj[o[0].name] = library.flattenDossier(o[0].elements)
          resolve(obj)
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  /**
   * Get your unread notifications (must be logged in)
   * @returns {Promise<Object<String, Unread>>}
   */
  async getUnread(){
    if(!this.loginb) throw new Error("You must be logged in to do this")
    await this.db.defer
    let account = this.account
    return new Promise(async (resolve, reject) => {
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?nation=${account.name}&q=unread`,
        headers: {
          'User-Agent': this.USERAGENT,
          'X-Password': account.password || "",
          'X-AutoLogin': this.autoLogin || 0,
          'X-Pin': this.pin || 0
        },
        method: 'GET'
      }
      let data = ''
      await library.wait(650)
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting unread notifications, status code: ${res.statusCode}`)
        if(res.statusCode == 403){ 
          this.emit(this.events.ERROR, `Pin, Password and Auto login declined. Please provide a new password to login.`)
          return reject("Failed to login")
        }
        if(res.statusCode == 404) return reject("Not found")
        if(res.statusCode == 200) this.setPinAndAutoLogin(res.headers)
        res.on('data', (d) => {
          data += d
        })

        res.on('end', async () => {
          let obj = {}
          let o = await convert(data).elements[0].elements
          obj[o[0].name] = library.flattenUnread(o[0].elements)
          resolve(obj)
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  // Nation API End

  // Region API Start

  /**
   * Get information on a region
   * @param {Region} region The region name
   * @param {Array} [opts = []] What to include (default mostly everything). census (can be configured, see docs), censusranks, dbid, delegate, delegateauth, delegatevotes, dispatches, embassies, embassyrmb, factbook, flag, founded, foundedtime, founder, founderauth, gavote, happenings, history, lastupdate, messages (can be configured see docs), name, nations, numnations, officers, poll, power, scvote, tags, wabadges, zombie
   * @returns {Promise<Object<String, RegionObject>>} 
   */
  getRegion(region, opts = []){
    return new Promise(async (resolve, reject) => {
      region = region.toLowerCase().split(" ").join("_")
      for(let i = 0; i < opts.length; i++){
        if(typeof opts[i] == "object"){
          if(!opts[i].type) return reject("No type provided in object.")
          if(opts[i].type == 'census'){
            opts[i] = `census${Object.keys(opts[i]).length > 1 ? library.flattenCensus(opts[i]) : ''}`
          }else if(opts[i].type == 'messages'){
            opts[i] = `messages${Object.keys(opts[i]).length > 1 ? library.flattenMessages(opts[i]) : ''}`
          }
          break
        }
      }
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?region=${region}${opts.length > 0 ? `&q=${opts.join("+")}` : ''}`,
        headers: {
          'User-Agent': this.USERAGENT
        },
        method: 'GET'
      }

      let data = ''
      await library.wait(650)
      
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting region, status code: ${res.statusCode}`)
        if(res.statusCode == 404) return reject("Not found")
      
        res.on('data', (d) => {
          data += d
        })
  
        res.on('end', async () => {
          let obj = {}
          let o = await convert(data).elements[0].elements
          for(let i = 0; i < o.length; i++){
            if(!o[i].elements) continue
            if(o[i].elements.length == 1 && o[i].elements[0].text){ 
              let arr = o[i].elements[0].text.split("_")
              for(let i = 0; i < arr.length; i++){
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
              }
              o[i].elements[0].text = arr.join(" ")
            }
            obj[o[i].name] = o[i].elements.length == 1 && o[i].name != "CENSUS" && o[i].name != "NATIONS" && o[i].name != "OFFICERS" && o[i].name != "FACTBOOK" && o[i].name != "MESSAGES" && o[i].name != "DISPATCHES" && o[i].name != "EMBASSIES" && o[i].name != "TAGS" && o[i].name != "HAPPENINGS" && o[i].name != "HISTORY" && o[i].name != "POLL" ? (o[i].elements[0].text ? o[i].elements[0].text : o[i].elements[0].cdata) : o[i].name != "CENSUS" && o[i].name != "NATIONS" && o[i].name != "OFFICERS" && o[i].name != "FACTBOOK" && o[i].name != "MESSAGES" && o[i].name != "DISPATCHES" && o[i].name != "EMBASSIES" && o[i].name != "TAGS" && o[i].name != "HAPPENINGS" && o[i].name != "HISTORY" && o[i].name != "POLL" ? library.flattenResponse(o[i].elements) : o[i].name != "NATIONS" && o[i].name != "OFFICERS" && o[i].name != "FACTBOOK" && o[i].name != "MESSAGES" && o[i].name != "DISPATCHES" && o[i].name != "EMBASSIES" && o[i].name != "TAGS" && o[i].name != "HAPPENINGS" && o[i].name != "HISTORY" && o[i].name != "POLL" ? library.getCensusData(o[i].elements) : o[i].name != "OFFICERS" && o[i].name != "FACTBOOK" && o[i].name != "MESSAGES" && o[i].name != "DISPATCHES" && o[i].name != "EMBASSIES" && o[i].name != "TAGS" && o[i].name != "HAPPENINGS" && o[i].name != "HISTORY" && o[i].name != "POLL" ? library.formatNations(o[i].elements[0].text) : o[i].name != "FACTBOOK" && o[i].name != "MESSAGES" && o[i].name != "DISPATCHES" && o[i].name != "EMBASSIES" && o[i].name != "TAGS" && o[i].name != "HAPPENINGS" && o[i].name != "HISTORY" && o[i].name != "POLL" ? library.formatOfficers(o[i].elements) : o[i].name != "MESSAGES" && o[i].name != "DISPATCHES" && o[i].name != "EMBASSIES" && o[i].name != "TAGS" && o[i].name != "HAPPENINGS" && o[i].name != "HISTORY" && o[i].name != "POLL" ? library.formatFactbook(o[i].elements) : o[i].name != "DISPATCHES" && o[i].name != "EMBASSIES" && o[i].name != "TAGS" && o[i].name != "HAPPENINGS" && o[i].name != "HISTORY" && o[i].name != "POLL" ? library.formatMessages(o[i].elements) : o[i].name != "EMBASSIES" && o[i].name != "TAGS" && o[i].name != "HAPPENINGS" && o[i].name != "HISTORY" && o[i].name != "POLL" ? o[i].elements[0].text.split(",") : o[i].name != "HAPPENINGS" && o[i].name != "HISTORY" && o[i].name != "POLL" ? library.formatToArray(o[i].elements) : o[i].name != "POLL" ? library.flattenHappenings(o[i].elements) : library.flattenPoll(o[i].elements)
          }
          resolve(obj)
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  // Region API End

  // World API Start

  /**
   * Gets new nations
   * @param {number} [limit = 50] The limit to return
   * @returns {Promise<Array>}
   */
  getNewNations(limit = 50){
    return new Promise(async (resolve, reject) => {
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: '/cgi-bin/api.cgi?q=newnations',
        headers: {
          'User-Agent': this.USERAGENT
        },
        method: 'GET'
      }
  
      let data = ''
      await library.wait(650)
      
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting new nations, status code: ${res.statusCode}`)
        if(res.statusCode == 404) return reject("Not found")
      
        res.on('data', (d) => {
          data += d
        })
  
        res.on('end', async () => {
          let d = await convert(data).elements[0].elements[0].elements[0].text.split(",")
          let arr = d
          arr.length = limit
          resolve(arr)
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  /**
   * Gets new nations
   * @returns {Promise<Array>}
   */
  getRefoundedNations(){
    return new Promise(async (resolve, reject) => {
      let arr = (await this.getWorld([{type:'happenings', filter:['founding']}])).HAPPENINGS
      arr = arr.filter(t => t.TEXT.toLowerCase().includes('refounded')).map(t => t.TEXT.split("@@")[1])
      resolve(arr)
    })
  }

  /**
   * Gets all nations
   * @returns {Promise<Array>}
   */
  getNations(){
    return new Promise(async (resolve, reject) => {
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: '/cgi-bin/api.cgi?q=nations',
        headers: {
          'User-Agent': this.USERAGENT
        },
        method: 'GET'
      }
  
      let data = ''
      await library.wait(650)
      
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting nations, status code: ${res.statusCode}`)
        if(res.statusCode == 404) return reject("Not found")
      
        res.on('data', (d) => {
          data += d
        })
  
        res.on('end', async () => {
          let d = await convert(data).elements[0].elements[0].elements[0].text.split(",")
          let arr = d
          resolve(arr)
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  /**
   * Get data from world shards
   * @param {Array} [opts = []] Can include one or several banner (configurable see docs), census (configurable see docs), censusid, censusdesc (configurable see docs), censusname (configurable see docs), censusranks (configurable see docs), censusscale (configurable see docs), censustitle (configurable see docs), dispatch (configurable see docs), dispatchlist (configurable see docs), faction, factions, featuredregion, happenings (configurable see docs), lasteventid, numnations, numregions, poll (configurable see docs), regions, regionsbytag (configurable see docs), tgqueue
   * @returns {Promise<Object>}
   */
  getWorld(opts = []){
    return new Promise(async (resolve, reject) => {
      opts = library.formatOptionsWorld(opts)
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?q=${opts}`,
        headers: {
          'User-Agent': this.USERAGENT
        },
        method: 'GET'
      }

      let data = ''
      await library.wait(650)
      
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting world data, status code: ${res.statusCode}`)
        if(res.statusCode == 404) return reject("Not found")
      
        res.on('data', (d) => {
          data += d
        })
  
        res.on('end', async () => {
          let obj = {}
          let o = await convert(data).elements[0].elements
          if(o == undefined) return reject("Not found")
          for(let i = 0; i < o.length; i++){
            if(!o[i].elements) continue
            obj[o[i].name] = o[i].elements.length == 1 && o[i].name != "CENSUS" && o[i].name != "BANNERS" && o[i].name != "DISPATCH" && o[i].name != "DISPATCHLIST" && o[i].name != "FACTION" && o[i].name != "FACTIONS" && o[i].name != "HAPPENINGS" && o[i].name != "POLL" ? (o[i].elements[0].text ? o[i].elements[0].text.includes(',') ? o[i].elements[0].text.split(',') : o[i].elements[0].text : o[i].elements[0].cdata) : o[i].name != "CENSUS" && o[i].name != "BANNERS" && o[i].name != "DISPATCH" && o[i].name != "DISPATCHLIST" && o[i].name != "FACTION" && o[i].name != "FACTIONS" && o[i].name != "HAPPENINGS" && o[i].name != "POLL" ? library.flattenResponse(o[i].elements) : o[i].name != "BANNERS" && o[i].name != "DISPATCH" && o[i].name != "DISPATCHLIST" && o[i].name != "FACTION" && o[i].name != "FACTIONS" && o[i].name != "HAPPENINGS" && o[i].name != "POLL" ? library.getWorldCensusData(o[i].elements) : o[i].name != "DISPATCH" && o[i].name != "DISPATCHLIST" && o[i].name != "FACTION" && o[i].name != "FACTIONS" && o[i].name != "HAPPENINGS" && o[i].name != "POLL" ? library.flattenBanners(o[i].elements) : o[i].name != "DISPATCHLIST" && o[i].name != "FACTION" && o[i].name != "FACTIONS" && o[i].name != "HAPPENINGS" && o[i].name != "POLL" ? library.flattenDispatch(o[i].elements) : o[i].name != "FACTION" && o[i].name != "FACTIONS" && o[i].name != "HAPPENINGS" && o[i].name != "POLL" ? library.flattenDispatchList(o[i].elements) : o[i].name != "FACTIONS" && o[i].name != "HAPPENINGS" && o[i].name != "POLL" ? library.flattenFaction(o[i].elements) : o[i].name != "HAPPENINGS" && o[i].name != "POLL" ? library.flattenFactions(o[i].elements) : o[i].name != "POLL" ? library.flattenHappenings(o[i].elements) : library.flattenPoll(o[i].elements)
          }
          resolve(obj)
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  // World API End

  // World Assembly API Start

  /**
   * Gets new nations
   * @param {Array} [opts = []] First entry will define what council to look at (1 for General or 2 for Security). Can include one or several of numnations, numdelegates, delegates, members, happenings, proposals, resolution, voters*, votetrack*, dellog*, delvotes*, lastresolution. * marked can only be called in conjunction with resolution. 
   * @returns {Promise<Object>}
   */
  getWorldAssembly(opts = []){
    return new Promise(async (resolve, reject) => {
      let wa = Number.isInteger(parseInt(opts[0])) ? parseInt(opts[0]) : 1
      opts = library.formatOptionsWA(opts)
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?wa=${wa}&q=${opts}`,
        headers: {
          'User-Agent': this.USERAGENT
        },
        method: 'GET'
      }

  
      let data = ''
      await library.wait(650)
      
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Getting WA Data, status code: ${res.statusCode}`)
        if(res.statusCode == 404) return reject("Not found")
      
        res.on('data', (d) => {
          data += d
        })
  
        res.on('end', async () => {
          let obj = {}
          let o = await convert(data).elements[0].elements
          for(let i = 0; i < o.length; i++){
            if(!o[i].elements) continue
            obj[o[i].name] = o[i].elements.length == 1 && o[i].name != "DELEGATES" && o[i].name != "MEMBERS" && o[i].name != "HAPPENINGS" && o[i].name != "PROPOSALS" && o[i].name != "RESOLUTION" ? (o[i].elements[0].text ? o[i].elements[0].text : o[i].elements[0].cdata) : o[i].name != "HAPPENINGS" && o[i].name != "PROPOSALS" && o[i].name != "RESOLUTION" ? o[i].elements[0].text.split(",") : o[i].name != "PROPOSALS" && o[i].name != "RESOLUTION" ? library.flattenHappeningsWA(o[i].elements) : o[i].name != "RESOLUTION" ? library.flattenProposals(o[i].elements) : library.flattenResolution(o[i].elements)
          }
          resolve(obj)
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  // World Assembly API End


  // Login Start

  /**
   * Login to nationstates to access private shards. After you login once, you can remove your password from your code until you change it.
   * @param {AccountDetails} account
   */
  login(account){
    return new Promise(async (resolve, reject) => {
      const options = {
        hostname: 'www.nationstates.net',
        port: 443,
        path: `/cgi-bin/api.cgi?nation=${account.name}&q=ping`,
        headers: {
          'User-Agent': this.USERAGENT,
          'X-Password': account.password || "",
          'X-AutoLogin': this.autoLogin || 0,
          'X-Pin': this.pin || 0
        },
        method: 'GET'
      }
      await library.wait(650)
        
      const req = https.request(options, (res) => {
        this.emit(this.events.DEBUG, `Logging in, status code: ${res.statusCode}`)
        if(res.statusCode == 403){ 
          this.emit(this.events.ERROR, `Pin, Password and Auto login declined. Please provide a new password to login.`)
          return reject("Failed to login")
        }
        if(res.statusCode == 404) return reject("Not found")
        if(res.statusCode == 200){
          this.setPinAndAutoLogin(res.headers)
          this.emit(this.events.READY)
          resolve()
        }
      })
      
      req.on('error', (e) => {
        this.client.emit(this.events.ERROR, e)
        return reject(e)
      })
      req.end()
    })
  }

  /**
   * Sets the pin and auto login
   * @param {Object} headers The headers from the response
   */
  setPinAndAutoLogin(headers){
    if(headers['x-pin']) this.pin = headers['x-pin']
    if(headers['x-autologin']) this.autoLogin = headers['x-autologin']
  }

  // Login End

  /**
   * Sets the Client constants
   */
  setConstants(){
    this.events = {
      DEBUG: 'debug',
      ERROR: 'error',
      READY: 'ready'
    }
    this.USERAGENT = 'nsapi.js@1.0.1'
  }

  // Static methods

  /**
   * Bi-directional authority parsing
   * @param {String|String[]} element 
   * @returns {String|String[]} A string of authority codes or an array of authority strings
   */
  static parseAuthorities(element){
    if(typeof element == "string"){
      let arr = element.split('')
      for(let i = 0; i < arr.length; i++){
        arr[i] = authorities[arr[i]]
      }
      return arr
    }else if(typeof element == "object"){
      let str = ''
      for(let i = 0; i < element.length; i++){
        for(let j = 0; j < Object.keys(authorities).length; j++){
          if(authorities[Object.keys(authorities)[j]] == element[i]){
            str += Object.keys(authorities)[j]
            break
          }
        }
      }
      return str
    }
  }
  
}

module.exports.Client = Client

  // This didnt work. If you can get it working, please submit a pull request
  // What it returned: [
  //   {
  //     type: 'element',
  //     name: 'ISSUE',
  //     attributes: { id: '42', choice: '1' },
  //     elements: [ [Object] ]
  //   }
  // ]

  // /**
  //  * Get your unread notifications (must be logged in)
  //  * @returns {Promise<Object>}
  //  */
  // async addressIssue(issue, option){
  //   if(!issue) throw new Error("Missing issue id")
  //   if(!option) throw new Error("Missing option")
  //   if(!this.loginb) throw new Error("You must be logged in to do this")
  //   await this.db.defer
  //   let account = this.account
  //   return new Promise(async (resolve, reject) => {
  //     const options = {
  //       hostname: 'www.nationstates.net',
  //       port: 443,
  //       path: `/cgi-bin/api.cgi`,
  //       headers: {
  //         'User-Agent': this.USERAGENT,
  //         'X-Password': account.password || "",
  //         'X-AutoLogin': this.autoLogin || 0,
  //         'X-Pin': this.pin || 0
  //       },
  //       method: 'POST'
  //     }
  //     let data = ''
  //     const req = https.request(options, (res) => {
  //       this.emit(this.events.DEBUG, `Addressing issue, status code: ${res.statusCode}`)
  //       if(res.statusCode == 403){ 
        //   this.emit(this.events.ERROR, `Pin, Password and Auto login declined. Please provide a new password to login.`)
        //   return reject("Failed to login")
        // }
  //       if(res.statusCode == 200) this.setPinAndAutoLogin(res.headers)
  //       res.on('data', (d) => {
  //         data += d
  //       })

  //       res.on('end', async () => {
  //         let obj = {}
  //         let o = await convert(data).elements[0].elements
  //         resolve(o)
  //       })
  //     })
      
  //     req.on('error', (e) => {
  //       this.client.emit(this.events.ERROR, e)
  //       return reject(e)
  //     })
  //     req.write(`nation=${account.name}&c=issue&issue=${issue}&option=${option}`)
  //     req.end()
  //   })
  // }