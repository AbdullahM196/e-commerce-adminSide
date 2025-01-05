import MainCard from "../MainCard/MainCard";
import "./cards.css";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { MdOutlineSell } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import {
  useGetAllOrdersQuery,
  useMostActiveCustomerQuery,
} from "../../store/API/apiSlices/Orders";
import { SelectAllUsers } from "../../store/API/apiSlices/user";
import { useSelector } from "react-redux";
import { useMemo } from "react";
export default function Cards() {
  const { data: mostActCustomers } = useMostActiveCustomerQuery();
  const { data } = useGetAllOrdersQuery();

  const customers = useSelector(SelectAllUsers);

  const { canceledLength, salesPrice } = useMemo(() => {
    let canceledLength = 0;
    let salesPrice = 0;

    data.forEach((element) => {
      if (element.status === "Cancelled") {
        canceledLength++;
      }
      salesPrice += element.totalPrice ? element.totalPrice : 0;
    });

    return { canceledLength, salesPrice };
  }, [data]);

  const orderFailed = useMemo(() => {
    return canceledLength / data.length;
  }, [canceledLength, data.length]);
  const orderSuccess = useMemo(() => (1 - orderFailed) * 100, [orderFailed]);

  return (
    <div className="dashboardCards">
      <MainCard
        color={"#c280fe"}
        percent={Math.round(orderSuccess)}
        title="Sales"
        icon={<RiMoneyDollarBoxLine />}
        number={salesPrice}
        date={"last 24 Hours"}
      />
      <MainCard
        color={"#10b981"}
        percent={Math.round(orderSuccess)}
        title="Orders"
        icon={<MdOutlineSell />}
        number={data.length}
        date={"last 24 Hours"}
      />
      <MainCard
        color={"#ffc96c"}
        percent={Math.ceil((mostActCustomers.length / customers.length) * 100)}
        title="Active"
        icon={<GoPeople />}
        number={customers.length}
        ditals={"all Customers"}
      />
    </div>
  );
}
