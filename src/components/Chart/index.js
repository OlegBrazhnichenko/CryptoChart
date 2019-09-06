import React, {Component} from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, } from "react-native";
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryCandlestick,
    VictoryLabel,
    LineSegment,
    VictoryCursorContainer,
    VictoryScatter,
    VictoryTooltip,
    VictoryPortal,
    VictoryGroup,
    Point,
    VictoryLine,
    VictoryContainer,
} from "./components/VictoryCharts/victory";
import {G, Rect, Polygon} from "react-native-svg";
import darkTheme from "./themes/darkTheme";
import Arrow from "./components/Arrow";


export default class Chart extends Component {
    static propTypes = {
        tradingPair: PropTypes.string,
        candleChartData: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.instanceOf(Date).isRequired,
            low: PropTypes.number.isRequired,
            high: PropTypes.number.isRequired,
            open: PropTypes.number.isRequired,
            close: PropTypes.number.isRequired,
            label: PropTypes.string,
        })),
        volumeBarData: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.instanceOf(Date).isRequired,
            y: PropTypes.number.isRequired,
            label: PropTypes.string,
        }))
    };


    getScatterData(candleChartData) {
        // Filter all candles that have trades and then format data for scatterChart
        return candleChartData.filter((item)=>!!item.trade).map((item)=>{
            return {
                x: item.x,
                y: item.high,
                tradeDirection: item.trade.tradeDirection,
                connotation: item.close > item.open ? "positive": "negative",
                label: "test3",
            }
        });
    }

    render() {
        const {candleChartData, volumeBarData, tradingPair} = this.props;

        const scatterSampleData = this.getScatterData(candleChartData);

        return(
            <View style={styles.chartContainer}>
                <VictoryChart
                    theme={darkTheme}
                    scale={{ x: "time" }}
                    style={{labels:{fill:"white"}}}
                    padding={{top:50, right: 80, bottom:50, left: 50}}
                >
                    <VictoryLabel x={25} y={24}
                                  text={tradingPair}
                                  style={{fill:"#fff"}}
                    />
                    <VictoryAxis tickFormat={(t) => {
                        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                        return `${t.getDate()} ${months[t.getMonth()]}`}
                    }/>
                    <VictoryAxis
                                 offsetX={90}
                                 style={{
                                     // tickLabels: { padding: -5},
                                 }}
                                 dependentAxis
                                 tickFormat={(t)=>t.toFixed(2)}
                                 orientation={"right"}/>

                    <VictoryBar
                        style={{ data: { fill: "#4A5281" }, labels:{fill:"#9BAADB"}}}
                        data={volumeBarData}
                    />
                    <VictoryCandlestick
                        standalone={false}
                        candleColors={{ positive: "#00AF6D", negative: "#DB0059" }}
                        data={candleChartData}
                        labels={() =>{}}
                        style={{
                            data: {
                                stroke: d => (d.close > d.open ? "#DB0059" : "#00AF6D"),
                                strokeWidth: 2
                            }
                        }}
                        labelComponent={
                            <VictoryTooltip
                                orientation={"top"}
                                flyoutStyle={{
                                    strokeWidth: 0,
                                    fill: "#434077",
                                }}
                            />
                        }
                    />
                    <VictoryScatter
                        dataComponent={<Arrow />}
                        size={7}
                        data={scatterSampleData}
                        labelComponent={
                            <VictoryTooltip
                                dy={-23}
                                flyoutStyle={{
                                    strokeWidth: 0,
                                    fill: "#434077",
                                }}
                            />
                        }
                    />

                    <VictoryLine
                        style={{
                            data: { stroke: "#00AF6D", strokeDasharray: "6,4" },
                            parent: { border: "1px solid #ccc"},
                            labels: {fill: "#2B284C", fontWeight:"bold"}
                        }}
                        labelComponent={
                            <VictoryPortal>
                                <CustomLabel dx={25} dy={7} />
                            </VictoryPortal>
                        }
                        labels={({ datum }) => datum.y}
                        data={[
                            { x: new Date(2016, 6, 0), y: 1080.92 },
                            { x: new Date(2016, 6, 170), y: 1070.92 },
                        ]}
                    />
                </VictoryChart>
            </View>
        )
    }
}

class CustomLabel extends Component {

    render(){

        let { x, y, style } = this.props;
        let { fontSize } = style;

        const labelHeight = fontSize + 10;

        // Y axis offset
        y -= labelHeight/2;

        // draw a label only for the last data point
        if(this.props.data.length-1 === Number(this.props.index)) {
            return (
                <G>
                    <Rect fill="#00AF6D" rx={3} ry={3} x={x-1} y={y} width="54" height={labelHeight} />
                    <Polygon
                        points={`${x},${y} ${x-labelHeight*0.75},${y+labelHeight/2} ${x},${y+labelHeight}`}
                        fill={"#00AF6D"}
                    />
                    <VictoryLabel {...this.props} />
                </G>
            );
        }

        return null;
    }

}

const styles = StyleSheet.create({
    chartContainer: {
        backgroundColor: "#2B284C",

    },
});