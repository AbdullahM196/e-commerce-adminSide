import { formatDistanceToNow, parseISO } from "date-fns";
export default function UserCards({ data }) {
  return data.slice(0, 5).map((user) => {
    const date = parseISO(user.createdAt);
    const timeAgo = formatDistanceToNow(date, { addSuffix: true });
    return (
      <span key={user._id} className="d-flex w-100 my-2 justify-content-around">
        <img
          className="col-2"
          style={{ width: "30px", height: "30px", marginTop: "4px" }}
          src={user.img.url ? user.img.url : "./vite.svg"}
          alt="userPhoto"
        />
        <span className="col-9 d-flex flex-column align-items-start">
          <p className=" fs-4 fw-bold mb-0">{user.userName.substring(0, 10)}</p>
          <small>{timeAgo}</small>
        </span>
      </span>
    );
  });
}
