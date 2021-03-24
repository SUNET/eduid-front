export const swamidErrorData = {
  "common": {
    "IDENTIFICATION_FAILURE": {
      "eduPersonPrincipalName": {
        "message": "eduPersonPrincipalName error"
      },
      "eduPersonOrcid": {
        "message": "eduPersonOrcid error"
      }
    },
    "AUTHENTICATION_FAILURE": {
      "https://refeds.org/profile/mfa": {
        "message": "MFA error"
      }
    },
    "AUTHORIZATION_FAILURE": {
      "affiliation=student": {
        "message": "Not student error"
      },
      "http://www.swamid.se/policy/assurance/al1": {
        "message": "Not AL1 error"
      }
    },
    "OTHER_ERROR": {
      "An error occurred": {
        "message": "Error unclear, something stuck somewhere"
      }
    }
  },
  "sp.ladok.se": {
    "IDENTIFICATION_FAILURE": {
      "norEduPersonNIN http://refeds.org/category/research-and-scholarship": {
        "message": "You need to verify you eduID account error"
      }
    }
  }
}