const profileimage = (req, res, database)=>{
    const  url = req.body.url
    const id = req.body.id
    if(!id || !url){
        res.status(400).json("Invalid")
    }
    else{
        database('users')
        .where('id', `${id}`)
        .returning('*')
        .update({
            profileimage : url
            })
            .then((user)=>{
                if(user[0]){
                    res.json('successful')
                }
            })
            .catch(err => {
                res.json(err)
            })

    }
}


module.exports = {
    profileimage : profileimage
}