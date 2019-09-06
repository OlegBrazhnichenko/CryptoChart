import React, {Component} from "react";
import {Svg} from "react-native-svg";
import SvgTradeIcon from "../../../SvgTradeIcon";

export default class Arrow extends Component {

    render() {
        const {x, y, datum} = this.props;

        // 13 && 23 is default for arrows on candleChart

        // xAxisOffset should be a half of SvgTradeIcon diameter, by default 26
        const xAxisOffset = (this.props.offset && this.props.offset.x) || 13;
        // yAxisOffset 0.5 of diameter of SvgTradeIcon inner circle + 0.5 of diameter of outer circle
        // so yAxisOffset is Math.round(diameter * 0.875)
        const yAxisOffset = (this.props.offset && this.props.offset.y) || 23;

        return (
            <Svg {...this.props.events} x={x-xAxisOffset} y={y-yAxisOffset} >
                <SvgTradeIcon
                    direction={datum.tradeDirection || this.props.tradeDirection}
                    connotation={datum.connotation || this.props.connotation}/>
            </Svg>
        );
    }
}