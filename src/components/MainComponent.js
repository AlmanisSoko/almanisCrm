import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
//import Footer from "./Footer";

class MainComponent extends React.Component {

    state = {
        bodyClass: "container-scroller",
        width: window.screen.width
    }

    onscreenresize = () => {
        console.log(window.screen.width);
        this.setState({ width: window.screen.width });
    }

    componentWillMount() {
        window.addEventListener("resize", this.onscreenresize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onscreenresize);
    }

    componentDidMount() {
        var inputall = document.querySelectorAll("input");
        inputall.forEach((input) => {
            input.addEventListener("focus", function () {
                this.parentNode.className="form-group bmd-form-group is-focused";
            });
        });
        
        inputall.forEach((input) => {
            input.addEventListener("blur", function () {
                this.parentNode.className="form-group bmd-form-group";
            });
        });
    }

    render() {
        console.log(this.props);
         
        var Page = this.props.page;

        return (
            <React.Fragment>
                <Header/> 
                <SideBar activepage={this.props.activepage}/>
                <Page {...this.props} />
                {/* <Footer/> */}
            </React.Fragment>
        );
    }

}

export default MainComponent;
