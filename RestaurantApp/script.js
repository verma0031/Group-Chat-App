function clickSubmit(){
    let order={
        order_price : document.getElementById('price').value ,
        order_dish : document.getElementById('dish').value ,
        tableno : document.getElementById('category').value 
    }

    axios
    .post('https://crudcrud.com/api/fa43295a04c044da8ea06745413f84ec/appointmentData' , order)
    .then(res =>{
        showOrderOnScreen(res.data)
        console.log(res.data);
    })
    .catch(err=>{
        console.log(err);
    })
}

window.addEventListener("DOMContentLoaded" , ()=>{
    axios
    .get('https://crudcrud.com/api/fa43295a04c044da8ea06745413f84ec/appointmentData')
    .then( (res)=>{
        for(var i=0 ; i<res.data.length ; i++){
            console.log(res.data[i]);
            showOrderOnScreen(res.data[i])
        }
    })
    .catch(err=>console.log(err))
})

function showOrderOnScreen(order){
    // document.getElementById('price').value='';
    // document.getElementById('dish').value='';
    // document.getElementById('category').value='';

    const parentNode=document.getElementById('listOfOrders');
    const  childHTML = `<li id = ${order._id}> ${order.order_price} ${order.order_dish}  ${order.tableno} 
                              <button onclick=deleteOrder('${order._id}')>DELETE</button>
                         </li>`
    

    parentNode.innerHTML=parentNode.innerHTML + childHTML ;
}

function deleteOrder(orderId){
    axios.delete(`https://crudcrud.com/api/fa43295a04c044da8ea06745413f84ec/appointmentData/${orderId}`)
    .then( (response)=>{
        removeOrderFromScreen(orderId)
    })
    .catch( (err)=>{
        console.log(err);
    })
}

function removeOrderFromScreen(orderId){
    const parentNode = document.getElementById('listOfOrders');
    const childNodeToBeDeleted = document.getElementById(orderId);

    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted)
    }
}