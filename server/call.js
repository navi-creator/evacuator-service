CallModel = {

    add: function (data) {
    }
};

/**
 * Ìועמהû Call
 */
Meteor.methods({
    'call.add': CallModel.send
});