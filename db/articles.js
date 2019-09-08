let articles = [];
module.exports = {
    getArticles: () => {
        return articles;
    },
    addArticle: (data) => {
        let newObj = {
            title: data.title.trim(),
            body: data.body.trim(),
            author: data.author.trim(),
            urlTitle: data.title.replace(/ /gi, '-').trim()
        }
        articles.push(newObj);
    },
    updateArticle: (data, urlTitle) => {
        let updateArr = articles.filter((article) => article.urlTitle === urlTitle);
        if (updateArr.length === 1){
            if (data.title){
                articles[articles.indexOf(updateArr[0])].title = data.title;
            };
            if (data.author){
                articles[articles.indexOf(updateArr[0])].author = data.author;
            };
            if (data.body){
                articles[articles.indexOf(updateArr[0])].body = data.body;
            };
            articles[articles.indexOf(updateArr[0])].urlTitle = data.title.replace(/ /gi, '-');
        };
    },
    deleteArticle: function(urlTitle){
        let deleteArr = articles.filter((article) => article.urlTitle == urlTitle);
        if (deleteArr.length === 1){
            articles.splice(articles.indexOf(deleteArr[0]), 1);
        }
    }
}