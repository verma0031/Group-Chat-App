function init(){
    axios.get('http://localhost:1100/user/get-product')
            .then( (response) => {
                console.log(response);

                for (var i = 0; i<response.data.allUsers.length; i++){
                    showProducts(response.data.allUsers[i]);
                    // showInTable(response.data.allUsers[i]);
                }
            })
            .catch( err => {
                console.log(err);
            })
}
function onSubmit(){
    console.log("adding product");
            const price = document.getElementById('price').value;
            const product = document.getElementById('product').value;
            const category = document.getElementById('category').value;

            console.log(price, product, category);

            const obj ={
                price,
                product,
                category
            };

            axios.post ("http://localhost:1100/user/add-product", obj)
            .then( (response) => {
                console. log (response);
                showProducts(response.data.newUserDetail);
            })
            .catch((err) => {
                document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong <h4>";
                console.log(err);
            })

}

function showProducts(productObj){
    // document. getElementById('price').value='';
    // document.getElementById("product").value='';
    // document. getElementById('category'). value='';

    const parentNode = document.getElementById(productObj.category);
    const childHTML = `<li id = ${productObj.id}> ${productObj.price} -> ${productObj.product} <button onclick=deleteProduct('${productObj.id}')>DELETE</button> </li>`;

    parentNode.innerHTML = parentNode.innerHTML + childHTML ;

}

function deleteProduct(id){
    console.log(id);
    axios.delete(`http://localhost:1100/user/delete-product/${id}`)
    .then((response) => {
        console.log(response);
        
        removeFromScreen(response);
    })
    .catch(err => {
        console.log(err);
    })

}

function removeFromScreen(userId){
    const parentNode = document.getElementById('category').value;
    const childNodeToBeDeleted = document.getElementById(userId);

    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted)
    }
}