async function logout(req, res) {
    req.session.destroy(err=>console.log(err))
    res.clearCookie('Cookie-SID')
}

module.exports = {
    logout
};