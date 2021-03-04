program              -> blockc {% d=>d[0] %}

# Block stuff

blockc               -> WS:? (expression anotherExpression:* (WS:? EXPRESSION_SEPARATOR):? WS:?):? {% d=>d.flat(Infinity).filter(e=>e&&e.expression) %}
anotherExpression    -> WS:? EXPRESSION_SEPARATOR WS:? expression
blocks               -> block namedblock:* {% d=>({type:"blocks",value:{default:d[0],...Object.fromEntries(d[1]||[])}}) %}
block                -> BEGIN_BLOCK blockc END_BLOCK {% d=>({type:"block",value:d[1]||[]}) %}
namedblock           -> WS:? safename WS:? block {% d=>([d[0].value, d[1]]) %}

# Values
expression           -> (call | jvalue | comment) {% d=>({...d.flat(Infinity).filter(e=>e)[0], expression:true}) %}

call                 -> safename WS:? BEGIN_CALL arguments END_CALL (WS:? blocks):? {% b=>({type:"call",name:b[0].value, blocks:(b[5]&&b[5][1])?b[5][1].value:{}, arguments:b[2]?b[2].value:[]}) %}
arguments            -> (WS:? expression (VALUE_SEPARATOR WS:? expression):*):? WS:? {% d=>({type:"arguments", value:d.flat(Infinity).filter(e=>e&&e.expression)}) %}

jvalue               -> (false | Null | true | object | array | number | string) {%
    function(data) {
        return data.flat(Infinity).filter(e=>e)[0];
    }
%}

object               -> BEGIN_OBJECT (WS:? member (WS:? VALUE_SEPARATOR WS:? member):*):? WS:? END_OBJECT {% d=>{
	return {
		type:"object",
		value: Object.fromEntries(
			d.flat(Infinity)
			.filter(e=>e&&e.type=="member")
			.map(e=>[e.name.value,e.value])
		)
	}
} %}
member               -> string WS:? NAME_SEPARATOR WS:? expression {% d=>({type:"member", name: d[0], value: d[4]}) %}

array                -> BEGIN_ARRAY arguments END_ARRAY {% d=>({type:"array",value:d[1].value}) %}

# Primitives

number               -> "-":? ("0" | [1-9] [0-9]:*) ("." [0-9]:+):? (("e" | "E") ( "-" | "+" ):? ("0" | [1-9] [0-9]:*)):? {% d=>({type:"number",value:JSON.parse(d.flat(Infinity).join(""))}) %}

string               -> ["] (([\x20-\x21] | [\x23-\x5B] | [\x5D-\xFFFF]) | [\x5C] ([\x22] | [\x5C] | [\x2F] | [\x62] | [\x66] | [\x6E] | [\x72] | [\x74] | [\x75] HEXDIG HEXDIG HEXDIG HEXDIG)):* ["] {% d=>({type:"string",value:JSON.parse(d.flat(Infinity).join(""))}) %}

false                -> "false" {% d=>({type:"boolean", value: false}) %}
Null                 -> "null" {% d=>({type:"object", value: null}) %} # null is a reserved word, let's use Null
true                 -> "true" {% d=>({type:"boolean", value: true}) %}
comment              -> "/*" ([\s\S]):* "*/" {%d=>({type:"comment", value:d.flat(Infinity).join("").slice(2,-2).trim()})%}







# Symbols
safename             -> [\x61-\x7B] (( [\x41-\x5B] | [\x61-\x7B] | [\x30-\x3A] | [\x5F] | [\x80-\xFFFF])):* {% d=>({type:"safename", value:d.flat(Infinity).join("")}) %}
HEXDIG               -> [a-fA-F0-9]
BEGIN_BLOCK          -> [\x7B]  {% (d)=>{return ({type:"BEGIN_BLOCK", text:d.flat(Infinity).join("")})} %}# { left curly bracket
BEGIN_CALL           -> [\x28]  {% (d)=>{return ({type:"BEGIN_CALL", text:d.flat(Infinity).join("")})} %}# ( left paren
BEGIN_OBJECT         -> [\x7B]  {% (d)=>{return ({type:"BEGIN_OBJECT", text:d.flat(Infinity).join("")})} %}# { left curly bracket
BEGIN_ARRAY          -> [\x5B]  {% (d)=>{return ({type:"BEGIN_ARRAY", text:"["})} %}# [ left square bracket
END_ARRAY            -> [\x5D]  {% (d)=>{return ({type:"END_ARRAY", text:"]"})} %}# ] right square bracket
END_OBJECT           -> [\x7D]  {% (d)=>{return ({type:"END_OBJECT", text:d.flat(Infinity).join("")})} %}# } right curly bracket
END_CALL             -> [\x29]  {% (d)=>{return ({type:"END_CALL", text:d.flat(Infinity).join("")})} %}# ) right paren
END_BLOCK            -> [\x7D]  {% (d)=>{return ({type:"END_BLOCK", text:d.flat(Infinity).join("")})} %}# } right curly bracket
NAME_SEPARATOR       -> [\x3A]  {% (d)=>{return ({type:"NAME_SEPARATOR", text:d.flat(Infinity).join("")})} %}# : colon
VALUE_SEPARATOR      -> [\x2C]  {% (d)=>{return ({type:"VALUE_SEPARATOR", text:d.flat(Infinity).join("")})} %}# , comma
EXPRESSION_SEPARATOR -> [\x3B]  {% (d)=>{return ({type:"EXPRESSION_SEPARATOR", text:d.flat(Infinity).join("")})} %}# ; semicolon
WS                   -> [\x20\x09\x0A\x0D]:+ {% d=>({type:"WS", text:d.flat(Infinity).join("")}) %}# Space | Tab | \n | \r
