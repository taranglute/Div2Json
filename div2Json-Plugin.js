/*
	Author : Tarang Lute
	Plug-in Name : Div2Json
	Description:Plug-in to generate json from elements present inside div.
*/
(function ( $ ) {
	$.fn.div2Json=function(){
		var elements = [];
		var jsonData={};
		var inDiv=this;

		elements.push({
			'control': 'input[type=checkbox]'
		});
		
		elements.push({
        'control': 'input[type=radio]'
		});
		
		elements.push({
			'control': 'input[type=text]'
		});
		elements.push({
			'control': 'option:selected'
		});
		
		elements.push({
			'control': 'textarea'
		});
		
		// Parse for each element
		$.each(elements, function (index) {
			$(inDiv).find(elements[index]['control']).each(function () {
				   if (typeof (level) !== 'undefined') {
					var controlItem = $(this).get(0);
					if (typeof (controlItem) !== 'undefined') {
						var tgname = $(this).get(0).tagName;
						if (typeof (tgname) !== 'undefined') {
							controlValue=GetControlValue(this,tgname);
							if (typeof (controlValue) !== 'undefined' && controlValue!=null ) {
								HasProperty(emptySchmea, level, controlValue);
							}
						}
					}
				}
			});
		});
		return jsonData;
	};
}( jQuery ));

function GetControlValue(control,tgname) {
     var controlValue = '';
    if (tgname === 'OPTION') {
        controlValue = $(control).text();
    }else if(tgname=='TEXTAREA'){
        controlValue = $(control).val();
    }else {
        var tgname = $(control).get(0).type;
        if (tgname === 'text') {
            controlValue = $(control).val();
        } else {
            if ($(control).is(":checked")) {
                if (tgname == 'radio') {
                    controlValue = $(control).val();
                } else {
                    controlValue = $(control).attr("id");
                }
            }else{
                controlValue=null;
            }
        }
    }
    return controlValue;
}

function HasProperty(obj, prop, value) {
    var parts = prop.split('-');
    for (var i = 0, l = parts.length; i < l; i++) {
        var containsString = parts[i].indexOf("|");
        var part = '';
        var datatype = '';
        if (containsString < 0) {
            part = parts[i];
        } else {
            var prt = parts[i].split('|');
            part = prt[0];
            datatype = prt[1];
        }

        if (obj !== null && typeof obj === "object" && part in obj) {
            obj = obj[part];
        } else {
            var itemindex;
            if (datatype == '') {
                itemindex = parts.indexOf(part) + 1;
            } else {
                itemindex = parts.indexOf(part + "|" + datatype) + 1;
            }

            var node = {};
            if (itemindex === parts.length) {
                node = GetTypeCastValue(datatype, value);
            }
            obj[part] = node;
            obj = obj[part];
        }
    }
}

function GetTypeCastValue(datatype, value) {
    var typevalue = value;
    if (datatype != '') {
        switch (datatype.toLowerCase()) {
            case "string":
                typevalue = String(value);
                break;
            case "int":
                var result = parseInt(value);
                if (!isNaN(result)) {
                    typevalue = result;
                }
                break;
            case "bool":
                typevalue = Boolean(value);
                break;
        }
    }
    return typevalue;
}