export default {
    getCurrentTimestamp() {
        return Date.now()
    },

    getExpireTimestamp(hour = 8) {
        var date = new Date();
        date.setHours(date.getHours() + hour);
        return date.getTime();
    },

    formatDate(timestamp) {
        var format = 'yyyy-mm-dd hh:ii:ss';
        var date = new Date(timestamp);

        var year = date.getFullYear();
        if (isNaN(year)) {
            return '';
        }

        var month = date.getMonth() === 11 ? 12 : date.getMonth() + 1;
        month = month.toString().length == 1 ? '0' + month : month.toString();
        var day = date.getDate();
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

    ranStrNormal(length = 8) {
        var characters = '0123456789abcdefghijklmnopqrstuvwxyz';
        var randomString = '';

        for (var i = 0; i < length; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return randomString;
    },

    ranStr(length = 8) {
        var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var randomString = '';

        for (var i = 0; i < length; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return randomString;
    },

    getToken() {
        return Date.now() + this.ranStr();
    },

    isEmptyObject(object) {
        if (typeof object != 'object') {
            return false;
        }

        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                return false;
            }
        }

        return true;
    },

    /*
        return a result object
     */
    getPaginationInfo(dataArray, page = 1, itemPerPage = 12, pagNumber = 4) {
        console.log('itempp', itemPerPage);
        console.log('dataArray', typeof dataArray);
        var result = {
            'back': false,
            'next': false,
            'first_index': 1,
            'last_index': 1,
            'current_page': page,
            'is_pagination': 0,
            data: [],
        };

        if (typeof dataArray != 'object') {
            console.log('vao return');
            return result;
        }

        var length = dataArray.length;
        console.log('dataArray', dataArray);
        console.log('dataArray 123', Object.keys(dataArray).length);
        console.log('dataArray length', dataArray.length);
        console.log('dataArray length123', length);
        console.log('itemPerPage', itemPerPage);
        console.log('totalPage', totalPage);
        var totalPage = Math.ceil(length / itemPerPage);
        if (totalPage == 0) {
            result.data = dataArray;
            return result;
        }

        if (page > totalPage) {
            page = totalPage;
        }

        if (page < 1) {
            page = 1;
        }

        result.back = page - 1;
        result.next = page + 1;
        result.is_pagination = 1;

        if (result.back < 1) {
            result.back = false;
        }

        if (result.next > totalPage) {
            result.next = false;
        }

        var isEven = (pagNumber % 2 === 0) ? 1 : 0;
        var range = Math.floor(pagNumber / 2);

        if (page - range + isEven <= 0) {
            // less than floor
            result.first_index = 1;
            result.last_index = (totalPage > pagNumber) ? pagNumber : totalPage;
        } else if (page + range > totalPage) {
            // greater than limit
            result.last_index = totalPage;
            var first = totalPage - pagNumber + 1;
            result.first_index = (first > 0) ? first : 1;
        } else {
            // normal case
            result.first_index = page - range + isEven;
            result.last_index = page + range
        }

        result.current_page = page;

        // map data
        var data = [];
        var index = itemPerPage * (page - 1);
        for (var i = index; i < index + itemPerPage; i++) {
            if (dataArray[i]) {
                data.push(dataArray[i])
            }
        }

        result.data = data;

        return result;
    }
}
