import $ from 'jquery';
import _ from 'lodash';
import bootstrap from 'bootstrap';
import renderEvents from './events.js';

var routes = [{
    dest: 'Intro.html',
    url: 'intro',
    default: true
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

var updateActive = function(route) {
    $('.nav.navbar-nav > li').removeClass('active');
    var li = $('.nav.navbar-nav a[href="#/' + route.url + '"]').parent();
    li.addClass('active');
};

// var updateListeners = function() {
//     $('[toggle]').click(function() {
//         var target = $(this).attr('toggle');
//         $(target).toggle();
//         $(this).toggleClass('fa-chevron-down fa-chevron-up');
//     });
// };

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

var getUrl = function() {
    var url = window.decodeURIComponent(window.location.hash);
    var lastIndex = url.lastIndexOf('#') || url.length;
    return (url.length > 0) ? url.substring(2, lastIndex) : '';
};

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
            // updateListeners();
        });
    } else {
        $('routes').load(`views/${route.dest}`, function() {
            setTimeout(updateScrollPosition, 100);
            // updateListeners();
        });
    }
};

onUrlChange();
window.onhashchange = onUrlChange;
