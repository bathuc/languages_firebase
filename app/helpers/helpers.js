export default {
    getCurrentTimestamp() {
        return Date.now()
    },

    getExpireTimestamp(hour = 8) {
        var date = new Date();
        date.setHours(date.getHours() + hour);
        return date.getTime();
    },

    /*
        dateString: 'yy-mm-dd hh:ii:ss'
        dateString: '2019-05-18 07:51:46'
     */
    convertDateToTimestamp(dateString) {
        var info = dateString.split(' ');

        var dateInfo = info[0].split('-');
        var year = parseInt(dateInfo[0]);
        var month = parseInt(dateInfo[1])-1;
        var day = parseInt(dateInfo[2]);

        var timeInfo = info[1].split(':');
        var hour = parseInt(timeInfo[0]);
        var minute = parseInt(timeInfo[1]);
        var second = parseInt(timeInfo[2]);

        var dateParse = new Date();
        dateParse.setFullYear(year);
        dateParse.setMonth(month);
        dateParse.setDate(day);
        dateParse.setHours(hour);
        dateParse.setMinutes(minute);
        dateParse.setSeconds(second);
        return dateParse.getTime();
    },

    formatDate(timestamp) {
        var timestampInt = parseInt(timestamp);
        var format = 'yyyy-mm-dd hh:ii:ss';
        var date = new Date(timestampInt);

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
        // date.setMinutes(date.getMinutes() + 5);
        // date = new Date(date);
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
    getPaginationInfo(dataArray, page = 1, itemPerPage = 20, pagNumber = 8) {
        var result = {
            'back': false,
            'next': false,
            'first_index': 1,
            'last_index': 1,
            'item_index': [],
            'current_page': page,
            'is_pagination': 0,
            data: [],
        };

        if (typeof dataArray != 'object') {
            return result;
        }

        var length = dataArray.length;
        var totalPage = Math.ceil(length / itemPerPage);
        if (totalPage == 1) {
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

        // map index
        for (var i = result.first_index; i <= result.last_index; i++) {
            result.item_index.push(i);
        }

        return result;
    },

    getWordSplitInfo(dataArray, page=1,  pagNumber=40) {
        var firstIndex = (page - 1) * pagNumber;
        var lastIndex = page * pagNumber - 1;

        var result = {};
        result.first_index = firstIndex;
        result.last_index = lastIndex;
        result.current_page = page;

        // map index & data
        var itemIndex = [];
        var data = []; var tableRender = [];
        var j = 1; var temp = [];
        for (var i = firstIndex; i <= lastIndex; i++) {
            if(dataArray[i]){
                itemIndex.push(i);
                data[i] = dataArray[i];
                var objectItem = {
                    index: i,
                    word_item: dataArray[i]
                };
                temp.push(objectItem);
                if(temp.length === 5){
                    tableRender.push(temp);
                    temp = [];
                }
            }
        }

        if(temp.length > 0){
            tableRender.push(temp);
            temp = [];
        }

        result.item_index = itemIndex;
        result.data = data;
        result.tableRender = tableRender;

        // map select box
        var selectBox = [];
        var totalPage = Math.ceil(dataArray.length / pagNumber);
        for(var i = 1; i<=totalPage; i++) {
            var first = (i - 1) * pagNumber;
            var last = i * pagNumber;
            var boxValue = first + ' - ' + last + ' words';
            var item ={
                id: i,
                value: boxValue
            };
            selectBox.push(item);
        }
        result.select_box = selectBox;

        return result;
    },

    getRandomArray(array) {
        var tempArray = [...array];
        tempArray.sort(function(a, b){return Math.random() - Math.random()});
        return tempArray;
    },

    getRandInteger(min, max) {
        var minValue = parseInt(min);
        var maxValue = parseInt(max);
        return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    },

    getRandomValues(array) {
        var minIndex, maxIndex, firstFlag = null;
        for (var key in array) {
            var keyInt = parseInt(key);
            if(!firstFlag){
                minIndex = maxIndex = keyInt;
                firstFlag = true;
            }
            else{
                if(minIndex > key) minIndex = keyInt;
                if(maxIndex < key) maxIndex = keyInt;
            }
        }
        var randIndex = this.getRandInteger(minIndex, maxIndex);
        return  array[randIndex];
    }
}
