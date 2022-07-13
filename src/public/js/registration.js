showButton.onclick = () => {
    if(passwordInput.type === 'text') {
        passwordInput.type = 'password'
    } else {
        passwordInput.type = 'text'
    }
}