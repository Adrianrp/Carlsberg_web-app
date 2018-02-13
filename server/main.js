
/*  SCHEMA DEFINITIONS */
FanSchema = new SimpleSchema({
    'fbId': {
        type: String,
        label: 'Facebook Id'
    },
    'name': {
        type: String,
        label: 'Fan Name'
    }, 'email': {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: 'Fan email'
    },
    'isWinner': {
        type: Boolean,
        label: 'Are you a winner?'
    },
    'lastPlayed': {
        type: Date,
        label: 'Last time played',
        autoValue: function () {
            if (this.isUpdate) {
                return new Date;
            }
        }
    },
    'createdAt': {
        type: Date,
        label: 'Date created',
        autoValue: function () {
            if (this.isInsert) {
                return new Date
            }
        }
    }
});

GameStateSchema = new SimpleSchema({
    'totalPlayers': {
        type: Number,
        label: 'Total amount of players'
    },
    'winnersOfTheDay': {
        type: Number,
        label: 'Amount of winners everyday'
    }
});
// TODO Build a schema for the cans, for security reasons.

FanCollection.attachSchema(FanSchema);
GameStateCollection.attachSchema(GameStateSchema);
console.log('starting Meteor App');

Meteor.startup(() => {

    //CanCollection.remove({});
/*    FanCollection.remove({});
     CanCollection.remove({});
     GameStateCollection.remove({});*/
    //Initialize some data into Mongo
    if (FanCollection.find().count() === 0) {
        console.log('going to add fresh data');
        var dataCans = [{
            canName: 'one',
            isOpened: false
        }, {
            canName: 'two',
            isOpened: false
        }, {
            canName: 'three',
            isOpened: false
        }, {
            canName: 'four',
            isOpened: false
        }, {
            canName: 'five',
            isOpened: false
        }, {
            canName: 'six',
            isOpened: false
        }];

        var dataFans = [{
            fbId: '000000',
            name: 'Benito',
            email: 'a@a.com',
            isWinner: false,
            lastPlayed: new Date(),
            createdAt: new Date()

        }];

        var gameData = [{
            isResting: false,
            totalPlayers: 0,
            winnersOfTheDay: 0
        }];

        while (dataFans.length > 0) {
            //Validate: false means that only on the first operation will skip validation
            FanCollection.insert(dataFans.pop(), {validate: false});
        }
        //console.log('Done loading FAN data');
        /*while (dataCans.length > 0) {
            CanCollection.insert(dataCans.pop(), {validate: false});
        }
        console.log('Done loading CAN data');*/

        while (gameData.length > 0) {
            GameStateCollection.insert(gameData.pop(), {validate: false});
        }
        //console.log('Done loading GAMESTATE data');
    }

    console.log('All Done');
});


/* PRIVATE METHODS */
/* --------------- CANS ----------------------------- */

Meteor.methods({
    'resetCans': function () {
        CanCollection.remove({});
    }
});


Meteor.methods({
    'createCans': function () {
        if (CanCollection.find().count() === 0) {
            console.log('going to add fresh data');
            var randomNumber = Math.floor(Math.random() * 3);
            var dataCans = [{
                canName: 'one',
                isOpened: false
            }, {
                canName: 'two',
                isOpened: false
            }, {
                canName: 'three',
                isOpened: false
            }, {
                canName: 'four',
                isOpened: false
            }, {
                canName: 'five',
                isOpened: false
            }, {
                canName: 'six',
                isOpened: false
            }];

            while (dataCans.length > 0) {
                CanCollection.insert(dataCans.pop(), {validate: false});
            }
            console.log('Done loading CAN data');
        }
    }
});

Meteor.publish(null, function (userId) {
    return Meteor.users.find({
        _id: this.userId
    }, {
        fields: {
            lastPlayed: 1
        }
    })
});
Meteor.publish('userData', function (userId) {
    if (!this.userId) {
        console.log('in user data server now');
        return this.ready();
    }
    return users.find({
        _id: this.userId
    }, {
        fields: users.services.facebook
    })
});

