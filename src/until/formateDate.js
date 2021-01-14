const format = {
    formateDate(time) {
        var f = new Date(time)
        function format(date) {
            var Str =
                date.getFullYear() +
                "-" +
                ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) +
                "-" +
                (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
                " " +
                (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
                ":" +
                (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
            return Str;
        }
        return format(f)
    }
}
export default format;