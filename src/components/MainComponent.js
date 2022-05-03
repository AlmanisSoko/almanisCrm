import React from "react";
import GoogleFontLoader from "react-google-font-loader";
import Overlay from "./Overlay";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "adminbsb-materialdesign/css/themes/all-themes.css";

class MainComponent extends React.Component {

    state = {
        bodyClass: "theme-red ls-closed",
        displayOverlay: "none",
        width: window.screen.width
    }

    onBarClick = () => {
        if (this.state.bodyClass == "theme-red ls-closed overlay-open") {
           this.setState({ bodyClass: "theme-red ls-closed" });
           this.setState({ displayOverlay: "none" });
        } 
        else if (this.state.bodyClass == "theme-red ls-closed") {
            this.setState({ bodyClass: "theme-red ls-closed overlay-open" });
            this.setState({ displayOverlay: "block" });
        }
    }

    onscreenresize = () => {
        console.log(window.screen.width);
        this.setState({ width: window.screen.width });
    }

    UNSAFE_componentWillMount() {
        window.addEventListener("resize", this.onscreenresize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.onscreenresize);
    }

    componentDidMount() {
        var inputall = document.querySelectorAll("input");
        inputall.forEach((input) => {
            input.addEventListener("focus", function () {
                this.parentNode.className="form-line focused";
            });
        });

        inputall.forEach((input) => {
            input.addEventListener("blur", function () {
                this.parentNode.className="form-line";
            });
        });
    }

    render() {
        console.log(this.props);
        
        if (this.state.width > 1150) {
           document.getElementById("root").className = "theme-red";
        } else {
            document.getElementById("root").className = this.state.bodyClass;
        }

        var Page = this.props.page;

        return (
        <React.Fragment>
            <GoogleFontLoader
                        fonts={[
                            {
                            font: 'Roboto',
                            weights: [400, 700],
                            },
                            
                        ]}
                        subsets={['cyrillic-ext', 'latin']}
            />
            <GoogleFontLoader
                    fonts={[
                        {
                        font: 'Material+Icons'
                        }
                    ]}
            />
            <Overlay display={this.state.displayOverlay} />
            <Navbar onBarClick={this.onBarClick} /> 
            <Page {...this.props} />
            <Sidebar activepage={this.props.activepage} />
        </React.Fragment>);
    }

}

export default MainComponent;
