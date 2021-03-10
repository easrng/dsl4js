console.warn("DSL4JS is not ready for production^H^H^H^H^H^H^H^H^H^H any use.")

const nearley = require("nearley");
const grammar = nearley.Grammar.fromCompiled(require("./grammar.js"));
const runnerFactory = require("./evaluate")

class DSL {
  constructor(options){
    if(typeof options!="object") options={}
    this._options=options||{}
  }
  execute(code){
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
    return runnerFactory()(ast)
  }
}
module.exports=DSL
