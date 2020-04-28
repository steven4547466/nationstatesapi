/** Typedefs
 * 
 * @typedef {String} Nation A nation
 * @typedef {String} Region A region
 * 
 * @typedef {Object} Issue
 * @property {String} ID The id of the issue
 * @property {String} TITLE The title of the issue
 * @property {String} TEXT The issue's text
 * @property {Nation} AUTHOR The author of the issue
 * @property {Nation} EDITOR The editor of the issue
 * @property {String} PIC1 The first image on the newspaper header
 * @property {String} PIC2 The second image on the newspaper header
 * @property {String} OPTION_0 The first option's text
 * @property {String} OPTION_1 The second option's text
 * @property {String} [OPTION_2] The third option's text
 * @property {String} [OPTION_3] The fourth option's text
 * @property {String} [OPTION_4] The fifth option's text
 * @property {String} [OPTION_5] The sixth option's text
 * and so on, there is no set amount of options
 * 
 * @typedef {Object} Notice
 * @property {String} [NEW] Appears if the notice has been seen
 * @property {String} [OK] Whether the notice has been sent properly (This is undocumented in the NS API)
 * @property {String} TEXT The text of the notice
 * @property {String} TIMESTAMP The timestamp the notice was sent at 
 * @property {String} TITLE The title of the notice
 * @property {String} TYPE The notice's type
 * @property {String} TYPE_ICON The icon of the notice
 * @property {String} URL The URL the notice points to
 * @property {Nation|String} WHO The sender
 * @property {String} [WHO_URL] The URL of the notifier, if notifier is a nation
 * 
 * @typedef {Object} CensusData
 * @property {String} [SCORE] The raw score
 * @property {String} [RANK] World rank
 * @property {String} [RRANK] Region rank
 * @property {String} [PRANK] World rank as percent (top %)
 * @property {String} [PRRANK] Region rank as percent (top %)
 * 
 * @typedef {Object} Unread
 * @property {String} ISSUES Unread issue count
 * @property {String} TELEGRAMS Unread telegram count
 * @property {String} NOTICES Unread notice count
 * @property {String} - Unread region notifications count, property name is the region's name (I'm not sure how to jsdoc arbitrary object properties)
 * @property {String} WA Unread WA notifications count
 * @property {String} NEWS Unread news notifications count
 * 
 * @typedef {Object} Officer
 * @property {Nation} NATION The name of the officer nation
 * @property {String} OFFICE The office the nation is appointed to
 * @property {String} AUTHORITY The authority characters of the office
 * @property {String} TIME The timestamp they were appointed
 * @property {Nation} BY The nation who appointed them
 * @property {String} ORDER The office's order in rank
 * 
 * @typedef {Object} FactbookEntry
 * @property {String} TYPE The type of the content
 * @property {String} CONTENT The content of the factbook
 * 
 * The status of a message on the board, must be one of:
 * * 0, A regular message, not suppressed and viewable
 * * 1, A message that is suppressed and viewable
 * * 2, A message deleted by the author
 * * 9, A message deleted by a moderator
 * @typedef {String} MessageStatus
 * 
 * @typedef {Object} Message
 * @property {String} ID The id of the message
 * @property {String} TIMESTAMP The timestamp the message was received
 * @property {Nation} NATION The nation that lodged the message
 * @property {MessageStatus} STATUS The status of the post
 * @property {String} [SUPPRESSOR] The nation who suppressed the message, if suppressed
 * @property {String} LIKES The number of likes
 * @property {Nation[]} LIKERS An array of the nations that liked the message
 * @property {String} MESSAGE The message
 * 
 * @typedef {Object} Banner
 * @property {String} ID The id of the banner
 * @property {String} NAME The name of the banner
 * @property {String} VALIDITY The prerequisites to obtain the banner
 * 
 * @typedef {Object} Disptach
 * @property {String} TITLE The title of the dispatch
 * @property {Nation} AUTHOR The author of the dispatch
 * @property {String} CATEGORY The dispatch's category
 * @property {String} SUBCATEGORY The dispatch's subcategory
 * @property {String} CREATED The timestamp of the creation of the dispatch
 * @property {String} EDITED The timestamp of the last edit of the dispatch
 * @property {String} VIEWS The number of views
 * @property {String} SCORE The score the dispatch has received
 * @property {String} TEXT The dispatch's contents
 * 
 * @typedef {Object} DispatchListItem
 * @property {String} ID The id of the dispatch
 * @property {String} TITLE The title of the dispatch
 * @property {Nation} AUTHOR The author of the dispatch
 * @property {String} CATEGORY The dispatch's category
 * @property {String} SUBCATEGORY The dispatch's subcategory
 * @property {String} CREATED The timestamp of the creation of the dispatch
 * @property {String} EDITED The timestamp of the last edit of the dispatch
 * @property {String} VIEWS The number of views
 * @property {String} SCORE The score the dispatch has received
 * 
 * @typedef {Object} Faction
 * @property {String} NAME The name of the faction
 * @property {String} DESCRIPTION The faction's description
 * @property {String} ID The id of the faction
 * @property {String} FOUNDED The timestamp of the faction's founding
 * @property {String} REGION The region that founded the faction
 * @property {String} RNAME Not documented in NS API
 * @property {String} ENTRY Not documented in NS API
 * @property {String} SCORE The score the faction has received
 * @property {String} PRODUCTION Total number of produced things
 * @property {String} NUKES Total number of nukes produced
 * @property {String} SHIELD Total number of shields produced
 * @property {String} TARGETS Number of targets
 * @property {String} LAUNCHES Number of nuke launches
 * @property {String} INCOMING Number of incoming nukes
 * @property {String} TARGETED Number of targeted nukes
 * @property {String} STRIKES Number of nuke strikes
 * @property {String} RADIATION Radiation score
 * 
 * @typedef {Object} FactionListItem
 * @param {String} ID The id of the faction
 * @param {String} NAME The name of the faction
 * @param {String} SCORE The score of the faction
 * @param {String} [REGION] The region that founded the faction
 * 
 * @typedef {Object} Happening
 * @param {String} [ID] The id of the happening
 * @param {String} TIMESTAMP The creation data of the happening
 * @param {String} TEXT The text the happening contains
 * 
 * @typedef {Object} PollOption
 * @param {String} OPTIONTEXT The text of the option
 * @param {String} VOTES The number of votes
 * @param {Nation[]} [VOTERS] The voters, if any
 * 
 * @typedef {Object<String, PollOption>} PollOptions
 * 
 * @typedef {Object} Poll
 * @param {String} TITLE The title of the poll
 * @param {String} TEXT The text of the poll
 * @param {Region} REGION The region that hosted the poll
 * @param {String} START The start timestamp
 * @param {String} STOP The stop timestamp
 * @param {Nation} AUTHOR The nation that created the poll
 * @param {PollOptions} OPTIONS The options the poll has
 * 
 * @typedef {Object} Proposal
 * @param {String} ID The id of the proposal
 * @param {String} CATEGORY The category of the proposal
 * @param {String} CREATED The timestamp of the creation date of the proposal
 * @param {String} DESC The contents of the proposal
 * @param {String} NAME The name of the proposal
 * @param {String} OPTION The area of effect of the proposal
 * @param {Nation} PROPOSED_BY The nation that created the proposal
 * 
 * @typedef {Object} Resolution
 * @param {String} CATEGORY The category of the resolution
 * @param {String} COUNCIL The council the resoulution was proposed to
 * @param {String} COUNCILID The id of the resoultion relative to the council it was propsed to
 * @param {String} CREATED The timestamp of the creation date of the resolution
 * @param {String} DESC The contents of the resolution
 * @param {String} [ID] The id of the resoultion, if there is one
 * @param {String} IMPLEMENTED The timestamp of implementation of the resoultion
 * @param {String} NAME The name of the resolution
 * @param {String} OPTION The area of effect of the resolution
 * @param {String} [PROMOTED] The timestamp the resolution was promoted, if it was
 * @param {Nation} PROPOSED_BY The nation that created the resolution
 * @param {String} RESIDID The resolution id
 * @param {String} TOTAL_VOTES_AGAINST The number of votes against the resolution
 * @param {String} TOTAL_VOTES_FOR The number of votes for the resolution
 */

module.exports = {
  /**
   * Waits a specified amount of milliseconds
   * @param {number} ms Time to wait in milliseconds
   */
  wait: (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms)
    })
  },

  /**
   * Flattens the API response into a usuable object
   * @param {Object[]} elements An array of objects returned by the api
   * @returns {Object} The formatted object
   */
  flattenResponse: (elements) =>{
    let o = {}
    if(elements.length == 1 && elements[0].type == "text") return elements[0].text
    for(let i = 0; i < elements.length; i++){
      elements[i].elements ? o[elements[i].name] = elements[i].elements[0].text ? elements[i].elements[0].text : elements[i].elements[0].cdata : null
    }
    return o
  },

  /**
   * Flattens the dossier into a usuable object
   * @param {Object[]} elements An array of objects returned by the api
   * @returns {Object} The formatted object
   */
  flattenDossier: (elements) =>{
    let o = {}
    for(let i = 0; i < elements.length; i++){
      let o2 = []
      for(let j = 0; j < elements[i].elements.length; j++){
        o2.push(module.exports.formatNations(elements[i].elements[j].text).join(" "))
      }
      o[elements[i].name] = o2
    }
    return o
  },

  /**
   * Flattens issues into a usuable object
   * @param {Object[]} elements An array of objects returned by the api
   * @returns {Issue[]} An array of issue objects
   */
  flattenIssues: (elements) =>{
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      o2['ID'] = elements[i].attributes.id
      for(let j = 0; j < elements[i].elements.length; j++){
        if(elements[i].elements[j].name != "OPTION"){
          o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text
        }else{
          o2[`OPTION_${elements[i].elements[j].attributes.id}`] = elements[i].elements[j].elements[0].text
        }
      }
      o.push(o2)
    }
    return o
  },

  /**
   * Flattens issue summary into a usuable object
   * @param {Object[]} elements An array of objects returned by the api
   * @returns {Object} An object containing issue names mapped to their id's
   */
  flattenIssueSummary: (elements) =>{
    let o = {}
    for(let i = 0; i < elements.length; i++){
      o[elements[i].attributes.id] = elements[i].elements[0].text
    }
    return o
  },

  /**
   * Flattens notices into a usuable object
   * @param {Object[]} elements An array of objects returned by the api
   * @returns {Notice[]} An array of notice objects
   */
  flattenNotices: (elements) =>{
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      for(let j = 0; j < elements[i].elements.length; j++){
        if(elements[i].elements[j].elements) o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text
      }
      o.push(o2)
    }
    return o
  },

  /**
   * Flattens death data into a useable object
   * @param {Object[]} elements An array of objects returned by the api
   * @returns {Object} An object of percentages mapped to the cause of death
   */
  getDeathData: (elements) =>{
    let o = {}
    for(let i = 0; i < elements.length; i++){
      o[elements[i].attributes.type] = elements[i].elements[0].text
    }
    return o
  },

  /**
   * Flattens nation/region cenus data into a useable object
   * @param {Object[]} elements An array of objects returned by the api
   * @returns {Object<String, CensusData>}
   */
  getCensusData: (elements) =>{
    let o = {}
    for(let i = 0; i < elements.length; i++){
      if(elements[i].elements && elements[i].elements.length > 1){
        let o2 = {}
        for(let j = 0; j < elements[i].elements.length; j++){
          if(elements[i].elements[0].name != "POINT"){
            o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text
          }else{
            o2[elements[i].elements[j].elements[0].elements[0].text] = elements[i].elements[j].elements[1].elements[0].text
          }
        }
        o[elements[i].attributes.id] = o2
      }else{
        o[elements[i].attributes.id] = elements[i].elements[0].text ? elements[i].elements[0].text : elements[i].elements[0].elements[0].text
      }
    }
    return o
  },

  /**
   * Flattens world cenus data into a useable object
   * @param {Object[]} elements An array of objects returned by the api
   * @returns {Object<String, String>} An object with the score mapped to the census id
   */
  getWorldCensusData: (elements) =>{
    let o = {}
    for(let i = 0; i < elements.length; i++){
      if(elements[i].elements && elements[i].elements.length > 1){
        let o2 = {}
        for(let j = 0; j < elements[i].elements.length; j++){
          if(elements[i].elements[0].name != "POINT"){
            o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text
          }else{
              o2[elements[i].elements[j].elements[0].elements[0].text] = elements[i].elements[j].elements[1].elements[0].text
          }
        }
        o[elements[i].attributes.id] = o2
      }else{
        o[elements[i].attributes.id] = elements[i].elements[0].elements[0].text
      }
    }
    return o
  },

  /**
   * Flattens unread messages/notifications
   * @param {Object[]} elements An array of objects returned by the api
   * @returns {Unread} The unread data counts
   */
  flattenUnread: (elements) =>{
    let o = {}
    for(let i = 0; i < elements.length; i++){
      o[elements[i].attributes ? elements[i].attributes[Object.keys(elements[i].attributes)[0]] : elements[i].name] = elements[i].elements[0].text
    }
    return o
  },

  /**
   * Formats nations into an array of nations
   * @param {String} nations A string of nations
   * @returns {String[]} An array of nation names
   */
  formatNations: (nations) => {
    nations = nations.split(":").join(", ").split("_").join(" ").split(", ")
    for(let i = 0; i < nations.length; i++){
      let arr = nations[i].split(" ")
      for(let j = 0; j < arr.length; j++){
        arr[j] = arr[j].charAt(0).toUpperCase() + arr[j].slice(1)
      }
      nations[i] = arr.join(" ")
    }
    return nations
  },

  /**
   * Formats the officers of a region into useable objects
   * @param {Object[]} elements An array of objects returned by the api
   * @returns {Officer[]} An array of officers
   */
  formatOfficers: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      for(let j = 0; j < elements[i].elements.length; j++){
        o2[elements[i].elements[j].name] = elements[i].elements[j].name == "NATION" || elements[i].elements[j].name == "BY" ? module.exports.formatNations(elements[i].elements[j].elements[0].text)[0] : elements[i].elements[j].elements[0].text
      }
      o.push(o2)
    }
    return o
  },

  /**
   * Formats a factbook into a useable objects
   * @param {Object[]} elements An array of objects returned by the api
   * @returns {FactbookEntry[]}
   */
  formatFactbook: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      o2.TYPE = elements[i].type 
      o2.CONTENT = elements[i][Object.keys(elements[i])[1]]
      o.push(o2)
    }
    return o
  },

  /**
   * Flattens a message object into a string that the API can read
   * @param {Object} element The options object
   * @returns {String} A string of message options for the api
   */
  flattenMessages: (element) => {
    let str = ''
    let keys = Object.keys(element)
    if(keys.includes('limit')) str += ';limit=' + element.limit
    if(keys.includes('offset')) str += ';offset=' + element.offset
    if(keys.includes('fromid')) str += ';fromid=' + element.fromid
    return str
  },
  
  /**
   * Formats returned messages from the API
   * @param {Object[]} elements An array of objects returned by the api
   * @returns {Message[]} An array of messages
   */
  formatMessages: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      o2.ID = elements[i].attributes.id 
      for(let j = 0; j < elements[i].elements.length; j++){
        if(elements[i].elements[j].name != "MESSAGE"){
          o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text
        }else{
          o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].cdata
        }
      }
      o2.NATION = module.exports.formatNations(o2.NATION).join(" ")
      if(parseInt(o2.LIKES) > 0){
        o2.LIKERS = module.exports.formatNations(o2.LIKERS)
      }
      if(o2.SUPPRESSOR){
        o2.SUPPRESSOR = module.exports.formatNations(o2.SUPPRESSOR).join(" ")
      }
      o.push(o2)
    }
    return o
  },

  /**
   * Flattens an array of banner objects into a useable array of banner objects
   * @param {Object[]} elements An array of objects returned by the api
   * @returns {Banner[]} An array of formatted banner objects
   */
  flattenBanners: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      o2.ID = elements[i].attributes.id
      for(let j = 0; j < elements[i].elements.length; j++){
        o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text
      }
      o.push(o2)
    }
    return o
  },

  /**
   * Formats the world data options
   * @param {Object[]|String[]} options An array of strings and/or objects
   * @returns {String} Formatted options to request to the API
   */
  formatOptionsWorld: (options) => {
    let arr = ["census", "censusid", "censusdesc", "censusname", "censusranks", "censusscale", "censustitle"]
    let str = ''
    for(let i = 0; i < options.length; i++){
      if(typeof options[i] == "string"){
        str += options[i]
        str += "+"
        continue
      }else{
        if(!options[i].type) throw new Error("You must include a type in objects in options.")
        if(options[i].length == 1) str += options[i].type + "+"
        else{
          str += options[i].type + ";"
          let keys = Object.keys(options[i])
          if(!arr.includes(options[i].type)){
            for(let j = 0; j < keys.length; j++){
              if(keys[j] == "type") continue
              if(options[i].type == "banner"){ 
                str += "banner=" + options[i][keys[j]].join(",")
                continue
              }
              if(options[i].type == "happenings"){
                let {
                  view,
                  filter,
                  limit,
                  sinceid,
                  beforeid,
                  sincetime,
                  beforetime
                } = options[i]
                if(filter && !Array.isArray(filter)) throw new Error("Filter must be an array")
                if(view && !view.nation && !view.region) throw new Error("View must have a region or nation property")
                if(view && view.nation && !Array.isArray(view.nation)) throw new Error("View must be an object with a nation/region property that is an array")
                if(view && view.region && !Array.isArray(view.region)) throw new Error("View must be an object with a nation/region property that is an array")
                for(let key in view){
                  str += `view=${key == "nation" ? "nation." : "region."}${view[key].map(t => t.toLowerCase().split(" ").join("_")).join(",")};`
                }
                if(filter) str += `filter=${filter.join("+")}`
                if(limit) str += `limit=${limit};`
                if(sinceid) str += `sinceid=${sinceid};`
                if(beforeid) str += `beforeid=${beforeid};`
                if(sincetime) str += `sincetime=${sincetime};`
                if(beforetime) str += `beforetime=${beforetime}`
                if(str.endsWith(";")) str = str.slice(0, -1)
                continue
              }
              str += `${keys[j]}=${options[i][keys[j]].includes(" ") ? options[i][keys[j]].toLowerCase().split(" ").join("_") : options[i][keys[j]]};`
            }
          }else{
            str += module.exports.flattenCensus(options[i])
          }
        }
      }
      str += "+"
    }
    if(str.endsWith("+")) str = str.slice(0, -1)
    if(str.endsWith(";")) str = str.slice(0, -1)
    str = str.replace(/;;/g, ";")
    return str
  },

  /**
   * Flattens census options to a string used in requesting to the API
   * @param {Object} element The unformatted options
   * @returns {String} Formatted options to request to the API
   */
  flattenCensus: (element) =>{
    let str = ''
    for(let key in element){
      if(key == 'scale') str += ';scale=' + element[key].join("+")
      if(key == 'mode'){
        str += ';mode='
        for(let i = 0; i < element[key].length; i++){
          if(typeof element[key][i] == "object"){
            str += 'history;'
            if(Object.keys(element[key][i]).length > 1){
              str += `from=${element[key][i].from}&to=${element[key][i].to}`
            }else{
              str += `${Object.keys(element[key][i])[0]}=${element[key][i][Object.keys(element[key][i])[0]]}`
            }
          }else{
            str += element[key][i] + '+'
          }
        }
      }
    }
    if(str.endsWith('+')) str = str.slice(0, -1)
    if(str.includes('+;')) str = str.substring(0, str.indexOf("+;")) + str.substring(str.indexOf("+;") + 1, str.length)
    return str
  },

  /**
   * Flattens a dispatch into a useable object
   * @param {Object[]} elements An array of objects returned by the API
   * @returns {Disptach} The dispatch
   */
  flattenDispatch: (elements) => {
    let o = {}
    for(let i = 0; i < elements.length; i++){
      if(elements[i].name == "TITLE" || elements[i].name == "TEXT"){ 
        o[elements[i].name] = elements[i].elements[0].cdata
        continue
      }
      o[elements[i].name] = elements[i].elements[0].text
    }
    o.AUTHOR = module.exports.formatNations(o.AUTHOR).join(" ")
    return o
  },

  /**
   * Flattens a dispatch list into a useable dispatch list
   * @param {Object[]} elements An array of objects returned by the API
   * @returns {DispatchListItem[]}
   */
  flattenDispatchList: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      o2.ID = elements[i].attributes.id
      for(let j = 0; j < elements[i].elements.length; j++){
        if(elements[i].elements[j].name == "TITLE"){ 
          o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].cdata
          continue
        }
        o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text
      }
      o2.AUTHOR = module.exports.formatNations(o2.AUTHOR).join(" ")
      o.push(o2)
    }
    return o
  },

  /**
   * Flattens a faction into a useable faction object
   * @param {Object[]} elements An array of objects returned by the API
   * @returns {Faction}
   */
  flattenFaction: (elements) => {
    let o = {}
    for(let i = 0; i < elements.length; i++){
      if(!elements[i].elements) continue
      if(elements[i].name == "DESC"){
        o.DESCRIPTION = elements[i].elements[0].cdata
        continue
      }
      o[elements[i].name] = elements[i].elements[0].text 
    }
    return o
  },

  /**
   * Flattens a list of factions into a useable list of factions
   * @param {Object[]} elements An array of objects returned by the API
   * @returns {FactionListItem[]}
   */
  flattenFactions: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      o2.ID = elements[i].attributes.id
      for(let j = 0; j < elements[i].elements.length; j++){
        if(!elements[i].elements[j].elements) continue
        o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text
      }
      o.push(o2)
    }
    return o
  },

  /**
   * Flattens a list of happenings into a useable list of happenings
   * @param {Object[]} elements An array of objects returned by the API
   * @returns {Happening[]}
   */
  flattenHappenings: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      if(elements[i].attributes) o2.ID = elements[i].attributes.id
      for(let j = 0; j < elements[i].elements.length; j++){
        if(!elements[i].elements[j].elements) continue
        o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text ? elements[i].elements[j].elements[0].text : elements[i].elements[j].elements[0].cdata
      }
      o.push(o2)
    }
    return o
  },

  /**
   * Flattens a poll into a useable poll object
   * @param {Object[]} elements An array of objects returned by the API
   * @returns {Poll} The poll
   */
  flattenPoll: (elements) => {
    let o = {}
    for(let i = 0; i < elements.length; i++){
      if(elements[i].name != "OPTIONS"){
        o[elements[i].name] = elements[i].elements[0].text ? elements[i].elements[0].text : elements[i].elements[0].cdata
      }else{
        let o2 = {}
        for(let j = 0; j < elements[i].elements.length; j++){
          let o3 = {}
          for(let k = 0; k < elements[i].elements[j].elements.length; k++){
            elements[i].elements[j].elements[k].elements ? o3[elements[i].elements[j].elements[k].name] = elements[i].elements[j].elements[k].elements[0].text ? elements[i].elements[j].elements[k].elements[0].text : elements[i].elements[j].elements[k].elements[0].cdata : null
            if(elements[i].elements[j].elements[k].name == "VOTERS") o3[elements[i].elements[j].elements[k].name] = module.exports.formatNations(o3[elements[i].elements[j].elements[k].name])
          }
          o2[elements[i].elements[j].attributes.id] = o3
        }
        o[elements[i].name] = o2
      }
    }
    o.AUTHOR = module.exports.formatNations(o.AUTHOR).join(" ")
    o.REGION = module.exports.formatNations(o.REGION).join(" ")
    return o
  },

  /**
   * Formats the world assembly data options
   * @param {Object[]|String[]} options An array of strings and/or objects
   * @returns {String} Formatted options to request to the API
   */
  formatOptionsWA: (options) => {
    if(Number.isInteger(parseInt(options[0]))){
      options = options.slice(1)
    }
    let str = ''
    for(let i = 0; i < options.length; i++){
      if(typeof options[i] == "string"){
        str += options[i]
        str += "+"
        continue
      }else{
        if(!options[i].type) throw new Error("You must include a type in objects in options.")
        if(options[i].length == 1) str += options[i].type + "+"
        else{
          str += options[i].type + ";"
          let keys = Object.keys(options[i])
          for(let j = 0; j < keys.length; j++){
            if(keys[j] == "type") continue
            str += `${keys[j]}=${options[i][keys[j]].includes(" ") ? options[i][keys[j]].toLowerCase().split(" ").join("_") : options[i][keys[j]]};`
          }
        }
      }
      str += "+"
    }
    if(str.endsWith("+")) str = str.slice(0, -1)
    if(str.endsWith(";")) str = str.slice(0, -1)
    if(str.includes(';+')) str = str.substring(0, str.indexOf(";+")) + str.substring(str.indexOf(";+") + 1, str.length)
    str = str.replace(/;;/g, ";")
    return str
  },

  /**
   * Flattens a list of world assembly happenings into a useable list of happenings
   * @param {Object[]} elements An array of objects returned by the API
   * @returns {Happening[]}
   */
  flattenHappeningsWA: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      for(let j = 0; j < elements[i].elements.length; j++){
        if(!elements[i].elements[j].elements) continue
        o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text ? elements[i].elements[j].elements[0].text : elements[i].elements[j].elements[0].cdata
      }
      o.push(o2)
    }
    return o
  },

  /**
   * Flattens a list of world assembly proposals into a useable list of proposals
   * @param {Object[]} elements An array of objects returned by the API
   * @returns {Proposal[]}
   */
  flattenProposals: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      o2.ID = elements[i].attributes.id
      for(let j = 0; j < elements[i].elements.length; j++){
        if(!elements[i].elements[j].elements) continue
        o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text ? elements[i].elements[j].elements[0].text : elements[i].elements[j].elements[0].cdata
      }
      o2.PROPOSED_BY = module.exports.formatNations(o2.PROPOSED_BY).join(" ")
      o.push(o2)
    }
    return o
  },

  /**
   * Flattens a world assembly resolution into a useable resolution
   * @param {Object[]} elements An array of objects returned by the API
   * @returns {Resolution}
   */
  flattenResolution: (elements) => {
    let o = {}
    for(let i = 0; i < elements.length; i++){
      if(elements[i].elements.length == 1 && elements[i].name != "DELLOG" && elements[i].name != "DELVOTES_FOR" && elements[i].name != "DELVOTES_AGAINST"){
        o[elements[i].name] = elements[i].elements[0].text ? elements[i].elements[0].text : elements[i].elements[0].cdata
      }else if(elements[i].name != "DELLOG" && elements[i].name != "DELVOTES_FOR" && elements[i].name != "DELVOTES_AGAINST"){
        let o2 = []
        for(let j = 0; j < elements[i].elements.length; j++){
          o2.push(elements[i].elements[j].elements[0].text ? elements[i].elements[j].elements[0].text : elements[i].elements[j].elements[0].cdata)
        }
        o[elements[i].name] = o2
      }else{
        let o2 = []
        for(let j = 0; j < elements[i].elements.length; j++){
          let o3 = {}
          for(let k = 0; k < elements[i].elements[j].elements.length; k++){
            o3[elements[i].elements[j].elements[k].name] = elements[i].elements[j].elements[k].elements[0].text ? elements[i].elements[j].elements[k].elements[0].text : elements[i].elements[j].elements[k].elements[0].cdata
          }
          o2.push(o3)
        }
        o[elements[i].name] = o2
      }
    }
    o.PROPOSED_BY = module.exports.formatNations(o.PROPOSED_BY).join(" ")
    return o
  },

  /**
   * Formats API response data to an array
   * @param {Object[]} elements An array of objects returned by the API
   * @returns {Array} The returned array of data
   */
  formatToArray: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      o.push(elements[i].elements[0].text ? elements[i].elements[0].text : elements[i].elements[0].cdata)
    }
    return o
  },
}