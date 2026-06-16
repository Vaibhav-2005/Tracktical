const isAuthenticated = async (req, res, next) => {
    next();
}

const isSuperAdminAuthenticated = async (req, res, next) => {
    next();
}

export { isAuthenticated, isSuperAdminAuthenticated };