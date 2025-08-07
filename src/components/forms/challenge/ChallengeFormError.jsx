const ChallengeFormError = () => {
   return (
      <div>
         <h1 className='text-danger'>SORRY...</h1>
         <h3 style={{color: 'firebrick'}}>You must have at least 1 uploaded video to start a challenge.</h3>
      </div>
   )
}

export default ChallengeFormError