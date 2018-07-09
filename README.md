### Div2Json

Div2Json plug-in generate json data from div elements.To generate user need to define and level. So far key Duplication not supported. It currently supports controls like text-box,check-box,select. So far there are enhancements i thought of and i am currently working on them.

#### How to use ?
----------------------------------------
To use plugin, you need to add attribute <b>"datalevel"</b> to element.

##### Example 1 - Working with Inputfield.
----------------------------------------
```
<input type="text" datalevel="level-levelname" value="test" />
```
##### Json Output
``` javascript
```
{
	level:{
		levelname:"test"
	}
}
```
##### Example 2 - Working with Selectoption
---------------------------------------------
``` javascript
```
<select>
	<option datalevel="level-select">Value 1</option>
	<option datalevel="level-select">Value 2</option>
	<option datalevel="level-select">Value 3</option>
 </select>
```
##### Json Output
``` javascript
```
{ 
	"level": { 
		"select": "Value 1" 
	}
}	
```
