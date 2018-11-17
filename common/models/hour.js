'use strict';

// validates that the quantity is in the range (0, 24)
function quantityIsValid(err, done) {
    var quantity = this.quantity;
    setTimeout(function() {
        if(quantity <= 0 || quantity > 24) {
            err();
        }
        done();			
    }, 1000);	
}

module.exports = function(Hour) {
    Hour.validateAsync('quantity', quantityIsValid, {message: 'Hours quantity must be greater than zero and can\'t exceed one day'});
};


