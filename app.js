const express = require('express');
const productRouter = require('./routes/product');
const app = express();
const PORT = process.env.PORT || 8080;


app.listen(
    PORT,
    () =>
        console.log(`its alive on http://localhost:${PORT}`)

)

app.use('/product', productRouter);

app.use((req, res, next) => {
    res.status(404).send('Sorry, we could not find that!');
});







