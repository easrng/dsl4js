const l=o=>console.log(JSON.stringify(o,null,2))
const DSL = require(".")
let d = new DSL();
// test types
d.execute("[]")
d.execute("{}")
d.execute("0")
d.execute('""')
// test calls
d.execute("log(1)")
d.execute("if(){}")
d.execute("if() {}")
d.execute("if() {\n}")
l(d.execute("if(){\n}"))
console.log("Tests passed!")
