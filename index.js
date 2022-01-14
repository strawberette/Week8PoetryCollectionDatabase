require("dotenv").config();
const { Sequelize, DataTypes, Op } = require("sequelize");
// const connection = new Sequelize("master32", "root", "password", {
//   host: "localhost",
//   dialect: "mysql",
// });
const connection = new Sequelize(process.env.DB_URI);
const Poetry = connection.define(
  "Poems",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    indexed: [{ unique: true, fields: ["title"] }],
  }
);
const main = async () => {
  try {
    await connection.authenticate();
    await Poetry.sync({ alter: true });

    await Poetry.create({
      title: "Portrait of my heart",
      content: `My canvas is the land
                    I weave threads
                    My days
                    Small leaps of faith
                    Onto the carpet of time.

                    I am full of emptiness
                    And yet I see meaning everywhere
                    The remaining sense of my purpose
                    Is sealed into my spiritual realm.

                    And we are travellers…

                    Sometimes we cross bridges
                    Sometimes we cross rivers.`,
    });

    await Poetry.create({
      title: "Youth",
      content: `Coffee breath
    And silent hopes
    In our stupid eyes
    We dream in flavours
    Until we break our hearts so hard
    Loving the wrong way
    Until we tie our shoes
    But let our spirits loose
    To die young
    And live fully
    On pride
    and irreversible passions`,
    });

    await Poetry.create({
      title: "Singleton",
      content: `I am starving for time
    Just another beggar
    Demanding just one second more
    With whom to feed myself
    A second of life, in life, for life

    A second to add to my collection
    Of preciouses, poems and not enoughs…

    If only I could carry all the weight of all the years
    The fleeting memories, the sturdy emotions attached to them….
    The pastels and the reds,
    the sweetness and the sourness
    of the silences between the unsaids.

    If only I could lend from time so easily
    I would not be so easily scared
    To lose the polish of aliveness,
    To let go of all the petals
    And To miss all of this one day, everyday, and today too.`,
    });

    // const operations = await Poetry.findAll({
    //   attributes: ["title", "content"],
    //   where: {
    //     title: "Portrait of my heart",
    //   },
    // });
    // for (let poem of operations) {
    //   console.log(`Poem: ${poem.title} -> ${poem.content}`);
    // }

    // await Poetry.update(
    //   { title: "Singleton" },
    //   {
    //     where: {
    //       title: "Youth",
    //     },
    //   }
    // );
    // for (let poem of await Poetry.findAll()) {
    //   console.log(`Poem: ${poem.title} -> ${poem.content}`);
    // }

    // await Poetry.destroy({
    //   where: {
    //     [Op.or]: [
    //       { title: "Portrait of my heart" },
    //       { title: "Youth" },
    //       { title: "Singleton" },
    //     ],
    //   },
    // });

    console.log("Connection has been successfully established");
  } catch (error) {
    console.log("unable to connect to the database", error);
  }
  await connection.close();
  process.exit();
};
main();
