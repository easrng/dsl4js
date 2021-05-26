const nearley = require("nearley");
const grammar = nearley.Grammar.fromCompiled(require("./grammar.js"));
const {runnerFactory, DSLObject, DSLArray, DSLNumber, DSLString, DSLBlock, DSLBoolean, DSLLazy, wrap, unwrap, handleLazy, DSLError} = require("./evaluate")

class DSL {
  constructor(options){
    if(typeof options!="object") options={}
    this.features=new Proxy(Object.fromEntries(Object.entries(options.features||{}).map(([k,v])=>[k,!!v])),{get:(o,k)=>(typeof o=="boolean"?o[k]:true),set:(o,k,v)=>o[k]=v})
    this.exposed=options.exposed||{}
  }
  run(code){
    let parser = new nearley.Parser(grammar); // This looks bad, but it's how the docs say to do it.
    try{
      parser.feed(code)
    } catch (e) {
      throw e //new SyntaxError("DSL4JS: Parse error at character "+e.offset)
    }
    if(parser.results.length>1){
      console.warn("Uh-oh! Looks like you found a bug in the DSL4JS parser. Your program will still work, but please file an issue at https://github.com/easrng/dsl4js/issues.")
    }
    if(!(parser.results && parser.results[0])){
      throw new SyntaxError("Unexpected end of input")
    }
    let ast = parser.results[0]
    return runnerFactory(this.exposed)(ast, this.features)
  }
}
DSL.types={DSLObject, DSLArray, DSLNumber, DSLString, DSLBlock, DSLBoolean, DSLLazy, wrap, unwrap, handleLazy, DSLError}
module.exports=DSL
