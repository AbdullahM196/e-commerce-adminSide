import { useMemo } from "react";
import "./customer.css";
import UserTable from "../../components/userTables/UserTable";
import BarChart from "../../components/Charts/BarChart";
import {
  SelectAllUsers,
  useGetUsersDataQuery,
} from "../../store/API/apiSlices/user";
import MainCard from "../../components/MainCard/MainCard";
import { GoPeople } from "react-icons/go";
import { format } from "date-fns";
import { useMostActiveCustomerQuery } from "../../store/API/apiSlices/Orders";
import { useSelector } from "react-redux";
import HelmetMetaTags from "../../components/MetaTags/HelmetMetaTags";

export default function Customers() {
  const { data: mostActiveCustomers } = useMostActiveCustomerQuery({
    //options
    cacheTime: 60000,
    pollingInterval: 60000,
    initialData: [],
  });

  // header data
  const customers = useSelector(SelectAllUsers);
  const { data } = useGetUsersDataQuery();

  const userGained = useMemo(() => {
    const filteredCustomers = data?.filter((data) => data._id);

    const newUserData = {
      labels: filteredCustomers
        .map(
          (data) =>
            data._id && format(new Date(2023, data._id?.month - 1, 1), "MMMM")
        )
        .reverse(),
      datasets: [
        {
          label: "User Gained Last 4 Months",
          data: filteredCustomers?.map((data) => data._id && data.userGained),
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
    };
    return newUserData;
  }, [data]);

  const chart = useMemo(() => {
    if (Object.keys(userGained).length !== 0) {
      return <BarChart data={userGained} />;
    }
  }, [userGained]);

  return (
    <>
      <HelmetMetaTags
        title="Customers"
        content="Look at our Customers"
        url="/customers"
      />
      <div className="customerPage w-100">
        <h1>Preview Our Customers</h1>
        <div className="customer-body">
          <div className="customerHeader w-100">
            {chart}
            <MainCard
              color={"#ffc96c"}
              percent={Math.ceil(
                (mostActiveCustomers?.length / customers?.length) * 100
              )}
              title="Active"
              icon={<GoPeople />}
              number={customers.length}
              ditals={"All Customers"}
            />
          </div>

          <div className="customers my-5">
            <UserTable data={customers} mostAct={mostActiveCustomers} />
          </div>
        </div>
      </div>
    </>
  );
}
