import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useGetOffersQuery } from "../../store/API/apiSlices/Offers";
import { formatDistanceToNow, parseISO } from "date-fns";
import "./offers.css";
import { useMemo, useState } from "react";
import AddOfferModel from "../../components/OffersModel/AddOfferModel";
import OfferCards from "./OffersCard";
import HelmetMetaTags from "../../components/MetaTags/HelmetMetaTags";

export default function Offers() {
  const [showAddOffer, setShowAddOffer] = useState(false);
  const handleShowAddOffer = () => setShowAddOffer(true);

  const [show, setShow] = useState(false);
  const [offer, setOffer] = useState(undefined);

  const { data, isSuccess } = useGetOffersQuery();
  const headerContent = useMemo(() => {
    if (isSuccess) {
      return (
        <Splide
          tag="section"
          options={{
            type: "loop",
            autoplay: true,
            height: "40vh",
            width: "100%",
            gap: "1rem",
            speed: 1000,
            pauseOnHover: true,
          }}
          aria-label="My Favorite Images"
        >
          {data.map((item, index) => {
            return (
              <SplideSlide key={item._id}>
                <img
                  className="w-100 h-100"
                  src={item.img.url}
                  alt={`offer${index}`}
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  width={357}
                  height={141}
                  title={item.title}
                />
              </SplideSlide>
            );
          })}
        </Splide>
      );
    }
  }, [data, isSuccess]);
  const bodyContent = useMemo(() => {
    if (isSuccess) {
      return data.map((item) => {
        const date = parseISO(item.createdAt);
        const timeAgo = formatDistanceToNow(date, { addSuffix: true });
        return (
          <OfferCards
            key={item._id}
            item={item}
            setOffer={setOffer}
            setShow={setShow}
            date={timeAgo}
            offer={offer}
            show={show}
          />
        );
      });
    }
  }, [isSuccess, data, offer, show]);

  return (
    <div className="container-fluid">
      <HelmetMetaTags
        title="Offers"
        content="Offers Create Or Delete Or Update"
        url="/offers"
      />
      <div> {headerContent}</div>
      <div className="container-fluid w-100 d-flex justify-content-end  my-1">
        <button className="btn btn-primary" onClick={handleShowAddOffer}>
          Add Offer
        </button>
        <AddOfferModel show={showAddOffer} setShow={setShowAddOffer} />
      </div>
      <div className="row row-cols-1 my-2">{bodyContent}</div>
    </div>
  );
}
