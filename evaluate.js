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
  class DSLString{
    constructor(s){
      this.value=s.value
      return Object.freeze(this)
    }
  }
  runnersImpl.string=function string(op){
    return new DSLString(op)
  }
  class DSLNumber{
    constructor(n){
      this.value=n.value
      return Object.freeze(this)
    }
  }
  runnersImpl.number=function number(op){
    return new DSLNumber(op)
  }
  class DSLArray{
    constructor(a){
      this.value=a.value
    }
  }
  runnersImpl.array=function array(op){
    return new DSLArray(op)
  }
  class DSLObject{
    constructor(o){
      this.value=o.value
    }
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
module.exports=runnerFactory;
