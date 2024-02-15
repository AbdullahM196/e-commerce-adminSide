import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import {
  selectSubCategoryById,
  useEditSubCategoryMutation,
} from "../../store/API/apiSlices/SubCategory";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../../components/loading/Loading";
import PropTypes from "prop-types";
import { FcEditImage } from "react-icons/fc";
import { useSelector } from "react-redux";

export default function SubCategories({ id }) {
  const subCategory = useSelector((state) => selectSubCategoryById(state, id));
  const MySwal = withReactContent(Swal);
  const [subCategoryName, setSubCatName] = useState(subCategory.name);
  const [updateSubCat, setUpdateSub] = useState(false);
  const [editSubCategory, { isLoading }] = useEditSubCategoryMutation();
  const [file, setFile] = useState(null);

  async function handleEditSub() {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", subCategoryName);
      if (file !== null) {
        formData.append("image", file);
        await editSubCategory(formData).unwrap();
        setUpdateSub((prev) => !prev);
      } else {
        await editSubCategory(formData).unwrap();
        setUpdateSub((prev) => !prev);
      }
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: err.data,
      });
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="my-3">
      {!updateSubCat ? (
        <Card
          onClick={() => {
            setUpdateSub((prev) => !prev);
          }}
        >
          <Card.Body
            style={{
              background: `url(${subCategory.img.url})`,
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain ",
            }}
          >
            {subCategoryName}
          </Card.Body>
        </Card>
      ) : (
        <span className="d-flex align-items-center">
          <Form.Control
            size="lg"
            type="text"
            placeholder="Add subCategory Name"
            value={subCategoryName}
            style={{ flex: 7 }}
            onChange={(evt) => {
              setSubCatName(evt.target.value);
            }}
          />
          <label>
            <FcEditImage
              style={{
                cursor: "pointer",
                flex: 2,
                width: "34px",
                height: "34px",
              }}
            />
            <input
              type="file"
              style={{ display: "none" }}
              name="subCategoryImage"
              onChange={(evt) => {
                setFile(evt.target.files[0]);
              }}
            />
          </label>

          <FaCheck
            style={{ cursor: "pointer", flex: 1 }}
            onClick={handleEditSub}
          />
        </span>
      )}
    </div>
  );
}
SubCategories.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  img: PropTypes.string,
};
