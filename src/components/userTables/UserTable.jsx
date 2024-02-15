import { Table } from "react-bootstrap";
import "../RecentOrders/recentOrders.css";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDeleteUserMutation } from "../../store/API/apiSlices/user";
export default function UserTable({ data, mostAct }) {
  function getOrders(userId) {
    const findOrders = mostAct.find((user) => user._id == userId);
    if (!findOrders) {
      return 0;
    } else if (findOrders) {
      return findOrders.orders;
    }
  }
  const MySwal = withReactContent(Swal);
  const [deleteUser] = useDeleteUserMutation();
  async function handleDeleteUser(id) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteUser(id).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data,
      });
      console.log(error);
    }
  }
  return (
    <Table className="customerTable w-100" hover variant="light" responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Orders</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => {
          // console.log(user);
          return (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{getOrders(user._id)}</td>
              <td className="text-center">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

UserTable.propTypes = {
  data: PropTypes.array,
  mostAct: PropTypes.array,
};
