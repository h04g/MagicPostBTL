const { StatusCodes } = require('http-status-codes')

module.exports = function ErrorWrapperHandler(controller) {
    return async (req, res, next) => {
        try {
            await controller(req, res, next)
        } catch (error) {
            console.log(error);
            if (error.code) {
                return res.status(error.code).json({
                    message: error.message
                })
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Something went wrong!'
            })
        }
    }
}
