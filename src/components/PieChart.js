import React from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Legend,
    Label
} from "bizcharts";
import DataSet from "@antv/data-set";

export default class pieChart extends React.Component {
    render() {
        const { DataView } = DataSet;
        const data = this.props.data;
        const dv = new DataView();
        dv.source(data).transform({
            type: "percent",
            field: "count",
            dimension: "item",
            as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = val * 100 + "%";
                    return val;
                }
            }
        };
        return (
            <div>
                <Chart
                    height={300}
                    data={dv}
                    scale={cols}
                    padding={[0, 0, 0, 0]}
                    forceFit
                >
                    <Coord type="theta" radius={0.75} />
                    <Axis name="percent" />
                    <Legend
                        position="bottom"
                        offsetY={-window.innerHeight / 2 + 360}
                        offsetX={0}
                    />
                    <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style='background-color:{color};' class='g2-tooltip-marker'></span><span style='margin-right:5px;'>工作时长:{count} mouth</span><span>企业类型：{type}</span></li>"
                    />
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color="item"
                        tooltip={[
                            "item*percent*count*type",
                            (item, percent, count, type) => {
                                percent = percent * 100 + "%";
                                return {
                                    name: item,
                                    value: percent,
                                    count: count,
                                    type: type
                                };
                            }
                        ]}
                        style={{
                            lineWidth: 0.5,
                            stroke: "#fff"
                        }}
                    >
                        <Label
                            content="item"
                            offset={-50}
                            textStyle={{
                                fill: "#666666",
                                stroke: "#ffffff",
                                rotate: 0,
                                textAlign: "center",
                                shadowBlur: 1,
                                fontSize: "14",
                                shadowColor: "rgba(0, 0, 0, .45)"
                            }}
                        />
                    </Geom>
                </Chart>
            </div>
        );
    }
}
