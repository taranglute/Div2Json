/*
            Author : Tarang Lute
            Plug-in Name : Div2Json
            Description:This plug-in generate json data from div elements.Key Duplication not supported.
            Currently supports controls like text-box,check-box,select. 
        */
        (function ($) {
            $.fn.div2Json = function () {
                var elements = [];
                var jsonData = {};
                var inDiv = this;
        
                elements.push({
                    'control': 'input[type=radio]',
                    'value': 'value'
                });
                
                elements.push({
                    'control': 'input[type=hidden]',
                    'value': 'value'
                });
                
                elements.push({
                    'control': 'input[type=checkbox]',
                    'value': 'checked'
                });
                elements.push({
                    'control': 'input[type=text]',
                    'value': 'value'
                });
                elements.push({
                    'control': 'option:selected',
                    'value': 'value'
                });
        
                // Parse for each element
                $.each(elements, function (index) {
                    $(inDiv).find(elements[index]['control']).each(function () {
                        var level;
                        if (typeof (this) == 'select') {
                            level = $(this).parent().attr("datalevel");
                        } else {
                            level = $(this).attr("datalevel");
                        }
                        if (typeof (level) !== 'undefined') {
                            HasProperty(jsonData, level, this[elements[index]['value']]);
                        }
                    });
                });
                return jsonData;
            };
        } (jQuery));
        function HasProperty(obj, nestlevel, value) {
            var parts = nestlevel.split('-');
            for (var i = 0, l = parts.length; i < l; i++) {
                var part = parts[i];
                if (obj !== null && typeof obj === "object" && part in obj) {
                    obj = obj[part];
                }
                else {
                    var itemindex = parts.indexOf(part) + 1;
                    var node = {};
                    if (itemindex === parts.length) {
                        node = value;
                    }
                    obj[part] = node;
                    obj = obj[part];
                }
            }
        }