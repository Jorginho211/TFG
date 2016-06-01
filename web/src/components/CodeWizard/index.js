import React, {Component} from 'react'

class CodeWizard extends Component {
    constructor() {
        super();
    }

    render() {
        const {codewizard} = this.props.kpi.datoskpi

        switch(codewizard.typeTemplate){
            case 0:
                return (
                    <div>{codewizard.typeTemplate}</div>
                )

            case 1:
                return (
                    <div>{codewizard.typeTemplate}</div>
                )

            case 2:
                return (
                    <div>{codewizard.typeTemplate}</div>
                )

            case 3:
                return (
                    <div>{codewizard.typeTemplate}</div>
                )
        }
    }
}

export default CodeWizard