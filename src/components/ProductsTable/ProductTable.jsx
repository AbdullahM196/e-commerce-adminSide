import Table from "react-bootstrap/Table";
import "./productTable.css";
import { BsFillTrashFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../store/API/apiSlices/productsSlice";
import Loading from "../loading/Loading";
import ErrorFetching from "../Error/ErrorFetching";
import ProductsForm from "../../pages/Products/ProductsForm";
import { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ProductTable({ page }) {
  const MySwal = withReactContent(Swal);
  const [productId, setProductId] = useState(null);
  const [deleteProduct] = useDeleteProductMutation();
  async function handleDelete() {
    if (productId) {
      try {
        MySwal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await deleteProduct(productId).unwrap();
            setProductId(null);
            MySwal.fire("Deleted!", "Product has been deleted.", "success");
          }
        });
      } catch (err) {
        await MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
        console.log(err);
      }
    }
  }

  const [show, setShow] = useState(false);
  const [editProduct, setProduct] = useState(undefined);
  const { isLoading, isSuccess, isError, error, data } =
    useGetAllProductsQuery(page);

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <ErrorFetching error={error} />;
  } else if (isSuccess) {
    return (
      <Table hover responsive className="productTable">
        <thead>
          <tr style={{ height: "48px" }}>
            <th>#</th>
            <th>Quantity</th>
            <th>Img</th>
            <th>Title</th>
            <th>SubCategory</th>
            <th>Price</th>
            <th>Actions </th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => {
            return (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.quantity}</td>
                <td>
                  <img
                    src={
                      product.img
                        ? product.img.url
                        : "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                    }
                    alt="product"
                    className="productImg"
                  />
                </td>
                <td style={{ width: "500px" }}>
                  {product.title.substring(0, 53)}
                </td>
                <td>{product.subCategory.name}</td>
                <td>{product.price.new.toFixed(1)}</td>
                <td className="d-flex">
                  <BsFillTrashFill
                    className="text-danger me-3"
                    style={{
                      width: "28px",
                      height: "28px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setProductId(product._id);
                      handleDelete();
                    }}
                  />
                  <MdModeEdit
                    className="text-success"
                    style={{
                      width: "28px",
                      height: "28px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setShow(true);
                      setProduct(product);
                    }}
                  />
                </td>
                <ProductsForm
                  show={show}
                  setShow={setShow}
                  product={editProduct}
                />
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

ProductTable.propTypes = {
  page: PropTypes.number,
};
