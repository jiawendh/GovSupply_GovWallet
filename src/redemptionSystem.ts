// redemptionSystem.ts
export interface Redemption {
  teamName: string;
  redeemedAt: number;
}

export function getStaffTeam(staffPassId: string, _mappingData: Map<string, string>): string | undefined {
  // Return the team name or undefined if not found
  return _mappingData.get(staffPassId);
}

export function verifyRedemption(_teamName: string, _redemptionData: Redemption[]): boolean {
  // Check against redemption data if the team is eligible for redemption
  for (var index = 0; index < _redemptionData.length; index++) {
    if (_redemptionData[index].teamName === _teamName) {
      return false;
    }
  }
  return true;
}

export function addRedemption(_teamName: string, _redemptionData: Redemption[]): void {
  // Add redemption to redemption data
  const redemption: Redemption = {
    teamName: _teamName,
    redeemedAt: Date.now(),
  };
  _redemptionData.push(redemption);
}