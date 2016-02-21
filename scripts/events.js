import Handlebars from 'handlebars';
import _ from 'lodash';
import moment from 'moment';

var data = [{
    image: 'https://scontent-ams3-1.xx.fbcdn.net/hphotos-xlf1/v/t1.0-9/12509125_940621742690505_3793179593775040982_n.jpg?oh=38a413dc1d3cd31bee8526a3cd4f1e48&oe=57284C60',
    title: 'SAP Cup',
    date: '2016-12-10',
    link: 'http://www.sapcup.eu/'
}, {
    date: '2016-04-17',
    title: 'NK RAW Junior',
    image: 'https://scontent-ams3-1.xx.fbcdn.net/hphotos-xlf1/v/t1.0-9/12509125_940621742690505_3793179593775040982_n.jpg?oh=38a413dc1d3cd31bee8526a3cd4f1e48&oe=57284C60',
    link: 'http://wimwam.nl/content/nationals-classic-powerlifting-sub-juniors'
}, {
    date: '2016-04-24',
    title: 'Delft\'s Strongest Student',
    image: 'img/logorood.png',
    link: 'http://www.ijzersterkdelft.nl'
}, {
    date: '2016-06-05',
    title: 'Beginner Competition',
    image: 'http://sportcentrumtopfit.nl/wp-content/uploads/2015/03/1795661_123637204497455_752408052_n.jpg',
    link: 'https://www.facebook.com/events/1227442820604545/'
}, {
    date: '2016-06-12',
    title: 'DRC-Cup Open Powerlifting competition',
    image: 'https://tskvspartacus.nl/wp-content/uploads/2015/06/header-site.lossy_.png',
    link: 'https://www.facebook.com/events/137843979928544/'
}];

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
 * @return {DOMHTML}      A rendered page.
 */
var render = function(page) {
    var viewData = _(data)
        .each(function(event) {
            event.readableDate = parseMoment(event.date).format('D MMMM YYYY');
            event.timeTo = timeTo(parseMoment(event.date));
        })
        .sortBy(function(event) {
            return parseMoment(event.date).unix();
        })
        .value();
    return Handlebars.compile(page)(viewData);
};

export
default render;
