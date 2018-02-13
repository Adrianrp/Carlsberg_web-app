Tracker.autorun(function () {

});
Template.msgBanner.helpers({
    introText: function () {
        if (Session.get('misses') >= 4) {
            return '<h1>PRØV LYKKEN<br>IGEN I MORGEN</h1>';
        }
        if (Session.get('misses') > 0) {
            return '<h1>ØV FOR FAN!<br> PRØV IGEN</h1>';


        }
        return '<h2 class="msg-hero">ÅBN KOLDE CARLSBERGDÅSER HER!</h2>';
    },
    subtitle: function () {
        if (Session.get('misses') === 0) {
            return '<p>Find tre TV2 Play logoer og vind</p>';
        }
        return '';
    }
});

Template.msgBanner.events({
    'click .msg-container': function (evt, template) {
        slideUpMsg(template);
        //console.log(template.firstNode);
    }
});

function slideUpMsg(template) {
    tl.to(template.firstNode, 0.5, {top: -70, alpha: 0, ease: Back.easeIn})
        .to(template.firstNode, 0, {display: 'none'});
}
