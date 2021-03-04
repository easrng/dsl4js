// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "program", "symbols": ["blockc"], "postprocess": d=>d[0]},
    {"name": "blockc$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "blockc$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "blockc$ebnf$2$subexpression$1$ebnf$1", "symbols": []},
    {"name": "blockc$ebnf$2$subexpression$1$ebnf$1", "symbols": ["blockc$ebnf$2$subexpression$1$ebnf$1", "anotherExpression"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "blockc$ebnf$2$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "blockc$ebnf$2$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "blockc$ebnf$2$subexpression$1$ebnf$2$subexpression$1", "symbols": ["blockc$ebnf$2$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "EXPRESSION_SEPARATOR"]},
    {"name": "blockc$ebnf$2$subexpression$1$ebnf$2", "symbols": ["blockc$ebnf$2$subexpression$1$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "blockc$ebnf$2$subexpression$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "blockc$ebnf$2$subexpression$1$ebnf$3", "symbols": ["WS"], "postprocess": id},
    {"name": "blockc$ebnf$2$subexpression$1$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "blockc$ebnf$2$subexpression$1", "symbols": ["expression", "blockc$ebnf$2$subexpression$1$ebnf$1", "blockc$ebnf$2$subexpression$1$ebnf$2", "blockc$ebnf$2$subexpression$1$ebnf$3"]},
    {"name": "blockc$ebnf$2", "symbols": ["blockc$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "blockc$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "blockc", "symbols": ["blockc$ebnf$1", "blockc$ebnf$2"], "postprocess": d=>d.flat(Infinity).filter(e=>e&&e.expression)},
    {"name": "anotherExpression$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "anotherExpression$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "anotherExpression$ebnf$2", "symbols": ["WS"], "postprocess": id},
    {"name": "anotherExpression$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "anotherExpression", "symbols": ["anotherExpression$ebnf$1", "EXPRESSION_SEPARATOR", "anotherExpression$ebnf$2", "expression"]},
    {"name": "blocks$ebnf$1", "symbols": []},
    {"name": "blocks$ebnf$1", "symbols": ["blocks$ebnf$1", "namedblock"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "blocks", "symbols": ["block", "blocks$ebnf$1"], "postprocess": d=>({type:"blocks",value:{default:d[0],...Object.fromEntries(d[1]||[])}})},
    {"name": "block", "symbols": ["BEGIN_BLOCK", "blockc", "END_BLOCK"], "postprocess": d=>({type:"block",value:d[1]||[]})},
    {"name": "namedblock$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "namedblock$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "namedblock$ebnf$2", "symbols": ["WS"], "postprocess": id},
    {"name": "namedblock$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "namedblock", "symbols": ["namedblock$ebnf$1", "safename", "namedblock$ebnf$2", "block"], "postprocess": d=>([d[0].value, d[1]])},
    {"name": "expression$subexpression$1", "symbols": ["call"]},
    {"name": "expression$subexpression$1", "symbols": ["jvalue"]},
    {"name": "expression$subexpression$1", "symbols": ["comment"]},
    {"name": "expression", "symbols": ["expression$subexpression$1"], "postprocess": d=>({...d.flat(Infinity).filter(e=>e)[0], expression:true})},
    {"name": "call$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "call$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "call$ebnf$2$subexpression$1$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "call$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "call$ebnf$2$subexpression$1", "symbols": ["call$ebnf$2$subexpression$1$ebnf$1", "blocks"]},
    {"name": "call$ebnf$2", "symbols": ["call$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "call$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "call", "symbols": ["safename", "call$ebnf$1", "BEGIN_CALL", "arguments", "END_CALL", "call$ebnf$2"], "postprocess": b=>({type:"call",name:b[0].value, blocks:(b[5]&&b[5][1])?b[5][1].value:{}, arguments:b[2]?b[2].value:[]})},
    {"name": "arguments$ebnf$1$subexpression$1$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "arguments$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "arguments$ebnf$1$subexpression$1$ebnf$2", "symbols": []},
    {"name": "arguments$ebnf$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "arguments$ebnf$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "arguments$ebnf$1$subexpression$1$ebnf$2$subexpression$1", "symbols": ["VALUE_SEPARATOR", "arguments$ebnf$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "expression"]},
    {"name": "arguments$ebnf$1$subexpression$1$ebnf$2", "symbols": ["arguments$ebnf$1$subexpression$1$ebnf$2", "arguments$ebnf$1$subexpression$1$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "arguments$ebnf$1$subexpression$1", "symbols": ["arguments$ebnf$1$subexpression$1$ebnf$1", "expression", "arguments$ebnf$1$subexpression$1$ebnf$2"]},
    {"name": "arguments$ebnf$1", "symbols": ["arguments$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "arguments$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "arguments$ebnf$2", "symbols": ["WS"], "postprocess": id},
    {"name": "arguments$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "arguments", "symbols": ["arguments$ebnf$1", "arguments$ebnf$2"], "postprocess": d=>({type:"arguments", value:d.flat(Infinity).filter(e=>e&&e.expression)})},
    {"name": "jvalue$subexpression$1", "symbols": ["false"]},
    {"name": "jvalue$subexpression$1", "symbols": ["Null"]},
    {"name": "jvalue$subexpression$1", "symbols": ["true"]},
    {"name": "jvalue$subexpression$1", "symbols": ["object"]},
    {"name": "jvalue$subexpression$1", "symbols": ["array"]},
    {"name": "jvalue$subexpression$1", "symbols": ["number"]},
    {"name": "jvalue$subexpression$1", "symbols": ["string"]},
    {"name": "jvalue", "symbols": ["jvalue$subexpression$1"], "postprocess": 
        function(data) {
            return data.flat(Infinity).filter(e=>e)[0];
        }
        },
    {"name": "object$ebnf$1$subexpression$1$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "object$ebnf$1$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "object$ebnf$1$subexpression$1$ebnf$2", "symbols": []},
    {"name": "object$ebnf$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "object$ebnf$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "object$ebnf$1$subexpression$1$ebnf$2$subexpression$1$ebnf$2", "symbols": ["WS"], "postprocess": id},
    {"name": "object$ebnf$1$subexpression$1$ebnf$2$subexpression$1$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "object$ebnf$1$subexpression$1$ebnf$2$subexpression$1", "symbols": ["object$ebnf$1$subexpression$1$ebnf$2$subexpression$1$ebnf$1", "VALUE_SEPARATOR", "object$ebnf$1$subexpression$1$ebnf$2$subexpression$1$ebnf$2", "member"]},
    {"name": "object$ebnf$1$subexpression$1$ebnf$2", "symbols": ["object$ebnf$1$subexpression$1$ebnf$2", "object$ebnf$1$subexpression$1$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "object$ebnf$1$subexpression$1", "symbols": ["object$ebnf$1$subexpression$1$ebnf$1", "member", "object$ebnf$1$subexpression$1$ebnf$2"]},
    {"name": "object$ebnf$1", "symbols": ["object$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "object$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "object$ebnf$2", "symbols": ["WS"], "postprocess": id},
    {"name": "object$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "object", "symbols": ["BEGIN_OBJECT", "object$ebnf$1", "object$ebnf$2", "END_OBJECT"], "postprocess":  d=>{
        	return {
        		type:"object",
        		value: Object.fromEntries(
        			d.flat(Infinity)
        			.filter(e=>e&&e.type=="member")
        			.map(e=>[e.name.value,e.value])
        		)
        	}
        } },
    {"name": "member$ebnf$1", "symbols": ["WS"], "postprocess": id},
    {"name": "member$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "member$ebnf$2", "symbols": ["WS"], "postprocess": id},
    {"name": "member$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "member", "symbols": ["string", "member$ebnf$1", "NAME_SEPARATOR", "member$ebnf$2", "expression"], "postprocess": d=>({type:"member", name: d[0], value: d[4]})},
    {"name": "array", "symbols": ["BEGIN_ARRAY", "arguments", "END_ARRAY"], "postprocess": d=>({type:"array",value:d[1].value})},
    {"name": "number$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "number$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "number$subexpression$1", "symbols": [{"literal":"0"}]},
    {"name": "number$subexpression$1$ebnf$1", "symbols": []},
    {"name": "number$subexpression$1$ebnf$1", "symbols": ["number$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "number$subexpression$1", "symbols": [/[1-9]/, "number$subexpression$1$ebnf$1"]},
    {"name": "number$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "number$ebnf$2$subexpression$1$ebnf$1", "symbols": ["number$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "number$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "number$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "number$ebnf$2", "symbols": ["number$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "number$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "number$ebnf$3$subexpression$1$subexpression$1", "symbols": [{"literal":"e"}]},
    {"name": "number$ebnf$3$subexpression$1$subexpression$1", "symbols": [{"literal":"E"}]},
    {"name": "number$ebnf$3$subexpression$1$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "number$ebnf$3$subexpression$1$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "number$ebnf$3$subexpression$1$ebnf$1", "symbols": ["number$ebnf$3$subexpression$1$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "number$ebnf$3$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "number$ebnf$3$subexpression$1$subexpression$2", "symbols": [{"literal":"0"}]},
    {"name": "number$ebnf$3$subexpression$1$subexpression$2$ebnf$1", "symbols": []},
    {"name": "number$ebnf$3$subexpression$1$subexpression$2$ebnf$1", "symbols": ["number$ebnf$3$subexpression$1$subexpression$2$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "number$ebnf$3$subexpression$1$subexpression$2", "symbols": [/[1-9]/, "number$ebnf$3$subexpression$1$subexpression$2$ebnf$1"]},
    {"name": "number$ebnf$3$subexpression$1", "symbols": ["number$ebnf$3$subexpression$1$subexpression$1", "number$ebnf$3$subexpression$1$ebnf$1", "number$ebnf$3$subexpression$1$subexpression$2"]},
    {"name": "number$ebnf$3", "symbols": ["number$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "number$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "number", "symbols": ["number$ebnf$1", "number$subexpression$1", "number$ebnf$2", "number$ebnf$3"], "postprocess": d=>({type:"number",value:JSON.parse(d.flat(Infinity).join(""))})},
    {"name": "string$ebnf$1", "symbols": []},
    {"name": "string$ebnf$1$subexpression$1$subexpression$1", "symbols": [/[\x20-\x21]/]},
    {"name": "string$ebnf$1$subexpression$1$subexpression$1", "symbols": [/[\x23-\x5B]/]},
    {"name": "string$ebnf$1$subexpression$1$subexpression$1", "symbols": [/[\x5D-\xFFFF]/]},
    {"name": "string$ebnf$1$subexpression$1", "symbols": ["string$ebnf$1$subexpression$1$subexpression$1"]},
    {"name": "string$ebnf$1$subexpression$1$subexpression$2", "symbols": [/[\x22]/]},
    {"name": "string$ebnf$1$subexpression$1$subexpression$2", "symbols": [/[\x5C]/]},
    {"name": "string$ebnf$1$subexpression$1$subexpression$2", "symbols": [/[\x2F]/]},
    {"name": "string$ebnf$1$subexpression$1$subexpression$2", "symbols": [/[\x62]/]},
    {"name": "string$ebnf$1$subexpression$1$subexpression$2", "symbols": [/[\x66]/]},
    {"name": "string$ebnf$1$subexpression$1$subexpression$2", "symbols": [/[\x6E]/]},
    {"name": "string$ebnf$1$subexpression$1$subexpression$2", "symbols": [/[\x72]/]},
    {"name": "string$ebnf$1$subexpression$1$subexpression$2", "symbols": [/[\x74]/]},
    {"name": "string$ebnf$1$subexpression$1$subexpression$2", "symbols": [/[\x75]/, "HEXDIG", "HEXDIG", "HEXDIG", "HEXDIG"]},
    {"name": "string$ebnf$1$subexpression$1", "symbols": [/[\x5C]/, "string$ebnf$1$subexpression$1$subexpression$2"]},
    {"name": "string$ebnf$1", "symbols": ["string$ebnf$1", "string$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": [/["]/, "string$ebnf$1", /["]/], "postprocess": d=>({type:"string",value:JSON.parse(d.flat(Infinity).join(""))})},
    {"name": "false$string$1", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "false", "symbols": ["false$string$1"], "postprocess": d=>({type:"boolean", value: false})},
    {"name": "Null$string$1", "symbols": [{"literal":"n"}, {"literal":"u"}, {"literal":"l"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "Null", "symbols": ["Null$string$1"], "postprocess": d=>({type:"object", value: null})},
    {"name": "true$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "true", "symbols": ["true$string$1"], "postprocess": d=>({type:"boolean", value: true})},
    {"name": "comment$string$1", "symbols": [{"literal":"/"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comment$ebnf$1", "symbols": []},
    {"name": "comment$ebnf$1$subexpression$1", "symbols": [/[\s\S]/]},
    {"name": "comment$ebnf$1", "symbols": ["comment$ebnf$1", "comment$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "comment$string$2", "symbols": [{"literal":"*"}, {"literal":"/"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comment", "symbols": ["comment$string$1", "comment$ebnf$1", "comment$string$2"], "postprocess": d=>({type:"comment", value:d.flat(Infinity).join("").slice(2,-2).trim()})},
    {"name": "safename$ebnf$1", "symbols": []},
    {"name": "safename$ebnf$1$subexpression$1$subexpression$1", "symbols": [/[\x41-\x5B]/]},
    {"name": "safename$ebnf$1$subexpression$1$subexpression$1", "symbols": [/[\x61-\x7B]/]},
    {"name": "safename$ebnf$1$subexpression$1$subexpression$1", "symbols": [/[\x30-\x3A]/]},
    {"name": "safename$ebnf$1$subexpression$1$subexpression$1", "symbols": [/[\x5F]/]},
    {"name": "safename$ebnf$1$subexpression$1$subexpression$1", "symbols": [/[\x80-\xFFFF]/]},
    {"name": "safename$ebnf$1$subexpression$1", "symbols": ["safename$ebnf$1$subexpression$1$subexpression$1"]},
    {"name": "safename$ebnf$1", "symbols": ["safename$ebnf$1", "safename$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "safename", "symbols": [/[\x61-\x7B]/, "safename$ebnf$1"], "postprocess": d=>({type:"safename", value:d.flat(Infinity).join("")})},
    {"name": "HEXDIG", "symbols": [/[a-fA-F0-9]/]},
    {"name": "BEGIN_BLOCK", "symbols": [/[\x7B]/], "postprocess": (d)=>{return ({type:"BEGIN_BLOCK", text:d.flat(Infinity).join("")})}},
    {"name": "BEGIN_CALL", "symbols": [/[\x28]/], "postprocess": (d)=>{return ({type:"BEGIN_CALL", text:d.flat(Infinity).join("")})}},
    {"name": "BEGIN_OBJECT", "symbols": [/[\x7B]/], "postprocess": (d)=>{return ({type:"BEGIN_OBJECT", text:d.flat(Infinity).join("")})}},
    {"name": "BEGIN_ARRAY", "symbols": [/[\x5B]/], "postprocess": (d)=>{return ({type:"BEGIN_ARRAY", text:"["})}},
    {"name": "END_ARRAY", "symbols": [/[\x5D]/], "postprocess": (d)=>{return ({type:"END_ARRAY", text:"]"})}},
    {"name": "END_OBJECT", "symbols": [/[\x7D]/], "postprocess": (d)=>{return ({type:"END_OBJECT", text:d.flat(Infinity).join("")})}},
    {"name": "END_CALL", "symbols": [/[\x29]/], "postprocess": (d)=>{return ({type:"END_CALL", text:d.flat(Infinity).join("")})}},
    {"name": "END_BLOCK", "symbols": [/[\x7D]/], "postprocess": (d)=>{return ({type:"END_BLOCK", text:d.flat(Infinity).join("")})}},
    {"name": "NAME_SEPARATOR", "symbols": [/[\x3A]/], "postprocess": (d)=>{return ({type:"NAME_SEPARATOR", text:d.flat(Infinity).join("")})}},
    {"name": "VALUE_SEPARATOR", "symbols": [/[\x2C]/], "postprocess": (d)=>{return ({type:"VALUE_SEPARATOR", text:d.flat(Infinity).join("")})}},
    {"name": "EXPRESSION_SEPARATOR", "symbols": [/[\x3B]/], "postprocess": (d)=>{return ({type:"EXPRESSION_SEPARATOR", text:d.flat(Infinity).join("")})}},
    {"name": "WS$ebnf$1", "symbols": [/[\x20\x09\x0A\x0D]/]},
    {"name": "WS$ebnf$1", "symbols": ["WS$ebnf$1", /[\x20\x09\x0A\x0D]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "WS", "symbols": ["WS$ebnf$1"], "postprocess": d=>({type:"WS", text:d.flat(Infinity).join("")})}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();