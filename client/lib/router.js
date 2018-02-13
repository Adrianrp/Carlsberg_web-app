exposed = FlowRouter.group({});
loggedIn = FlowRouter.group({
    triggersEnter: [
        function() {
            var route;
            if (!(Meteor.loggingIn() || Meteor.userId())) {
                /*route = FlowRouter.current();
                if (route.route.name !== 'spil') {
                    Session.set('redirectAfterLogin', route.path);
                }*/
                return FlowRouter.go('home');
            }
        }
    ]
});

exposed.route('/', {
    name: 'home',
    action: function () {
        Meteor.logout(function (err) {
            if (err) {
                throw new Meteor.Error('logout failed');
            }
        });
        BlazeLayout.render('masterLayout', {content: 'home'});
    }
});

loggedIn.route('/spil', {
    name: 'spil',
    action: function () {
        if (!Meteor.user()) {
            return BlazeLayout.render('masterLayout', {content: 'home'});
        }
        const timeNow = new Date();
        // TODO It should check only the time if the user has played before, meaning it has to check that profile.lastPlayed
        // exists, if it does it has to compare times, otherwise it should let them in 
        // I THINK ACTUALLY IT SHOULD CHECK FIRST ALWAYS BECAUSE AS SOON AS THE LOGIN THE PROFILE GETS A LASTPLAYED ENTREE.
        const timeElapsed = timeNow.getTime() - Meteor.user().profile.lastPlayed.getTime();
        if (timeElapsed < timeNow.getTime()) {
            BlazeLayout.render('masterLayout', {content: 'home'});
        }
        BlazeLayout.render('masterLayout', {content: 'spil'});
    }
});

FlowRouter.notFound = {
    action: function() {
        return BlazeLayout.render('masterLayout', {content: 'home'});
    }
};