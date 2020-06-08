const register = (req, res, db)=>{
    const {name, email, penname,} = req.body;
    if(!name || !email || !penname){
        return res.status(400).json("Enter Proper Credentials")
    }
    
    db.writers.push({
        name: name,
        penname : penname,
        email : email
    })
    // .catch(err=>{
    //     res.status(500).json("Server Error")
    // })

    res.json(db.writers)

}

module.exports = {
    register : register
}