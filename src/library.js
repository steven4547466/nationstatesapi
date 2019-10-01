module.exports = {
  flattenResponse: (elements) =>{
    let o = {}
    if(elements.length == 1 && elements[0].type == "text") return elements[0].text
    for(let i = 0; i < elements.length; i++){
      o[elements[i].name] = elements[i].elements[0].text
    }
    return o
  },

  flattenDossier: (elements) =>{
    let o = {}
    for(let i = 0; i < elements.length; i++){
      let o2 = []
      for(let j = 0; j < elements[i].elements.length; j++){
        o2.push(elements[i].elements[j].text)
      }
      o[elements[i].name] = o2
    }
    return o
  },

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

  flattenIssueSummary: (elements) =>{
    let o = {}
    for(let i = 0; i < elements.length; i++){
      o[elements[i].attributes.id] = elements[i].elements[0].text
    }
    return o
  },

  flattenNotices: (elements) =>{
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      for(let j = 0; j < elements[i].elements.length; j++){
        o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text
      }
      o.push(o2)
    }
    return o
  },

  getDeathData: (elements) =>{
    let o = {}
    for(let i = 0; i < elements.length; i++){
      o[elements[i].attributes.type] = elements[i].elements[0].text
    }
    return o
  },

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
        o[elements[i].attributes.id] = elements[i].elements[0].text
      }
    }
    return o
  },

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

  flattenUnread: (elements) =>{
    let o = {}
    for(let i = 0; i < elements.length; i++){
      o[elements[i].attributes ? elements[i].attributes[Object.keys(elements[i].attributes)[0]] : elements[i].name] = elements[i].elements[0].text
    }
    return o
  },

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

  formatOfficers: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      for(let j = 0; j < elements[i].elements.length; j++){
        o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text
      }
      o.push(o2)
    }
    return o
  },

  formatFactbook: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      o2.type = elements[i].type 
      o2.content = elements[i][Object.keys(elements[i])[1]]
      o.push(o2)
    }
    return o
  },

  flattenMessages: (element) => {
    let str = ''
    let keys = Object.keys(element)
    if(keys.includes('limit')) str += ';limit=' + element.limit
    if(keys.includes('offset')) str += ';offset=' + element.offset
    if(keys.includes('fromid')) str += ';fromid=' + element.fromid
    return str
  },
  
  formatMessages: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      o2.id = elements[i].attributes.id 
      for(let j = 0; j < elements[i].elements.length; j++){
        if(elements[i].elements[j].name != "MESSAGE"){
          o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text
        }else{
          o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].cdata
        }
      }
      o.push(o2)
    }
    return o
  },

  flattenBanners: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      o2.id = elements[i].attributes.id
      for(let j = 0; j < elements[i].elements.length; j++){
        o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text
      }
      o.push(o2)
    }
    return o
  },

  formatOptionsWorld: (options) => {
    let arr = ["census", "censusid", "censusdesc", "censusname", "censusranks", "censusscale", "censustitle"]
    let str = ''
    for(let i = 0; i < options.length; i++){
      if(typeof options[i] == "string"){
        str += options[i]
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
                if(filter && typeof filter != "object") throw new Error("Filter must be an array")
                if(view && !view.nation && !view.region) throw new Error("View must have a region or nation property")
                if(view && view.nation && typeof view.nation != "object") throw new Error("View must be an object with a nation/region property that is an array")
                if(view && view.region && typeof view.region != "object") throw new Error("View must be an object with a nation/region property that is an array")
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

  flattenDispatch: (elements) => {
    let o = {}
    for(let i = 0; i < elements.length; i++){
      if(elements[i].name == "TITLE" || elements[i].name == "TEXT"){ 
        o[elements[i].name] = elements[i].elements[0].cdata
        continue
      }
      o[elements[i].name] = elements[i].elements[0].text
    }
    return o
  },

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
      o.push(o2)
    }
    return o
  },

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

  flattenHappenings: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      o2.ID = elements[i].attributes.id
      for(let j = 0; j < elements[i].elements.length; j++){
        if(!elements[i].elements[j].elements) continue
        o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text ? elements[i].elements[j].elements[0].text : elements[i].elements[j].elements[0].cdata
      }
      o.push(o2)
    }
    return o
  },

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
            o3[elements[i].elements[j].elements[k].name] = elements[i].elements[j].elements[k].elements[0].text ? elements[i].elements[j].elements[k].elements[0].text : elements[i].elements[j].elements[k].elements[0].cdata
          }
          o2[elements[i].elements[j].attributes.id] = o3
        }
        o[elements[i].name] = o2
      }
    }
    return o
  },

  formatOptionsWA: (options) => {
    if(Number.isInteger(parseInt(options[0]))){
      options = options.slice(1)
    }
    let str = ''
    for(let i = 0; i < options.length; i++){
      if(typeof options[i] == "string"){
        str += options[i]
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
    str = str.replace(/;;/g, ";")
    return str
  },

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

  flattenProposals: (elements) => {
    let o = []
    for(let i = 0; i < elements.length; i++){
      let o2 = {}
      o2.ID = elements[i].attributes.id
      for(let j = 0; j < elements[i].elements.length; j++){
        if(!elements[i].elements[j].elements) continue
        o2[elements[i].elements[j].name] = elements[i].elements[j].elements[0].text ? elements[i].elements[j].elements[0].text : elements[i].elements[j].elements[0].cdata
      }
      o.push(o2)
    }
    return o
  },
}