$(document).ready(function() {
    $('.navbar a.dropdown-toggle').on('click', function(e) {
        var elmnt = $(this).parent().parent();
        if (!elmnt.hasClass('nav')) {
            var li = $(this).parent();
            var heightParent = parseInt(elmnt.css('height').replace('px', '')) / 2;
            var widthParent = parseInt(elmnt.css('width').replace('px', '')) - 10;

            if(!li.hasClass('open')) li.addClass('open')
            else li.removeClass('open');
            $(this).next().css('top', heightParent + 'px');
            $(this).next().css('left', widthParent + 'px');

            return false;
        }
    });
});


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
    dest: 'Board_2014-2015.html',
    url: 'board_2014-2015'
},{
    dest: 'Board_2015-2016.html',
    url: 'board_2015-2016'
},{
    dest: 'Board_2016-2017.html',
    url: 'board_2016-2017'
},{
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
            route.render(html).then(function(result) {
                $('routes').html(result);
                setTimeout(updateScrollPosition, 100);
            }, function(err){
                console.error(err);
            });
        });
    } else {
        $('routes').load(`views/${route.dest}`, function() {
            setTimeout(updateScrollPosition, 100);
        });
    }
};

onUrlChange();
window.onhashchange = onUrlChange;
