const l=o=>console.log(JSON.stringify(o,null,2))
const DSL = require(".")
let d = new DSL();
// test types
d.execute("[]")
d.execute("{}")
d.execute("0")
d.execute('""')
d.execute('true')
d.execute('false')
d.execute('null')
// test calls
d.execute("log(1)")
d.execute("if(false){}")
d.execute("if(true) {}")
d.execute("if(true) {\n}")
l(d.execute("if(false){\n}"))
console.log("Tests passed!")
