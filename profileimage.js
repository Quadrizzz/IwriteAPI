const profileimage = (req, res, database)=>{
    const  url = req.body.url
    const id = req.body.id
    if(!id || !url){
        res.status(400).json("Invalid")
    }
    else{
        console.log(url)
        console.log(id)
        database('users')
        .where('id', `${id}`)
        .update(
            'profileimage' , `${url}`
        )
        .returning('profileimage')
        .then((profileimage)=>{           
            res.json(profileimage)
            
        })
        .catch(err => {
            res.json(err)
        })

    }
}


module.exports = {
    profileimage : profileimage
}