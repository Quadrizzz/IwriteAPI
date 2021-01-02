const register = (req, res, database, bcrypt)=>{
    const {name, email, penname,} = req.body;
    const hash = bcrypt.hashSync(req.body.password)
    if(!name || !email || !penname){
        res.status(400).json("Enter Proper Credentials")
    }

    database.transaction(trx => {
        trx.insert({
            penname : penname,
            password: hash
        })
        .into('login')
        .returning('penname')
        .then((loginPenname) => {
            return  trx('users')
            .returning('*')
            .insert({
                name: req.body.name,
                email: req.body.email,
                penname: loginPenname[0],
                password: hash
            })
            .then( (user) =>{ 
                res.json(user[0])
            })
        

        })
        .then(trx.commit)
        .catch(trx.rollback)

    })
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    })


}

module.exports = {
    register : register
}