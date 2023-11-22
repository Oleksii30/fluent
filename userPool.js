import { CognitoUserPool } from "amazon-cognito-identity-js"

const poolData = {
  UserPoolId: "us-west-2_ux4vVOPK0",
  ClientId: "2q40bno295l0t6vh6qofpn984k"
}

export default new CognitoUserPool(poolData)
