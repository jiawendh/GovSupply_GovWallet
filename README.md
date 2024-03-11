# GovSupply_GovWallet

A portal is made with a redemption system such that the gift distributer at the redemption counter is able to key in the team's representative staff pass IDs to check if their team is eligible for the gift redemption.

## Redemption System
This system allows for the redemption of gifts by teams in a department based on their staff pass IDs and past redemptions.

### Features
- Lookup staff pass IDs to determine the corresponding team.
- Verify if a team is eligible for redemption based on past redemptions.
- Add new redemptions to the system if the team is eligible.

### Input/Data
- staff-id-to-team-mapping.csv: CSV file mapping staff pass IDs to team names.
- redemptionData: array containing past redemptions data.

## Usage

### Run the Portal
npm run dev

### Steps
- Key in staff ID
- Click on the "Check" button
- Feedback message will appear:
    - "Invalid staff pass ID." : Staff pass entered is not a valid staff pass and cannot be found in the staff-id-to-team-mapping.csv.
        - The gift distributer at the redemption counter can key in another staff pass ID for check.
    - "Team is NOT eligible for redemption." : The team mapped to the staff pass has already redeemed their team's gift as recorded by the redemptionData array.
        - The gift distributer at the redemption counter send the representative away without a gift.
    - "Team is eligible for redemption!" : The team mapped to the staff pass is eligible to redeem their team's gift.
        - The gift distributer at the redemption counter can pass to the staff the gift.
        - The gift distributer clicks on the "Set as Redeemed!" button to record the gift redemption in the redemptionData array.
            - "Redemption successful!" : The team has now successfully redeemed their gift.

## Testing

### Run Unit Tests
npx jest

### Test Results
This command will run Jest and execute all the test files (*.test.ts or *.spec.ts) found in the project. Jest will provide feedback on whether each test passed or failed, along with additional information if needed.