import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    dt: moment(new Date(2011, 9, 16)).unix()
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    dt: moment(new Date(2011, 9, 17)).unix()
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    dt: moment(new Date(2011, 9, 18)).unix()
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    dt: moment(new Date(2011, 9, 19)).unix()
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    dt: moment(new Date(2011, 9, 20)).unix()
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    dt: moment(new Date(2011, 9, 21)).unix()
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    dt: moment(new Date(2011, 10, 22)).unix()
  }
];
console.log(data)

const formatXAxis = (tickFormat) => {
  return moment.unix(tickFormat).format("DD/MM/YYYY");
};
export default function Test() {
  return (
    <div className="App">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}          
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tickFormatter={(tick) => formatXAxis(tick)}
            type={"category"}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
