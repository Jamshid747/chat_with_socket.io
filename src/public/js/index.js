let lastSelectedUserId;

async function renderUsers(users) {
    for(const user of users) {
        const li = document.createElement('li')

        li.classList.add('chats-item')

        li.innerHTML = `
            <img src="${'/file/' + token + '/' + user.userImg}" alt="profile-picture">
            <p>${user.username}</p>
        `
        chatsList.append(li)

        li.onclick = event => {
            lastSelectedUserId = user.userId
            uploadedFiles.innerHTML = null
            chatsMain.innerHTML = null
            form.style.display = 'flex'
            chatsMain.style.display = 'flex'
      
            renderCurrentChat(user)
            getMessages(user.userId)
        }
    }
}

async function renderCurrentChat(user) {
    chatImg.src = '/file/' + token + '/' + user.userImg
    chatUsername.textContent = user.username
}

async function renderProfileData() {
    
    profileImg.src = '/profileAvatar/' + token
    profileUsername.textContent = await (await fetch('/profileUsername/' + token)).text()
}

async function postMessage(messageBody, type) {
    if (type === 'text' && lastSelectedUserId) {
        const response = await request('/messages', 'POST', {
            messageBody,
            userId: lastSelectedUserId
        })
        if (response.status === 200) renderMessages([response.data])
    } else if(type === 'file' && lastSelectedUserId) {
        const formData = new FormData()
        formData.append('file', messageBody)
        formData.append('messageBody', 'sdfsdfsfs')
        formData.append('userId', lastSelectedUserId)

        const response = await request('/messages', 'POST', formData)
        if (response.status === 200) renderMessages([response.data])
    }
}

async function getMessages(userId) {
    const messages = await request('/messages?userId=' + userId)
    renderMessages(messages);
}

async function renderMessages(messages) {
    for(const message of messages) {
        const div = document.createElement('div')
        const isMyMessage = !(lastSelectedUserId == message.messageTo.userId) 

        div.classList.add('msg-wrapper', !isMyMessage ? 'msg-from' : null)

        const date = new Date(message.createdAt)
        const hour = date.getHours().toString().padStart(2,0)
        const minute = date.getMinutes().toString().padStart(2,0)
        const time = hour + ':' + minute

        if(message.messageType == 'plain/text') {
            div.innerHTML = `
                <img src="${'/file/' + token + '/' + message.messageFrom.userImg}" alt="profile-picture">
                <div class="msg-text">
                    <p class="msg-author">${message.messageFrom.username}</p>
                    <p class="msg" onkeydown="updateMessage(event, this, ${message.messageId})" contentEditable>${message.messageBody}</p>
                    <p class="time">${time}</p>
                </div> 
            `
        } else {
            div.innerHTML = `
                <img src="${'/file/' + token + '/' + message.messageFrom.userImg}" alt="profile-picture">
                <div class="msg-text">
                    <p class="msg-author">${message.messageFrom.username}</p>
                    <object data="${'/file/' + token + '/' + message.messageBody}" type="${message.messageType}" class="msg object-class"></object>
                    <a href="${'/download/' + token + '/' + message.messageBody}">
                        <img src="./img/download.png" width="25px">
                    </a>
                    <p class="time">${time}</p>
                </div> 
            `
            renderCurrentChatFile(message)
        }

        chatsMain.append(div)
    }
    chatsMain.scrollTo({ top: 1000000000 })
}

async function renderCurrentChatFile(message) {
    const li = document.createElement('li')
    li.classList.add('uploaded-file-item')
    li.innerHTML = `
        <a target="__blank" href="${'/file/' + token + '/' + message.messageBody}">
            <img src="./img/file.png" alt="file" width="30px">
            <p>${message.messageBody}</p>
        </a>
    `
    uploadedFiles.append(li)
}


async function getUsers() {
    const users = await request('/users')
    renderUsers(users)
}
async function updateMessage(event, element, messageId) {
    if(!updateMessage.cacheText) {
        updateMessage.cacheText = element.textContent
    }

    if(event.keyCode !== 13) return


    element.textContent = element.textContent.trim()
    element.blur()

    if(!element.textContent.length) {
        element.textContent = updateMessage.cacheText
        updateMessage.cacheText= null
        return
    }

    await request('/messages/' + messageId, 'PUT', {
        messageBody: element.textContent
    })
    updateMessage.cacheText = null
}


form.onsubmit = event => {
    event.preventDefault()
    
    const messageBody = textInput.value.trim()

    if(!messageBody) {
        return textInput.value = ''
    }
    
    if(messageBody.includes('<') && messageBody.includes('>')) {
        textInput.value = ''
        return alert('Message must not contain HTML element!')
    }

    postMessage(messageBody, 'text')
    form.reset()
}

uploadsInput.onchange = event => {
    const file = uploadsInput.files[0]

    if(file.size > 1024 * 1024 * 50) {
        return alert("File size is too large!")
    }
    
    postMessage(file, 'file')
    form.reset()
}


renderProfileData()
getUsers()