export async function registroController(req, res, next) {
    try {
    res.status(201).json(req.user)
    } catch (error) {
        next(error)
    }
}

export async function loginController(req, res, next) {
    try {
    res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

export async function logoutController(req, res, next) {
 try {
       req.logout(err => {
        res.sendStatus(200)
    })
 } catch (error) {
    next(error)
 }
}
