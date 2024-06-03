import jwt from "jsonwebtoken"


const verifyJWT = (req, res, next) => {
    
  const authorization = req.headers.authorization;
    if (!authorization) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(401)
          .send({ error: true, message: "unauthorized access" });
      }
      req.decoded = decoded;
      next();
    });
  };


      // verifyAdmin
      const verifyAdmin = async (req, res, next) => {
        const email = req.decoded.email;
        const query = { email: email };
        const user = await userCollection.findOne(query);
        if (user?.role !== "admin") {
          return res
            .status(403)
            .send({ error: true, message: "forbidden access" });
        }
        next();
      };
  
      // verify Moderator
      const verifyModerator = async (req, res, next) => {
        const email = req.decoded.email;
        const query = { email: email };
        const user = await userCollection.findOne(query);
        if (user?.role !== "moderator") {
          return res
            .status(403)
            .send({ error: true, message: "forbidden access" });
        }
        next();
      };
  
      // verifyMerchant
      const verifyMerchant = async (req, res, next) => {
        const email = req.decoded.email;
        const query = { email: email };
        const user = await userCollection.findOne(query);
        if (user?.role !== "merchant") {
          return res
            .status(403)
            .send({ error: true, message: "forbidden access" });
        }
        next();
      };
  
      // // Create jwt token
      // app.post("/jwt", async (req, res) => {
      //   const user = req.body;
      //   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      //     expiresIn: "1h",
      //   });
      //   res.send({ token });
      // });


      export const Barrier = {
        verifyMerchant,
        verifyModerator,
        verifyAdmin,
        verifyJWT
      }