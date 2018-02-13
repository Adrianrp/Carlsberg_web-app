Template.can.onRendered(function () {

     this.autorun(function () {
         console.log();
     });
});

Template.can.events = {
    'click .js-can-item': function (evt, template) {
        evt.stopImmediatePropagation();
        var msgBanner = template.lastNode.offsetParent.lastElementChild;
        var splashContainer = evt.currentTarget.children[0];
        var splash1 = evt.currentTarget.childNodes[1].children[0];
        var splash2 = evt.currentTarget.childNodes[1].children[1];
        var splash3 = evt.currentTarget.childNodes[1].children[2];
        var drops = evt.currentTarget.childNodes[1].children[3];
        var canOpen = evt.currentTarget.children[2];
        var canClosed = evt.currentTarget.children[1];
        var winToken = evt.currentTarget.children[3];
        var canId = this._id;
        var hitId = HitsCollection.findOne();
        var misses = Session.get('misses');

        console.log(evt);
        if (!this.isOpened) {
            CanCollection.update(canId, {
                $set: {
                    isOpened: true
                }
            });

            if (this.randomNumber === 2) {
                // Winner is the lucky number
                HitsCollection.update(hitId._id,
                    {
                        $inc: {
                            hits: 1
                        }
                    });

                tl.to(canClosed, 0, {display:'none'})
                    .to(winToken, 0, {display:'block'});
                return;
            }

            tl.add('enter')
                .to(evt.target, 0, {display:'none'}, 'enter')
                .to(canOpen, 0, {display:'block'}, 'enter')
                .to(drops, 0, {display:'block'}, 'enter')
                .to(splashContainer, 0, {display:'block'}, 'enter')
                .to(splash1, 0, {display: 'block'}, 'enter+=0.1')
                .to(splash1, 0, {display: 'none'}, 'enter+=0.2')
                .to(splash2, 0, {display: 'block'}, 'enter+=0.2')
                .to(splash2, 0, {display: 'none'}, 'enter+=0.3')
                .to(splash3, 0, {display: 'block'}, 'enter+=0.3')
                .to(drops, 1.5, {alpha: 0, ease:Power1.easeOut}, 'enter+=0.2')
                .to(splash3, 0.7, {alpha: 0, ease:Power1.easeOut}, 'enter+=0.3')
                .to(splashContainer, 0, {display:'none'});

            slideDownMsg(msgBanner);
            
            // This records how many opened cans there are without a winToken
            misses++;
            Session.set('misses', misses);
            console.log(msgBanner);

            return console.log('your random number ' + this.randomNumber);

        } else {
            return console.log('disabled');
        }
    }
};
function slideDownMsg(template) {
    console.log(template);
    tl.to(template, 0, {display:'block'})
        .to(template, 0.2, {top: '0%', alpha: 1, ease:Back.easeOut});
}