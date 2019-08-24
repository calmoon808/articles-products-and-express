const express = require('express');
const articleRouter = express.Router();
const articles = require("../db/articles");

articleRouter.get('/', (req, res) => {
    res.render('articles/index', {article: articles.getArticles(), type: 'articles'});
});

articleRouter.get('/new', (req, res) => {
    res.render('articles/new', {type: 'articles'});
});

articleRouter.get("/:title", (req, res) => {
    let filterArr = articles.getArticles().filter((article) => article.title == req.params.title);
    if (filterArr.length === 0){
        res.send('PAGE NOT FOUND');
    } else {
        res.render('articles/article', {article: articles.getArticles()[articles.getArticles().indexOf(filterArr[0])], type: 'articles', title: req.params.title});
    }
});

articleRouter.get("/:title/edit", (req, res) => {
    res.render('articles/edit', {type: 'articles', title: req.params.title});
});

articleRouter.post('/', (req, res) => {
    if (!req.body.title || !req.body.body || !req.body.author){
        res.redirect(`/articles/new`);
        console.error('fill in all parameters');
    } else {
        if (articles.getArticles().filter((article) => article.title === req.body.title).length === 0){
            articles.addArticle(req.body);
            res.redirect(`/articles`);
        } else {
            res.send('article already exists.');
        };
    };
});

articleRouter.put('/:title', (req, res) => {
    if (articles.getArticles().filter((article) => article.title == req.params.title).length === 0){
        res.redirect(`/articles/:title/edit`);
        console.error('title out of index');
    } else {
        articles.updateArticle(req.body, req.params.title);
        res.redirect(`/articles/${req.body.title}`);
        // res.send();
    }
});

articleRouter.delete('/:title', (req, res) => {
    if (articles.getArticles().filter((article) => article.title == req.params.title).length === 0){
        res.redirect('/articles/:title');
        console.error('title out of index');
    } else {
        articles.deleteArticle(req.params.title);
        res.redirect('/articles');
    }
})

module.exports = articleRouter;