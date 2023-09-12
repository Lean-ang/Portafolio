export function soloRol(rol) {
    return function (req, res, next) {
        if (req.user?.rol === rol) return next()
        return next(new Error(`solo disponible para rol '${rol}'`))
    }
}

