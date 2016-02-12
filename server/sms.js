SmsModel = {

    config: {
        public_key: '9e1e18e6da05cc3c12e35e781260c2ce',
        private_key: '1d988bf8f017c1e40bdfeae867e5dced',
        url: 'http://atompark.com/api/sms/3.0/sendSMS?'
    },

    /**
     * ��������� ��� �����������
     * @param phone ����� ��������
     * @param text ����� ���������
     * @param data ������ ��������� (���� ����������)
     * @returns {*}
     */
    send: function(phone, text, data) {


        phone = SmsModel._preparePhone(phone);

        /*var phone = Meteor.users.findOne(user_id).profile.phone;

         if(phone && phone.verified == true) {
         phone = SmsModel._preparePhone(phone.tel);
         } else {
         return false;
         }*/

        var params = {
            version: '3.0',
            key: SmsModel.config.public_key,
            action: 'sendSMS',
            sender: 'helpmed.ru',
            phone: phone,
            text: text,
            datetime: '',
            sms_lifetime: '0'
        };

        var keys = Object.keys(params).sort();
        var sorted = [];

        for(var i in keys) {
            if(keys[i] != 'sign') {
                sorted.push(params[keys[i]]);
            }
        }

        params.sum = CryptoJS.MD5(sorted.join('')+ SmsModel.config.private_key).toString();

        var url = SmsModel.config.url + Object.keys(params).map(function(key){
                return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            }).join('&');

        HTTP.call('GET', url);


        //���� ���� ���������!
        return Sms.insert({user_id: Meteor.userId(), phone: phone, data: data, text: text});
    },

    /**
     * ������� ��� �����������
     * @param _id ���������� ������������� ��� �����������
     * @returns {*}
     */
    delete: function(_id) {
        return Sms.remove(_id);
    },

    /**
     * ����������� �������
     * @param string phone
     * @return int �������� ����� �������� (������ �����)
     */
    _preparePhone: function (phone) {
        //return phone.replace('/\D/i', '').substr(1);
        var numb = phone.match(/\d/g);
        return numb.join("");
    }
};

/**
 * ������ Sms
 */
Meteor.methods({
    'sms.send': SmsModel.send, //��������� ��� �����������
    'sms.delete': SmsModel.delete //������� ��� �����������
});