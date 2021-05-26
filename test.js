const l=o=>console.log(JSON.stringify(o,null,2))
const DSL = require(".")
let d = new DSL();
// test types
d.run("[]")
d.run("{}")
d.run("0")
d.run('""')
d.run('true')
d.run('false')
d.run('log(null)')
// test calls
d.run("log(1)")
d.run("if(false){}")
d.run("if(true) {}")
d.run("if(true) {\n}")
l(d.run("if(false){\n}"))
console.log("Tests passed!")
