const like = (req, res, database)=>{
    if(req.body.reaction === 'like'){
        database.from('books')
        .where('id', '=', req.body.id)
        .increment('likes' , 1)
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
    if(req.body.reaction === 'dislike'){
        database.from('books')
        .where('id', '=', req.body.id)
        .decrement('likes' , 1)
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
}


module.exports = {
    like : like
}