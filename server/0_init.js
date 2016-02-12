if (Model.find({}).count() === 0) {

    /*var cars = {};  $.each($('.menu__group:eq(13)>.menu-item.menu-item_theme_islands.i-bem.menu-item_js_inited')        , function(key, el){          var _id = JSON.parse($(el).attr('data-bem'))['menu-item'].val;                    cars[_id] = {name: $(el).html(), mark: []};                     $.getJSON( "/ajax/get_groups/?category_id=15&section_id=1&level=1&type=mark&mark_id="+_id, function( data ) {            var m_id = data.data[0].mark_id;            for(var i in data.data) {               cars[m_id].mark.push(data.data[i].name);            }          });           });   console.log(cars);*/

    data_models = JSON.parse(Assets.getText("models.json"));
    for (i in data_models) {
        if(data_models[i].mark) {
            Model.insert({name: data_models[i].name, mark: data_models[i].mark});
        }
    }
    delete data_models;
}