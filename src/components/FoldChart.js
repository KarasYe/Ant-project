import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend
} from "bizcharts";
import DataSet from "@antv/data-set";

const color = '#30b767';
export default class FoldChart extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = this.props.data
    const dv = new DataView().source(data);
    dv.transform({
      type: "fold",
      fields: ["binbin"],
      // 展开字段集
      key: "user",
      // key字段
      value: "score" // value字段
    });
    const cols = {
      score: {
        min: 0,
        max: 100
      }
    };
    return (
      <div>
        <Chart
          height={300}
          data={dv}
          padding={[40, 40, 40, 40]}
          scale={cols}
          forceFit
        >
          <Coord type="polar" radius={0.8} />
          <Axis
            name="item"
            line={null}
            tickLine={null}
            grid={{
              lineStyle: {
                lineDash: null
              },
              hideFirstLine: false
            }}
          />
          <Tooltip />
          <Axis
            name="score"
            line={null}
            tickLine={null}
            grid={{
              type: "polygon",
              lineStyle: {
                lineDash: null
              },
              alternateColor: "rgba(0, 0, 0, 0.04)"
            }}
          />
          <Legend name="user" marker="circle" offset={30} color={color}/>
          <Geom type="area" position="item*score" color={color} />
          <Geom type="line" position="item*score" color={color} size={2} />
          <Geom
            type="point"
            position="item*score"
            color="user"
            shape="circle"
            size={4}
            style={{
              stroke: color,
              lineWidth: 1,
              fillOpacity: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}