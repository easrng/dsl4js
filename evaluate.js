class DSLError extends Error{}
class DSLString{
  constructor(s){
    this.value=typeof s=="object"?s.value:s
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
    this.features=s.features
    return Object.freeze(this)
  }
  run(run){
    return run(this.value, this.features)
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
    return this.value==null?null:Object.fromEntries(Object.entries(this.value).map(([a,b])=>[a,unwrap(b)]))
  }
}
class DSLLazy{
  constructor(c){
    this._cb=c
    return this
  }
  equals(other){
    return this==other
  }
  get value(){
    return this._cb()
  }
  unwrap(){
    return this.value.unwrap()
  }
}
class DSLBoolean{
  constructor(n){
    this.value=typeof n=="object"?n.value:n
    return Object.freeze(this)
  }
  equals(other){
    return this.value==other.value
  }
  unwrap(){
    return this.value
  }
}
class DSLNumber{
  constructor(n){
    this.value=typeof n=="object"?n.value:n
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
    this.value=Array.isArray(a)?a:a.value
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
function handleLazy(a){
  return a.map(e=>(e&&e.constructor&&e.constructor==DSLLazy)?e.value:e)
}
function wrap(o){
  if(typeof o == "string") return new DSLString(o)
  if(typeof o == "number") return new DSLNumber(o)
  if(typeof o == "boolean") return new DSLBoolean(o)
  if(typeof o == "object" && Array.isArray(o)) return new DSLArray(o)
  if((typeof o == "object" && o == null) || typeof o == "undefined") return new DSLArray(o)
}
const runnerFactory=(exposed)=>{
  let exposedFunctions={};
  Object.assign(exposedFunctions, require("./std"))
  Object.assign(exposedFunctions, exposed)
  function evaluate(op, features){
    return runners[op.type](op, features)
  }
  function run(array, features){
    array.forEach(e=>evaluate(e,features))
  }
  let runnersImpl={};
  runnersImpl.call=function call(op, features){
    if(typeof exposedFunctions[op.name]=="undefined") throw new Error("The function "+op.name+" does not exist.")
    if(!features[op.name]) throw new Error("The function "+op.name+" is blocked.")
    return exposedFunctions[op.name]({arguments:op.arguments.map(e=>new DSLLazy(()=>evaluate(e,features))),blocks:Object.fromEntries(Object.entries(op.blocks).map(e=>[e[0],function(){new DSLBlock({...e[1],features}).run(run)}.bind(this)]))})
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
  runnersImpl.comment=function comment(op){/* ignore */}
  let runners=new Proxy(runnersImpl,{
    get(o, k){
      if(typeof o[k] != "undefined") return o[k]
      return ()=>{throw new Error("op "+k+" is not implemented!")}
    }
  });
  return run
}
module.exports={runnerFactory, DSLObject, DSLArray, DSLNumber, DSLString, DSLBlock, DSLBoolean, DSLLazy, wrap, unwrap, handleLazy, DSLError};
