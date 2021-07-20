function Launches({ launches }) {
  return (
    <ul>
      {launches.map((launch) => (
        <li>{launch.capsule_serial}</li>
      ))}
    </ul>
  )
}



export default Launches