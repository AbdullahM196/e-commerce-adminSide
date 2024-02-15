import MainCard from "../MainCard/MainCard";
import "./cards.css";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { MdOutlineSell } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import {
  useGetAllOrdersQuery,
  useMostActiveCustomerQuery,
} from "../../store/API/apiSlices/Orders";
import {
  SelectAllUsers,
  useGetAllCustomerQuery,
} from "../../store/API/apiSlices/user";
import Loading from "../loading/Loading";
import ErrorFetching from "../Error/ErrorFetching";
import { useSelector } from "react-redux";
export default function Cards() {
  const { data: mostActCustomers, isSuccess: mostActSuccess } =
    useMostActiveCustomerQuery();
  const {
    isLoading: loading,
    isSuccess: success,
    isError: iserror,
    error: Error,
  } = useGetAllCustomerQuery();
  const customers = useSelector(SelectAllUsers);
  let userCard;
  if (loading) {
    userCard = <Loading />;
  } else if (success && mostActSuccess) {
    userCard = (
      <MainCard
        color={"#ffc96c"}
        percent={Math.ceil(
          (mostActCustomers.mostActiveCustomers.length / customers.length) * 100
        )}
        title="Active"
        icon={<GoPeople />}
        number={customers.length}
        ditals={"all Customers"}
      />
    );
  } else if (iserror) {
    userCard = <ErrorFetching error={Error} />;
  }
  const { data, isLoading, isSuccess, isError, error } = useGetAllOrdersQuery();
  let canceledLength = 0;
  let salesPrice = 0;
  let orderSuccess = 0;
  let orderContent;
  let salesCard;
  if (isLoading) {
    orderContent = <Loading />;
  } else if (isSuccess) {
    data.forEach((element) => {
      if (element.status == "Cancelled") {
        canceledLength++;
      }
      salesPrice += element.totalPrice ? element.totalPrice : 0;
    });
    const orderFailed = canceledLength / data.length;
    orderSuccess = (1 - orderFailed) * 100;
    orderContent = (
      <MainCard
        color={"#10b981"}
        percent={Math.round(orderSuccess)}
        title="Orders"
        icon={<MdOutlineSell />}
        number={data.length}
        date={"last 24 Hours"}
      />
    );
    salesCard = (
      <MainCard
        color={"#c280fe"}
        percent={Math.round(orderSuccess)}
        title="Sales"
        icon={<RiMoneyDollarBoxLine />}
        number={salesPrice}
        date={"last 24 Hours"}
      />
    );
  } else if (isError) {
    orderContent = <ErrorFetching error={error} />;
  }
  return (
    <div className="dashboardCards">
      {salesCard}
      {orderContent}
      {userCard}
    </div>
  );
}
