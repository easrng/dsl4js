console.warn("DSL4JS is not ready for production^H^H^H^H^H^H^H^H^H^H any use.")

const nearley = require("nearley");
const grammar = require("./grammar.js");

class DSL {
  constructor(options){
    if(typeof options!="object") options={}
    this._options=options||{}
    this._parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  }
  execute(code){
    try{
      this._parser.feed(code)
    } catch (e) {
      throw e //new SyntaxError("DSL4JS: Parse error at character "+e.offset)
    }
    if(this._parser.results.length>1){
      console.warn("Uh-oh! Looks like you found a bug in the DSL4JS parser. Your program will still work, but please file an issue at https://github.com/easrng/dsl4js/issues.")
    }
    if(!(this._parser.results && this._parser.results[0])){
      throw new SyntaxError("DSL4JS: Unexpected end of input")
    }
    let ast = this._parser.results[0]
    return ast
  }
}
module.exports=DSL
