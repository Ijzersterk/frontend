import $ from 'jquery';
import _ from 'lodash';
import Handlebars from 'handlebars';
import renderEvents from './events.js';

/**
 * Adds an extra helper called loop, which accepts 'from' and 'to' parameter.
 * It loops from 'from' to 'to'.
 */
Handlebars.registerHelper('loop', function(context, options) {
    var ret = '';
    var start = options.hash.from || 0;
    var end = Math.min(options.hash.to || context.length, context.length);
    for (var i = start; i < end; i++) {
        ret = ret + options.fn(context[i]);
    }
    return ret;
});

var routes = [{
    dest: 'Intro.html',
    url: 'intro',
    default: true,
    render: renderEvents
}, {
    dest: 'Blogs.html',
    url: 'blogs'
}, {
    dest: 'Gym.html',
    url: 'gym'
}, {
    dest: 'About.html',
    url: 'about'
}, {
    dest: 'Newmember.html',
    url: 'newmember'
}, {
    dest: 'Board.html',
    url: 'board'
}, {
    dest: 'Events.html',
    url: 'events',
    render: renderEvents
}];

/**
 * Updates which navbar link is active
 * @param  {Object} route The current active route
 */
var updateActive = function(route) {
    $('.nav.navbar-nav > li').removeClass('active');
    var li = $('.nav.navbar-nav a[href="#/' + route.url + '"]').parent();
    li.addClass('active');
};

/**
 * Scrolls to the #id if present in the url
 */
var updateScrollPosition = function() {
    var url = window.decodeURIComponent(window.location.hash);
    const hashParts = url.split('#');
    if (hashParts.length > 2) {
        const hash = hashParts.slice(-1)[0];
        const element = document.querySelector(`#${hash}`);
        if (element) {
            element.scrollIntoView();
        }
    } else {
        window.scrollTo(0, 0);
    }
};

/**
 * Returns the route url
 * @return {String}
 */
var getUrl = function() {
    var url = window.decodeURIComponent(window.location.hash);
    var lastIndex = url.lastIndexOf('#') || url.length;
    return (url.length > 0) ? url.substring(2, lastIndex) : '';
};

/**
 * Calles when the window.url changes.
 * Sets the correct route.
 */
var onUrlChange = function() {
    var url = getUrl();
    var route = _.find(routes, {
        url: url
    }) || _.find(routes, {
        default: true
    });
    updateActive(route);

    if (route.render) {
        $.get(`views/${route.dest}`, function(html) {
            $('routes').html(route.render(html));
            setTimeout(updateScrollPosition, 100);
        });
    } else {
        $('routes').load(`views/${route.dest}`, function() {
            setTimeout(updateScrollPosition, 100);
        });
    }
};

onUrlChange();
window.onhashchange = onUrlChange;
