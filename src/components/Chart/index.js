import React, {Component} from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, } from "react-native";
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryCandlestick,
    VictoryLabel,
    VictoryScatter,
    VictoryTooltip,
    VictoryLine,
} from "./components/VictoryCharts/victory";
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
            volume: PropTypes.number.isRequired,
            label: PropTypes.string,

        })),
        nearestTrades: PropTypes.arrayOf(PropTypes.shape({
            y: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
        })),
    };

    constructor() {
        super();

        this.tradeTypes = {
            closeLong: {tradeDirection: "up", connotation: "positive", title: "Close Long"},
            closeShort: {tradeDirection: "down", connotation: "negative", title: "Close Short"},
            long: {tradeDirection: "down", connotation: "positive", title: "Long"},
            short: {tradeDirection: "up", connotation: "negative", title: "Short"},
        }
    }

    getScatterData(candleChartData) {
        // Filter all candles that have trades and then format data for scatterChart
        return candleChartData.filter((item)=>!!item.trade).map((item)=>{
            return {
                ...this.tradeTypes[item.trade.type],
                x: item.x,
                y: item.high,

                label: `${this.tradeTypes[item.trade.type].title}\n$${item.trade.price}\n${this.formatDate(item.x)}`,
            }
        });
    }

    processNearestTrades(tradesData) {
        const {candleChartData} = this.props;

        // Used to make line wider than chart data, so SvgTradeIcon is not draws next to
        // last candle and overlap it
        const xAxisOffset = 2;

        const lastCandleX = new Date(candleChartData[candleChartData.length-1].x.getTime());
        const endPoint = lastCandleX.setDate(lastCandleX.getDate()+xAxisOffset);
        const startPoint = candleChartData[0].x;

        return tradesData.map((trade)=>{
            return {
                lineData: [
                    {
                        y: trade.y,
                        x: startPoint,
                    },
                    {
                        y: trade.y,
                        x: endPoint,
                    }
                ],
                arrowData: [
                    {
                        y: trade.y,
                        x: endPoint,
                        label: `${this.tradeTypes[trade.type].title}\n$${trade.y}`
                    }
                ],
                arrowProps: this.tradeTypes[trade.type],
            }
        })
    }

    processCandleChartData(data) {

        return data.map((candle) => {
            const {x, open, high, low, close, volume} = candle;

            return {
                ...candle,
                label: `${this.formatDate(x)}\n o: ${open}\n h:${high}\n l: ${low}\n c: ${close}\n v: ${volume}`
            }
        })
    }

    getVolumeChartData(data) {
        return data.map((item) => {
            return {
                x: item.x,
                y: item.volume,
            }
        })
    }

    formatDate(d){

        return ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth()+1)).slice(-2) + "." +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    }

    render() {
        const {candleChartData, tradingPair, nearestTrades} = this.props;

        const scatterSampleData = this.getScatterData(candleChartData);
        const nearestTradesData = this.processNearestTrades(nearestTrades);
        const proccessedCandleChartData = this.processCandleChartData(candleChartData);
        const volumeChartData = this.getVolumeChartData(candleChartData);
        console.log(proccessedCandleChartData);
        return(
            <View style={styles.chartContainer}>
                <VictoryChart
                    theme={darkTheme}
                    scale={{ x: "time" }}
                    style={{labels:{fill:"white"}}}
                    padding={{top:50, right: 70, bottom:50, left: 50}}
                >
                    {/*Trading pair label*/}
                    <VictoryLabel x={25} y={24}
                                  text={tradingPair}
                                  style={{fill:"#fff"}}
                    />

                    {/*X axis*/}
                    <VictoryAxis tickFormat={(t) => {
                        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                        return `${t.getDate()} ${months[t.getMonth()]}`}
                    }/>

                    {/*Y axis*/}
                    <VictoryAxis
                                 // offsetX={90}
                                 style={{
                                     // tickLabels: { padding: -5},
                                 }}
                                 dependentAxis
                                 tickFormat={(t)=>t}
                                 orientation={"right"}/>


                    {/*Volume bar*/}
                    <VictoryBar
                        style={{ data: { fill: "#4A5281" }, labels:{fill:"#9BAADB"}}}
                        data={volumeChartData}
                    />

                    {/*Candle stick chart*/}
                    <VictoryCandlestick
                        standalone={false}
                        candleColors={{ positive: "#00AF6D", negative: "#DB0059" }}
                        data={proccessedCandleChartData}
                        labels={() =>{}} // do nothing, but doesn't work without it, weird
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

                    {/*Closed trades*/}
                    <VictoryScatter
                        dataComponent={<Arrow />}
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

                    {/*Nearest trade*/}
                    {nearestTradesData.map((trade, index)=>{
                        return (
                            <VictoryLine
                                key={index}
                                style={{
                                    data: {
                                        stroke: trade.arrowProps.connotation === "positive" ? "#00AF6D" : "#DB0059",
                                        strokeDasharray: "6,4"
                                    },
                                    parent: { border: "1px solid #ccc"},
                                    labels: {fill: "#2B284C", fontWeight:"bold"}
                                }}

                                data={trade.lineData}
                            />
                        )
                    })}

                    {nearestTradesData.map((trade, index)=>{
                        return (
                            <VictoryScatter
                                key={index}
                                dataComponent={<Arrow offset={{x: 1, y:13}} {...trade.arrowProps}/>}
                                data={trade.arrowData}
                                labelComponent={
                                    <VictoryTooltip
                                        dy={-15}
                                        dx={12}
                                        flyoutStyle={{
                                            strokeWidth: 0,
                                            fill: "#434077",
                                        }}

                                    />
                                }
                            />
                        )
                    })}
                </VictoryChart>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    chartContainer: {
        backgroundColor: "#2B284C",

    },
});