console.log('Client side javascript file is loaded')

 
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msgOne = document.querySelector('#msgOne')
const msgTwo = document.querySelector('#msgTwo')
const msgFoundOrError = document.querySelector('#msgFoundOrError')

weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()

    msgFoundOrError.textContent ="loading..."
    msgOne.textContent = ""
    msgTwo.textContent = ""

    const location = searchElement.value

    fetch('/weather?address=' + location).then(response => {

        response.json().then((data) => {
            if(data.error){
                return msgFoundOrError.textContent = data.error , msgOne.textContent = "" , msgTwo.textContent = ""

            }
            msgFoundOrError.textContent = "Here are your results:"
            msgOne.textContent = data.address
            msgTwo.textContent = data.temperature
        })
    })
})