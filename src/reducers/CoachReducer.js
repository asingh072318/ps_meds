import { State, Effect } from "jumpstate";
import { genericWebAPICall } from "../utils/AppApi";
import { getBaseURL } from "../utils/URL";
import { Actions } from "jumpstate";
import _ from "lodash";
const currentState = "TodoStateV1";
const baseURL = getBaseURL();
export default State(currentState, {
  // Initial State should be starts with the key 'initial': ...
  initial: {
      signInError:"",
      currentStoreDetails:{
        uuid:"",
        address:"",
        dlNumber:"",
        gstNumber:"",
        isAdmin:false,
        ownerName:"",
        shopName:"",
        contactNumber:"",
      },
      allUsers:{},
      searchData:[],
  },


  setSearchData(state,payload){
      var finalPayload = [];
      for(var i=0;i<payload.length;i++){
        finalPayload.push(payload[i]["_source"]);
      }
      console.log(finalPayload);
      state.searchData=finalPayload;
      return _.cloneDeep(state);
  },





  setUserData(state,payload) {
    console.log('setUserData',payload);
    state.currentStoreDetails.uuid=payload.uuid;
    state.currentStoreDetails.isAdmin=payload.isAdmin;
    state.currentStoreDetails.address=payload.address.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    state.currentStoreDetails.ownerName=payload.ownerName.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    state.currentStoreDetails.shopName=payload.shopName.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    state.currentStoreDetails.dlNumber=payload.dlNumber;
    state.currentStoreDetails.gstNumber=payload.gstNumber;
    state.currentStoreDetails.contactNumber=payload.contactNumber;
    return _.cloneDeep(state);
  },
  setAllUsers(state,payload){
    //console.log('setAllUsers',payload)
    state.allUsers=payload;
    return _.cloneDeep(state);
  },
  setModalVisible(state, payload) {
    state.modal = payload;
    return _.cloneDeep(state);
  },
  topSearch(state, payload) {
    //console.log(payload);
    return _.cloneDeep(state);
  },
  setCount(state, payload) {
    state.count = payload;
    return _.cloneDeep(state);
  },
  updateTag(state, payload) {
    state.tags = [...state.tags, ...payload];
    return _.cloneDeep(state);
  },
  updateGlobal(state, payload) {
    state.readme = payload;
    state.readonly = false;
    state.selectedpackages[state.selectedindex]["_source"]["readme"] = payload;
    return _.cloneDeep(state);
  },
  updatePackage(state, payload) {
    state.selectedpackages = [];
    state.readme = "Default Text";
    state.readonly = true;
    state.selectedpackages = [...state.selectedpackages, ...payload];
    return _.cloneDeep(state);
  },
  checkTrue(state, payload) {
    state.categories[payload.index].check = payload.value;
    return _.cloneDeep(state);
  },
  updateSelectedPackages(state, payload) {
    state.selectedpackages = [];
    state.categories = {};
    state.readme = "Default Text";
    state.readonly = true;
    state.selectedTag = payload.tag;
    let final = [];
    //console.log(payload.tag);
    payload.resp.map((eachPackage, index) => {
      let category = eachPackage["_source"]["article_category"];
      category.map((eachcat, index) => {
        let payload = {
          category: eachcat,
          check: false
        };
        let count = 0;
        final.map((eachobj, index) => {
          if (eachobj.category === eachcat && eachobj.check === false) {
            count = 1;
          }
        });
        if (count === 0) final.push(payload);
      });
    });
    state.categories = final;
    state.selectedpackages = [...state.selectedpackages, ...payload.resp];
    return _.cloneDeep(state);
  },
  updateReadme(state, payload) {
    //console.log("in readme", payload);
    if (payload !== "") {
      state.readme = payload.readme;
      state.readonly = false;
      state.selectedid = payload.id;
      state.selectedindex = payload.index;
    }
    return _.cloneDeep(state);
  }
});

// Network calls
Effect("getCount", (requestObject = {}) => {
  var settings = {
    url: baseURL + "jscoach/articles/_count",
    type: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/javascript, */*; q=0.01"
    },
    success: function(response) {
      Actions.TodoStateV1.setCount(response.count);
      Actions.fetchallData(response.count);
    },
    error: function(response) {
      console.log("error response is ", response);
    }
  };
  //console.log(data0);
  $.ajax(settings);
});
Effect("fetchallData", (requestObject = {}) => {
  let abc = requestObject;
  let data0 = {
    from: 0,
    size: abc,
    query: {
      match_all: {}
    }
  };
  var settings = {
    url: baseURL + "jscoach/articles/_search",
    type: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/javascript, */*; q=0.01"
    },
    data: JSON.stringify(data0),
    success: function(response) {
      let payload = {
        resp: response.hits.hits,
        tag: "Everything"
      };
      console.log(payload.resp);
      Actions.TodoStateV1.updateSelectedPackages(payload);
    },
    error: function(response) {
      console.log("error response is ", response);
    }
  };
  //console.log(data0);
  $.ajax(settings);
});
Effect("fetchCategorypackage", (requestObject = {}) => {
  let data0;
  if (typeof requestObject.checkbox[0] !== "undefined") {
    if (requestObject.tag !== "Everything") {
      data0 = {
        query: {
          bool: {
            must: [
              {
                term: {
                  "article_type.keyword": "" + requestObject.tag
                }
              },
              {
                query_string: {
                  default_field: "article_name",
                  query: requestObject.search + "*"
                }
              },
              {
                terms: {
                  "article_category.keyword": requestObject.checkbox
                }
              }
            ]
          }
        }
      };
    } else {
      data0 = {
        query: {
          bool: {
            must: [
              {
                query_string: {
                  default_field: "article_name",
                  query: requestObject.search + "*"
                }
              },
              {
                terms: {
                  "article_category.keyword": requestObject.checkbox
                }
              }
            ]
          }
        }
      };
    }
  } else if (requestObject.tag !== "Everything") {
    data0 = {
      query: {
        bool: {
          must: [
            {
              term: {
                "article_type.keyword": "" + requestObject.tag
              }
            },
            {
              query_string: {
                default_field: "article_name",
                query: requestObject.search + "*"
              }
            }
          ]
        }
      }
    };
  } else {
    data0 = {
      query: {
        bool: {
          must: [
            {
              query_string: {
                default_field: "article_name",
                query: requestObject.search + "*"
              }
            }
          ]
        }
      }
    };
  }
  console.log(data0);
  var settings = {
    url: baseURL + "_search",
    type: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/javascript, */*; q=0.01"
    },
    data: JSON.stringify(data0),
    success: function(response) {
      console.log(response);
      Actions.TodoStateV1.updatePackage(response.hits.hits);
    },
    error: function(response) {
      console.log("error response is ", response);
    }
  };
  //console.log(data0);
  $.ajax(settings);
});
Effect("fetchallTags", (requestObject = {}) => {
  console.log("fetching all tags");
  let data0 = {
    size: 0,
    aggs: {
      articles: {
        terms: { field: "article_type.keyword" }
      }
    }
  };
  var settings = {
    url: baseURL + "_search",
    type: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/javascript, */*; q=0.01"
    },
    data: JSON.stringify(data0),
    success: function(response) {
      console.log(response);
      let tags = response.aggregations.articles.buckets;
      let payload = [];
      tags.map((eachTag, index) => {
        payload.push(eachTag.key);
      });
      Actions.TodoStateV1.updateTag(payload);
    },
    error: function(response) {
      console.log("error response is ", response);
    }
  };
  //console.log(data0);
  $.ajax(settings);
});
Effect("fetchSearch", (requestObject = {}) => {
  //console.log("fetching all tags");
  //console.log(requestObject.tag, requestObject.search);
  let data0;
  if (typeof requestObject.checkbox[0] !== "undefined") {
    if (requestObject.tag !== "Everything") {
      data0 = {
        query: {
          bool: {
            must: [
              {
                term: {
                  "article_type.keyword": "" + requestObject.tag
                }
              },
              {
                query_string: {
                  default_field: "article_name",
                  query: requestObject.search + "*"
                }
              },
              {
                terms: {
                  "article_category.keyword": requestObject.checkbox
                }
              }
            ]
          }
        }
      };
    } else {
      data0 = {
        query: {
          bool: {
            must: [
              {
                query_string: {
                  default_field: "article_name",
                  query: requestObject.search + "*"
                }
              },
              {
                terms: {
                  "article_category.keyword": requestObject.checkbox
                }
              }
            ]
          }
        }
      };
    }
  } else if (requestObject.tag !== "Everything") {
    data0 = {
      query: {
        bool: {
          must: [
            {
              term: {
                "article_type.keyword": "" + requestObject.tag
              }
            },
            {
              query_string: {
                default_field: "article_name",
                query: requestObject.search + "*"
              }
            }
          ]
        }
      }
    };
  } else {
    data0 = {
      query: {
        bool: {
          must: [
            {
              query_string: {
                default_field: "article_name",
                query: requestObject.search + "*"
              }
            }
          ]
        }
      }
    };
  }
  var settings = {
    url: baseURL + "_search",
    type: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/javascript, */*; q=0.01"
    },
    data: JSON.stringify(data0),
    success: function(response) {
      Actions.TodoStateV1.updatePackage(response.hits.hits);
    },
    error: function(response) {
      console.log("error response is ", response);
    }
  };
  //console.log(data0);
  $.ajax(settings);
});
Effect("fetchPackageElement", (requestObject = {}) => {
  //console.log("fetch PackageElement", requestObject);
  //console.log("executing", requestObject);
  let data0 = {
    query: {
      term: {
        "article_type.keyword": requestObject.eachTag
      }
    }
  };
  //console.log(data0);
  var settings = {
    url: baseURL + "_search",
    type: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/javascript, */*; q=0.01"
    },
    data: JSON.stringify(data0),
    success: function(response) {
      //console.log(response);
      let payload = {
        resp: response.hits.hits,
        tag: requestObject.eachTag
      };
      Actions.TodoStateV1.updateSelectedPackages(payload);
    },
    error: function(response) {
      console.log("error response is ", response);
    }
  };
  //console.log(data0);
  $.ajax(settings);
});
Effect("updatePackageReadme", (requestObject = {}) => {
  console.log(requestObject);
  let data0 = {
    doc: {
      readme: requestObject.readme
    }
  };
  var settings = {
    url: baseURL + "jscoach/articles/" + requestObject.id + "/_update",
    type: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/javascript, */*; q=0.01"
    },
    data: JSON.stringify(data0),
    success: function(response) {
      //console.log(response);
      Actions.TodoStateV1.updateGlobal(requestObject.readme);
    },
    error: function(response) {
      console.log("error response is ", response);
    }
  };
  //console.log(settings);
  $.ajax(settings);
});
Effect("newPackage", (requestObject = {}) => {
  console.log(requestObject.type);
  if (requestObject.type === "Submit") {
    let type = requestObject.req.article_type;
    var frags = type.split(" ");
    for (var i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    type = frags.join(" ");
    requestObject.req.readme =
      "# You can add your README by clicking on Edit option below. #";
    requestObject.req.article_type = type;
    let data0 = requestObject.req;
    var settings = {
      url: baseURL + "jscoach/articles/",
      type: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json, text/javascript, */*; q=0.01"
      },
      data: JSON.stringify(data0),
      success: function(response) {
        //console.log(response);
        Actions.TodoStateV1.setModalVisible(false);
      },
      error: function(response) {
        console.log("error response is ", response);
      }
    };
    //console.log(settings);
    $.ajax(settings);
  } else {
    Actions.TodoStateV1.setModalVisible(false);
  }
});
