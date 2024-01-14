
let people = [
    {
      "id": 1,
      "name": "john",
      "sex": "M"
    },
    {
      "id": 3,
      "name": "susan",
      "sex": "F"
    },
    {
      "id": 4,
      "name": "anna",
      "sex": "F"
    },
    {
      "id": 5,
      "name": "Chris",
      "sex": "M"
    }
  ]

//   let personID = people.map((person) => {
//     return person.id
//   })

//   let maxID = Math.max(...personID)
//   console.log(maxID)


let maxID = 0
 people.forEach((person)=> {
    if (person.id > maxID) maxID = person.id
  })

  
  let roles = Object.values(people[1])
  console.log(roles)

  let assorted = (...args)=> {
    return args.map(loot=> loot)
  }

  // console.log(assorted('blue', 'chike', 'ebele'))

