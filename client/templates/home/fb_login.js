Template.fbLogin.onCreated(function () {
    console.log(Meteor.userId());
    this.subscribe('lastPlayed', Meteor.userId())
});
/*Accounts.onCreateUser(function () {

})*/
Template.fbLogin.events({
    'click .fb-login-js': function (evt) {

        Meteor.loginWithFacebook({requestPermissions: ['email', 'user_birthday', 'user_location']}, function (err) {
            if (err) {
                throw  new Meteor.Error("Facebook login failed");
            }
            const user = Meteor.user();
            const userId = user._id;
            const timeNow = new Date();
            console.log('time'+ user.profile.lastPlayed);
            if (!user.profile.lastPlayed) {
                console.log('in new last played profile');
                Meteor.users.update({
                    _id: userId
                }, {
                    $set: {
                        'profile.lastPlayed': timeNow,
                        'profile.isAWinner': false
                    }
                });
                console.log(FlowRouter);
                FlowRouter.go('spil');
            }
            if (user.profile.isAWinner) {
                // TODO Make a "You already are a winner message"
                console.log('dont you be greedy you bastard!');
            } else {
                const timeElapsed = timeNow.getTime() - user.profile.lastPlayed.getTime();
                //console.log('timeElapsed: ' + timeElapsed);
                //console.log('Time now in numbers: '+ timeNow.getTime());
                //if (timeElapsed < timeNow.getTime()) {  ****** ORIGINAL
                if (timeElapsed > timeNow.getTime()) {
                // TODO redirect to wait time message
                    return console.log('wait at least 24 hrs before playing again');
                }
                // TODO redirect to game intro? test that it works
                FlowRouter.go('spil');
                console.log('ok  more than 24 hrs already, go ahead');

            }

        })
    },
    'click .fb-logout-js': function (evt) {
        Meteor.logout(function (err) {
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});

