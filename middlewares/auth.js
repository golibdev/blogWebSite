const isAuth = (req, res, next) => {
    if(req.session.isLogged) {
        return res.redirect('/')
    }
    next()
}

const protected = (req, res, next) => {
    if(!req.session.isLogged) {
        return res.redirect('/auth/login')
    }
    next()
}

module.exports = {
    isAuth,
    protected
}