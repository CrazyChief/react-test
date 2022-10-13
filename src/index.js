import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";


function App(props) {
    return (
        <main>
            <Header />
            <Content />
        </main>
    );
}

function Header(props) {
    return (
        <header className="header">
            <div className="logo-wrapper">
                <a href="" className="logo-link">
                    <img src="" alt="" className="logo"/>
                </a>
            </div>
            <ul className="nav-links">
                <li>
                    <a href="">About</a>
                </li>
                <li>
                    <a href="">Donations</a>
                </li>
            </ul>
        </header>
    )
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countDownDate: "May 16, 2023 18:37:25",
            yearsLeft: null,
            monthsLeft: null,
            daysLeft: null,
            hoursLeft: null,
            minutesLeft: null,
            secondsLeft: null,
            countDown: null,
        }
    }

    componentDidMount() {
        this.countDown();
    }

    makeTwoDigits(n) {
        return (n < 10 ? "0" : "") + n;
    }

    countDown() {
        const countDownDate = new Date(this.state.countDownDate).getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();

            let distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.setState({
                countDown: distance,
                daysLeft: this.makeTwoDigits(days),
                hoursLeft: this.makeTwoDigits(hours),
                minutesLeft: this.makeTwoDigits(minutes),
                secondsLeft: this.makeTwoDigits(seconds),
            });

            if (distance < 0) {
                clearInterval(timer);
            }
        }, 1000);
    }

    render() {
        const data = {
            daysLeft: this.state.daysLeft,
            hoursLeft: this.state.hoursLeft,
            minutesLeft: this.state.minutesLeft,
            secondsLeft: this.state.secondsLeft,
        }
        return (
            <section className="content">
                <Counter data={data}/>
            </section>
        )
    }
}

class CounterCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ov: -1,
            isAnimate: false,
            rotation: 0,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.data !== undefined) && (+prevProps.data !== +this.props.data)) {
            this.setState({
                rotation: +this.props.data === 0 ? 0 : this.state.rotation - 90,
            });
        }
    }

    render() {
        return (
            <div className="cell-wrapper" style={{transform: `rotateX(${this.state.rotation}deg)`}}>
                <span className="cell-item">{this.props.data}</span>
                <span className="cell-item">{this.props.data}</span>
                <span className="cell-item">{this.props.data}</span>
                <span className="cell-item">{this.props.data}</span>
            </div>
        )
    }
}

class Counter extends React.Component {
    renderCounterCell(data) {
        return <CounterCell data={data}/>;
    }

    normalizeData(elem, itemsShouldBe) {
        if (elem.length < itemsShouldBe) {
            for (let i = 0; i <= itemsShouldBe - elem.length; i++) {
                elem.unshift(0);
            }
        }
        return elem;
    }

    render() {
        let days = 0, hours = 0, minutes = 0, seconds = 0;
        let daysParts = [], hoursParts = [], minutesParts = [], secondsParts = [];

        if (this.props.data.daysLeft) {
            console.log("this.props.data.daysLeft: " + this.props.data.daysLeft);
            days = this.props.data.daysLeft;
            daysParts = days.split("");

            if (daysParts.length < 3) {
                daysParts = this.normalizeData(daysParts, 3)
            }
        } else {
            daysParts = this.normalizeData(daysParts, 3)
        }


        if (this.props.data.hoursLeft) {
            hours = this.props.data.hoursLeft;
            hoursParts = hours.split("");
        } else {
            hoursParts = this.normalizeData(hoursParts, 2)
        }

        if (this.props.data.minutesLeft) {
            minutes = this.props.data.minutesLeft;
            minutesParts = minutes.split("");
        } else {
            minutesParts = this.normalizeData(minutesParts, 2)
        }

        if (this.props.data.secondsLeft) {
            seconds = this.props.data.secondsLeft;
            secondsParts = seconds.split("");
        } else {
            secondsParts = this.normalizeData(secondsParts, 2)
        }
        console.log(secondsParts);

        return (
            <div className="counter-wrapper">
                <div className="counter-section-wrapper">
                    {this.renderCounterCell(daysParts[0])}
                    {this.renderCounterCell(daysParts[1])}
                    {this.renderCounterCell(daysParts[2])}
                    <p>days</p>
                </div>
                <div className="counter-section-wrapper">
                    {this.renderCounterCell(hoursParts[0])}
                    {this.renderCounterCell(hoursParts[1])}
                    <p>hours</p>
                </div>
                <div className="counter-section-wrapper">
                    {this.renderCounterCell(minutesParts[0])}
                    {this.renderCounterCell(minutesParts[1])}
                    <p>minutes</p>
                </div>
                <div className="counter-section-wrapper">
                    {this.renderCounterCell(secondsParts[0])}
                    {this.renderCounterCell(secondsParts[1])}
                    <p>seconds</p>
                </div>
            </div>
        )
    }
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
