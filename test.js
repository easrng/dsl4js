const DSL = require(".")
let d = new DSL();
// test types
d.execute("[]")
d.execute("{}")
d.execute("0")
d.execute('""')
// test calls
d.execute("test()")
d.execute("if(){}")
d.execute("if() {}")
d.execute("if() {\n}")
d.execute("if(){\n}")
