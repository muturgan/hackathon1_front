import React, { Component } from 'react';

type CheckButtonProps = {
    [key: string]: any;
};

type CheckButtonState = {
    hover: boolean;
};

export class CheckButton extends Component<CheckButtonProps, CheckButtonState> {
    constructor (props: CheckButtonProps) {
        super(props);

        this.state = {
            hover: this.props.hover
        };

        this.fill = this.fill.bind(this);
        this.visibility = this.visibility.bind(this);
    }

    static defaultProps: {
        isSelectable: boolean,
        isSelected: boolean,
        parentHover: boolean,
        hover: boolean,
    }

    fill () {
        if (this.props.likes) {
            return this.props.likedByYou ? 'red' : 'tomato';
        }

        return this.props.color;
    }

    visibility () {
        if (this.props.isSelected ||
            (this.props.isSelectable && this.props.parentHover))
            return 'visible';
        return 'hidden';
    }

    render () {

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
            onClick={(this.props.onClick ?
                     (e: Event) => this.props.onClick(this.props.index, e) : null) as any
            }
            onMouseOver={(e) => this.setState({hover: true})}
            onMouseOut={(e) => this.setState({hover: false})}>

                <svg
            fill={this.fill()}
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.25C8.85-1.15 0 .42 0 7.19 0 11.85 5.57 16.62 12 23c6.43-6.38 12-11.15 12-15.8 0-6.8-8.88-8.31-12-2.95z"/>

                </svg>
                <b style={{
                    color: this.props.likedByYou ? 'red' : 'tomato',
                    position: 'absolute',
                    top: 10,
                    left: 35,
                    textShadow: '1px 0 1px black, -1px 0 1px black, 0 1px 1px black, 0 -1px 1px black'
                        }}> {this.props.likes || ''} </b>

                </div>
        )
    }
}

CheckButton.defaultProps = {isSelectable: true,
                            isSelected: false,
                            parentHover: false,
                            hover: false};
