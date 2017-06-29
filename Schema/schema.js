const typeDefinitions = `
# gcif_limits Schema definition 
type gcif_limits{
   reference_no : String,
   domain : String!,
   status : String,
   unit : [units],
   Users:[users_limits]
}

type units{
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
   unit : [units],
   gcifs: [gcif_limits]
}

# Query definition 
type Query {  
    #for a specific user (for a given user id ) get user limits
        getUserLimitsById(user_no: String!): users_limits,        
    #get a specific corporate limits based on its id
        getCorporateLimitsById(domain: String!): gcif_limits,
    #get user imits for specific corporate based on its id
        getCorporateLimitsByUserNo(user_no: String!): gcif_limits
    #get user imits for specific corporate based on its id
        getusersLimitsForCorporate(domain: String!): [users_limits]
    #get user imits for specific corporate based on  unit
        getUnitLevelLimits(limit_value: String!): [units]
}
 
schema{
    query: Query
}
`;

module.exports = [typeDefinitions];