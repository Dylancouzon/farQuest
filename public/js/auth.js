const path = require('path');
//Defines the root directory
var appDir = path.dirname(require.main.filename)

// Test if the user is authentificated
module.exports = {
    authTest: (req, res, cb) => {

        if (!req.session.logged_in) {
            res.sendFile(path.join(appDir, 'public', 'login.html'));
            return
        } else {
            cb();
        }
    }
};