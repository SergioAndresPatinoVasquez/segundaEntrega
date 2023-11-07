
//Con este socket vamos a establerecer la comunicación con nuestro servidor
const socket = io();

let user;

const chatBox = document.getElementById('chatBox');

const messagesLog = document.getElementById('messageLogs')

//desarrollar el modal de autenticación con el email

Swal.fire({
    title: 'Ingresa tu email',
    input: 'email',
    inputPlaceholder: 'Ingresa tu correo electrónico',
    allowOutsideClick: false,
    allowEscapeKey: false
  }).then(result =>{
    user = result.value;
    socket.emit('authenticated', user);
    
});

//evento para enviar mensaje
chatBox.addEventListener('keyup', evt => {
    if (evt.key==='Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('message', {user, message: chatBox.value})
            chatBox.value='';
  
        }

    }


});

//mostrando todos los mensajes en el array messages de todos los usuarios
socket.on('messageLogs', data =>{
    let messages = '';
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message}<br/>`
        
    });
    messagesLog.innerHTML= messages; //cargamos todos los mensajess
});

socket.on('newUserConnected', data =>{
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmationButton: false,
        timer: 4000,
        title: `${data} se ha unido al chat`,
        icon: 'success'

    })
})