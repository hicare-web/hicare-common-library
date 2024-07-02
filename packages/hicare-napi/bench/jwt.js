import { Bench } from 'tinybench';
import nodeJsonwebtoken from 'jsonwebtoken'
import rustJsonwebtoken from '@node-rs/jsonwebtoken'

const getUtcTimestamp = () => Math.floor(new Date().getTime() / 1000)
const oneDayInSeconds = 86400

const createJWTData = () => {
  return {
    data: {
      "enrollmentId": "d92dc8e6-1c0c-4944-aa63-555b8adaf769",
      "candidateId": "d87ef1d5-c534-4d82-b485-b3205a0b45b6",
      "patientId": "1525f02b-33f1-4ef1-aa0b-f4eafaf9ac4d",
      "inputUtcDt": "2022-12-13T01:33:39.000Z",
      "statusCode": "7155877d-7735-11ec-a226-06a78b1c250a",
      "statusUpdateDt": "2023-01-17T07:20:31.000Z",
      "loginId": "BESKOSH193",
      "token": "e5zQ8_Z4S9aSkHwFtIoH-b:APA91bEYpPZRr0ivyGnvyxHtLiMUEIWV__Q7ubhrPiTUbLMoy-8u48P_cIUcIPBmKIqW8wk0xgoEdXvLONQav_tIIGmWHypRdPrpAX_td77JMON9vtYyq1VFJVpWNiU7riYY_kzw-duC",
      "monthlyId": "8585e279-8d79-474c-ad3d-678c7b002ac3",
      "billableOption": "PPO",
      "billableStartDate": "2022-12-13T01:33:39.000Z",
      "stripCount": -24,
      "ccmStartDt": null,
      "ccmStatusCode": null,
      "ccmStatusUpdateDt": null,
      "userName": "Hyunju, Park"
    },
    exp:  getUtcTimestamp() + oneDayInSeconds,
  }
}

function nodeJwtSignAsync(jwtPayload, signKey) {
  return new Promise((resolve, reject) => {
    nodeJsonwebtoken.sign(jwtPayload, signKey, (err, token) => {
      if (err) {
        return reject(err)
      }
      resolve(token)
    })
  })
}
function nodeJwtVerifyAsync(jwt, verifyKey) {
  return new Promise((resolve, reject) => {
    nodeJsonwebtoken.verify(jwt, verifyKey, (err, token) => {
      if (err) {
        return reject(err)
      }
      resolve(token)
    })
  })
}

const rustJwtSignASync = rustJsonwebtoken.sign
const rustJwtVerifyASync = rustJsonwebtoken.verify


const key = "k123213dasdsadr231434";
const token = nodeJsonwebtoken.sign(createJWTData(), key)

const bench = new Bench({ time: 1000 });

bench
.add('nodeJS jwt sign', async () => {
  await nodeJwtSignAsync(createJWTData(), key)
})
.add('RUST NAPI jwt sign', async () => {
  await rustJwtSignASync(createJWTData(), key)
})
.add('nodeJS jwt verify', async () => {
  await nodeJwtVerifyAsync(token, key)
})
.add('RUST NAPI jwt verify', async () => {
  await rustJwtVerifyASync(token, key)
});

await bench.warmup(); // make results more reliable, ref:
await bench.run();

console.table(bench.table());