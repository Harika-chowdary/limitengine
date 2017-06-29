// get the limits for corporate
function getCorporateLimitsByUserNo(args) {
    return {
        index: 'limits', 
        filterPath: 'hits.hits._source',                              
        body: {
            "query": {
                "has_child": {
                    "type": "users_limits_config", 
                    "query": {
                        "match": {
                        "user_no": args.user_no
                        }
                    } 
                }
            }
        }
    }
};

function getusersLimitsForCorporate(args) {
    return {
        index: 'limits',  
        filterPath: 'hits.hits._source',                             
        body: {
            "query": {
                "has_parent": {
                    "type": "limits_config", 
                    "query": {
                        "match": {
                        "domain": args.domain
                        }
                    },
                    inner_hits: {				   
                    }
                }
            }
        }
    }
};


function getusersLimitsById(args) {
    return {
        index: 'limits',
        type: "users_limits_config", 
        filterPath: 'hits.hits._source',                                 
        body: {
             "query":{
                "match":{
                    "user_no": args.user_no
                }
            }
        }
    }
};

function getCorporateLimitsById(args) {
    return {
        index: 'limits', 
        type: "limits_config", 
        filterPath: 'hits.hits._source',                                 
        body: {
             "query":{
                "match":{
                    "domain": args.domain
                }
            }
        }
    }
};
function getLimitsForSpecificCorporateUnit(args) {
    return {
        index: 'limits', 
        type: 'limits_config',                                 
        body: {
             "query": {
                "nested": {
                "path": "unit",
                "query": {
                    "bool": {
                    "must": [
                        { "match": { "unit.limit_value": args.limit_value }},
                        { "match": { "unit.domain": args.domain }}
                    ]
                    }
                },
                "inner_hits" :{
                }
                }
            }
        }
    }
};
function getLimitsForSpecificUserUnit(args) {
    return {
        index: 'limits', 
        type: 'users_limits_config',                                 
        body: {
             "query": {
                "nested": {
                "path": "unit",
                "query": {
                    "bool": {
                    "must": [
                         { "match": { "unit.limit_value": args.limit_value }},
                        { "match": { "unit.user_no": args.user_no }}
                    ]
                    }
                },
                "inner_hits" :{
                }
                }
            }
        }
    }
};
function getUnitLevelLimitsForSpeciificUser(args) {
    return {
        index: 'limits', 
        type: 'users_limits_config',                                 
        body: {
             "query": {
                "nested": {
                "path": "unit",
                "query": {
                    "bool": {
                    "must": [
                        { "match": { "unit.user_no": args.user_no }}
                    ]
                    }
                },
                "inner_hits" :{
                }
                }
            }
        }
    }
};

function getUnitLevelLimitsForSpecificCorporate(args) {
    return {
        index: 'limits', 
        type: 'limits_config',                                 
        body: {
             "query": {
                "nested": {
                "path": "unit",
                "query": {
                    "bool": {
                    "must": [
                         { "match": { "unit.domain": args.domain }}
                    ]
                    }
                },
                "inner_hits" :{
                }
                }
            }
        }
    }
};


// export the query methods
module.exports = {
    getCorporateLimitsById : getCorporateLimitsById,
    getusersLimitsById : getusersLimitsById,
    getusersLimitsForCorporate : getusersLimitsForCorporate,
    getCorporateLimitsByUserNo : getCorporateLimitsByUserNo,
    getLimitsForSpecificCorporateUnit :getLimitsForSpecificCorporateUnit,
    getLimitsForSpecificUserUnit : getLimitsForSpecificUserUnit,
    getUnitLevelLimitsForSpecificCorporate : getUnitLevelLimitsForSpecificCorporate,
    getUnitLevelLimitsForSpeciificUser : getUnitLevelLimitsForSpeciificUser
};