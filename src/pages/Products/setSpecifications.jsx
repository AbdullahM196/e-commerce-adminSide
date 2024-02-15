import { useEffect, useState } from "react";

const useSetSpecifications = (
  // subCategory,
  key1,
  key2,
  key3,
  key4,
  key5,
  value1,
  value2,
  value3,
  value4,
  value5
) => {
  const [specifications, setSpecifications] = useState({});
  useEffect(() => {
    // if (subCategory == "659e7b51683259244861dbda") {
    //   setSpecifications({
    //     Brand: value1,
    //     "Processor Type": value2,
    //     Display: value3,
    //     RAM: value4,
    //     "Hard Drive Size": value5,
    //   });
    // } else if (subCategory == "659e76c5683259244861dbd2") {
    //   setSpecifications({
    //     OperatingSystem: value1,
    //     RAMSize: value2,
    //     BatterySize: value3,
    //     InternalMemory: value4,
    //     DisplayType: value5,
    //   });
    // } else {
    setSpecifications({
      [key1]: value1,
      [key2]: value2,
      [key3]: value3,
      [key4]: value4,
      [key5]: value5,
    });
    // }
  }, [
    // subCategory,
    key1,
    key2,
    key3,
    key4,
    key5,
    value1,
    value2,
    value3,
    value4,
    value5,
  ]);
  return specifications;
};
export default useSetSpecifications;
