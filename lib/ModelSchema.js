/**
 * ����� � ������ �����������
 */
Schema.model = new SimpleSchema({
    _id: {
        type: String,
        optional: true
    },
    name: {
        type: String,
        label: '�������� �����'
    },
    mark: {
        type: [String],
        label: '�������� ������'
    }
});

Model = new Mongo.Collection('model');
Model.attachSchema(Schema.model);