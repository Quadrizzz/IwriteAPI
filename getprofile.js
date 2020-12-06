const getprofile = (req, res, database)=>{
    const {id} = req.body;
    if (!id){
        return res.status(400).json("Failed to login, check credentials")
    }
    else{
        database.select().from('users').where('id', `${id}`)
        .then((user)=>{
           return res.status(200).json(user)
        })
        .catch(err =>{
            return res.status(400).json(err)
        })
    }
}

module.exports ={
    getprofile : getprofile
}