const router = require("express").Router();

const { SecureAPI } = require("../../utils/secure");
const SettingsController = require("./settings.controller");

router.post("/", SecureAPI(), (q, r, n) => {
  let { name, value, is_public } = q.body;
  SettingsController.add(name, value, is_public)
    .then(d => r.json(d))
    .catch(err => n(err));
});
router.get("/", SecureAPI(), (q, r, n) => {
  SettingsController.getAll()
    .then(d => r.json(d))
    .catch(e => n(e));
});

module.exports = router;
