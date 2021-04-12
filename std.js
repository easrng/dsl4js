const { DSLBoolean, unwrap } = require("./evaluate")
module.exports={
  log({arguments}){
    console.log(...arguments.map(unwrap))
  },
  equal({arguments}){
    if(arguments.length==0) return true;
    for(let arg of arguments) if(arg.constructor!=arguments[0].constructor) return new DSLBoolean(false); // type mismatch
    for(let arg of arguments) if(!arg.equals(arguments[0])) return new DSLBoolean(false); // equality
    return new DSLBoolean(true);
  },
  if:({arguments, blocks})=>{
    if(arguments[0].constructor!=DSLBoolean || !blocks.default) throw new Error("Invalid arguments to if.")
    if(arguments[0].value) blocks.default()
    else if(blocks.else) blocks.else()
  }
}
