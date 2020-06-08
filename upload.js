
const upload = (req , res , db)=>{
    if(req.body.url === null){
        return res.status(400).json('Invalid Request')
    }

    // if(req.body.penname !== db.writers[0].penname){
    //     return res.status(400).json('signup to be writer')
    // }

    const url = req.body.url
    const id = req.body.id
    db.files.push({
        id : id,
        url : url
    }, err=>{
        if(err){
            console.log(err)
           return res.status(500).json("Error uploading file")
        }
    })

    res.json(db.files)


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