CallModel = {

    add: function (data) {
    }
};

/**
 * ������ Call
 */
Meteor.methods({
    'call.add': CallModel.send
});