import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

import {Row, Col} from 'react-bootstrap';
import {SliderPicker} from 'react-color';
import {TimelinePlot} from './TimelinePlot';


export type ChartPanelProps = {

}

export type ChartPanelState = {

}


export class ChartPanel extends React.Component<ChartPanelProps, ChartPanelState>{

    public constructor(props: ChartPanelProps){
        super(props);
    }

    render () {
        return (
            <div>
                <TimelinePlot/>
            </div>
        )
    }
}