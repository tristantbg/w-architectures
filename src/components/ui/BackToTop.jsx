import React, { Component } from 'react';
import i18n from "../../../config/i18n"
import {ContextHoc} from "../../context/ContextHoc"

class BackToTop extends Component {
    _click(){
        if(window){
            window.scrollTo(0, 0);
        }
    }

    render() {
        const {locale} = this.props.context

        return (
            <span className="back-to-top" onClick={this._click}>
                {i18n[locale].backToTop}
            </span>
        );
    }
}


export default ContextHoc(BackToTop);