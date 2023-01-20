export const startLoadBar = () => {

    const loadingBar = document.getElementById("loadingBar")

    loadingBar.style.transition = "width 1s"
    loadingBar.style.width = "40%"    
}

export const completeLoadBar = () => {

    const loadingBar = document.getElementById("loadingBar")
    const waitingResponse = document.getElementById("waitingResponse")

    loadingBar.style.width = "100%"
    waitingResponse.style.display = "none"

    setTimeout( () => { 
                        loadingBar.style.transition = "width 0s"
                        loadingBar.style.width = "0"                                          
                    }, 1000)    
}