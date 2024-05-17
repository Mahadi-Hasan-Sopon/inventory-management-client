/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { axiosSecure } from "../../../hooks/useAxios";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const AdminSalesChart = () => {
  const { data: salesByShop, isLoading } = useQuery({
    queryKey: ["salesByShop", "admin"],
    queryFn: () =>
      axiosSecure.get("/admin/salesByShop").then((res) => res.data),
  });

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
  Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // console.log(salesByShop);

  const dataToDisplayForLargeDevice = isLoading
    ? []
    : salesByShop?.length > 6
    ? salesByShop.slice(0, 6)
    : salesByShop;

  const dataToDisplayForTabletDevice = isLoading
    ? []
    : salesByShop?.length > 4
    ? salesByShop.slice(0, 4)
    : salesByShop;

  const dataToDisplayForSmallDevice = isLoading
    ? []
    : salesByShop?.length > 3
    ? salesByShop.slice(0, 3)
    : salesByShop;

  return (
    <ResponsiveContainer width="100%" height={350}>
      {/* for tablet and large */}
      <BarChart
        className="hidden md:block ps-4"
        data={dataToDisplayForLargeDevice}
      >
        <XAxis dataKey={"shopName"} />
        <YAxis />
        <Bar
          dataKey={"totalSales"}
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {dataToDisplayForLargeDevice?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
      <BarChart
        className="hidden sm:block md:hidden ps-4"
        data={dataToDisplayForTabletDevice}
      >
        <XAxis dataKey={"shopName"} />
        <YAxis />
        <Bar
          dataKey={"totalSales"}
          shape={<TriangleBar />}
          fill="#8884d8"
          label={{ position: "top" }}
        >
          {dataToDisplayForTabletDevice?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
      <BarChart className="sm:hidden" data={dataToDisplayForSmallDevice}>
        <XAxis dataKey={"shopName"} />
        <YAxis />
        <Bar dataKey={"totalSales"} fill="#8884d8" label={{ position: "top" }}>
          {dataToDisplayForSmallDevice?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AdminSalesChart;
