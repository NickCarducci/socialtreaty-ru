import React from "react";
//import TwitterTweetEmbed from "./TwitterTweetEmbed";
import Cable from "./Dropwire";
import { UAParser } from "ua-parser-js";
//DOES ANYONE WANT TO BE MY PAC BUDDY
//great now that song "anything you can do I can do better" women can play (soccer? boy club or unisex)
export default class App extends React.Component {
  constructor(props) {
    super(props);
    var parser = new UAParser();
    const name = parser.getBrowser().name;
    console.log(name);
    this.state = {
      journal: true,
      browser: name,
      scrollTop: 0,
      serviceCancelingImages: name.includes("Safari")
    };
    this.podcast = React.createRef();
    this.fema = React.createRef();
    for (let i = 0; i < 220; i++) {
      this["scrollImg" + i] = React.createRef();
    }
  }
  componentDidMount = () => {
    window.addEventListener("resize", this.refresh);
    window.addEventListener("scroll", this.handleScroll);
    this.refresh(true);
  };
  componentWillUnmount = () => {
    clearTimeout(this.scrollTimeout);
    clearTimeout(this.resizeTimer);
    window.removeEventListener("resize", this.refresh);
    window.removeEventListener("scroll", this.handleScroll);
  };
  handleScroll = (e) => {
    if (!this.state.offScroll) {
      const scrollTop = window.scrollY;
      this.setState(
        {
          scrolling: true,
          scrollTop
        },
        () => {
          clearTimeout(this.scrollTimeout);
          this.scrollTimeout = setTimeout(() => {
            this.setState({
              scrolling: false
            });
          }, 900);
        }
      );
    }
  };
  refresh = (first) => {
    const width = this.state.ios ? window.screen.availWidth : window.innerWidth;
    if (first || Math.abs(this.state.lastWidth - width) > 0) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.setState({
          lastWidth: width,
          width,
          availableHeight: this.state.ios
            ? window.screen.availHeight - 20
            : window.innerHeight
        });
      }, 600);
    }
  };
  componentDidUpdate = (prevProps) => {
    if (this.props.pathname !== prevProps.pathname) {
      if (this.props.pathname === "/") {
        this.setState({ journal: true });
      } else if (this.props.pathname === "/home") {
        window.scroll(0, this.home.current.offsetTop);
      }
    }
  };
  render() {
    const handleScollImgError = (e) => {
      if (e.message) {
        console.log(e.message);
        this.setState({ serviceCancelingImages: true });
      }
    };
    let arrayOfnumbers = [0];
    const scrollnum = () => {
      const num = arrayOfnumbers[arrayOfnumbers.length - 1] + 1;
      arrayOfnumbers.push(num);
      return num;
    };
    //const space = " ";
    return (
      <div
        style={{
          overflow: "hidden",
          width: "100%",
          maxWidth: "600px",
          fontFamily: "sans-serif",
          textAlign: "center"
        }}
      >
        <div
          onClick={(e) => this.setState({ journal: !this.state.journal })}
          style={{
            transition: `${this.state.journal ? 0.5 : 0.2}s ease-in`,
            border: "1px solid",
            borderRadius: "15px",
            padding: "10px",
            margin: "10px",
            backgroundColor: "white",
            display: "flex",
            position: "fixed",
            width: "calc(100% - 42px)",
            fontFamily: "sans-serif",
            justifyContent: this.state.scrollTop === 0 ? "center" : "flex-end"
          }}
        >
          {!this.state.journal ? "journal" : "plan"}
        </div>
        <br />
        <br />
        <br />
        <br />
        <div
          ref={this.home}
          style={{
            fontFamily: "'Muli', sans-serif",
            overflow: "hidden",
            backgroundColor: "white",
            height: !this.state.journal ? "0px" : "",
            position: !this.state.journal ? "fixed" : "relative",
            width: "100%",
            maxWidth: "600px",
            textAlign: "center"
          }}
        >
          Shouldn’t social security and pensions be reversed by taxing their
          benefactors?
          <br />
          {/*<iframe
            src="https://froth.quora.com/"
            title=
          />*/}
          <a href="https://froth.quora.com/How-much-money-does-a-country-owe-when-it-has-a-lot-of-debt-1">
            <Cable
              style={{ width: "100%" }}
              onError={handleScollImgError}
              img={true}
              src={
                this.state.serviceCancelingImages
                  ? ""
                  : "https://www.dropbox.com/s/1ydgvkgy7stt0oy/Screen%20Shot%202023-03-23%20at%205.38.51%20PM.png?raw=1"
              }
              float="right"
              title="How much money does a country owe when it has a lot of debt?"
              scrolling={this.state.scrolling}
              fwd={this["scrollImg" + scrollnum()]}
              scrollTopAndHeight={this.state.scrollTop + window.innerHeight}
              scrollTop={this.state.scrollTop}
            />
          </a>
          Can you surrender another's freedom to bid? Does freedom mean extra
          product risk and duress?
          <hr />
          Should malpractice be for aware customers or charging for sutures?
        </div>
      </div>
    );
  }
}
