$(function() {
    if($('#product-types').is(':visible')) {
        var baseUrl = 'http://api.virtusize.com/api/v2/product-types',
            productTypesContainer = $('#product-types-container'),
            excludedTypes = ['dogCoat', 'dogCollar'],
            productTypes,
            productTypeNames = [],
            productTypeData = {};

        var renderProductTypeTable = function(data) {
            var template = $('<div class="wy-table-responsive"><table border="1" class="docutils"><colgroup><col width="38%"><col width="19%"><col width="21%"><col width="21%"></colgroup><thead valign="bottom"><tr class="row-odd"><th class="head">Measurement name</th><th class="head">Required</th><th class="head">Min value</th><th class="head">Max value</th></tr></thead><tbody valign="top"></tbody></table></div>'); 

            $.each(data.requiredMeasurements, function(index, m) {
                var tr = $('<tr></tr>').addClass(index % 2 === 0 ? 'row-even' : 'row-odd');
                tr.append('<td><strong>' + m + '</strong></td>');
                tr.append('<td><strong>yes</strong></td>');
                tr.append('<td><strong>' + convertLengthUnit(data.minMeasurements[m]) + ' cm</strong></td>');
                tr.append('<td><strong>' + convertLengthUnit(data.maxMeasurements[m]) + ' cm</strong></td>');
                template.find('tbody').append(tr);
            });

            $.each(data.optionalMeasurements, function(index, m) {
                var tr = $('<tr></tr>').addClass(index % 2 === 0 ? 'row-even' : 'row-odd');
                tr.append('<td>' + m + '</td>');
                tr.append('<td>no</td>');
                tr.append('<td>' + convertLengthUnit(data.minMeasurements[m]) + ' cm</td>');
                tr.append('<td>' + convertLengthUnit(data.maxMeasurements[m]) + ' cm</td>');
                template.find('tbody').append(tr);
            });

            $('<h3>' + data.name + '</h3>').appendTo(productTypesContainer);
            template.appendTo(productTypesContainer);
        };

        var render = function() {
            productTypeNames = productTypeNames.sort();
            $.each(productTypeNames, function(index, p) {
                if($.inArray(p, excludedTypes) == -1) {
                    renderProductTypeTable(productTypeData[p]);
                }
            });
        };

        var convertLengthUnit = function(x) {
            return x/10;
        };

        var fetchSpec = function(productType) {
            $.ajax({
                url: baseUrl + '/' + productType,
                type: 'GET',
                dataType: 'jsonp'
            }).done(function(data) {
                productTypeNames.push(data.name);
                productTypeData[data.name] = data;

                if(productTypeNames.length == productTypes.length) {
                    render();
                }
            });
        };

        $.ajax({
            url: baseUrl,
            type: 'GET',
            dataType: 'jsonp'
        }).done(function(data) {
            productTypes = data;
            $.each(productTypes, function(index, productType) {
                fetchSpec(productType); 
            });
        });
    }
});

