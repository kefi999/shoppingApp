import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX = async function (url, uploadData) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

//template for sending data using new fetch stuff
// const dataToSend = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
// let dataReceived = "";
// fetch("", {
//     credentials: "same-origin",
//     mode: "same-origin",
//     method: "post",
//     headers: { "Content-Type": "application/json" },
//     body: dataToSend
// })
//     .then(resp => {
//         if (resp.status === 200) {
//             return resp.json()
//         } else {
//             console.log("Status: " + resp.status)
//             return Promise.reject("server")
//         }
//     })
//     .then(dataJson => {
//         dataReceived = JSON.parse(dataJson)
//     })
//     .catch(err => {
//         if (err === "server") return
//         console.log(err)
//     })

// console.log(`Received: ${dataReceived}`)
