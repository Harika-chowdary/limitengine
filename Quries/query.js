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
                        "user_no":"23456789041"
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
                        "domain":"9000000001"
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
                    "user_no":"23456789041"
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
                    "domain":"9000000001"
                }
            }
        }
    }
};

function getUnitLevelLimits(args) {
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
                        { "match": { "unit.limit_value": "IGTB01" }}
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
    getUnitLevelLimits : getUnitLevelLimits,
    getusersLimitsForCorporate : getusersLimitsForCorporate,
    getCorporateLimitsByUserNo : getCorporateLimitsByUserNo
};