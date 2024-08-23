import ClipLoader from 'react-spinners/ClipLoader';

const Override = {
    display: 'block',
}

const Spinner = ({loading}) => {
  return (
    <ClipLoader
        color='#fff'
        loading={loading}
        cssOverride={Override}
        size={30}
      />
  )
}

export default Spinner