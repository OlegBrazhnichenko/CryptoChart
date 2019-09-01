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
} from "./components/VictoryCharts/victory";
import darkTheme from "./themes/darkTheme";
import Arrow from './components/Arrow';

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
                    containerComponent={
                        <VictoryCursorContainer
                            cursorLabel={({datum}) => `$${datum.y.toFixed(2)}`}
                            cursorDimension={"y"}
                            cursorLabelComponent={
                                <VictoryLabel style={{fill:"#fff"}}/>
                            }
                            cursorComponent={
                                <LineSegment style={{stroke:"#00AF6D",strokeDasharray:"5,5"}}/>
                            }
                        />
                    }
                >
                    <VictoryLabel x={25} y={24}
                                  text={tradingPair}
                                  style={{fill:"#fff"}}
                    />
                    <VictoryAxis tickFormat={(t) => {
                        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                        return `${t.getDate()} ${months[t.getMonth()]}`}
                    }/>
                    <VictoryAxis dependentAxis orientation={"right"}/>

                    <VictoryBar
                        style={{ data: { fill: "#4A5281" }, labels:{fill:"#9BAADB"}}}
                        data={volumeBarData}
                        labelComponent={
                            <VictoryTooltip
                                flyoutStyle={{
                                    strokeWidth: 0,
                                    fill: "#434077",
                                }}
                            />
                        }
                    />
                    <VictoryCandlestick
                        standalone={false}
                        candleColors={{ positive: "#00AF6D", negative: "#DB0059" }}
                        data={candleChartData}
                        style={{
                            data: {
                                stroke: d => (d.close > d.open ? "#DB0059" : "#00AF6D"),
                                strokeWidth: 2
                            }
                        }}
                        labelComponent={<VictoryTooltip />} //Doesn't work
                    />
                    <VictoryScatter
                        dataComponent={<Arrow />}
                        size={7}
                        data={scatterSampleData}
                        labelComponent={<VictoryTooltip />} //Doesn't work
                    />
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