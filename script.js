
import { firsLetterUppercase } from './utils.js'


function getRandomJoke() {
  const randomJokeButton = document.querySelector('#random-joke-button')

  randomJokeButton.addEventListener('click', () => {
    fetch('https://api.chucknorris.io/jokes/random')
      .then(res => res.json())
      .then(joke => {
        const jokeParagraph = document.querySelector('#joke-paragraph')
  
        jokeParagraph.textContent = joke.value
      })
  })
}

getRandomJoke()



function getJokeByCategory() {
  fetch('https://api.chucknorris.io/jokes/categories')
    .then(res => res.json())
    .then(categories => {
      const categoryForm = document.querySelector('#jokes')
      const categorySelectElement = categoryForm['jokes-list']

      categories.forEach(category => {
        const categoryOptionElement = document.createElement('option')
        categoryOptionElement.textContent = '- ' + category.at(0).toUpperCase() + category.slice(1)
        categoryOptionElement.value = category
        categorySelectElement.append(categoryOptionElement)
      })

      categoryForm.addEventListener('submit', event => {
        event.preventDefault()

        const selectedCategory = categorySelectElement.value

        const requestUrl = 'https://api.chucknorris.io/jokes/random?category=' + selectedCategory
        
        fetch(requestUrl)
          .then(res => res.json())
          .then(joke => {
            const jokeParagraph = document.querySelector('#joke-paragraph')
            jokeParagraph.textContent = joke.value
          })
      })
    })
}

getJokeByCategory()



function getJokeByPhrase() {
  const searchForm = document.querySelector('#search-form')

  searchForm.addEventListener('submit', event => {
    event.preventDefault()

    const searchPhrase = event.target['search-input'].value
    const searchUrl = `https://api.chucknorris.io/jokes/search?query=${searchPhrase}`

    fetch(searchUrl)
      .then(res => res.json())
      .then(data => {
        const total = data.total
        const jokeParagraph = document.querySelector('#joke-paragraph')

        if (total > 0) {
          const index = Math.floor(Math.random() * total)
          const selectedJoke = data.result[index].value

          jokeParagraph.textContent = selectedJoke
        } else {
          jokeParagraph.textContent = 'No joke found :('
        }
      })
  })
}

getJokeByPhrase()



function getDogByBreed(){


  const categoryForm = document.getElementById('dog-form')
  const selectDog = document.getElementById('select-dog')
  
  fetch('https://dog.ceo/api/breeds/list/all')
  .then(res => res.json())
  .then(categories => {
    
    const breeds = categories.message

const breedKeys = Object.keys(breeds)
const breedValues = Object.values(breeds)



breedKeys.forEach(function(mainBreed, index){

const subBreeds = breedValues[index]
// console.log(mainBreed,subBreeds)



const categoryOptionElement = document.createElement('option')
categoryOptionElement.textContent = firsLetterUppercase(mainBreed) 
categoryOptionElement.value = mainBreed
selectDog.append(categoryOptionElement)

subBreeds.forEach(function(subBreed){

  const categorySubBreeds = document.createElement('option')
    categorySubBreeds.textContent = `${mainBreed}(${subBreed})` 
    categorySubBreeds.value = `${mainBreed}/${subBreed}` 
    selectDog.append(categorySubBreeds)


    
  })
})
})



categoryForm.addEventListener('submit',function(event){
  event.preventDefault()

 const selectDogCategory = selectDog.value

 const url = "https://dog.ceo/api/breed/"+selectDogCategory+"/images/random"


  fetch(url)
  .then(res => res.json())
  .then(dog => {
    
    const image = document.querySelector('#image')
    image.src = dog.message
    console.log("https://dog.ceo/api/breed/"+selectDogCategory+"/images/random")
    
  })
})

//  })

}
getDogByBreed()













function init() {
  const nameForm = document.querySelector('#name-form')
  
  nameForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    
    const outputParagraph = document.querySelector('#output-paragraph')

    const enteredName = event.target.name.value

    const ageOutput = await getAgeByName(enteredName)
    const countryOutput = await getCountryByName(enteredName)
    const genderOutput = await getGenderByName(enteredName)

    outputParagraph.textContent = `${ageOutput} ${countryOutput} ${genderOutput}`
  })
}

init()

async function getAgeByName(enteredName) {
  const res = await fetch('https://api.agify.io?name=' + enteredName)
  const data = await res.json()

  const age = data.age
  const output = `${firsLetterUppercase(enteredName)} is ${age} years old.`
  
  return output
}

async function getCountryByName(enteredName) {
  const res = await fetch('https://api.nationalize.io?name=' + enteredName)
  const data = await res.json()
  
  const countryId = data.country[0].country_id
  const output = `${firsLetterUppercase(enteredName)} is from ${countryId}.`

  return output
}

async function getGenderByName(enteredName) {

  const res = await fetch('https://api.genderize.io/?name=' + enteredName)
  const data = await res.json()

  const gender = data.gender
  const output = `${firsLetterUppercase(enteredName)} is a ${gender}.`
  
  return output
}