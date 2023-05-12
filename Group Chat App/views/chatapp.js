

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const token = localStorage.getItem('token');
const decodeToken = parseJwt(token);
const username = decodeToken.username;
const email = decodeToken.email;
const user_id = decodeToken.userId;

window.addEventListener('DOMContentLoaded', () => {
    async function getMembers(){
        try {
            const response = await axios.get('http://localhost:8080/user/getAllMembers', {
              headers: {
                authorization: token
              }
            });
      
            console.log(response);

            if(response.status ===201){
                console.log("user fetched");
                for (let i = 0; i < response.data.user.length; i++) {
                    console.log(response.data.user[i].username, response.data.user[i].email);
                      const parentNode = document.getElementById('persons');
                      if (parentNode) {
                          const li = document.createElement('li');
                          li.textContent = `${response.data.user[i].username}: ${response.data.user[i].email}`;
                          parentNode.appendChild(li);
                      } else {
                          console.error('Could not find parent node with ID "persons"');
                      }
                  }
            }
          } catch (error) {
            console.error('Error fetching members:', error);
          }
        }      

    getMembers()

    async function getGroups(){
        console.log("getting groups");
        try {
            const response = await axios.get('http://localhost:8080/group/all', {headers: {authorization: token}})
            if(response.status === 200){
                console.log(response);
                for(let i=0; i<response.data.group.length ; i++){
                    console.log(response.data.group[i].group_name);
                      const parentNode = document.getElementById('groups');
                      if (parentNode) {

                        const button = document.createElement('button');
                        button.textContent = 'Join Chat';
                        button.onclick = getChats;
                        const div = document.createElement('div');
                        const li = document.createElement('li');
                        li.id=`${response.data.group[i].group_id}`;
                          li.textContent = `${response.data.group[i].group_name}`;
                          div.appendChild(button);
                          div.appendChild(li);

                          parentNode.appendChild(div);
                      } else {
                          console.error('Could not find parent node with ID "persons"');
                      }
                }
            }
        } catch (error) {
            console.log("Error after groups fetched",error);
        }
    }

    getGroups()

})

async function createGroup(){
    console.log("creating group");
    const groupname = document.getElementById('groupname').value;

    const groupDetails = {
        groupname,
        user_id
    }

    const response = await axios.post('http://localhost:8080/group/creategroup', groupDetails, {headers: {authorization: token}})

    console.log("\ngroup created\n",response);


}

const ul = document.getElementById('groups');

// Add a click event listener to the ul element
ul.addEventListener('click', event => {
// Check if the clicked element is an li element
if (event.target.tagName === 'LI') {
// Retrieve the group_id attribute of the clicked li element
const groupId = event.target.getAttribute('id');
const groupName = event.target.textContent;
localStorage.setItem('groupName',groupName);
localStorage.setItem('groupId',groupId)
console.log(`Clicked on group with ID ${groupId}`);
// Now you can use the groupId for further processing, like making an API request
}
})


async function addMember(){
    try {
        const group_id = localStorage.getItem('groupId');
        console.log(group_id);
        const email = document.getElementById('usermail').value;
        const admin_status = document.getElementById('adminstatus').value;

        const memberDetails = {
            group_id,
            email,
            admin_status
        }

        const response = await axios.post('http://localhost:8080/group/addMember', memberDetails, {headers: {authorization: token}})

        if(response.status === 201){
            alert(`${email} added to group`)
        }
        else{
            alert("Only admins can add members")
        }
        // console.log("\nafter adding members\n",response);
    } catch (error) {
        console.log("Error in adding members", error);
    }
}

async function getChats(){
    try {
        console.log("join button clicked");
        const groupId = localStorage.getItem('groupId');
        console.log(groupId);

        const chatBox = document.querySelector('.chat-box');
        chatBox.innerHTML = '';
    
    
    
        const response = await axios.get('http://localhost:8080/chat/allchats', {headers: {authorization: token, group_id: groupId}})

        if(response.status ===201){
            const parentNode = document.querySelector('.chat-box');
            console.log(parentNode);
            const h2 = document.createElement('h2');
            h2.textContent= `${localStorage.getItem('groupName')}`;

            parentNode.appendChild(h2);

            showChats(response.data)

            console.log(response);
        }
    } catch (error) {
        console.log("Error after fetching chats",error);
    }
}

function showChats(messages){
    for(let i = 0; i<messages.chats.length ; i++){
        const message = messages.chats[i].message;
        const chatBox = document.querySelector('.chat-box');
        const messageInput = `${message}`
        // const messageContent = messageInput.value;
        const messageDiv = document.createElement('div');
        messageDiv.textContent = messageInput;
        chatBox.appendChild(messageDiv);
    }
}

setInterval(getChats,1000)


async function sendMessage(){
    const sender_id = decodeToken.userId;
    // console.log("\nsender id\n", sender_id);

    const message = document.getElementById('message').value;

    const group_id = localStorage.getItem('groupId');

    const messageObj = {
        sender_id,
        group_id,
        message
    }

    console.log(sender_id, message, group_id);

    const response = await axios.post('http://localhost:8080/chat/new', messageObj, {headers: {authorization: token}})

    document.getElementById('message').value='';

    console.log(response);


}
