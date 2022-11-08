export default function Subheader(props) {
  return (
    <div className="subheader d-flex flex-column justify-content-center">
      <h5 className="m-4">{props.title}</h5>
    </div>
  );
}