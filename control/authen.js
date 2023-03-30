const Session = require("../model/user").User;


module.exports.authentication = async (req, res, next) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.redirect('/login?q=session-expired');
     
    }
    try {
        const user = await Session.findById(req.session.userId);
        
        if (!user) {
            return res.redirect('/login?q=session-expired');        
        }
        next();
        
    } catch (err) {
        console.log(err);
        res.json({ msg: 'Server error. Please reload page after sometime' })
    }
};

