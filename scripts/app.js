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

var updateScrollPosition = function() {
    window.location.hash = window.decodeURIComponent(window.location.hash);
    const hashParts = window.location.hash.split('#');
    if (hashParts.length > 2) {
        const hash = hashParts.slice(-1)[0];
        const element = document.querySelector(`#${hash}`);
        if (element) {
            element.scrollIntoView();
        }
    } else {
        window.scrollTo(0, 0);
    }
}

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
    $('routes').load(`views/${route.dest}`, function() {
        updateScrollPosition();
    });
};

onUrlChange();
window.onhashchange = onUrlChange;