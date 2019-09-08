let products = [];
let count = 1;
module.exports = {
    getProducts: function(){
        return products;
    },
    addProduct: function (data){
        let newObj = {
            id: count,
            name: data.name,
            price: data.price,
            inventory: data.inventory
        };
        products.push(newObj);
        count++;
    },
    updateProduct: function (data, id){
        let updateArr = products.filter((product) => product.id == id);
        if (updateArr.length === 1){
            if (data.name){
                products[products.indexOf(updateArr[0])].name = data.name;
            };
            if (data.price){
                products[products.indexOf(updateArr[0])].price = data.price;
            };
            if (data.inventory){
                products[products.indexOf(updateArr[0])].inventory = data.inventory;
            };
        };
    },
    deleteProduct: function(id){
        let deleteArr = products.filter((product) => product.id == id);
        if (deleteArr.length === 1){
            products.splice(products.indexOf(deleteArr[0]), 1);
        };
    }
}