
Schema.user_profile = new SimpleSchema({

    name: {
        type: String,
        label: '���',
        min: 1,
        max: 50
    },

    model: {
        type: String,
        label: '������ ����������',
        optional: true
    },

    autonum: {
        type: String,
        label: '���. �����',
        optional: true
    },

    avatar: {
        type: Object,
        label: '������',
        blackbox: true,
        optional: true
    },

    lastLogin:{
        type: Date,
        label: '����� ��������� �����������',
        optional: true,
        autoValue: function(){ if (this.isInsert && !this.value){ return new Date; } }
    },

    isAdmin: {
        type: Boolean,
        label: '���� �������������',
        optional: true,
        autoValue: function(){ if (this.isInsert && !this.value){ return false; } }
    }
});

Schema.users = new SimpleSchema({

    username: {
        type: String,
        label: '�����',
        regEx: /^[a-z0-9A-Z_]{3,15}$/,
        optional: true
    },
    emails: {
        type: [Object],
        label: 'E-mail ������'
    },
    "emails.$.address": {
        type: String,
        label:'E-mail',
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean,
        label:'�����������'
    },
    createdAt: {
        label: '���� ����������',
        type: Date
    },
    profile: {
        type: Schema.user_profile,
        label: '������� ������������',
        optional: true
    },
    services: {
        type: Object,
        label: '�������� ���. �����',
        optional: true,
        blackbox: true
    },
    status: {
        type: Object,
        label: 'status',
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schema.users);
