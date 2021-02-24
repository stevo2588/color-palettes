import knex from "../../clients/knex";


export default async (req, res) => {
  if (req.method === "GET") {
    const palettes = await knex("palettes");

    res.status(200).json(palettes);
  } else if (req.method === "PUT") {
    console.log(req.body)
    await knex("palettes")
      .where({ id: req.body.id })
      .update({
        name: 'TODO',
        color0: req.body.color0,
        color1: req.body.color1,
        color2: req.body.color2,
        color3: req.body.color3,
        color4: req.body.color4,
      });

    const [palette] = await knex("palettes")
      .where({ id: req.body.id })
      .limit(1);

    res.status(200).json(palette);
  } else if (req.method === "POST") {
    const [id] = await knex("palettes")
      .insert({
        name: 'NEW PALETTE',
        color0: '0,0,0',
        color1: '0,0,0',
        color2: '0,0,0',
        color3: '0,0,0',
        color4: '0,0,0',
      }, ['id']);

    const [palette] = await knex("palettes")
      .where({ id })
      .limit(1);

    res.status(200).json(palette);
  } else if (req.method === "DELETE") {
    await knex("palettes")
      .where({ id: req.body.id })
      .del();

    res.status(200).json({ deleted: true });
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};
