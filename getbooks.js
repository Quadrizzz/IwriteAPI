const getBooks = (req, res, database)=>{
    database.select("*").from('books')
    .then((books)=>{
        return res.status(200).json(books);
    })
    .catch((err)=>{
        return res.status(400).json(err);
    })
}

module.exports = {
    getBooks : getBooks
}