const bcrypt = require('bcryptjs');
function validPassword(typedPassword, userPassword) {
    let isCorrectPassword = bcrypt.compareSync(typedPassword, userPassword);

    return isCorrectPassword //boolean return
}

module.exports = {
    validPassword,
    // any other methods needed go here
}