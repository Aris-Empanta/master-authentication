export const startLoadBar = () => {

    const loadingBar = document.getElementById("loadingBar")

    loadingBar.style.transition = "width 1s"
    loadingBar.style.width = "40%"    
}

export const completeLoadBar = () => {

    const loadingBar = document.getElementById("loadingBar")    

    loadingBar.style.width = "100%"

    setTimeout( () => { 
                        loadingBar.style.transition = "width 0s"
                        loadingBar.style.width = "0"                                          
                    }, 1000)    
}