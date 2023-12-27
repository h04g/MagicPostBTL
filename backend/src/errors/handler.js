module.exports = function ErrorWrapperHandler(controller) {
    return async (req, res, next) => {
        try {
            await controller(req, res, next)
        } catch (error) {
            console.log(error)
            return res.status(error.statusCode).json({
                message: error.message
            })
        }
    }
}
