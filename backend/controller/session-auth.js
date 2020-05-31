async function check_session(req, res, next) {
    const {sesid} = req.body
    // console.log("sesid",sesid)
	if(sesid){
	store.get(sesid, (err,sessio) =>{
        //console.log(sessio)
        if(err){
        console.log("error",err)
        }
		if(typeof sessio !== undefined && sessio){	
            
            req.session = sessio
		}
	})
	}
	next();
}

async function redirect_to_login(req, res, next) {

    if(!req.session.email){
        res.send("plslogin")
    }
    else{
        next()
    }
}

async function redirect_to_profile(req, res, next) {
    if(req.session.userId){
        res.redirect("/profile")
    }
    else{
        next()
    }
}

module.exports = {
    check_session,
    redirect_to_login,
    redirect_to_profile
};