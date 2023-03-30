const Session = require("../model/admin").Admin;


module.exports.authenticationadmin = async (req, res, next) => {
    const adminId = req.session.userId;
    if (!adminId) {
        return res.redirect('/login?q=session-expired');
    }
    try {
        const admin = await Session.findById(req.session.userId);
        
        if (!admin) {
            return res.redirect('/logadmin?q=session-expired');
        }

        next();
        
    } catch (err) {
        console.log(err);
        res.json({ msg: 'Server error. Please reload page after sometime' })
    }
};

