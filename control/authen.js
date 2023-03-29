const Session = require("../model/listItem").users;

module.exports.authentication = async(req, res, next) =>{
    const username = req.Session.username;
    if(!username){
        return res.redirect('/login?q=session-expired');
    }
    try{
        const users = await Session.findById(req.session.username);

        if (!users) {
            return res.redirect('/login?q=session-expired');
        }
        next();
    }catch(err){
        console.log(err);
        res.json({msg: "Reload this page!"})
    }
};