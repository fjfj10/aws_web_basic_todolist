class DateUtils {
    static leftPad(value) {
        if(value >= 10) {
            return value;
        }

        return `0${value}`;
    }

    static toStringByFormatting(date) {
        const year = date.getFullYear();
        //js는 0월부터 시작 +1을 해줘야 한다
        const month = this.leftPad(date.getMonth() + 1);
        const day = this.leftPad(date.getDate());

        return [year, month, day].join("-");
    }
}