//The function running while waiting response from the server
export const waitingResponse = () => {
    //The elements with the server's response message
    const positiveResponse = document.getElementById("positiveResponse")
    const negativeResponse = document.getElementById("negativeResponse")
    const waitingResponse = document.getElementById("waitingResponse") 
    const errorMessage = document.getElementById("errorMessage")    
    const successMessage = document.getElementById("successMessage")
    
    //Each time we make a request, only the "Please waith message should be shown"
    negativeResponse.style.display = "none" 
    positiveResponse.style.display = "none" 
    waitingResponse.style.display = "flex"
    errorMessage.innerText = ""
    successMessage.innerText = ""
}

//The function that shows a server's positive response message
export const showPositiveResponse = (message) => {

    //The elements with the server's response message
    const positiveResponse = document.getElementById("positiveResponse")  
    const successMessage = document.getElementById("successMessage")
    const waitingResponse = document.getElementById("waitingResponse")

    waitingResponse.style.display = "none"
    positiveResponse.style.display = "flex"
    successMessage.innerText = message
}

//The function that shows a server's negative response message
export const showNegativeResponse = (message) => {

    //The elements with the server's response message
    const negativeResponse = document.getElementById("negativeResponse")  
    const errorMessage = document.getElementById("errorMessage")
    const waitingResponse = document.getElementById("waitingResponse")

    waitingResponse.style.display = "none"
    negativeResponse.style.display = "flex"    
    errorMessage.innerText = message
}

//The function to hide all response messages
export const hideAllResponses = () => {

    //The elements with the server's response message
    const positiveResponse = document.getElementById("positiveResponse")
    const negativeResponse = document.getElementById("negativeResponse")
    const errorMessage = document.getElementById("errorMessage")    
    const successMessage = document.getElementById("successMessage")
    
    //Each time we make a request, only the "Please waith message should be shown"
    negativeResponse.style.display = "none" 
    positiveResponse.style.display = "none" 
    errorMessage.innerText = ""
    successMessage.innerText = ""
}