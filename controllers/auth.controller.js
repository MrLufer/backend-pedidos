const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generator = require("generate-password");
exports.login = (req, res) => {
  let body = req.body;

  User.findOne({ user: body.user }).exec((err, data) => {
    if (err) {
      return res.status(400).json(err);
    }
    //Validamos que el Usuario exista
    if (!data) {
      return res.status(400).json({ err: "El usuario no existe" });
    }
    if (!bcrypt.compareSync(body.password, data.password)) {
      return res.status(400).json({ err: "la contraseña es incorrecta" });
    }
    //asignacion del token
    let token = jwt.sign(
      {
        data,
      },
      process.env.SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      token,
      data,
    });
  });
};

exports.createEmployee = (req, res) => {
  let user = new User(req.body);
  (user.password = bcrypt.hashSync(req.body.password, 10)),
    (user.rol = "EMPLOYEE"),
    user.save((err, data) => {
      if (err) {
        return res.json({
          status: 400,
          mensaje: "Error al almacenar el  user",
          err,
        });
      }
      res.status(200).json({
        data,
        password: password,
        mensaje: "El usuario ha sido creado con éxito",
      });
    });
};

exports.createAdmin = (req, res) => {
  let password = generator.generate({
    length: 10,
    numbers: true,
  });
  let user = new User(req.body);
  user.password = bcrypt.hashSync(password, 10);
  user.rol = "ADMIN";

  user.save((err, data) => {
    if (err) {
      return res.json({
        status: 400,
        mensaje: "Error al almacenar el  user",
        err,
      });
    }
    res.status(200).json({
      data,
      password: password,
      mensaje: "El usuario ha sido creado con éxito",
    });
  });
};
