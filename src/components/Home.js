import React from "react";
import Notes from "./Notes";

const Home = (props) => {
  document.title = "Your-Notes"
  return (
    <>
      <Notes showAlert = {props.showAlert} />
    </>
  )
}

export default Home

// import React from 'react'
// import Notes from './Notes'
// const Home = () => {
//   return (
//     <div>
//       <Notes/>
//     </div>
//   )
// }

// export default Home