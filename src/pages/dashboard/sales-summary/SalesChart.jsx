/* eslint-disable react/prop-types */
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const SalesChart = ({ salesData }) => {
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

  return (
    <div className="w-full">
      <BarChart width={500} height={300} data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={"_id"} />
        <YAxis />
        <Bar
          dataKey={"totalSales"}
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {salesData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default SalesChart;
