/**
 * Specify the format so the date is correctly parsed.
 * When using moment, this functions must be used to parse the dates in the events correctly.
 * @param  {String} date The date in YYYY-MM-DD format
 * @return {moment}      A moment object
 */
var parseMoment = function(date) {
    return moment(date, 'YYYY-MM-DD');
};

/**
 * @param  {moment} date A date moment object
 * @return {String}      A readable string telling how much weeks and days left till `date`
 */
var timeTo = function(date) {
    var now = moment();
    var diffWeeks = date.diff(now, 'weeks');
    var diffDays = date.diff(now, 'days') % 7 + 1;

    var day = diffDays === 1 ? 'day' : 'days';
    var week = diffWeeks === 1 ? 'week' : 'weeks';

    if (diffWeeks === 0) {
        return `${diffDays} ${day} left`;
    }
    return `${diffWeeks} ${week} and ${diffDays} ${day} left`;
};

/**
 * Renders the page with the events
 * @param  {DOMHTML} page The HTML events.html page.
 * @return {Promise}      Where the success returns the html page which was rendered.
 */
var renderEvents = function(page) {
    return new Promise(function(resolve, reject) {
        $.get('data/competitions.json', function(data){
            var viewData = _(data)
                .filter(function(event) {
                    return moment().isBefore(parseMoment(event.date));
                })
                .each(function(event) {
                    event.shortDate = parseMoment(event.date).format('D MMMM');
                    event.readableDate = parseMoment(event.date).format('D MMMM YYYY');
                    event.timeTo = timeTo(parseMoment(event.date));
                })
                .sortBy(function(event) {
                    return parseMoment(event.date).unix();
                })
                .value();
            resolve(Handlebars.compile(page)(viewData));
        });
    });
};
