import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data, chartType }) => {
  return (
    <ResponsiveContainer width="100%" height={500 + data.length * 30}>
      <BarChart
        width={500}
        height={300 + data.length * 30}
        data={data}
        margin={{
          top: 5,
          right: 100,
          left: 100,
          bottom: 5,
        }}
        layout={chartType === "general" ? "horizontal" : "vertical"}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type={chartType === "general" ? "category" : "number"}
          dataKey={chartType === "general" ? "name" : "count"}
        />
        <YAxis
          type={chartType === "general" ? "number" : "category"}
          dataKey={chartType === "general" ? "count" : "name"}
        />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
