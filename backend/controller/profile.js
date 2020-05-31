async function profile(req, res) {

    const user = req.session.email
	if(user){
    res.send({"user-email":user,"session":"active","session-id":req.session.id})
	}
	else{
	res.send({"session":"expired"})
	}
}

module.exports = {
    profile
};