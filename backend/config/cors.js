const cors= require('cors');

const whitelist = new Set(["http://localhost:3000"],["http://localhost:3001"]);
const corsOptions = {
  optionsSuccessStatus: 200,
  origin: function(origin, callback) {
    if (whitelist.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by written code CORS"));
    }
  },
  credentials: true
};

module.exports = cors(corsOptions);