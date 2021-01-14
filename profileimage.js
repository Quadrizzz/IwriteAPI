const profileimage = (req, res, database, fetch, FormData)=>{
    const  file = req.files.file
    const id = req.body.id
    if(!id || !file){
        res.status(400).json("Invalid")
    }
    else{

        const inputs = new FormData()
        inputs.append('file', file)
        inputs.append('upload_preset', 'profileimage')
        fetch('	https://api.cloudinary.com/v1_1/azur-xx/image/upload',{
            method: 'POST',
            body:inputs
        })
        .then( (response) => {
                return response.json()
            }
        )
        .then( (data)=>{
                console.log(data)
                database('users')
                .where('id', `${id}`)
                .returning('*')
                .update({
                    profileimage : data.secure_url
                })
                .then((user)=>{
                    if(user[0]){
                        res.json('successful')
                    }
                })
                .catch(err => {
                    res.json(err)
                })
            }
        )
        .catch(err=>{
            res.json(err)
        })
    }
}


module.exports = {
    profileimage : profileimage
}