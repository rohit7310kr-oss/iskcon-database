const allowRoles = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(401).json({ message: "forbidden" });

    next();
  };
};

module.exports = allowRoles;
