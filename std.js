const { DSLError, DSLBoolean, DSLNumber, unwrap, handleLazy } = require("./evaluate")
module.exports={
  log({arguments}){
    console.log(...arguments.map(unwrap))
  },
  equal({arguments}){
    arguments=handleLazy(arguments)
    if(arguments.length==0) return true;
    for(let arg of arguments) if(arg.constructor!=arguments[0].constructor) {
      //console.warn("type mismatch")
      return new DSLBoolean(false); // type mismatch
    }
    for(let arg of arguments) if(!arg.equals(arguments[0])) {
      //console.warn("not equal")
      return new DSLBoolean(false); // equality
    }
    //console.warn("true")
    return new DSLBoolean(true);
  },
  or({arguments}){
    arguments=handleLazy(arguments)
    for(let arg of arguments) if(arg.constructor!=DSLBoolean) {
      throw new DSLError("Invalid arguments to or.")
    }
    return new DSLBoolean(arguments.reduce((a,b)=>a||b.value,false));
  },
  and({arguments}){
    arguments=handleLazy(arguments)
    for(let arg of arguments) if(arg.constructor!=DSLBoolean) {
      throw new DSLError("Invalid arguments to or.")
    }
    return new DSLBoolean(arguments.reduce((a,b)=>a&&b.value,true));
  },
  if:({arguments, blocks})=>{
    arguments=handleLazy(arguments)
    if(arguments[0].constructor!=DSLBoolean || !blocks.default) throw new DSLError("Invalid arguments to if.")
    if(arguments[0].value) blocks.default()
    else if(blocks.else) blocks.else()
  },
  while:({arguments, blocks})=>{
    while(true){
      arguments=handleLazy(arguments)
      if(arguments[0].constructor!=DSLBoolean || !blocks.default) throw new DSLError("Invalid arguments to while.")
      if(!arguments[0].value) break;
      blocks.default()
    }
  },
  now:()=>{
    return new DSLNumber(Date.now())
  }
}
