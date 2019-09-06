import React from "react";
import { StyleSheet, View} from "react-native";
import Chart from "./src/components/Chart";

export default class App extends React.Component {

    getSampleCandleChartData() {
        const data = [];

        // point from which chart data would start
        let currentPadding = 1000.234234;

        let temp;

        // Indexes of candles where we should add a trade icon
        const tradesIndexes = [2,8,40,67];

        for (let i = 1; i<= 80; i++) {
            //doesn't allow chart data to fall lower than 200
            currentPadding = currentPadding < 200 ? 200 : currentPadding;
            const high = Math.floor(Math.random() * (700 - 200) + 200);
            temp = {
                x: new Date(2016, 6, i*2),
                low: currentPadding,
                high: high + currentPadding,// low and high always from point to point+200
                open: Math.floor(Math.random() * high) + currentPadding, // get open and close in range of low-high (0-200)
                close: Math.floor(Math.random() * high) + currentPadding,
                volume: Math.floor(Math.random() * 500), // generate random bar height in range 0-500
            };
            // If index of current candle match index from tradesIndexes that add a trade with sample data
            temp.trade = ~tradesIndexes.indexOf(i) ? {type: "closeLong", price: "2000"} : undefined;

            data.push(temp);

            // update padding
            currentPadding += temp.close - temp.open;
        }

        return data;
    }

    render() {

        const candleChartData = this.getSampleCandleChartData();

        const nearestTrades = [{y: 1000, type: "closeLong"}, {y:1455, type:"short"}];

        return (
            <View style={styles.container}>
              <Chart
                  tradingPair={"ETH/USD"}
                  candleChartData={candleChartData}
                  nearestTrades={nearestTrades}
              />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5fcff"
    },
});