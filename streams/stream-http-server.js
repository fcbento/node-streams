import http from 'node:http';
import { Transform } from 'node:stream'

class InverseNumber extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1
    console.log(transformed)
    callback(null, Buffer.from(String(transformed)))
  }
}

//req = readable stream
//res = writable stream

const server = http.createServer(async(req, res) => {
  
  const buffers = [];

  for await (const chunck of req) {
    buffers.push(chunck)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)
})

server.listen(3334)