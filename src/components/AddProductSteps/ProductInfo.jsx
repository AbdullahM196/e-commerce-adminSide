import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  selectAllSubCategory,
  useGetAllSubCategoriesQuery,
} from "../../store/API/apiSlices/SubCategory";
import Loading from "../loading/Loading";
import ErrorFetching from "../Error/ErrorFetching";

import { useSelector } from "react-redux";
export default function ProductInfo({
  title,
  setTitle,
  titleBlur,
  titleError,
  titleTouched,
  description,
  setDescription,
  descriptionBlur,
  descriptionError,
  descriptionTouhed,
  subCategory,
  setSubCategory,
  subCategoryBlur,
  subCategoryError,
  subCategoryTouched,
  specificationBlur,
  specificationError,
  specificationTouched,
  spicKeys,
  setSpicKeys,
  spicValues,
  setSpicValues,
}) {
  const subCategories = useSelector(selectAllSubCategory);
  const { isLoading, isSuccess, isError, error } =
    useGetAllSubCategoriesQuery();

  function getAllSubCat() {
    let subCatContent;
    if (isLoading) {
      subCatContent = <Loading />;
    } else if (isError) {
      subCatContent = <ErrorFetching error={error} />;
    } else if (isSuccess) {
      subCatContent = (
        <>
          <Form.Select
            aria-label="Default select"
            size="lg"
            value={subCategory}
            onChange={(evt) => setSubCategory("subCategory", evt.target.value)}
            onBlur={subCategoryBlur}
          >
            <option value="" disabled defaultValue={true}>
              SubCategories
            </option>
            {subCategories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
          {subCategoryError && subCategoryTouched && (
            <p className="text-danger fs-5 mt-1">{subCategoryError}</p>
          )}
        </>
      );
    }
    return subCatContent;
  }

  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="product title"
          name="title"
          value={title}
          onChange={setTitle}
          onBlur={titleBlur}
        />
        {titleError && titleTouched && (
          <p className="text-danger fs-5 mt-1">{titleError}</p>
        )}
      </Form.Group>
      {getAllSubCat()}

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={description}
          onChange={setDescription}
          onBlur={descriptionBlur}
        />
        {descriptionError && descriptionTouhed && (
          <p className="text-danger fs-5 mt-1">{descriptionError}</p>
        )}
      </Form.Group>
      {spicKeys.map((key, index) => (
        <Form.Group
          key={index}
          className="mb-3 d-flex"
          controlId={`spicsForm${index}`}
        >
          <Form.Control
            type="text"
            placeholder={`spicsKey${index}`}
            name={`spicsKey${index}`}
            value={spicKeys[index]}
            onChange={(evt) => {
              const updatedKeys = [...spicKeys];
              updatedKeys[index] = evt.target.value;
              setSpicKeys(updatedKeys);
            }}
            onBlur={specificationBlur}
          />
          <Form.Control
            type="text"
            placeholder={`spics value${index}`}
            name={`spicsValue${index}`}
            value={spicValues[index]}
            onChange={(evt) => {
              const updatedValues = [...spicValues];
              updatedValues[index] = evt.target.value;
              setSpicValues(updatedValues);
            }}
            onBlur={specificationBlur}
          />
          {specificationError && specificationTouched && (
            <p className="text-danger fs-5 mt-1">{specificationError}</p>
          )}
        </Form.Group>
      ))}
    </>
  );
}
ProductInfo.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  subCategory: PropTypes.string.isRequired,
  setSubCategory: PropTypes.func,
  spicKeys: PropTypes.array.isRequired,
  setSpicKeys: PropTypes.func,
  spicValues: PropTypes.array.isRequired,
  setSpicValues: PropTypes.func,
  specificationBlur: PropTypes.func,
  specificationError: PropTypes.func,
  specificationTouched: PropTypes.func,
  titleBlur: PropTypes.func,
  titleError: PropTypes.func,
  titleTouched: PropTypes.func,
  subCategoryBlur: PropTypes.func,
  subCategoryError: PropTypes.func,
  subCategoryTouched: PropTypes.func,
  descriptionBlur: PropTypes.func,
  descriptionError: PropTypes.func,
  descriptionTouhed: PropTypes.func,
};
