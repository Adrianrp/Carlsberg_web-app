/*Tracker.autorun(function () {
    var user = Meteor.user();
    if (user) {
        //console.log(user.services.facebook);
    }
});*/

Meteor.startup(() => {
    CanCollection.remove({});

    if (CanCollection.find().count() === 0) {
        console.log('going to add fresh data');
        // Adjust probability of winning here
        var difficulty = 4;
        var totalHits =[{
            hits: 0,
            miss: 0
        }];
        var dataCans = [{
            canName: 'one',
            isOpened: false,
            randomNumber: Math.floor(Math.random() * difficulty)
        }, {
            canName: 'two',
            isOpened: false,
            randomNumber: Math.floor(Math.random() * difficulty)
        }, {
            canName: 'three',
            isOpened: false,
            randomNumber: Math.floor(Math.random() * difficulty)
        }, {
            canName: 'four',
            isOpened: false,
            randomNumber: Math.floor(Math.random() * difficulty)
        }, {
            canName: 'five',
            isOpened: false,
            randomNumber: Math.floor(Math.random() * difficulty)
        }, {
            canName: 'six',
            isOpened: false,
            randomNumber: Math.floor(Math.random() * difficulty)
        }];

        while (dataCans.length > 0) {
            CanCollection.insert(dataCans.pop(), {validate: false});
        }
        while (totalHits.length > 0) {
            HitsCollection.insert(totalHits.pop(), {validate: false});
        }
        console.log('Done loading CAN data');
        tl = new TimelineLite();
    }
});