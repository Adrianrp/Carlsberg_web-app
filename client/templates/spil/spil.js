Tracker.autorun(function () {
});
Template.spil.onRendered(function () {
    //Set initial value for the cans, this will help later on to show the correct text in the msg banner
    Session.set('misses', 0);

    this.autorun(function () {
        var jackpot = HitsCollection.findOne();
        console.log(jackpot.hits);
        if (jackpot.hits === 3) {
            // TODO Connect form to the database of fansCollection
            // TODO Make the "Thank you" tekst to show after submitting the form
            Modal.show('modalSignUp');
        } else {

        }
    })
});

