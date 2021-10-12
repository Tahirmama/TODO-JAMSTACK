const faunadb = require("faunadb");
const q = faunadb.query;



async function run() {
    var client = new faunadb.Client({
        secret: "fnAEVROfM9AAwcdrUeHzkApIOWmHK5UC_XnaMtZk",
        domain: 'db.eu.fauna.com',
        scheme: 'https',
    });
    // const results = await client.query(
    //     q.Create(q.Collection("todos"), {
    //     data: {
    //         text: "my todo 2!",
    //         done: false,
    //         owner: "user-test 2"
    //     }
    // }),
    // )
    //     .then((ret) => console.log(ret))
    //     .catch((err) => console.error('Error: %s', err))
    // console.log(results);
    //   const results = await client.query(
    //     q.Update(q.Ref(q.Collection("todos"), "256957931386307081"), {
    //       data: {
    //         done: true
    //       }
    //     })
    //   );
    //   console.log(results);

    const results = await client.query(
        q.Paginate(q.Match(q.Index("todos_by_user"), "user-test"))
    );
    console.log(results);
}


run();