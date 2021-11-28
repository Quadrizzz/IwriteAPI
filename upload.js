
const upload = (req , res , database)=>{
    if(req.body.url === null){
        return res.status(400).json('Invalid Request')
    }

    database.transaction(trx => {
        trx.insert({
            name : req.body.bookName,
            cover: "random",
            author : req.body.Author,
            userpenname: req.body.Name,
            added: new Date(),
            likes: 0,
            downloadlink : req.body.url,
            genre: req.body.genre
        })
        .into('books')
        .returning('userpenname')
        .then((retPenname)=>{
            console.log(retPenname);
            return database.from('users')
            .where('penname', '=', retPenname[0])
            .increment('uploads', 1)
            .returning('*')
            .then((user) => {
                res.json(user[0])
            })
            
        })
        .then(trx.commit)
        .catch(trx.rollback)

    })
    .catch((err)=>{
        res.json(err)
    })


}

module.exports = {
    upload : upload,
}












// const Incomingform = require('formidable').IncomingForm;

// module.exports = function upload(req , res , db){
//     let form = new Incomingform()

//     form.on('file' , (field , file)=>{
//         db.files.push({
//             id : (Math.random() * 100).toString(),
//             filename : file.path
//         })
//     })

//     form.on('end' , ()=>{
//         res.json("upload successful")
//     })

//     form.parse(req)
// }