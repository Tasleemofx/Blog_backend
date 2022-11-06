
const request = require('supertest');
const app = require("../index")

// describe("Blogs", () => {

//     it("GET /blogs", async () => {
//         const response = await supertest(httpServer).get("/api/publishedblogs")
//         expect(response.headers["content-type"]).toBe("application/json")
//         expect(response.status).toBe(200)
//         // expect(response.body.length).toBe(5)
//     })
// })

request(app)
    .get("/api/publishedblogs")
    .expect(200)
    .expect("Content-type", /json/)
    .end(function(err, res) {
        if(err) throw err
    })


// afterall(()=>{ 
// mongoose.connection.close()
// })