import $ from 'jquery';
import _ from 'lodash';

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
}];

var updateActive = function(route){
    $('.nav.navbar-nav > li').removeClass('active');
    var li = $('.nav.navbar-nav a[href="#/' + route.url + '"]').parent();
    li.addClass('active');
};

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
    $('routes').load(`views/${route.dest}`, function() {
        // We have to wait until the dom is set before we can call it.
        setTimeout(updateScrollPosition, 100);
    });
};

onUrlChange();
window.onhashchange = onUrlChange;
