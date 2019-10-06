const https = require('https')
const EventEmitter = require('events')
class Telegrammer extends EventEmitter{
  /**
   * Creates a new instance
   * @param {String} cKey The client key of the telegram
   * @param {String} tgID The telegram's ID
   * @param {String} sKey The telegram's secret key
   * @param {Object} [opts = {}] The options
   * @param {boolean} [opts.recruitment = false]
   * @param {Integer} [opts.interval = 180000 || 30000]
   * @param {Array} [opts.sendTo = ['new nations']]
   * @param {nsapi.js Client} client The nsapi.js Client
   */
  constructor(cKey, tgID, sKey, opts = {}, client){
    super()
    if(!opts.recruitment) opts.recruitment = false
    if(!opts.interval) opts.interval = opts.recruitment ? 180000 : 30000
    if(opts.recruitment && opts.interval < 180000) throw new Error("Recruitment telegrams can only be sent every 3 minutes or more")
    if(opts.interval < 30000) throw new Error("You cannot send a telegram faster than once per 30 seconds")
    if(!opts.sendTo) opts.sendTo = ['new nations']
    if(!cKey || typeof cKey !== "string") throw new Error("Telegram client key is missing or is not a string.")
    if(!tgID || typeof tgID !== "string") throw new Error("Telegram ID is missing or is not a string.")
    if(!sKey || typeof sKey !== "string") throw new Error("Telegram secret key is missing or is not a string.")
    if(typeof opts.recruitment !== "boolean") throw new Error("Telegram type is not a boolean")
    if(!this.checkClient(client) && !opts.testing) throw new Error("Client provided for telegram is not a nsapi.js client")
    this.clientKey = cKey
    this.tgID = tgID
    this.secretKey = sKey
    this.client = client
    this.forRecruitment = opts.recruitment
    this.nationQueue = []
    this.nationsSent = []
    this.sendTo = opts.sendTo
    this.sendTelegram()
    this.intervals = setInterval(() => {
      this.sendTelegram()
    }, opts.interval)
  }

  /**
   * Gets the client
   * @returns {nsapi.js Client}
   */
  get client(){
    return this.nsapiClient
  }

  /**
   * Gets the telegram's client key
   * @returns {String}
   */
  get clientKey(){
    return this.cKey
  }

  /**
   * Gets the telegram's id
   * @returns {String}
   */
  get tgID(){
    return this.telegramID
  }

  /**
   * Gets the telegram's secret key
   * @returns {String}
   */
  get secretKey(){
    return this.sKey
  }

  /**
   * Gets the current intervals running
   * @returns {Array}
   */
  get intervals(){
    return this.ints
  }

  /**
   * Sets the telegram's client instance
   */
  set client(client){
    this.nsapiClient = client
  }

  /**
   * Sets the telegram's client key
   */
  set clientKey(key){
    this.cKey = key
  }

  /**
   * Sets the telegram's id
   */
  set tgID(id){
    this.telegramID = id
  }

  /**
   * Sets the telegram's secret key
   */
  set secretKey(key){
    this.sKey = key
  }

  set intervals(interval){
    if(!this.ints) this.ints = []
    this.ints.push(interval)
  }

  /**
   * Gets the queue
   * @returns {Array<String>}
   */
  get queue(){
    return this.nationQueue
  }

  /**
   * Gets the previously telegrammed nations
   * @returns {Array<String>}
   */
  get sentTo(){
    return this.nationsSent
  }

  /**
   * Ensures the client is a proper instance of a nsapi.js Client
   * @param {nsapi.js Client} client
   */
  checkClient(client){
    const c = require.cache[require.resolve('nsapi.js')]
    return c && client instanceof c.exports.Client
  }

  /**
   * Checks if the nation next in line to be telegrammed has previously been telegrammed.
   */
  checkSent(){
    return new Promise((resolve, reject) =>{
      let done = false
      while(!done){
        if(this.sentTo.includes(this.queue[0])){
          this.nationQueue.shift()
        }else{
          done = true
        }
      }
      resolve()
    })
  }

  /**
   * Checks if the nation next in line can be telegrammed.
   */
  checkCanTelegram(){
    return new Promise(async (resolve, reject) =>{
      let done = false
      while(!done){
        if(!((await this.client.getNation(this.queue[0], [this.forRecruitment ? 'tgcanrecruit' : 'tgcancampaign']))[this.forRecruitment ? 'TGCANRECRUIT' : 'TGCANCAMPAIGN'])){
          this.nationQueue.shift()
        }else{
          done = true
        }
      }
      resolve()
    })
  }

  /**
   * Shuffles an array
   */
  shuffleArray(arr){
    let currentIndex = arr.length, temporaryValue, randomIndex
    while (currentIndex != 0) {
      randomIndex = ~~(Math.random() * currentIndex)
      currentIndex--
      temporaryValue = arr[currentIndex]
      arr[currentIndex] = arr[randomIndex]
      arr[randomIndex] = temporaryValue
    }
    return arr
  }

  /**
   * Gets nations based on what the telegram options are
   */
  async getNations(){
    return new Promise(async (resolve, reject) => {
      for(let i = 0; i < this.sendTo.length; i++){
        if(typeof this.sendTo[i] == "string"){
          switch(this.sendTo[i]){
            case 'new nations':
              this.nationQueue = this.nationQueue.concat(this.shuffleArray(await this.client.getNewNations()))
              break
            case 'refounded nations':
              this.nationQueue = this.nationQueue.concat(this.shuffleArray(await this.client.getRefoundedNations()))
              break
            case 'delegates':
              this.nationQueue = this.nationQueue.concat(this.shuffleArray(((await this.client.getWorldAssembly(['delegates'])).DELEGATES)))
              break
            case 'wa members':
              this.nationQueue = this.nationQueue.concat(this.shuffleArray(((await this.client.getWorldAssembly(['members'])).MEMBERS)))
              break
          }
        }
      }
      let sendTo = this.sendTo.filter(t => typeof t == "object")
      let types = sendTo.map(t => t.type)
      if(types.indexOf('regions') != -1){
        let index = types.indexOf('regions')
        let regions = sendTo[index].regions
        if(!regions) return reject("No regions")
        for(let i = 0; i < regions.length; i++){
          let members = ((await this.client.getRegion(regions[i], ['nations'])).NATIONS).map(t => t.toLowerCase().split(' ').join('_'))
          this.nationQueue = this.nationQueue.concat(members)
        }
      }
      if(types.indexOf('tags') != -1){
        let index = types.indexOf('tags')
        let tags = sendTo[index].tags.map(t => t.toLowerCase())
        if(!tags) return reject("No tags")
        let tempregions = (await this.client.getWorld([{type:'regionsbytag', tags:tags.join(',')}])).REGIONS
        let regions = []
        for(let i = 0; i < 10; i++){
          regions.push(tempregions[~~(Math.random() * tempregions.length)])
        }
        for(let i = 0; i < regions.length; i++){
          let members = ((await this.client.getRegion(regions[i], ['nations'])).NATIONS).map(t => t.toLowerCase().split(' ').join('_'))
          this.nationQueue = this.nationQueue.concat(members)
        }
      }
      if(types.indexOf('categories') != -1){
        if(this.nationQueue.length <= 0) this.nationQueue = this.client.getNewNations()
        let index = types.indexOf('categories')
        let categories = sendTo[index].categories.map(t => t.toLowerCase())
        if(!categories) return reject("No categories")
        let nations = []
        for(let i = 0; i < this.nationQueue.length; i++){
          let category = (await this.client.getNation(this.nationQueue[i], ['category'])).CATEGORY.toLowerCase()
          if(categories.includes(category)) nations.push(this.nationQueue[i])
        }
        this.nationQueue = nations
      }
      if(types.indexOf('census') != -1){
        if(this.nationQueue.length <= 0) this.nationQueue = this.client.getNewNations()
        let index = types.indexOf('census')
        if(!sendTo[index].between) return reject("Census must have a 'between' value")
        if(!sendTo[index].id) return reject("Census must have an 'id' value")
        let arr = sendTo[index].between.split('-').map(t => Number(t))
        let nations = []
        for(let i = 0; i < this.nationQueue.length; i++){
          let nation = await this.client.getNation(this.nationQueue[i], [{scale:[sendTo[index].id], mode:['score']}])
          if(nation.CENSUS[sendTo[index].id] >= arr[0] && nation.CENSUS[sendTo[index].id] <= arr[1]){
            nations.push(this.nationQueue[i])
          }
        }
        this.nationQueue = nations
      }
      if(types.indexOf('censuses') != -1){
        if(this.nationQueue.length <= 0) this.nationQueue = this.client.getNewNations()
        let index = types.indexOf('censuses')
        for(let i = 0; i < sendTo[index].censuses.length; i++){
          if(!sendTo[index].censuses[i].between) throw new Error("Census must have a 'between' value")
          if(!sendTo[index].censuses[i].id) throw new Error("Census must have a 'id' value")
          let arr = sendTo[index].censuses[i].between.split('-').map(t => Number(t))
          let nations = []
          for(let j = 0; j < this.nationQueue.length; j++){
            let nation = await this.client.getNation(this.nationQueue[j], [{scale:[sendTo[index].censuses[i].id], mode:['score']}])
            if(nation.CENSUS[sendTo[index].censuses[i].id] >= arr[0] && nation.CENSUS[sendTo[index].censuses[i].id] <= arr[1]){
              nations.push(this.nationQueue[j])
            }
          }
          this.nationQueue = nations
        }
      }
      console.log(this.nationQueue)
      resolve()
    })
  }

  /**
   * Sends the telegram
   */
  async sendTelegram(){
    if(!this.queue[0]){
      await this.getNations()
    }
    return new Promise(async (resolve, reject) => {
      await this.checkSent()
      await this.checkCanTelegram()
      const options = {
        hostname: `www.nationstates.net`,
        port: 443,
        path: `/cgi-bin/api.cgi?a=sendTG&client=${this.clientKey}&tgid=${this.tgID}&key=${this.secretKey}&to=${this.queue[0]}`,
        headers: {
          'User-Agent': this.client.USERAGENT
        },
        method: 'GET'
      }

      this.sentTo.push(this.queue[0])
  
      let data = ''
      
      const req = https.request(options, (res) => {
        this.client.emit(this.client.events.DEBUG, `Telegram status code: ${res.statusCode}`)
        
        res.on('data', (d) => {
          data += d
        })
  
        res.on('end', async () => {
          resolve()
        })
      })
      
      req.on('error', (e) => {
        this.client.emit(this.client.events.ERROR, e)
      })
      req.end()
      this.nationQueue.shift()
    })
  }

  destroy(){
    let intervals = this.intervals
    for(let i = 0; i < intervals.length; i++) clearInterval(intervals[i])
  }
}

module.exports = Telegrammer