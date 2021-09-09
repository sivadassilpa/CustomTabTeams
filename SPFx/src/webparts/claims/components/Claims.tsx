import * as React from 'react';
import styles from './Claims.module.scss';
import { IClaimsProps } from './IClaimsProps';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import * as _ from "lodash";
import { LoopCircleLoading } from "react-loadingg";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Tooltip from '@material-ui/core/Tooltip';
import GroupClaims from './GroupClaims';


export default class Claims extends React.Component<IClaimsProps, {openGroupClaims: boolean}> {
  constructor(props) {
    super(props);
    this.state = { openGroupClaims: false};
    this.openGroupClaimsTab = this.openGroupClaimsTab.bind(this);
  }
  public openGroupClaimsTab= (event) => {
      console.log("Check");
      // groupClaimsData
       
      this.setState((currentState) => {
        return { openGroupClaims: !this.state.openGroupClaims };
      });
  }
  public render(): React.ReactElement<IClaimsProps> {
    let dataDetails = this.props.description;
    let groupClaimsData = this.props.nullDescription;
    // if(data)
    _.forEach(dataDetails, (o) =>{
      o['Priority'] = _.toNumber(o['Priority']);
      o['Impact'] = _.toNumber(o['Impact']);
      // console.log(_.toNumber(o['Priority']), o['Priority'], o);
      o['priorityDesc'] = (o['Priority'] == 1 && o['Impact'] == 1 ? "Very High Priority"
        : o['Priority'] == 1 || o['Impact'] == 1 ? "High Priority"
          : o['Priority'] == 3 && o['Impact'] == 3 ? "Low Priority" : "Moderate Priority");
      o['priorityColor'] = (o['priorityDesc'] == "Very High Priority" ? "Red"
        : o['priorityDesc'] == "High Priority" ? "Orange"
          : o['priorityDesc'] == "Moderate Priority" ? "Yellow" : "Green");
    });


    return (
      <div className={styles.containerDiv}>
        <Button variant="contained" 
        style={{width:"40%", backgroundColor:"#464775", marginLeft:"30%", marginRight:"30%", marginBottom:"20px", float:"left", textTransform: 'capitalize', fontSize:"10pt", fontWeight:700, color:"white"}}
        onClick={this.openGroupClaimsTab}>Authorize Claims </Button>
        {this.state.openGroupClaims && (
          
        <Grid container spacing={1}>
            {_.toArray(groupClaimsData).map((data) => (
              <Grid item xs={4} key={data['ClaimID']}>

                <Card style={{ minHeight: "210px"}}>
                  <CardContent>
                    <div style={{ height: "35px"}}>
                      <div style={{ float: "left", fontWeight: "bold", fontSize: "12pt", width:"85%" }}>
                        Claim ID : {data['ClaimID']}
                      </div>
                      <div style={{ float: "left", textAlign:"right"}}>
                        <Tooltip title={data['priorityDesc']} placement="top">
                          <FiberManualRecordIcon style={{ color: data['priorityColor'] }} />
                        </Tooltip>
                      </div>
                    </div>
                    <div style={{fontFamily: "Roboto, Helvetica, Arial, sans-serif", lineHeight:"1.5em", color:"#8f8b8b", fontSize:"10pt", height:"60px", overflow:"hidden", width:"100%"}}>
                      {data['Description']}
                    </div>
                    <div style={{fontFamily: "Roboto, Helvetica, Arial, sans-serif", lineHeight:"1.5em", fontSize:"10pt", height:"25px", overflow:"hidden", width:"100%"}}>
                    <div style={{width:"30%", float:"left"}}>Location</div> <div style={{width:"70%", float:"left"}}>: {data['LocationID']}</div>
                    </div>
                    <div style={{fontFamily: "Roboto, Helvetica, Arial, sans-serif", lineHeight:"1.5em", fontSize:"10pt", height:"25px", overflow:"hidden", width:"100%"}}>
                    <div style={{width:"30%", float:"left"}}>Sensor</div> <div style={{width:"70%", float:"left"}}>: {data['SensorID']}</div>
                    </div>

                  </CardContent>
                  <CardActions style={{marginBottom:"20px" }}>
                    <Button variant="contained" style={{width:"40%", backgroundColor:"#464775", marginLeft:"30%", marginRight:"30%", float:"left", textTransform: 'capitalize', fontSize:"10pt", fontWeight:700, color:"white"}}>Authorize </Button>
                    {/* <Button variant="contained" style={{width:"40%", backgroundColor:"#464775", marginLeft:"5%", marginRight:"5%", float:"left", textTransform: 'capitalize', fontSize:"10pt", fontWeight:700, color:"white"}} href={data['TeamsID']}>Delete</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>)}

          {!this.state.openGroupClaims && (
          <Grid container spacing={1}>
            {_.toArray(dataDetails).map((data) => (
              <Grid item xs={4} key={data['ClaimID']}>

                <Card style={{ minHeight: "210px"}}>
                  <CardContent>
                    <div style={{ height: "35px"}}>
                      <div style={{ float: "left", fontWeight: "bold", fontSize: "12pt", width:"85%" }}>
                        Claim ID : {data['ClaimID']}
                      </div>
                      <div style={{ float: "left", textAlign:"right"}}>
                        <Tooltip title={data['priorityDesc']} placement="top">
                          <FiberManualRecordIcon style={{ color: data['priorityColor'] }} />
                        </Tooltip>
                      </div>
                    </div>
                    <div style={{fontFamily: "Roboto, Helvetica, Arial, sans-serif", lineHeight:"1.5em", color:"#8f8b8b", fontSize:"10pt", height:"60px", overflow:"hidden", width:"100%"}}>
                      {data['Description']}
                    </div>
                    <div style={{fontFamily: "Roboto, Helvetica, Arial, sans-serif", lineHeight:"1.5em", fontSize:"10pt", height:"25px", overflow:"hidden", width:"100%"}}>
                    <div style={{width:"30%", float:"left"}}>Location</div> <div style={{width:"70%", float:"left"}}>: {data['LocationID']}</div>
                    </div>
                    <div style={{fontFamily: "Roboto, Helvetica, Arial, sans-serif", lineHeight:"1.5em", fontSize:"10pt", height:"25px", overflow:"hidden", width:"100%"}}>
                    <div style={{width:"30%", float:"left"}}>Sensor</div> <div style={{width:"70%", float:"left"}}>: {data['SensorID']}</div>
                    </div>

                  </CardContent>
                  <CardActions style={{marginBottom:"20px" }}>
                    <Button variant="contained" style={{width:"40%", backgroundColor:"#464775", marginLeft:"30%", marginRight:"30%", float:"left", textTransform: 'capitalize', fontSize:"10pt", fontWeight:700, color:"white"}} href={data['TeamsID']}>Contact </Button>
                    {/* <Button variant="contained" style={{width:"40%", backgroundColor:"#464775", marginLeft:"5%", marginRight:"5%", float:"left", textTransform: 'capitalize', fontSize:"10pt", fontWeight:700, color:"white"}} href={data['TeamsID']}>Delete</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          )}
      </div>
    );
  }
}
