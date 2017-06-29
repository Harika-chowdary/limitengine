var elasticQuery = require('../Quries/query');
var elasticClient = require('../clientConfig/elasticClientConfig').elasticClient;

const resolvers = {
    Query:{        
            // get userlimits (for a given userid )
            getUserLimitsById(_,args){                
                return elasticClient.search(                    
                    elasticQuery.getuserLimitsById(args)
            ).then(function(data){                   
                    return data.hits.hits[0]["_source"];                                                     
                },function (error) {
                    console.trace(error.message)
                }); 
           },           
           // get corporate limits based on its id
           getCorporateLimitsById(_,args){                
               return elasticClient.search(                                          
                        elasticQuery.getCorporateLimitsById(args)
                ).then(function(data){                    
                   return data.hits.hits[0]["_source"];                                   
                },function (error) {
                    console.trace(error.message)
                });                 
            },
            // get corporate limits realted to particular user
            getCorporateLimitsByUserNo(_,args){                                      
                return elasticClient.search(
                    elasticQuery.getCorporateLimitsByUserNo(args)
             ).then(function(data){    
                 console.log("data-->" +JSON.stringify(data.hits.hits.length));                                   
                     var corporateLimitsList = [];
                    for(var counter=0; counter < data.hits.hits.length ; counter++){
                        corporateLimitsList[counter]=data.hits.hits[counter]["_source"];
                    }
                    return corporateLimitsList;                                                      
                },function (error) {
                    console.trace(error.message)
                }); 
            },
            // get all  users limits realted to particular corporate
            getusersLimitsForCorporate(_,args){                                      
                return elasticClient.search(
                    elasticQuery.getusersLimitsForCorporate(args)
             ).then(function(data){                                       
                     var userLimitsList = [];
                    for(var counter=0; counter < data.hits.hits.length ; counter++){
                        userLimitsList[counter]=data.hits.hits[counter]["_source"];
                    }
                    return userLimitsList;                                                      
                },function (error) {
                    console.trace(error.message)
                }); 
            },  
            //get user limits for specific corporate and specific unit provided
             getLimitsForSpecificCorporateUnit(_,args){                                      
                return elasticClient.search(
                    elasticQuery.getLimitsForSpecificCorporateUnit(args)
             ).then(function(data){
                // console.log("data : " +JSON.stringify(data));                                       
                    var corporateUnitLimitsList = [];
                        for(var counter=0; counter < data.hits.hits[0]["inner_hits"].unit.hits.hits.length ; counter++){
                            corporateUnitLimitsList[counter]=data.hits.hits[0]["inner_hits"].unit.hits.hits[counter]["_source"];
                        }
                        return corporateUnitLimitsList;                                                      
                },function (error) {
                    console.trace(error.message)
                }); 
            },
            //get user limits for specific corporate based on corporate ID provided
            getLimitsForSpecificCorporateUnit(_,args){                                      
                return elasticClient.search(
                    elasticQuery.getLimitsForSpecificCorporateUnit(args)
             ).then(function(data){
                // console.log("data : " +JSON.stringify(data));                                       
                    var corporateUnitLimitsList = [];
                        for(var counter=0; counter < data.hits.hits[0]["inner_hits"].unit.hits.hits.length ; counter++){
                            corporateUnitLimitsList[counter]=data.hits.hits[0]["inner_hits"].unit.hits.hits[counter]["_source"];
                        }
                        return corporateUnitLimitsList;                                                      
                },function (error) {
                    console.trace(error.message)
                }); 
            },
             //get user limits for specific user based on user_no provided
             getUnitLevelLimitsForSpeciificUser(_,args){                                      
                return elasticClient.search(
                    elasticQuery.getUnitLevelLimitsForSpeciificUser(args)
             ).then(function(data){
                // console.log("data : " +JSON.stringify(data));                                       
                    var userUnitLimitsList = [];
                        for(var counter=0; counter < data.hits.hits[0]["inner_hits"].unit.hits.hits.length ; counter++){
                            userUnitLimitsList[counter]=data.hits.hits[0]["inner_hits"].unit.hits.hits[counter]["_source"];
                        }
                        return userUnitLimitsList;                                                      
                },function (error) {
                    console.trace(error.message)
                }); 
            },
            //get user limits for specific user and specific unit provided
             getLimitsForSpecificUserUnit(_,args){                                      
                return elasticClient.search(
                    elasticQuery.getLimitsForSpecificUserUnit(args)
             ).then(function(data){
                // console.log("data : " +JSON.stringify(data));                                       
                    var userUnitLimitsList = [];
                        for(var counter=0; counter < data.hits.hits[0]["inner_hits"].unit.hits.hits.length ; counter++){
                            userUnitLimitsList[counter]=data.hits.hits[0]["inner_hits"].unit.hits.hits[counter]["_source"];
                        }
                        return userUnitLimitsList;                                                      
                },function (error) {
                    console.trace(error.message)
                }); 
            },  
    },
    gcif_limits:{
        Users(obj, args){                                                             
               return elasticClient.search(
                   elasticQuery.getusersLimitsForCorporate(obj)
               ).then(function(data){                    
                    var usersList = [];
                    for(var counter=0; counter < data.hits.hits.length ; counter++){
                        usersList[counter]=data.hits.hits[counter]["_source"];
                    }                  
                   return usersList;
                 },function (error) {
                    console.trace(error.message)
                });                             
        },
        unit(obj, args){                                                             
               return elasticClient.search(
                   elasticQuery.getUnitLevelLimitsForSpecificCorporate(obj)
               ).then(function(data){   
                   //console.log("data---->" + JSON.stringify(data.hits.hits[0]["inner_hits"]));                 
                    var UnitLimitsList = [];
                        for(var counter=0; counter < data.hits.hits[0]["inner_hits"].unit.hits.hits.length ; counter++){
                            UnitLimitsList[counter]=data.hits.hits[0]["inner_hits"].unit.hits.hits[counter]["_source"];
                        }
                        return UnitLimitsList; 
                 },function (error) {
                    console.trace(error.message)
                });                             
        },

    },    
    users_limits:{
        gcifs(obj,args){                                   
              return elasticClient.search(
                  elasticQuery.getCorporateLimitsByUserNo(obj)
              ).then(function(data){                    
                    return [data.hits.hits[0]["_source"]];                                     
                },function (error) {
                    console.trace(error.message)
                });             
        },
        unit(obj, args){                                                             
               return elasticClient.search(
                   elasticQuery.getUnitLevelLimitsForSpeciificUser(obj)
               ).then(function(data){                    
                   var UnitLimitsList = [];
                        for(var counter=0; counter < data.hits.hits[0]["inner_hits"].unit.hits.hits.length ; counter++){
                            UnitLimitsList[counter]=data.hits.hits[0]["inner_hits"].unit.hits.hits[counter]["_source"];
                        }
                        return UnitLimitsList; 
                 },function (error) {
                    console.trace(error.message)
                });                             
        },
    },
    corporateunits:{
        limitAttributes(obj,args){                                   
              return elasticClient.search(
                  elasticQuery.getLimitsForSpecificCorporateUnit(obj)
              ).then(function(data){                    
                     var LimitAttributeList = [];
                     //console.log("data : " +JSON.stringify(data));
                        for(var counter=0; counter < data.hits.hits[0]["inner_hits"].unit.hits.hits[0]["_source"]["limits_attributes"].length ; counter++){
                            LimitAttributeList[counter]=data.hits.hits[0]["inner_hits"].unit.hits.hits[0]["_source"]["limits_attributes"][counter];
                        }
                        return LimitAttributeList;                                     
                },function (error) {
                    console.trace(error.message)
                });             
        },
    },
    userunits:{
        limitAttributes(obj,args){                                   
              return elasticClient.search(
                  elasticQuery.getLimitsForSpecificUserUnit(obj)
              ).then(function(data){                    
                     var LimitAttributeList = [];
                        for(var counter=0; counter < data.hits.hits[0]["inner_hits"].unit.hits.hits[0]["_source"]["limits_attributes"].length ; counter++){
                            //console.log("data : " +JSON.stringify(data.hits.hits[0]["inner_hits"].unit.hits.hits[0]["_source"]["limits_attributes"].length));
                            LimitAttributeList[counter]=data.hits.hits[0]["inner_hits"].unit.hits.hits[0]["_source"]["limits_attributes"][counter];
                        }
                        return LimitAttributeList;                                     
                },function (error) {
                    console.trace(error.message)
                });             
        },
    },
};

module.exports = resolvers;
