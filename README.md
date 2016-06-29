# Div2Json
Div2Json is a simple jquery plugin to generate json from input elements.

How to use ?

To use plugin, you need to add attribute "datalevel" to element.

Example

<input type="text" datalevel="level-levelname" value="test" />

Json Output

{
	level:{
		levelname:"test"
	}
}

For Select

<select>
	<option datalevel="level-select">Value 1</option>
	<option datalevel="level-select">Value 2</option>
	<option datalevel="level-select">Value 3</option>
 </select>

Json Output

{ 
	"level": { 
		"select": "Value 1" 
	}
}	