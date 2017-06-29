const typeDefinitions = `
# gcif_limits Schema definition 
type gcif_limits{
   reference_no : String,
   domain : String!,
   status : String,
   unit : [corporateunits],
   Users:[users_limits]
}

type corporateunits{
   domain : String,
   limit_value : String,
   approval_limit_applicable_flag : Boolean,
   limitAttributes:[limits_attributes]
}

type userunits{
   user_no : String,
   limit_value : String,
   approval_limit_applicable_flag : Boolean,
   limitAttributes:[limits_attributes]
}

type limits_attributes{
   category : String,
   transaction_type : String,
   action : String,
   limit_type : String,
   count : Int,
   applicable_psfa_ccy_code : String,
   amount : String,
   joint_amount : String,
   currency : String,
   applicable_to_all_currenncy : String
  
}

# users_limits Schema definition 
type users_limits{
   reference_no : String,
   domain : String!,
   user_no :String!,
   status :String,
   self_auth_limit_applicable_flag : Boolean,
   max_self_auth_amount : String,
   amount_masking_flag : String
   unit : [userunits],
   gcifs: [gcif_limits]
}

# Query definition 
type Query {  
    #for a specific user (for a given user id ) get user limits
        getUserLimitsById(user_no: String!): [users_limits],        
    #get a specific corporate limits based on its id
        getCorporateLimitsById(domain: String!): [gcif_limits],
    #get user limits for specific corporate based on its id
        getCorporateLimitsByUserNo(user_no: String!): [gcif_limits]
    #get user limits for specific corporate based on its id
        getusersLimitsForCorporate(domain: String!): [users_limits]
    #get user limits for specific corporate based on  unit
        getLimitsForSpecificCorporateUnit(limit_value: String! , domain: String!): [corporateunits]
    #get user limits for specific user based on  unit
        getLimitsForSpecificUserUnit(limit_value: String! , user_no: String!): [userunits]
    #get user limits for specific corporate based on  unit
        getUnitLevelLimitsForSpecificCorporate(domain: String!): [corporateunits]
    #get user limits for specific user based on  unit
        getUnitLevelLimitsForSpeciificUser(user_no: String!): [userunits]
}
 
schema{
    query: Query
}
`;

module.exports = [typeDefinitions];