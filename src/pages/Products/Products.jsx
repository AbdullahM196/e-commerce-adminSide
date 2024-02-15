import { useEffect, useState } from "react";
import BarChart from "../../components/Charts/BarChart";
import "./products.css";
import ProductTable from "../../components/ProductsTable/ProductTable";
import ProductsForm from "./ProductsForm";
import { useGetAllPagesQuery } from "../../store/API/apiSlices/productsSlice";
import Pagination from "react-bootstrap/Pagination";
import { useMostSoldProductsQuery } from "../../store/API/apiSlices/Orders";

export default function Products() {
  const { data: mostSold, isSuccess: mostSoldSuccess } =
    useMostSoldProductsQuery();
  const { data, isSuccess } = useGetAllPagesQuery();

  const [active, setActive] = useState(1);

  let items = [];
  if (isSuccess) {
    const pageCount = Math.ceil(data);
    for (let number = 1; number <= pageCount; number++) {
      items.push(
        <Pagination.Item
          key={number}
          onClick={() => setActive(number)}
          active={number === active}
        >
          {number}
        </Pagination.Item>
      );
    }
  }

  const [show, setShow] = useState(false);
  const [MostSoledProducts, setMostSoledProducts] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    setMostSoledProducts({
      labels: mostSoldSuccess
        ? mostSold.map((data) => data?.productDetail?.title.substring(0, 15))
        : [],
      datasets: [
        {
          label: "Order Growth",
          data: mostSoldSuccess ? mostSold.map((data) => data.count) : [],
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [mostSold, mostSoldSuccess]);
  return (
    <div className="container-fluid w-100 d-flex flex-column">
      <h1>Products</h1>
      <div className="productsBody">
        <div className="productHeader">
          <BarChart data={MostSoledProducts} />
        </div>
        <div className="productContent mt-4">
          <span className="d-flex justify-content-between my-2 px-2">
            <h3 className="fw-bold">All Products</h3>{" "}
            <button
              className="btn btn-dark"
              onClick={() => {
                setShow(true);
              }}
            >
              Add Product
            </button>
            <ProductsForm show={show} setShow={setShow} />
          </span>
          <ProductTable page={active - 1} />
          <div className="d-flex w-100 justify-content-center">
            <Pagination>{items}</Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
