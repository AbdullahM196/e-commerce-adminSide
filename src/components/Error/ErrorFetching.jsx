/* eslint-disable react/prop-types */
export default function ErrorFetching({ error }) {
  console.log(error);
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      {error.data.message || error.error}
    </div>
  );
}
