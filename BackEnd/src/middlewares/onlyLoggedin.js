export function onlyLoggedin(req, res, next) {
    if (!req.isAuthenticated()) {
        res.json({Error: "Error de Permisos", message: "Usuario no logueado. Para ver esta informacion inicie sesion"})
        return next(new Error('ERROR_DE_PERMISOS'));
    }
    next();
}

export function onlyAdmin(req, res, next) {
if(req.user.rol==="Admin") {next ()} else {
    res.json({Error: "Error de Permisos", message: "Solo la Administracion puede acceder a esta informacion."})
    next(new Error('ERROR_DE_PERMISOS'))
}}
export function Owner(req, res, next) {
if(req.user.rol==="Admin" ||req.user.rol==="Mod" ) {next ()} else {
    res.json({Error: "Error de Permisos", message: "Solo la Administracion o Mods pueden acceder a esta informacion."})
    next(new Error('ERROR_DE_PERMISOS'))
}}

export function onlyMod(req, res, next) {
if(req.user.rol==="Mod") {next ()} else {
    res.json({Error: "Error de Permisos", message: "Solo los Mods pueden accerder a esta informacion."})
    
}}
