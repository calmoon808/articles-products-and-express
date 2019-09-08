const express = require('express');
const articleRouter = express.Router();
const articles = require("../db/articles");
let hasError = false;
let alreadyExists = false;
let notInIndex = false;

articleRouter.get('/', (req, res) => {
    res.render('articles/index', {article: articles.getArticles(), type: 'articles'});
});

articleRouter.get('/new', (req, res) => {
    res.render('articles/new', {type: 'articles', hasError: hasError});
    hasError = false;
    alreadyExists = false;
});

articleRouter.get("/:urlTitle", (req, res) => {
    let filterArr = articles.getArticles().filter((article) => article.urlTitle == req.params.urlTitle);
    if (filterArr.length === 0){
        res.render('404', {type: 'articles'});
    } else {
        res.render('articles/article', {article: articles.getArticles()[articles.getArticles().indexOf(filterArr[0])], type: 'articles', urlTitle: req.params.urlTitle});
    }
});

articleRouter.get("/:urlTitle/edit", (req, res) => {
    res.render('articles/edit', {type: 'articles', urlTitle: req.params.urlTitle, notInIndex: notInIndex});
});

articleRouter.post('/', (req, res) => {
    if (!req.body.title || !req.body.body || !req.body.author){
        hasError = true;
        res.redirect(`/articles/new`);
    } else {
        if (articles.getArticles().filter((article) => article.title === req.body.title.trim()).length === 0){
            articles.addArticle(req.body);
            res.redirect(`/articles`);
        } else {
            alreadyExists = true;
            res.redirect('/articles/new');
        };
    };
});

articleRouter.put('/:urlTitle', (req, res) => {
    if (articles.getArticles().filter((article) => article.urlTitle == req.params.urlTitle.trim()).length === 0){
        notInIndex = true;
        res.redirect(`/articles/:urlTitle/edit`);
    } else {
        articles.updateArticle(req.body, req.params.urlTitle.trim());
        res.redirect(`/articles/${req.body.title}`);
    }
});

articleRouter.delete('/:urlTitle', (req, res) => {
    if (articles.getArticles().filter((article) => article.urlTitle == req.params.urlTitle).length === 0){
        notInIndex = true;
        res.redirect('/articles/:urlTitle');
    } else {
        articles.deleteArticle(req.params.urlTitle);
        res.redirect('/articles');
    }
})

module.exports = articleRouter;