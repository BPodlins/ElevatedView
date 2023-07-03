class ExpressError extends Error {
    constructor(messsage, statusCode){
        super();
        this.messsage = messsage;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;