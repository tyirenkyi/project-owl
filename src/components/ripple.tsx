import "../assets/css/ripple.css";

const Ripple: Function = (props: {
  color: string
}) => {
  return (
    <div className="lds-ripple">
      <div style={{borderColor: props.color}}></div>
      <div style={{borderColor: props.color}}></div>
    </div>
  )
}

export default Ripple