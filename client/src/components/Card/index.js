import React, { useState, useMemo, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import "./index.css";
import API from "../../utils/API";
import setAuthUser from '../../utils/setAuthUser';

// holds the people already shown to the user to avoid repetition 
const alreadyRemoved = [];
// const liked = [];

function CardMatch() {
  const [userMatch, setuserMatch] = useState([])
  const [lastDirection, setLastDirection] = useState()
  // 1: set likedUsers from the 'right' swipes
  // const [likedUsers, setLikes] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  // console.log(loggedUser.id)

  // setting the state
  const likes = (dir, user) => {
    if (dir === "right") {
      // console.log(user);
      // liked.push(user);
      console.log('user liked!')
      // console.log('state: ', likedUsers);
      // console.log('array: ', liked);
      const likedUserId = {
        id: user
      }
      // console.log(likedUserId)
      API.addLike(loggedUser.id, likedUserId).then(res => console.log(res))
    } else {
      console.log('user disliked!');
    }
  }

  // 2: send the array to the database through the API.addLike()


  let userMatchState = userMatch;

  useEffect(() => {
    async function fetchData() {
      API.getUsers().then((res) => {
        console.log(res.data.users);
        // console.log(res.data.users[0].image);
        setuserMatch(res.data.users);
      });
    };
    fetchData()
  }, [])


  const childRefs = useMemo(() => Array(userMatch.length).fill(0).map(i => React.createRef()), []);
  // returning empty array
  console.log(childRefs);

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alreadyRemoved.push(nameToDelete)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    userMatchState = userMatchState.filter(user => user.name !== name)
    setuserMatch(userMatchState)
  }

  // this function not working as childRefs is empty 
  const swipe = (dir) => {
    const cardsLeft = userMatch.filter(person => !alreadyRemoved.includes(person._id));
    console.log(cardsLeft)
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1]._id // Find the card object to be removed
      const index = userMatch.map(person => person._id).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }

  // Need to randomise users before rendering to Cards
  // Need to add PUT request for likes and dislikes


  console.log(alreadyRemoved);

  return (
    <div>
      <h1>Are they the music to your eyes?</h1>
      <br />
      <br />
      <br />
      <div className='cardContainer'>
        {userMatch.map((user, index) =>
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={user._id}
            onSwipe={(dir) => {
              likes(dir, user._id)
              swiped(dir, user._id)
            }}
            onCardLeftScreen={() => outOfFrame(user._id)}>
            <div style={{ backgroundImage: 'url(' + user.image + ')' }} className='card'>
              <h3>{user.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      <div className='buttons'>
        <button onClick={() => swipe('left')}>Swipe left!</button>
        <button onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>}
    </div>
  )
}

export default CardMatch