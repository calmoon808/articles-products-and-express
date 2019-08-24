let articles = [];
module.exports = {
    getArticles: () => {
        return articles;
    },
    addArticle: (data) => {
        let newObj = {
            title: data.title,
            body: data.body,
            author: data.author,
            urlTitle: data.title.replace(' ', '-')
        }
        articles.push(newObj);
    },
    updateArticle: (data, title) => {
        let updateArr = articles.filter((article) => article.title == title);
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
            articles[articles.indexOf(updateArr[0])].urlTitle = data.title.replace(' ', '-');
            console.log(data.t)
            console.log(articles);
        };
    },
    deleteArticle: function(title){
        console.log(articles);
        let deleteArr = articles.filter((article) => article.title == title);
        if (deleteArr.length === 1){
            articles.splice(articles.indexOf(deleteArr[0]), 1);
        }
        console.log(articles);
    }
}