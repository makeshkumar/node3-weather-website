console.log("Js loaded");

/* fetch('http://puzzle.mead.io/puzzle').then((res) => {
    res.json().then((data) => {
        console.log(data)
    })
})  */


/* fetch('http://localhost:3000/weather?address=Chennai').then((res) => {
    res.json().then((data) => {
        if(data.error) {
            console.log(data.error)
        } else {
            console.log(data)
        }
    })
})  */

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('m1')
const messageTwo = document.getElementById('m2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "loading"
    messageTwo.textContent = ""
    fetchWeather(location)
})

const fetchWeather = (location) => {
    
    fetch('http://localhost:3000/weather?address='+location).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.address
                messageTwo.textContent = data.temperature
            }
        })
    })
}