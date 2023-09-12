export function getCurrentSessionController(req, res, next) {
   try {
     res.json(req.user)
   } catch (error) {
    req.logger.error(error.message)
    next(error)
   }
}

export async function logoutSessionsController(req, res, next) {
    try {
        res.clearCookie('jwt_authorization', {
            signed: true,
            httpOnly: true
        }) 
        res.sendStatus(200)
    } catch (error) {
        req.logger.error(error.message)
        next(error)
    }
}

