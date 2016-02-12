/**
 * Марки и модели автомобилей
 */
Schema.model = new SimpleSchema({
    _id: {
        type: String,
        optional: true
    },
    name: {
        type: String,
        label: 'Название марки'
    },
    mark: {
        type: [String],
        label: 'Название модели'
    }
});

Model = new Mongo.Collection('model');
Model.attachSchema(Schema.model);