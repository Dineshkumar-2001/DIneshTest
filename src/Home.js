import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      registered: "",
      last_login: "",
      //   name_1: "",
      //   password_1: "",
      //   conform_pass_1: "",
      //   navigate: "",
    };
  }

  AddDetail = () => {
    axios
      .post("http://localhost:3000/api/sign-up", {
        username: this.state.name,
        password: this.state.password,
        registered: this.state.registered,
        last_login: this.state.last_login,
      })
      .then((res) => {
        console.log("res:", res);
      })
      .catch((err) => {
        console.log("err:", err);
      });
    console.log(this.state.password);
  };

    CheckDetail = () => {
      axios.post("http://localhost:5001/conform", {
        password: this.state.password,
        conform_pass: this.state.conform_pass_1,
      }).then((res) => {
        if (res.data.results.length > 0 && res.data.message === "success") {
          console.log("ok");
          this.setState({
            // navigate: <Navigate to="/Welcome"></Navigate>,
          });
          localStorage.setItem("Done", "Success");
        } else {
          alert("Wrong password");
        }
      });
    };

  //   checkdata = () => {
  //     const startDate = "08-09-2022";
  //     const s1 = new Date() - new Date(startDate.replace(/-/g, "/"));
  //     const s2 = s1 / (1000 * 60 * 60 * 24);
  //     console.log("data", s2);
  //   };

  render() {
    if (localStorage.getItem("Done") !== null) {
      // return <Navigate to="/Welcome" />;
    }
    console.log("name", this.state.name);
    console.log("passwor", this.state.password);
    console.log("registered", this.state.registered);
    console.log("last_login", this.state.last_login);
    return (
      <div>
        <br />
        <div>LOG - In</div>
        <br />
        <div>
          <label>NAME : </label>
          <input
            type="text"
            onChange={(e) => {
              this.setState({
                name: e.target.value,
              });
            }}
          />
        </div>

        <div>
          <label>PASSWORD : </label>
          <input
            type="password"
            onChange={(e) => {
              this.setState({
                password: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label>REGISTERED : </label>
          <input
            type="text"
            onChange={(e) => {
              this.setState({
                registered: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label>LAST_LOGIN : </label>
          <input
            type="password"
            onChange={(e) => {
              this.setState({
                last_login: e.target.value,
              });
            }}
          />
        </div>

        <div>
          <button onClick={this.AddDetail}>CLICK</button>
          {/* <button onClick={this.checkdata}>CLICK</button> */}
        </div>

        <br />
        <div>SIGN - In</div>
        <br />

        <div>
          {this.state.navigate}
          <label>PASSWORD : </label>
          <input
            type="password"
            onChange={(e) => {
              this.setState({
                password: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <label>CONFORM PASSWORD : </label>
          <input
            type="password"
            onChange={(e) => {
              this.setState({
                conform_pass_1: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <button onClick={this.CheckDetail}>CLICK</button>
        </div>
      </div>
    );
  }
}
