const express = require('express');
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const app = express();

const articleRoutes = require('./routes/articles');
const productRoutes = require('./routes/products');
const PORT = 8080;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));
app.engine('hbs', exphbs({
    extname: '.hbs',
    helpers: {
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if( lvalue!=rvalue ) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    }
}));

app.set('view engine', '.hbs');
app.use('/products', productRoutes);
app.use('/articles', articleRoutes);
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});