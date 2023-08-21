const Errorhandler = require("../utils/errorhandler");



module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server issue"

    if(err.name === "castError"){
    const message = `REsource not Found. Invalid:  ${err.path}`
    err = new Errorhandler(message,400)
    }


    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
};