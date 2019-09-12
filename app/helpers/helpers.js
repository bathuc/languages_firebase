

export default {
    getCurrentTimestamp() {
        return Date.now()
    },

    getExpireTimestamp(hour=8){
        var date = new Date();
        date.setHours( date.getHours() + hour );
        return date.getTime();
    },

    formatDate(timestamp) {
        var format = 'yyyy-mm-dd hh:ii:ss';
        var date = new Date(timestamp);

        var year = date.getFullYear();
        if(isNaN(year)) {
            return '';
        }

        var month = date.getMonth() === 11 ? 12 : date.getMonth() + 1;
        month = month.toString().length == 1 ? '0' + month : month.toString();
        var day  = date.getDate();
        day = day.toString().length == 1 ? '0' + day : day.toString();

        var hour = date.getHours();
        hour = hour.toString().length == 1 ? '0' + hour : hour.toString();
        date.setMinutes(date.getMinutes() + 5);
        date = new Date(date);
        var minute = date.getMinutes();
        minute = minute.toString().length == 1 ? '0' + minute : minute.toString();
        var second = date.getSeconds();
        second = second.toString().length == 1 ? '0' + second : second.toString();

        format = format.replace('yyyy', year);
        format = format.replace('mm', month);
        format = format.replace('dd', day);
        format = format.replace('hh', hour);
        format = format.replace('ii', minute);
        format = format.replace('ss', second);

        return format;
    },

    ranStrNormal (length = 8) {
        var characters = '0123456789abcdefghijklmnopqrstuvwxyz';
        var randomString = '';

        for (var i = 0; i < length; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return randomString;
    },

    ranStr (length = 8) {
        var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var randomString = '';

        for (var i = 0; i < length; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return randomString;
    },

    getToken()
    {
        return Date.now() + this.ranStr();
    },

    isEmptyObject(object) {
        if(typeof object != 'object') {
            return false;
        }

        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                return false;
            }
        }

        return true;
    },
}
