class DSLString{
  constructor(s){
    this.value=s.value
    return Object.freeze(this)
  }
  equals(other){
    return this.value==other.value
  }
  unwrap(){
    return this.value
  }
}
class DSLBlock{
  constructor(s){
    this.value=s.value
    return Object.freeze(this)
  }
  run(run){
    return run(this.value)
  }
  equals(other){
    return this==other
  }
}
class DSLObject{
  constructor(o){
    this.value=o.value
  }
  equals(other){
    if(this==other) return true
    return false
  }
  unwrap(){
    return Object.fromEntries(Object.entries(this.value).map(([a,b])=>[a,unwrap(b)]))
  }
}
class DSLNumber{
  constructor(n){
    this.value=n.value
    return Object.freeze(this)
  }
  equals(other){
    return this.value==other.value
  }
  unwrap(){
    return this.value
  }
}
class DSLBoolean{
  constructor(n){
    this.value=n.value
    return Object.freeze(this)
  }
  equals(other){
    return this.value==other.value
  }
  unwrap(){
    return this.value
  }
}
class DSLArray{
  constructor(a){
    this.value=a.value
  }
  equals(other){
    if(this==other) return true
    return false
  }
  unwrap(){
    return this.value.map(unwrap)
  }
}
function unwrap(o){
  return o.unwrap()
}
function wrap(){
  throw new Error() // TODO: implement unwrap
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
    return exposedFunctions[op.name]({arguments:op.arguments.map(evaluate),blocks:Object.fromEntries(Object.entries(op.blocks).map(e=>[e[0],function(){new DSLBlock(e[1]).run(run)}.bind(this)]))})
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
  runnersImpl.object=function array(op){
    return new DSLObject(op)
  }
  runnersImpl.boolean=function object(op){
    return new DSLBoolean(op)
  }
  let runners=new Proxy(runnersImpl,{
    get(o, k){
      if(typeof o[k] != "undefined") return o[k]
      return ()=>{throw new Error("op "+k+" is not implemented!")}
    }
  });
  return run
}
module.exports={runnerFactory, DSLObject, DSLArray, DSLNumber, DSLString, DSLBlock, DSLBoolean, wrap, unwrap};
