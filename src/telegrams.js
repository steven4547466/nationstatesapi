const https = require('https')
const EventEmitter = require('events')
class Telegrammer extends EventEmitter{
  /**
   * Creates a new instance
   * @param {String} cKey The client key of the telegram
   * @param {String} tgID The telegram's ID
   * @param {String} sKey The telegram's secret key
   * @param {boolean} [recruitment = false] true if the telegram is a recruitment telegram defaults to false
   * @param {nsapi.js Client} client The nsapi.js Client
   */
  constructor(cKey, tgID, sKey, recruitment = false, client){
    super()
    if(!cKey || typeof cKey !== "string") throw new Error("Telegram client key is missing or is not a string.")
    if(!tgID || typeof tgID !== "string") throw new Error("Telegram ID is missing or is not a string.")
    if(!sKey || typeof sKey !== "string") throw new Error("Telegram secret key is missing or is not a string.")
    if(typeof recruitment !== "boolean") throw new Error("Telegram type is now a boolean")
    if(!this.checkClient(client)) throw new Error("Client provided for telegram is not a nsapi.js client")
    this.clientKey = cKey
    this.tgID = tgID
    this.secretKey = sKey
    this.client = client
    this.forRecruitment = recruitment
    this.nationQueue = []
    this.nationsSent = []
    this.intervals = setInterval(() => {
      let nations = await this.client.getNewNations()
      this.nationQueue = this.nationQueue.concat(nations)
    }, 1000 * 60 * 20)
    this.sendTelegram()
    if(recruitment){
      this.intervals = setInterval(() => {
        this.sendTelegram()
      }, 1000 * 60 * 3)
    }else{
      this.intervals = setInterval(() => {
        this.sendTelegram()
      }, 1000 * 30)
    }
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
   * Sends the telegram
   */
  async sendTelegram(){
    if(this.queue.length <= 0){
      let nations = await this.client.getNewNations()
      this.nationQueue = nations
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