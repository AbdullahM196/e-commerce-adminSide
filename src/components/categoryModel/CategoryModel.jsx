import { Button, Form, Modal } from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import Loading from "../loading/Loading";
import PropTypes from "prop-types";
import React from "react";

const CategoryModel = React.memo(function ({
  show,
  handleClose,
  title,
  categoryName,
  setCatName,
  setSubCatName,
  allCategory,
  subCategoryName,
  setSubCatImg,
  isLoading,
  loading,
  addCategory,
  addNewSubCategory,
}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {title == "Category" ? (
          <Form.Control
            size="lg"
            type="text"
            placeholder="Add Category Name"
            value={categoryName}
            onChange={(evt) => {
              setCatName(evt.target.value);
            }}
          />
        ) : (
          <>
            {allCategory()}
            <span className="d-flex align-items-center gap-2">
              <Form.Control
                className="mt-4"
                size="lg"
                type="text"
                placeholder="Add SubCategory Name"
                value={subCategoryName}
                onChange={(evt) => {
                  setSubCatName(evt.target.value);
                }}
              />
              <label htmlFor="camera">
                <FaCamera className="mt-2 text-success" />
                <input
                  type="file"
                  id="camera"
                  style={{ display: "none" }}
                  onChange={(evt) => {
                    setSubCatImg(evt.target.files[0]);
                  }}
                />
              </label>
            </span>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        {isLoading || loading ? (
          <Loading />
        ) : (
          <Button
            variant="primary"
            onClick={title == "Category" ? addCategory : addNewSubCategory}
          >
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
});

CategoryModel.displayName = "CategoryModel";
export default CategoryModel;

CategoryModel.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  categoryName: PropTypes.string,
  setCatName: PropTypes.func,
  setSubCatName: PropTypes.func,
  allCategory: PropTypes.func,
  subCategoryName: PropTypes.string,
  setSubCatImg: PropTypes.func,
  isLoading: PropTypes.bool,
  loading: PropTypes.bool,
  addCategory: PropTypes.func,
  addNewSubCategory: PropTypes.func,
};
