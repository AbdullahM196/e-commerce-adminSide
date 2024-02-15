import { useMemo } from "react";
import "./customer.css";
import UserTable from "../../components/userTables/UserTable";
import BarChart from "../../components/Charts/BarChart";
import {
  SelectAllUsers,
  useGetAllCustomerQuery,
  useGetUsersDataQuery,
} from "../../store/API/apiSlices/user";
import Loading from "../../components/loading/Loading";
import MainCard from "../../components/MainCard/MainCard";
import { GoPeople } from "react-icons/go";
import ErrorFetching from "../../components/Error/ErrorFetching";
import { format } from "date-fns";
import { useMostActiveCustomerQuery } from "../../store/API/apiSlices/Orders";
import { useSelector } from "react-redux";

export default function Customers() {
  const { data: mostActCustomers, isSuccess: mostActSuccess } =
    useMostActiveCustomerQuery();

  // table data.
  const { isSuccess, isError, error } = useGetAllCustomerQuery();
  // header data
  const customers = useSelector(SelectAllUsers);
  const {
    data,
    isLoading: loading,
    isSuccess: success,
    isError: iserror,
    error: Error,
  } = useGetUsersDataQuery();
  let userCard;
  if (loading) {
    userCard = <Loading />;
  } else if (success && isSuccess && mostActSuccess) {
    userCard = (
      <MainCard
        color={"#ffc96c"}
        percent={Math.ceil(
          (mostActCustomers.mostActiveCustomers.length / customers.length) * 100
        )}
        title="Active"
        icon={<GoPeople />}
        number={customers.length}
        ditals={"All Customers"}
      />
    );
  } else if (iserror) {
    userCard = <ErrorFetching error={Error} />;
  }
  const userGained = useMemo(() => {
    if (success) {
      const filteredCustomers = data.filter((data) => data._id);
      const newUserData = {
        labels: filteredCustomers
          .map(
            (data) =>
              data._id && format(new Date(2023, data._id?.month - 1, 1), "MMMM")
          )
          .reverse(),
        datasets: [
          {
            label: "userGain",
            data: filteredCustomers.map((data) => data._id && data.userGained),
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
    }
  }, [data, success]);

  const chart = useMemo(() => {
    if (success && Object.keys(userGained).length !== 0) {
      return <BarChart data={userGained} />;
    }
  }, [userGained, success]);

  return (
    <div className="customerPage w-100">
      <h1>Customers</h1>
      <div className="customer-body">
        <div className="customerHeader">
          {chart}
          {userCard}
        </div>
        {isSuccess && mostActSuccess ? (
          <div className="customers my-5">
            {
              <UserTable
                data={customers}
                mostAct={mostActCustomers.mostActiveCustomers}
              />
            }
          </div>
        ) : isError ? (
          <ErrorFetching error={error} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
