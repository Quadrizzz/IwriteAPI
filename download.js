const download = (req, res, database)=>{ 
    if(req.body.id){
        database.from('books')
        .where('id', '=', req.body.id)
        .increment('downloads' , 1)
        .returning('*')
        .then((user)=>{
            if(user[0]){
                res.json("Success")
            }
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    }
    else{
        res.status(400).json("Invalid ID")
    }

}


module.exports = {
    download : download
}