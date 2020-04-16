const users = [
  {
    id: 0,
    name: 'Lucian Tudorache',
    verified: true,
    handle: 'lucian', // aka username
    title: 'UI & UX Designer',
    bio: 'Learning Illustrations',
    country: 'ro',
    createdAt: '1585721751',
  },
  {
    id: 1,
    name: 'Dorian Tudorache',
    createdAt: '1585721751',
    country: 'ro',
    updatedAt: '',
    verified: true,
    role: 'Administrator',
    handle: 'dorian',
    title: 'Front-End Developer',
    bio: 'Smart & Vegan'
  },
  {
    id: 2,
    name: 'John Mathers',
    handle: 'john00',
    title: 'Film-Maker',
    bio: 'Movies Enthusiast'
  },
  {
    id: 3,
    name: 'Mia Terescenco',
    handle: 'mia-t',
    title: 'English Teacher',
    bio: 'Loves Reading'
  },
  {
    id: 4,
    handle: 'romario',
    name: 'Romario Alan',
    title: '',
    bio: 'Books & Art Passionate'
  },
  {
    id: 5,
    handle: 'thomas.s.mark',
    name: 'Thomas S. Mark',
    title: 'Actor',
    bio: 'Basketball & Golf Passionate'
  },
  {
    id: 6,
    handle: 'frederickw',
    name: 'Frederick Watson',
    title: 'Engineer',
    bio: 'Loves A.I.'
  },
  {
    id: 7,
    handle: 'arthur',
    name: 'Arthur Anastas',
    title: 'Lead Designer at Numina',
  },
  {
    id: 8,
    handle: 'freya',
    name: 'Freya Minakova',
    title: 'Fashion Designer & Copywriter',
    bio: 'Loves Red, Books, Coffee & Writing'
  },
  {
    id: 9,
    handle: 'omfg',
    name: 'Hubert Blaine Wolfe­schlegel­stein­hausen­berger­dorff', // 9
    title: 'Typesetter',
    bio: 'Loves Spelling His Name'
  },
]

const b64imgEncode = require('node-base64-image').encode

// assign avatars
users.forEach(user => {
  try {
    let avatar
    // const avatar = require('../images/avatars/' + user.handle + '.jpg')
    b64imgEncode('src/images/avatars/' + user.handle + ".jpg", { local: true, string: true }, (err, result) => {
      if (err) {
        // console.error(err)
      } else {
        avatar = result
        Object.assign(user, { avatar })
      }
    })
  } catch (e) {
    // console.error('could not get avatar', e)
  }
})

// helper functions

let usersBy = {}

const getUsersBy = (by) => {
  if (usersBy[by]) return usersBy[by]
  usersBy[by] = {}
  users.forEach(user => usersBy[by][user[by]] = user)
  return usersBy[by]
}

const getUserBy = (by, value) => getUsersBy(by)[value]

module.exports = { getUserBy }
