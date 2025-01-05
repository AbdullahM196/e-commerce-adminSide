import "./category.css";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {
  useAddNewCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../store/API/apiSlices/categorySlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../../components/loading/Loading";
import { useAddSubCategoryMutation } from "../../store/API/apiSlices/SubCategory";
import ErrorFetching from "../../components/Error/ErrorFetching";
import PropTypes from "prop-types";
import CategoryModel from "../../components/categoryModel/CategoryModel";

const CategoryCards = React.memo(function ({ color, title }) {
  const {
    isLoading: allCategoriesLoading,
    data: allCategories,
    isSuccess: allCategoriesSuccess,
    isError: isAllCategoriesError,
    error: allCategoriesError,
  } = useGetAllCategoriesQuery();

  const MySwal = withReactContent(Swal);
  const [addSubCategory, { isLoading: loading }] = useAddSubCategoryMutation();
  const [addNewCategory, { isLoading }] = useAddNewCategoryMutation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [subCategoryName, setSubCatName] = useState("");
  const [categoryName, setCatName] = useState("");
  const [categoryId, setCatId] = useState("");
  function allCategory() {
    let allCategoryContent;
    if (allCategoriesLoading) {
      allCategoryContent = <Loading />;
    } else if (isAllCategoriesError) {
      allCategoryContent = <ErrorFetching error={allCategoriesError} />;
    } else if (allCategoriesSuccess) {
      allCategoryContent = (
        <Form.Select
          aria-label="allCategoryContent"
          onChange={(evt) => {
            setCatId(evt.target.value);
          }}
          defaultValue={""}
        >
          <option value="" disabled>
            Choose Category
          </option>
          {allCategories.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })}
        </Form.Select>
      );
    }
    return allCategoryContent;
  }
  async function addCategory() {
    if (categoryName.length > 0) {
      try {
        await addNewCategory({ name: categoryName }).unwrap();
        setCatName("");
        handleClose();
      } catch (err) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: err.data,
        });
      }
    }
  }
  const [subCatImg, setSubCatImg] = useState(null);

  async function addNewSubCategory() {
    if (subCategoryName && subCatImg !== null) {
      try {
        const formData = new FormData();
        formData.append("name", subCategoryName);
        formData.append("category", categoryId);
        formData.append("image", subCatImg);
        await addSubCategory(formData).unwrap();
        setSubCatName("");
        setSubCatImg(null);
        handleClose();
      } catch (err) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
        console.log(err);
      }
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Add All fields",
      });
    }
  }
  return (
    <>
      <div
        className="category-Card text-light"
        style={{ backgroundColor: color, boxShadow: color }}
        onClick={handleShow}
      >
        <div className="card-container">
          <span className="fs-3 fw-bolder">{title}</span>
        </div>
        <div className="cardFooter">Click to Add New {title}</div>
      </div>
      <CategoryModel
        show={show}
        handleClose={handleClose}
        title={title}
        categoryName={categoryName}
        setCatName={setCatName}
        setSubCatName={setSubCatName}
        allCategory={allCategory}
        subCategoryName={subCategoryName}
        setSubCatImg={setSubCatImg}
        isLoading={isLoading}
        loading={loading}
        addCategory={addCategory}
        addNewSubCategory={addNewSubCategory}
      />
    </>
  );
});
CategoryCards.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
};
CategoryCards.displayName = "CategoryCards";
export default CategoryCards;
