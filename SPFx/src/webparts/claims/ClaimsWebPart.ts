import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as _ from "lodash";
import * as strings from 'ClaimsWebPartStrings';
import Claims from './components/Claims';
import { IClaimsProps } from './components/IClaimsProps';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import * as microsoftTeams from "@microsoft/teams-js";

const REACT_APP_SERVER_URL="https://testcibuscellai3.azurewebsites.net/";

export interface IClaimsWebPartProps {
  description: string;
}

export default class ClaimsWebPart extends BaseClientSideWebPart<IClaimsWebPartProps> {

  public render(): void {
    if (!this.renderedOnce) {
      if (this.context.sdks.microsoftTeams) {
        let details = this.context.sdks.microsoftTeams.context;
        
        this.claimsAPI(details.channelId, details.groupId, details.tid)
        // this.claimsAPI('19:vBkr0CNmUGt93BY3H2wDu3QlP74CfwnfEdnoY_8JAoE1@thread.tacv2', '58acc117-8558-4c39-82c6-be3a01b57cc6', '88f2fdf3-c643-4aad-aba8-e368f04c2dbe')
          .then(response1 => {
            this.groupClaimsAPI()
          .then(response2 => {
            const element: React.ReactElement<IClaimsProps> = React.createElement(

              Claims,
              {
                nullDescription: response2.result,
                description: response1.result
              }
            );
            ReactDom.render(element, this.domElement);
          }
        );
      }); 
          
      }

    }
  
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private claimsAPI(channelId, groupId, tid): Promise<any>{
    console.log("details", 'https://testcibuscellai3.azurewebsites.net/api/claim-teams?channelId='+channelId+'&groupId='+groupId+'&tid='+tid);
    return this.context.httpClient.get(
      `https://testcibuscellai3.azurewebsites.net/api/claim-teams?channelId=${channelId}&groupId=${groupId}&tid=${tid}`,HttpClient.configurations.v1
      ).then((response: HttpClientResponse) => {
        let temp = {"result":[{"ClaimID":1001,"Description":"Alert at NEXUS in sensor Warning Code","Type":null,"Priority":"2","LocationID":"Eppelheim DHBW","CibusCellIOID":"NEXUS","SensorID":"Warning Code","TeamsID":"https://teams.microsoft.com/l/channel/19%3avBkr0CNmUGt93BY3H2wDu3QlP74CfwnfEdnoY_8JAoE1%40thread.tacv2/General?groupId=58acc117-8558-4c39-82c6-be3a01b57cc6&tenantId=88f2fdf3-c643-4aad-aba8-e368f04c2dbe","DashboardID":null,"UserID":null,"ProcessorName":null,"AI_ID":null,"LastModified":"2021-08-02T11:54:14.923Z","Text":null,"Impact":"1"},{"ClaimID":1002,"Description":"Early Warning at NEXUS in sensor Stack V (V)","Type":null,"Priority":"1","LocationID":"Eppelheim DHBW","CibusCellIOID":"NEXUS","SensorID":"Stack V (V)","TeamsID":"https://teams.microsoft.com/l/channel/19%3avBkr0CNmUGt93BY3H2wDu3QlP74CfwnfEdnoY_8JAoE1%40thread.tacv2/General?groupId=58acc117-8558-4c39-82c6-be3a01b57cc6&tenantId=88f2fdf3-c643-4aad-aba8-e368f04c2dbe","DashboardID":null,"UserID":null,"ProcessorName":null,"AI_ID":null,"LastModified":"2021-08-02T11:54:14.943Z","Text":null,"Impact":"2"},{"ClaimID":1003,"Description":"Early Warning at NEXUS in sensor DAC B Loop ADC","Type":null,"Priority":"1","LocationID":"Eppelheim DHBW","CibusCellIOID":"NEXUS","SensorID":"DAC B Loop ADC","TeamsID":"https://teams.microsoft.com/l/channel/19%3avBkr0CNmUGt93BY3H2wDu3QlP74CfwnfEdnoY_8JAoE1%40thread.tacv2/General?groupId=58acc117-8558-4c39-82c6-be3a01b57cc6&tenantId=88f2fdf3-c643-4aad-aba8-e368f04c2dbe","DashboardID":null,"UserID":null,"ProcessorName":null,"AI_ID":null,"LastModified":"2021-08-02T12:00:30.977Z","Text":null,"Impact":"2"},{"ClaimID":1004,"Description":"Early Warning at NEXUS in sensor State Code","Type":null,"Priority":"2","LocationID":"Eppelheim DHBW","CibusCellIOID":"NEXUS","SensorID":"State Code","TeamsID":"https://teams.microsoft.com/l/channel/19%3avBkr0CNmUGt93BY3H2wDu3QlP74CfwnfEdnoY_8JAoE1%40thread.tacv2/General?groupId=58acc117-8558-4c39-82c6-be3a01b57cc6&tenantId=88f2fdf3-c643-4aad-aba8-e368f04c2dbe","DashboardID":null,"UserID":null,"ProcessorName":null,"AI_ID":null,"LastModified":"2021-08-02T12:00:30.990Z","Text":null,"Impact":"2"},{"ClaimID":1005,"Description":"Alert at NEXUS in sensor Warning Code","Type":null,"Priority":"1","LocationID":"Eppelheim DHBW","CibusCellIOID":"NEXUS","SensorID":"Warning Code","TeamsID":"https://teams.microsoft.com/l/channel/19%3avBkr0CNmUGt93BY3H2wDu3QlP74CfwnfEdnoY_8JAoE1%40thread.tacv2/General?groupId=58acc117-8558-4c39-82c6-be3a01b57cc6&tenantId=88f2fdf3-c643-4aad-aba8-e368f04c2dbe","DashboardID":null,"UserID":null,"ProcessorName":null,"AI_ID":null,"LastModified":"2021-08-02T12:00:31.020Z","Text":null,"Impact":"1"},{"ClaimID":1006,"Description":"Early Warning at NEXUS in sensor Stack V (V)","Type":null,"Priority":"1","LocationID":"Eppelheim DHBW","CibusCellIOID":"NEXUS","SensorID":"Stack V (V)","TeamsID":"https://teams.microsoft.com/l/channel/19%3avBkr0CNmUGt93BY3H2wDu3QlP74CfwnfEdnoY_8JAoE1%40thread.tacv2/General?groupId=58acc117-8558-4c39-82c6-be3a01b57cc6&tenantId=88f2fdf3-c643-4aad-aba8-e368f04c2dbe","DashboardID":null,"UserID":null,"ProcessorName":null,"AI_ID":null,"LastModified":"2021-08-02T12:00:31.020Z","Text":null,"Impact":"2"},{"ClaimID":1007,"Description":"Alert at SolarPlant in sensor PV_kW","Type":null,"Priority":"2","LocationID":"Mannheim DHBW","CibusCellIOID":"SolarPlant","SensorID":"PV_kW","TeamsID":"https://teams.microsoft.com/l/channel/19%3avBkr0CNmUGt93BY3H2wDu3QlP74CfwnfEdnoY_8JAoE1%40thread.tacv2/General?groupId=58acc117-8558-4c39-82c6-be3a01b57cc6&tenantId=88f2fdf3-c643-4aad-aba8-e368f04c2dbe","DashboardID":null,"UserID":null,"ProcessorName":null,"AI_ID":null,"LastModified":"2021-08-02T12:00:31.037Z","Text":null,"Impact":"1"},{"ClaimID":1008,"Description":"Alert at Electrolysis in sensor zww_value","Type":null,"Priority":"1","LocationID":"Eppelheim DHBW","CibusCellIOID":"Electrolysis","SensorID":"zww_value","TeamsID":"https://teams.microsoft.com/l/channel/19%3avBkr0CNmUGt93BY3H2wDu3QlP74CfwnfEdnoY_8JAoE1%40thread.tacv2/General?groupId=58acc117-8558-4c39-82c6-be3a01b57cc6&tenantId=88f2fdf3-c643-4aad-aba8-e368f04c2dbe","DashboardID":null,"UserID":null,"ProcessorName":null,"AI_ID":null,"LastModified":"2021-08-02T12:00:31.047Z","Text":null,"Impact":"1"}]};

        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse;
      }) as Promise<any>;
    
  }
  private groupClaimsAPI(): Promise<any>{
    return this.context.httpClient.get(
      `https://testcibuscellai3.azurewebsites.net/api/claim-teams?channelId=none`,HttpClient.configurations.v1
      ).then((response: HttpClientResponse) => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse;
      }) as Promise<any>;
    
  }
}
