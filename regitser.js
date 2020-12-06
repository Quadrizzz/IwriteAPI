const register = (req, res, database, bcrypt)=>{
    const {name, email, penname,} = req.body;
    const hash = bcrypt.hashSync(req.body.password)
    if(!name || !email || !penname){
        return res.status(400).json("Enter Proper Credentials")
    }
    
    database('users').insert({
        name: req.body.name,
        email: req.body.email,
        penname: req.body.penname,
        password: hash
    })
    .catch(err => {
        res.status(400).json(err)
    })
    .then( () =>{ return database('login').insert({
        penname: req.body.penname,
        password: hash
    })}
    )
    .then( database.select().from('users')
            .then((users)=> {
                return res.json(users)
            }))
    .catch(err => {
        res.status(400).json(err)
    })


}

module.exports = {
    register : register
}