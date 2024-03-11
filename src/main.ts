// main.ts
import * as fs from 'fs';
import { getStaffTeam, verifyRedemption, addRedemption, Redemption } from './redemptionSystem';

const csv = require('csv-parser')
const mappingData: Map<string, string> = new Map()
const redemptionData: Redemption[] = [];

var currentTeam: string = "";

function setCurrentTeam(_teamName: string) {
  currentTeam = _teamName;
}

export function loadCsvData() {
  // Read staff-id-to-team-mapping.csv and initialize redemption data
  fs.createReadStream('./assets/staff-id-to-team-mapping.csv')
    .pipe(csv())
    .on('data', (data: any) => {
      mappingData.set(data.staff_pass_id, data.team_name);
    })
    .on('end', () => {
      console.log('Mapping data loaded successfully!');
    });
}

export function checkEligibility(_staffId : string) {
  // Perform lookup of the representative's staff pass ID
  const teamName = getStaffTeam(_staffId, mappingData);

  if (!teamName) {
    return 0; // Invalid
  } else {
    // Verify if the team can redeem their gift
    if(!verifyRedemption(teamName, redemptionData)) {
      return 1; // Ineligible
    } else {
      setCurrentTeam(teamName);
      return 2; // Eligible
    }
  }
}

export function teamRedeem() {
  // Add new redemption
  addRedemption(currentTeam, redemptionData);
}
