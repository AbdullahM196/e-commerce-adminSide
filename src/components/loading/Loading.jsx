import "./loading.css";
export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
