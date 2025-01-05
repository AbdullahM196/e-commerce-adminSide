import "./offers.css";
// import egPhoto from "../../assets/eg.svg";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import OffersModel from "../../components/OffersModel/OffersModel";
import PropTypes from "prop-types";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useDeleteOfferMutation } from "../../store/API/apiSlices/Offers";
export default function OfferCards({
  item,
  date,
  setShow,
  setOffer,
  offer,
  show,
}) {
  const MySwal = withReactContent(Swal);
  function showOfferDetails() {
    setShow(true);
    setOffer(item);
  }
  const handleClose = () => setShow(false);
  const [deleteOffer] = useDeleteOfferMutation();
  async function handleDeleteOffer() {
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
          await deleteOffer(item._id).unwrap();
          MySwal.fire("Deleted!", "Your Offer has been deleted.", "success");
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
  return (
    <>
      <div className="offerCard">
        <div className="LiftSide">
          <img
            src={item.img.url ? item.img.url : ""}
            alt={item.title}
            className="w-100 h-100"
            width={"auto"}
            height={"auto"}
            title={item.title}
            loading="eager"
          />
        </div>
        <div className="RightSide">
          <p className="title">
            {item.title} {date}
          </p>
          <p className="description">{item.offerDescription}</p>
          <div className="footer">
            <span className="editOffer">
              <span onClick={handleDeleteOffer}>
                <FaRegTrashAlt />
              </span>
              <span onClick={showOfferDetails}>
                <MdModeEdit />
              </span>
            </span>
            <span className="discount">
              <small>Discount % </small>
              {item.discount}
            </span>
          </div>
        </div>
      </div>
      <OffersModel show={show} data={offer} handleClose={handleClose} />
    </>
  );
}
OfferCards.propTypes = {
  discount: PropTypes.number,
  title: PropTypes.string,
  img: PropTypes.object,
  description: PropTypes.string,
  date: PropTypes.string,
  item: PropTypes.object,
  setOffer: PropTypes.func,
  setShow: PropTypes.func,
  show: PropTypes.bool,
  offer: PropTypes.object,
};
