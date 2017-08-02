// <<<<<<< HEAD
// import {getAccessToken} from 'utils/AppUtils'
// import {BASE_URL} from './baseURL'
//
// var url
// var requestObject
// var onSuccess
// var onFailure
// var type
// var count
// var maxRetries = 2
//
// // generic web api call to make network requests
// function genericWebAPICall (url, requestObject, onSuccess, onFailure, type = 'POST', count = 1, choice = false) {
//   url = url
//   // console.log(url)
//   requestObject = requestObject
//   onSuccess = onSuccess
//   onFailure = onFailure
//   type = type
//   console.log(url)
//   if (count < 2) {
//     console.log('RequestObject:', requestObject)
//     if (type === 'POST') {
//       const formattedrequestObject = JSON.stringify(JSON.stringify(requestObject))
//       const dataRequestObject = JSON.stringify({'data': formattedrequestObject, 'clientKeyDetailsId': 1})
//       console.log('dataRequestObject >>> ', dataRequestObject)
//       // let accessToken = getAccessToken()
//       let accessToken = 'todo_app'
//       $.ajax({
//         type: 'POST',
//         url: url,
//         data: dataRequestObject,
//         contentType: 'application/json',
//         beforeSend: function (xhr) {
//           if (accessToken !== '' || accessToken !== null) {
//             xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
//           }
//         }
//       })
//       .done(function (response) {
//         // console.log(response)
//         onSuccess(response)
//       })
//       .fail(function (response) {
//         // console.log(response)
//         if (count === 1) {
//           onFailure(response)
//         } else {
//           genericWebAPICall(url, requestObject, onSuccess, onFailure, type, count + 1)
//         }
//       })
//     } if (type === 'PUT') {
//       const formattedrequestObject = JSON.stringify(JSON.stringify(requestObject))
//       const dataRequestObject = JSON.stringify({'data': formattedrequestObject, 'clientKeyDetailsId': 1})
//       console.log('dataRequestObject >>> ', dataRequestObject)
//       // let accessToken = getAccessToken()
//       let accessToken = 'todo_app'
//       $.ajax({
//         type: 'PUT',
//         url: url,
//         data: dataRequestObject,
//         contentType: 'application/json',
//         beforeSend: function (xhr) {
//           if (accessToken !== '' || accessToken !== null) {
//             xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
//           }
//         }
//       })
//       .done(function (response) {
//         // console.log(response)
//         onSuccess(response)
//       })
//       .fail(function (response) {
//         // console.log(response)
//         if (count === 1) {
//           onFailure(response)
//         } else {
//           genericWebAPICall(url, requestObject, onSuccess, onFailure, type, count + 1)
//         }
//       })
//     }
//     else if (type === 'GET') {
//       // let accessToken = getAccessToken()
//       let accessToken = 'todo_app'
//       $.ajax({
//         type: 'GET',
//         url: url,
//         data: requestObject,
//         contentType: 'application/json',
//         beforeSend: function (xhr) {
//           if (accessToken !== '' || accessToken !== null) {
//             xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
//           }
//         }
//       })
//       .done(function (response) {
//         // console.log(response)
//         onSuccess(response)
//       })
//       .fail(function (response) {
//         if (count === 1) {
//           onFailure(response)
//         } else {
//           genericWebAPICall(url, requestObject, onSuccess, onFailure, type, count + 1)
//         }
//       })
//     }
//     else if (type === 'DELETE') {
//       // let accessToken = getAccessToken()
//       let accessToken = 'todo_app'
//       $.ajax({
//         type: 'DELETE',
//         url: url,
//         beforeSend: function (xhr) {
//           if (accessToken !== '' || accessToken !== null) {
//             xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken)
//           }
//         }
//       })
//       .done(function (response) {
//         // console.log(response)
//         onSuccess(response)
//       })
//       .fail(function (response) {
//         if (count === 1) {
//           onFailure(response)
//         } else {
//           genericWebAPICall(url, requestObject, onSuccess, onFailure, type, count + 1)
//         }
//       })
// =======
import { getAccessToken } from "utils/AppUtils";
import { BASE_URL } from "./baseURL";
import { setCookie, deleteCookie, getCookie } from "../utils/AppUtils";

var url;
var requestObject;
var onSuccess;
var onFailure;
var type;
var count;
var maxRetries = 2;

// generic web api call to make network requests
function genericWebAPICall(
  url,
  requestObject,
  onSuccess,
  onFailure,
  type = "POST",
  count = 1,
  choice = false
) {
  url = url;
  // console.log(url)
  requestObject = requestObject;
  onSuccess = onSuccess;
  onFailure = onFailure;
  type = type;
  console.log(url);
  if (count < 2) {
    console.log("RequestObject:", requestObject);
    if (type === "POST") {
      const formattedrequestObject = JSON.stringify(
        JSON.stringify(requestObject)
      );
      const dataRequestObject = JSON.stringify({
        data: formattedrequestObject,
        clientKeyDetailsId: 1
      });
      console.log("dataRequestObject >>> ", dataRequestObject);
      // let accessToken = getAccessToken()
      let accessToken = getCookie("access_token");
      console.log("accessToken", accessToken);
      $.ajax({
        type: "POST",
        url: url,
        data: dataRequestObject,
        contentType: "application/json",
        beforeSend: function(xhr) {
          if (accessToken !== "" || accessToken !== null) {
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
          }
        }
      })
        .done(function(response) {
          // console.log(response)
          onSuccess(response);
        })
        .fail(function(response) {
          // console.log(response)
          if (count === 1) {
            onFailure(response);
          } else {
            genericWebAPICall(
              url,
              requestObject,
              onSuccess,
              onFailure,
              type,
              count + 1
            );
          }
        });
    }
    if (type === "PUT") {
      const formattedrequestObject = JSON.stringify(
        JSON.stringify(requestObject)
      );
      const dataRequestObject = JSON.stringify({
        data: formattedrequestObject,
        clientKeyDetailsId: 1
      });
      console.log("dataRequestObject >>> ", dataRequestObject);
      // let accessToken = getAccessToken()
      let accessToken = getCookie("access_token");
      $.ajax({
        type: "PUT",
        url: url,
        data: dataRequestObject,
        contentType: "application/json",
        beforeSend: function(xhr) {
          if (accessToken !== "" || accessToken !== null) {
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
          }
        }
      })
        .done(function(response) {
          // console.log(response)
          onSuccess(response);
        })
        .fail(function(response) {
          // console.log(response)
          if (count === 1) {
            onFailure(response);
          } else {
            genericWebAPICall(
              url,
              requestObject,
              onSuccess,
              onFailure,
              type,
              count + 1
            );
          }
        });
    } else if (type === "GET") {
      // let accessToken = getAccessToken()
      let accessToken = getCookie("access_token");
      $.ajax({
        type: "GET",
        url: url,
        data: requestObject,
        contentType: "application/json",
        beforeSend: function(xhr) {
          if (accessToken !== "" || accessToken !== null) {
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
          }
        }
      })
        .done(function(response) {
          // console.log(response)
          onSuccess(response);
        })
        .fail(function(response) {
          if (count === 1) {
            onFailure(response);
          } else {
            genericWebAPICall(
              url,
              requestObject,
              onSuccess,
              onFailure,
              type,
              count + 1
            );
          }
        });
    } else if (type === "DELETE") {
      // let accessToken = getAccessToken()
      let accessToken = getCookie("access_token");
      $.ajax({
        type: "DELETE",
        url: url,
        beforeSend: function(xhr) {
          if (accessToken !== "" || accessToken !== null) {
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
          }
        }
      })
        .done(function(response) {
          // console.log(response)
          onSuccess(response);
        })
        .fail(function(response) {
          if (count === 1) {
            onFailure(response);
          } else {
            genericWebAPICall(
              url,
              requestObject,
              onSuccess,
              onFailure,
              type,
              count + 1
            );
          }
        });
    }
  }
}

export { genericWebAPICall };
