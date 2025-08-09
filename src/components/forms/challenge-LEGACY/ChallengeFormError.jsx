const ChallengeFormError = ({ videos }) => {
   return (
      <div>
         <h1 className='text-danger'>SORRY...</h1>
         <h3 style={{color: 'firebrick'}}>There needs to be at least 2 videos to start a challenge and currently, there is/are {videos.length} video.</h3>
      </div>
   )
}

export default ChallengeFormError