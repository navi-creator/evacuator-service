UserModel = {

    /**
     * ���������� ������������
     * @param data ������ ������������
     * @returns {*}
     */
    add: function (data) {

        if (data.services == undefined && !data.password) {
            data.password = '123';
        }

        if (!data.profile.name) {
            throw new Meteor.Error(404, '�� ������� ���');
        }

        var user_id = Accounts.createUser(data);

        return user_id;
    },

    /**
     * ���������� ������ ������������
     * @param _id ���������� ������������� ������������
     * @param data
     */
    update: function (_id, data) {
        Meteor.users.update(_id, {$set: data});
    }
};


/**
 * ������ Users
 */
Meteor.methods({
    'user.add': UserModel.add,
    'user.update': UserModel.update
});