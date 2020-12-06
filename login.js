const login = (req, res, database, bcrypt) => {
    const {penname , password} =  req.body
    if(!penname || !password ){
        return res.status(400).json("incorrect credentials")
    }
    database.select('penname' , 'password').from('login')
    .where('penname', '=', penname)
    .then(
        data => {
            const isValid = bcrypt.compareSync(password, data[0].password)
            if (isValid){
                return database.select('*').from('users')
                .where('penname', '=', penname)
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).send("Invalid Credentials"))
            }
        }
    )
    .catch(err => {
        res.status(400).send("Invalid Credentials")
    })
}

module.exports = {
    login : login
}