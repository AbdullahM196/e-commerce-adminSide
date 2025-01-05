import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import React from "react";
const CategoryTable = React.memo(function ({
  data,
  setCategoryId,
  setCatName,
  handleShow,
}) {
  function categoryOldData(category) {
    setCategoryId(category._id);
    setCatName(category.name);

    handleShow();
  }
  return (
    <Table hover variant="light" responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Category Name</th>
          <th>SubCategories</th>
          <th className="text-center" colSpan={2}>
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((category, index) => {
          return (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td className="subCategoriesNames">
                {category.subCategories.map((sub) => {
                  return <span key={sub._id}>{sub.name}</span>;
                })}
              </td>
              <td className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    categoryOldData(category);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
});

CategoryTable.displayName = "CategoryTable";
export default CategoryTable;
CategoryTable.propTypes = {
  data: PropTypes.array.isRequired,
  setCategoryId: PropTypes.func.isRequired,
  setCatName: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
};
