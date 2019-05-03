import React, { Component } from "react";
import NavBar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import EatingForm from "./eatingform";
import { withRouter } from "react-router-dom";
import { getRooms, postMember } from "../../api/eatingrooms";
import { getMessage } from "../../api/parser";
import { getId } from "../../storage/id";
import styles from "./eatingroom.scss";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import { Button } from "@material-ui/core";
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
    this.state = {all:[], eatingrooms:[], mounted: false};
  }

  componentDidMount() {
    if (!this.state.mounted)
      getRooms({})
        .then(data => {
          this.setState({ eatingrooms: data, all:data, mounted: true });
        })
        .catch(err => alert(getMessage(err)));
  }

  onSubmit = data => {
    console.log(data)
    let {all} = this.state
    let eatingrooms = all
    eatingrooms = data.title ? eatingrooms.filter((x)=>(x.title && x.title.toLowerCase().includes(data.title.toLowerCase()))) : eatingrooms
    eatingrooms = data.address ? eatingrooms.filter((x)=>(x.address && x.address.toLowerCase().includes(data.address.toLowerCase()))) : eatingrooms
    eatingrooms = data.restaurant ? eatingrooms.filter((x)=>(x.restaurant && x.restaurant.toLowerCase().includes(data.restaurant.toLowerCase()))) : eatingrooms
    eatingrooms = (data.party_size && data.party_size!=='any') ? eatingrooms.filter((x)=>(x.party_size && x.party_size == data.party_size)) : eatingrooms
    eatingrooms = data.date ? eatingrooms.filter((x)=>(Math.abs(Date.parse(data.date)-Date.parse(x.date)) < 3600000)) : eatingrooms
    console.log('submit',all, eatingrooms.map(x=>x.title))
    this.setState({eatingrooms})
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
          >
            <Grid
              item
              style={{
                width: "65%",
                height: "600px",
                overflowY: "auto"
              }}
            >
              <EatingRoomList eatingrooms={this.state.eatingrooms} />
            </Grid>
            <Grid item>
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
  render() {
    let result = this.props.eatingrooms;
    console.log(result);
    return (
      <div className="eatingroom-list">
        {result.map((r, index) => (
          <EatingRoomEntry r={r} key={index} />
        ))}
      </div>
    );
  }
}

class EatingRoomEntry extends Component {
  constructor(props) {
    super(props);
    this.state = { room: this.props.r };
  }
  onJoin(e, _id) {
    e.preventDefault();
    e.stopPropagation();
    postMember(_id)
      .then(data => {
        this.setState({ room: data });
      })
      .catch(err => {
        alert(getMessage(err));
      });
  }

  render() {
    let { room } = this.state;
    if (!room) return null;
    if (room.participants === undefined) return null;
    if (room.participants === null) room.participants = [];
    return (
      <MuiThemeProvider theme={theme}>
        <Card
          style={{
            margin: "1em 2px",
            width: "95%",
            height: "250px"
          }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            // justify="center"
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
                    <i class="fas fa-utensils" />:
                  </div>
                  {room.restaurant}
                </div>
                <div className="card-infolabel">
                  <div className="card-label">
                    <i class="fas fa-map-marker-alt" />:
                  </div>
                  {room.address}
                </div>
                <div className="card-infolabel">
                  <div className="card-label">
                    <i class="fas fa-calendar-day" />:
                  </div>
                  {room.date}
                </div>
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  style={{
                    paddingTop: "1em"
                  }}
                >
                  <Grid item style={{ width: "70%" }}>
                    <div className="eatingroom-participants">
                      {room.participants.map(uid => {
                        if (uid === getId()) {
                          return <i class="fas fa-user current-user" />;
                        } else {
                          return <i class="fas fa-user" />;
                        }
                      })}
                    </div>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={e => this.onJoin(e, room._id)}
                      color="primary"
                    >
                      Join
                    </Button>
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

export default withRouter(EatingRoom);
