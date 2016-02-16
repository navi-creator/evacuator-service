/**
 * ������ ��������
 */
Schema.call = new SimpleSchema({
    _id: {
        type: String,
        optional: true
    },

    user_id: {
        type: String,
        label: '������ �� ������������'
    },

    model: {
        type: String,
        label: '����� ����������'
    },

    autonum: {
        type: String,
        label: '���. �����'
    },
    comment: {
        type: String,
        label: '�����������'
    },

    coord: {
        type: Object,
        label: '����������'
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