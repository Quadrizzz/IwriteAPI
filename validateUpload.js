const Validate = (req, res, db)=>{
    if(req.body.penname !== db.writers[0].penname){
       return  res.status(400).json("Register to be a writer")
    }
    else{
        res.json('success')
    }
}

module.exports = {
    validate : Validate
}