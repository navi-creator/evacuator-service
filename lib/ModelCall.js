/**
 * Заявки клиентов
 */
Schema.call = new SimpleSchema({
    _id: {
        type: String,
        optional: true
    },

    user_id: {
        type: String,
        label: 'Заявка от пользователя'
    },

    model: {
        type: String,
        label: 'Марка автомобиля'
    },

    autonum: {
        type: String,
        label: 'Гос. номер'
    },
    comment: {
        type: String,
        label: 'Комментарий'
    },

    coord: {
        type: Object,
        label: 'Координаты'
    },

    'coord.latitude': {
        type: String,
        label: 'latitude'
    },

    'coord.longitude': {
        type: String,
        label: 'latitude'
    },
});

Call = new Mongo.Collection('call');
Call.attachSchema(Schema.call);