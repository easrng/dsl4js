class DSLString{
  constructor(s){
    this.value=s.value
    return Object.freeze(this)
  }
}
class DSLBlock{
  constructor(s){
    this.value=s.value
    return Object.freeze(this)
  }
  run(){
    return run(this.value)
  }
}
class DSLObject{
  constructor(o){
    this.value=o.value
  }
}
class DSLNumber{
  constructor(n){
    this.value=n.value
    return Object.freeze(this)
  }
}
class DSLArray{
  constructor(a){
    this.value=a.value
  }
}
const runnerFactory=()=>{
  let exposedFunctions={};
  Object.assign(exposedFunctions, require("./std"))
  function evaluate(op){
    return runners[op.type](op)
  }
  function run(array){
    array.forEach(evaluate)
  }
  let runnersImpl={};
  runnersImpl.call=function call(op){
    if(typeof exposedFunctions[op.name]=="undefined") throw new Error("The function "+op.name+" does not exist.")
    return exposedFunctions[op.name]({arguments:op.arguments,blocks:Object.fromEntries(Object.entries(op.blocks).map(e=>[e[0],new DSLBlock(e[1])]))})
  }
  runnersImpl.string=function string(op){
    return new DSLString(op)
  }
  runnersImpl.number=function number(op){
    return new DSLNumber(op)
  }
  runnersImpl.array=function array(op){
    return new DSLArray(op)
  }
  runnersImpl.object=function object(op){
    return new DSLObject(op)
  }
  let runners=new Proxy(runnersImpl,{
    get(o, k){
      if(typeof o[k] != "undefined") return o[k]
      return ()=>{throw new Error("op "+k+" is not implemented!")}
    }
  });
  return run
}
module.exports={runnerFactory, DSLObject, DSLArray, DSLNumber, DSLString, DSLBlock};
