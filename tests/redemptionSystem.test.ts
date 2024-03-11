// redemptionSystem.test.ts
import { getStaffTeam, verifyRedemption, addRedemption, Redemption } from '../src/redemptionSystem';

describe('Redemption System', () => {
  // Sample mapping data for testing getStaffTeam function
  const mappingData = new Map<string, string>([
    ['STAFF_H123804820G', 'BASS'],
    ['MANAGER_T999888420B', 'RUST'],
    ['BOSS_T000000001P', 'RUST'],
  ]);

  // Sample redemption data for testing verifyRedemption and addRedemption functions
  const redemptionData: Redemption[] = [
    { teamName: 'BASS', redeemedAt: Date.now() - 100000 },
    { teamName: 'RUST', redeemedAt: Date.now() - 500000 },
    { teamName: 'RUST', redeemedAt: Date.now() - 2000000 },
  ];

  it('should lookup staff', () => {
    // Valid staff pass ID
    expect(getStaffTeam('STAFF_H123804820G', mappingData)).toBe('BASS');
    // Invalid staff pass ID
    expect(getStaffTeam('INVALID_ID', mappingData)).toBeUndefined();
  });

  it('should verify redemption', () => {
    // Eligible team (not redeemed)
    expect(verifyRedemption('TEST', redemptionData)).toBe(true);
    // Ineligible team (redeemed)
    expect(verifyRedemption('RUST', redemptionData)).toBe(false);
    // Eligible team (not redeemed)
    expect(verifyRedemption('RUST', [])).toBe(true); // No past redemptions
  });

  it('should add redemption', () => {
    // Add redemption for a team
    addRedemption('BASS', redemptionData);
    expect(redemptionData.length).toBe(4); // New redemption added
    // Verify the last redemption added
    expect(redemptionData[3].teamName).toBe('BASS');
    // Add redemption for a different team
    addRedemption('RUST', redemptionData);
    expect(redemptionData.length).toBe(5); // New redemption added
    // Verify the last redemption added
    expect(redemptionData[4].teamName).toBe('RUST');
  });
});