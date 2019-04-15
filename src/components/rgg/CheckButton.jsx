import React, { Component } from 'react';

export class CheckButton extends Component {
    constructor (props) {
        super(props);

        this.state = {
            hover: this.props.hover
        };

        this.fill = this.fill.bind(this);
        this.visibility = this.visibility.bind(this);
    }

    fill () {
        if (this.props.isSelected)
            return this.props.selectedColor;
        else if (this.state.hover)
            return this.props.hoverColor;
        return this.props.color;
    }

    visibility () {
        if (this.props.isSelected ||
            (this.props.isSelectable && this.props.parentHover))
            return 'visible';
        return 'hidden';
    }

    render () {
        let circleStyle = {
            display: this.props.isSelected ? "block" : "none"
        };

        return (
                <div
            title="Select"
            style={{
                visibility: this.visibility(),
                background: 'none',
                float: 'left',
                width: '36px',
                height: '36px',
                border: 'none',
                padding: '6px',
                cursor: 'pointer',
                pointerEvents: 'visible'
            }}
            onClick={this.props.onClick ?
                     (e) => this.props.onClick(this.props.index, e) : null
            }
            onMouseOver={(e) => this.setState({hover: true})}
            onMouseOut={(e) => this.setState({hover: false})}>
            {/* <svg style={{display: 'block', zIndex: 100, width: '30px'}} width="640" height="480" viewbox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
                    <path d="m219.28949,21.827393c-66.240005,0 -119.999954,53.76001 -119.999954,120c0,134.755524 135.933151,170.08728 228.562454,303.308044c87.574219,-132.403381 228.5625,-172.854584 228.5625,-303.308044c0,-66.23999 -53.759888,-120 -120,-120c-48.047913,0 -89.401611,28.370422 -108.5625,69.1875c-19.160797,-40.817078 -60.514496,-69.1875 -108.5625,-69.1875z"/>
                </svg> */}
                <svg
            fill={this.fill()}
            height="24" viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg">

                <radialGradient
            id="shadow"
            cx="38"
            cy="95.488"
            r="10.488"
            gradientTransform="matrix(1 0 0 -1 -26 109)"
            gradientUnits="userSpaceOnUse">
                <stop
            offset=".832"
            stopColor="#010101">
                </stop>
                <stop
            offset="1"
            stopColor="#010101"
            stopOpacity="0">
                </stop>
                </radialGradient>

                <circle
            style={circleStyle}
            opacity=".26"
            fill="url(#shadow)"
            cx="12" cy="13.512"
            r="10.488">
                </circle>
                <circle
            style={circleStyle}
            fill="#FFF"
            cx="12"
            cy="12.2"
            r="8.292">
                </circle>
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                </div>
        )
    }
}

CheckButton.defaultProps = {isSelectable: true,
                            isSelected: false,
                            parentHover: false,
                            hover: false};
