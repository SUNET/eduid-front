export const swamidErrorData = {
  "common": {
    "IDENTIFICATION_FAILURE": {
      "eduPersonPrincipalName": {
        "message": "error_edu_person_principal_name"
      },
      "eduPersonOrcid": {
        "message": "error_edu_person_orcid"
      }
    },
    "AUTHENTICATION_FAILURE": {
      "https://refeds.org/profile/mfa": {
        "message": "error_mfa"
      }
    },
    "AUTHORIZATION_FAILURE": {
      "affiliation=student": {
        "message": "error_affiliation_student"
      },
      "http://www.swamid.se/policy/assurance/al1": {
        "message": "error_assurance_al1"
      }
    },
    "OTHER_ERROR": {
      "An error occurred": {
        "message": "error_access_an_error_occurred"
      }
    }
  },
  "sp.ladok.se": {
    "IDENTIFICATION_FAILURE": {
      "norEduPersonNIN http://refeds.org/category/research-and-scholarship": {
        "message": "error_sp_ladok"
      }
    }
  }
}