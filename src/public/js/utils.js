const request = async (rout, method = 'GET', body) => {
    const headers = {
        token: window.localStorage.getItem('token')
    }
    if(!(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(body)
    }
    let response = await fetch(rout, {
        method,
        headers,
        body
    })
    response = await response.json()
    
    if(response.status == 403) {
        window.localStorage.clear()
        window.location - '/login'
    } else if(response.status > 399) {
        errorMessage.textContent = response.message
    } else {
        return response
    }
}