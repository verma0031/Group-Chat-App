

async function onSignup(){
    try{
        const username = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        const userDetails = {
            username,
            email,
            phone,
            password
        }
        console.log(userDetails);

        const response = await axios.post ("http://localhost:8080/user/signup", userDetails)

            if(response.status === 201){
                document.getElementById('name').value='';
                document.getElementById('email').value='';
                document.getElementById('phone').value='';
                document.getElementById('password').value='';
                alert('User signed up successfully')
                // window.location.href="/login.html";
            }
            else{
                throw new Error('Failed to login');
            }
    }catch(err){
        console.log("Error post signing up",err);
    }
}

async function onLogin(){
    try{
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const loginDetails = {
            email,
            password
        }

        console.log(loginDetails);

        const response = await axios.post('http://localhost:8080/user/login',loginDetails)
        
        if(response.status ===200){
            alert(response.data.message)


            localStorage.setItem('token', response.data.token);


            if(response.data.success){
                window.location.href = "/views/chatapp.html"
            }
        }
        else{
            alert(response.data.message)
        }

    }catch(err){
        console.log("Error past login", err);
    }

}

