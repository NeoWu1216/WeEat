import React, { Component } from "react";
import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import EatingForm from "./eatingform";
import { withRouter } from "react-router-dom";
import {
  getRooms,
  postMember,
  deleteRoom,
  deleteMember
} from "../../api/eatingrooms";
import { getMessage } from "../../api/parser";
import { getId } from "../../storage/id";
import styles from "./eatingroom.scss";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { light: "#ffebe", main: "#fa5552" },
    secondary: { main: "#ffebee" }
  }
});
class EatingRoom extends Component {
  constructor(props) {
    super(props);
    this.state = { all: [], eatingrooms: [], mounted: false };
  }

  componentDidMount() {
    if (!this.state.mounted)
      getRooms({})
        .then(data => {
          data.sort((a, b) => new Date(b.date) - new Date(a.date));
          this.setState({ eatingrooms: data, all: data, mounted: true });
        })
        .catch(err => alert(getMessage(err)));
  }

  notify = (data, ix, mess) => {
    if (mess === "join") {
      let { eatingrooms } = this.state;
      eatingrooms[ix] = data;
      this.setState({ eatingrooms });
    } else if (mess == "delete") {
      let { eatingrooms } = this.state;
      eatingrooms.splice(ix);
      this.setState({ eatingrooms });
    } else if (mess == "leave") {
      let { eatingrooms } = this.state;
      eatingrooms[ix] = data;
      this.setState({ eatingrooms });
    }
  };

  onSubmit = data => {
    let { all } = this.state;
    let eatingrooms = all;
    eatingrooms = data.title
      ? eatingrooms.filter(
          x =>
            x.title && x.title.toLowerCase().includes(data.title.toLowerCase())
        )
      : eatingrooms;
    eatingrooms = data.address
      ? eatingrooms.filter(
          x =>
            x.address &&
            x.address.toLowerCase().includes(data.address.toLowerCase())
        )
      : eatingrooms;
    eatingrooms = data.restaurant
      ? eatingrooms.filter(
          x =>
            x.restaurant &&
            x.restaurant.toLowerCase().includes(data.restaurant.toLowerCase())
        )
      : eatingrooms;
    eatingrooms =
      data.party_size && data.party_size !== "any"
        ? eatingrooms.filter(
            x => x.party_size && x.party_size === data.party_size
          )
        : eatingrooms;
    eatingrooms = data.date
      ? eatingrooms.filter(
          x => Math.abs(Date.parse(data.date) - Date.parse(x.date)) < 3600000
        )
      : eatingrooms;
    this.setState({ eatingrooms });
  };

  render() {
    return (
      <div className={styles.eatingroom}>
        <NavBar />
        <div className="eatingroom-bg">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{
              height: "90%"
            }}
          >
            <Grid
              item
              style={{
                width: "65%",
                height: "90%",
                background: "hsla(5, 60%, 12%, 0.25)",
                borderRadius: "3px"
              }}
            >
              <Grid
                container
                direction="row"
                justify="center"
                style={{ width: "100%", height: "100%" }}
              >
                <Grid
                  item
                  style={{
                    height: "98%",
                    marginLeft: "-1%",
                    width: "98%",
                    overflowY: "auto"
                  }}
                >
                  <EatingRoomList
                    eatingrooms={this.state.eatingrooms}
                    notify={this.notify}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              style={{
                width: "34%",
                height: "90%",
                overflowY: "auto",
                overflowX: "hidden"
              }}
            >
              <EatingForm onSubmit={this.onSubmit} />
            </Grid>
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

class EatingRoomList extends Component {
  notifyParent(data, ix, mess) {
    this.props.notify(data, ix, mess);
  }

  render() {
    let result = this.props.eatingrooms;
    return (
      <div className={styles.eatingroom}>
        <div className="eatingroom-list">
          {result.map((r, index) => (
            <EatingRoomEntry
              r={r}
              key={index}
              notify={(data, mess) => this.notifyParent(data, index, mess)}
            />
          ))}
        </div>
      </div>
    );
  }
}

class EatingRoomEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onDelete(e, _id) {
    e.preventDefault();
    e.stopPropagation();
    deleteRoom(_id)
      .then(data => {
        this.props.notify(data, "delete");
      })
      .catch(err => {
        alert(getMessage(err));
      });
  }

  onJoin(e, _id) {
    e.preventDefault();
    e.stopPropagation();
    postMember(_id)
      .then(data => {
        this.props.notify(data, "join");
      })
      .catch(err => {
        alert(getMessage(err));
      });
  }

  onLeave(e, _id) {
    e.preventDefault();
    e.stopPropagation();
    deleteMember(_id)
      .then(data => {
        this.props.notify(data, "leave");
      })
      .catch(err => {
        console.log(err.response);
        alert(getMessage(err));
      });
  }

  render() {
    let room = this.props.r;
    if (!room) return null;
    if (room.users === undefined) return null;
    if (room.users === null) room.users = [];
    let localdate = "Invalid date";
    if (room.date) {
      localdate =
        new Date(room.date).toLocaleDateString() +
        " " +
        new Date(room.date).toLocaleTimeString();
    }
    return (
      <MuiThemeProvider theme={theme}>
        <Card
          style={{
            margin: "1% auto 0 auto",
            width: "96%",
            height: "250px"
          }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            style={{
              height: "100%"
            }}
          >
            <Grid
              item
              style={{
                height: "100%",
                width: "35%"
              }}
            >
              <CardMedia
                title="Eating Room Image"
                image={room.image_url}
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            </Grid>
            <Grid
              item
              style={{
                height: "100%",
                width: "65%",
                padding: "0 1em"
              }}
            >
              <CardHeader
                title={room.title}
                style={{
                  textAlign: "center"
                }}
              />
              <CardContent>
                <div className="card-infolabel">
                  <div className="card-label">
                    <i className="fas fa-utensils" />
                  </div>
                  {room.restaurant}
                </div>
                <div className="card-infolabel">
                  <div className="card-label">
                    <i className="fas fa-map-marker-alt" />
                  </div>
                  {room.address}
                </div>
                <div className="card-infolabel">
                  <div className="card-label">
                    <i className="fas fa-calendar-day" />
                  </div>
                  {localdate}
                </div>
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  style={{
                    paddingTop: "1em"
                  }}
                >
                  <Grid item style={{ width: "50%" }}>
                    <div className="eatingroom-participants">
                      {room.users.map(user => (
                        <a
                          href
                          onClick={() =>
                            this.props.history.push("/profile/" + user._id)
                          }
                        >
                          <img src={user.avatar} alt="user-avatar" />
                        </a>
                      ))}
                    </div>
                  </Grid>
                  <Grid item>
                    {getId() === room.user ? null : room.participants.indexOf(
                        getId()
                      ) >= 0 ? (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={e => this.onLeave(e, room._id)}
                        color="primary"
                      >
                        Leave
                      </Button>
                    ) : room.users.length === room.party_size ? (
                      <Button
                        size="small"
                        variant="contained"
                        disabled
                        color="primary"
                      >
                        {room.users.length === room.party_size
                          ? "Full"
                          : "Joined"}
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={e => this.onJoin(e, room._id)}
                        color="primary"
                      >
                        Join
                      </Button>
                    )}
                    {getId() !== room.user ? null : (
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={e => this.onDelete(e, room._id)}
                      >
                        Delete
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </MuiThemeProvider>
    );
  }
}
EatingRoomEntry = withRouter(EatingRoomEntry);
export default withRouter(EatingRoom);

export { EatingRoomList };
